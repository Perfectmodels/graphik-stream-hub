
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.46.0";
import * as puppeteer from 'https://deno.land/x/puppeteer@16.2.0/mod.ts';

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

    // Generate PDF
    const pdfBuffer = await generateSubscriptionPDF(subscription);

    // Send Email with PDF
    const emailResult = await sendSubscriptionEmail(subscription, pdfBuffer);
    
    // Send WhatsApp
    const whatsappResult = await sendSubscriptionWhatsApp(subscription);

    return new Response(
      JSON.stringify({ 
        success: true, 
        email: emailResult, 
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

async function generateSubscriptionPDF(subscription: SubscriptionRequest): Promise<Uint8Array> {
  // For now, return an empty buffer as PDF generation requires more setup
  // In production, you'd use PDF generation libraries
  
  // This is a placeholder - in a real environment you would use puppeteer or similar
  // to generate a proper PDF with the subscription details
  const pdfContent = `
    Demande d'abonnement - Graphik'Studio
    
    Client: ${subscription.full_name}
    Email: ${subscription.email}
    Téléphone: ${subscription.phone}
    Service: ${subscription.service_type}
    Durée: ${subscription.duration_months} mois
    Prix total: ${subscription.total_price} FCFA
    Date de début: ${subscription.start_date}
    Date de fin: ${subscription.end_date}
    Statut: ${subscription.status}
  `;
  
  const encoder = new TextEncoder();
  return encoder.encode(pdfContent);
}

async function sendSubscriptionEmail(subscription: SubscriptionRequest, pdfBuffer: Uint8Array): Promise<boolean> {
  console.log(`Email would be sent to: ${subscription.email} and contact@graphikstudio.pro`);
  console.log("PDF would be attached to the email");
  
  // In production, integrate with email service APIs like SendGrid, Mailgun, etc.
  
  return true; // Placeholder success response
}

async function sendSubscriptionWhatsApp(subscription: SubscriptionRequest): Promise<boolean> {
  console.log(`WhatsApp message would be sent to: ${subscription.phone}`);
  console.log("Subscription details would be included in the WhatsApp message");
  
  // In production, integrate with WhatsApp Business API
  
  return true; // Placeholder success response
}
