
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.46.0";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

interface SubscriptionRequest {
  id: number;
  full_name: string;
  email: string;
  phone: string;
  address?: string;
  service_type: string;
  duration_months: number;
  payment_method: string;
  additional_info?: string;
  total_price: number;
  start_date: string;
  end_date: string;
  status: string;
}

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { subscriptionId } = await req.json();
    
    if (!subscriptionId) {
      return new Response(
        JSON.stringify({ error: "ID d'abonnement manquant" }),
        { 
          status: 400, 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
        }
      );
    }

    // Initialize Supabase client
    const supabaseUrl = Deno.env.get("SUPABASE_URL") || '';
    const supabaseKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") || '';
    const supabase = createClient(supabaseUrl, supabaseKey);

    // Get subscription details
    const { data: subscription, error } = await supabase
      .from('subscription_requests')
      .select('*')
      .eq('id', subscriptionId)
      .single();

    if (error || !subscription) {
      return new Response(
        JSON.stringify({ error: "Abonnement non trouvé" }),
        { 
          status: 404, 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
        }
      );
    }

    console.log("Subscription data:", JSON.stringify(subscription));

    // Format WhatsApp message and send notification
    const whatsappResult = await sendSubscriptionWhatsApp(subscription);
    
    console.log("WhatsApp notification result:", whatsappResult ? "Success" : "Failed");

    return new Response(
      JSON.stringify({ 
        success: true, 
        whatsapp: whatsappResult 
      }),
      { 
        status: 200, 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
      }
    );
  } catch (error) {
    console.error("Error in send-subscription function:", error);
    
    return new Response(
      JSON.stringify({ error: error.message || "Une erreur est survenue" }),
      { 
        status: 500, 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
      }
    );
  }
});

async function sendSubscriptionWhatsApp(subscription: SubscriptionRequest): Promise<boolean> {
  try {
    // Format the phone number to ensure it's in international format
    const phoneNumber = formatPhoneNumber(subscription.phone);
    
    // Format WhatsApp message
    const message = `🎮 *NOUVELLE DEMANDE D'ABONNEMENT* 🎮\n\n` +
      `*Client:* ${subscription.full_name}\n` +
      `*Téléphone:* ${subscription.phone}\n` +
      `*Email:* ${subscription.email}\n` +
      `*Service:* ${subscription.service_type}\n` +
      `*Durée:* ${subscription.duration_months} mois\n` +
      `*Prix total:* ${subscription.total_price} FCFA\n` +
      `*Paiement:* ${subscription.payment_method}\n\n` +
      `Date de début: ${subscription.start_date}\n` +
      `Date de fin: ${subscription.end_date}\n` +
      (subscription.address ? `Adresse: ${subscription.address}\n` : "") +
      (subscription.additional_info ? `\n*Informations supplémentaires:*\n${subscription.additional_info}\n` : "") +
      `\n*ID de la demande:* ${subscription.id}`;
    
    console.log(`Préparation du message WhatsApp pour: ${phoneNumber}`);
    console.log("Contenu du message WhatsApp:", message);
    
    // In a real environment, you would use WhatsApp Business API here
    // This function is currently just logging the message
    // You would need to integrate with a WhatsApp API service like Twilio or MessageBird
    
    // Integration example (simulated for now):
    // const whatsappApiResult = await fetch('your-whatsapp-api-url', {
    //   method: 'POST',
    //   headers: { 'Content-Type': 'application/json' },
    //   body: JSON.stringify({ 
    //     to: phoneNumber, 
    //     message: message 
    //   })
    // });
    
    // Just returning true for simulation purposes
    // In a real implementation, you'd check whatsappApiResult.ok
    return true;
  } catch (error) {
    console.error("Error sending WhatsApp message:", error);
    return false;
  }
}

// Helper function to format phone numbers
function formatPhoneNumber(phone: string): string {
  // Remove spaces, dashes, parentheses
  let cleaned = phone.replace(/\s+/g, '').replace(/[()-]/g, '');
  
  // Check if the number already has a country code
  if (!cleaned.startsWith('+')) {
    // Add Gabonese country code (+241) if not present
    if (!cleaned.startsWith('241')) {
      cleaned = '+241' + cleaned;
    } else {
      cleaned = '+' + cleaned;
    }
  }
  
  console.log(`Original phone: ${phone}, formatted: ${cleaned}`);
  return cleaned;
}
