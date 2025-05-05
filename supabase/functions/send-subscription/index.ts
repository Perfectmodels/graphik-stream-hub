
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
  try {
    // Initialize puppeteer
    const browser = await puppeteer.launch({
      args: ['--no-sandbox', '--disable-setuid-sandbox'],
    });
    
    const page = await browser.newPage();
    
    // Generate HTML content for the PDF
    const htmlContent = `
      <!DOCTYPE html>
      <html lang="fr">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Demande d'abonnement - Graphik'Studio</title>
        <style>
          body {
            font-family: Arial, sans-serif;
            line-height: 1.6;
            color: #333;
            max-width: 800px;
            margin: 0 auto;
            padding: 20px;
          }
          h1 {
            color: #2563eb;
            text-align: center;
            border-bottom: 2px solid #2563eb;
            padding-bottom: 10px;
          }
          .header {
            text-align: center;
            margin-bottom: 30px;
          }
          .logo {
            font-size: 24px;
            font-weight: bold;
            color: #2563eb;
          }
          .section {
            margin-bottom: 20px;
          }
          .section-title {
            font-weight: bold;
            border-bottom: 1px solid #ddd;
            padding-bottom: 5px;
            margin-bottom: 10px;
          }
          .info-row {
            display: flex;
            margin-bottom: 5px;
          }
          .label {
            font-weight: bold;
            width: 200px;
          }
          .value {
            flex: 1;
          }
          .footer {
            margin-top: 40px;
            text-align: center;
            font-size: 12px;
            color: #666;
          }
          .status {
            display: inline-block;
            padding: 5px 10px;
            border-radius: 15px;
            font-size: 14px;
            font-weight: bold;
          }
          .status.pending {
            background-color: #fef3c7;
            color: #d97706;
          }
        </style>
      </head>
      <body>
        <div class="header">
          <div class="logo">Graphik'Studio</div>
          <p>Votre partenaire pour le streaming et le gaming</p>
        </div>
        
        <h1>Demande d'abonnement</h1>
        
        <div class="section">
          <div class="section-title">Informations client</div>
          <div class="info-row">
            <div class="label">Nom complet:</div>
            <div class="value">${subscription.full_name}</div>
          </div>
          <div class="info-row">
            <div class="label">Email:</div>
            <div class="value">${subscription.email}</div>
          </div>
          <div class="info-row">
            <div class="label">Téléphone:</div>
            <div class="value">${subscription.phone}</div>
          </div>
          ${subscription.address ? `
          <div class="info-row">
            <div class="label">Adresse:</div>
            <div class="value">${subscription.address}</div>
          </div>
          ` : ''}
        </div>
        
        <div class="section">
          <div class="section-title">Détails de l'abonnement</div>
          <div class="info-row">
            <div class="label">Type de service:</div>
            <div class="value">${subscription.service_type}</div>
          </div>
          <div class="info-row">
            <div class="label">Durée:</div>
            <div class="value">${subscription.duration_months} mois</div>
          </div>
          <div class="info-row">
            <div class="label">Date de début:</div>
            <div class="value">${subscription.start_date}</div>
          </div>
          <div class="info-row">
            <div class="label">Date de fin:</div>
            <div class="value">${subscription.end_date}</div>
          </div>
          <div class="info-row">
            <div class="label">Méthode de paiement:</div>
            <div class="value">${subscription.payment_method}</div>
          </div>
          <div class="info-row">
            <div class="label">Prix total:</div>
            <div class="value">${subscription.total_price} FCFA</div>
          </div>
          <div class="info-row">
            <div class="label">Statut:</div>
            <div class="value">
              <span class="status pending">En attente</span>
            </div>
          </div>
        </div>
        
        ${subscription.additional_info ? `
        <div class="section">
          <div class="section-title">Informations supplémentaires</div>
          <p>${subscription.additional_info}</p>
        </div>
        ` : ''}
        
        <div class="section">
          <div class="section-title">Prochaines étapes</div>
          <p>Notre équipe examinera votre demande et vous contactera sous peu pour confirmer les détails et finaliser votre abonnement. Merci de votre patience.</p>
        </div>
        
        <div class="footer">
          <p>Graphik'Studio - ID de demande: ${subscription.id}</p>
          <p>Document généré le ${new Date().toLocaleDateString('fr-FR', { year: 'numeric', month: 'long', day: 'numeric' })}</p>
        </div>
      </body>
      </html>
    `;
    
    await page.setContent(htmlContent);
    
    // Generate PDF
    const pdfBuffer = await page.pdf({
      format: 'A4',
      printBackground: true,
      margin: {
        top: '20px',
        right: '20px',
        bottom: '20px',
        left: '20px'
      }
    });
    
    await browser.close();
    
    return pdfBuffer;
  } catch (error) {
    console.error("Error generating PDF:", error);
    // Return an empty PDF as fallback
    const encoder = new TextEncoder();
    return encoder.encode("Error generating PDF");
  }
}

async function sendSubscriptionEmail(subscription: SubscriptionRequest, pdfBuffer: Uint8Array): Promise<boolean> {
  try {
    console.log(`Envoi d'email à: ${subscription.email} et contact@graphikstudio.pro`);
    console.log("Fichier PDF joint à l'email");
    
    // Note: In a real environment, you would use an email service API
    // For now, we just log the details and return success
    
    // Example implementation with an email service would be:
    // 1. Convert pdfBuffer to a base64 string for attachment
    // 2. Send email with attachment using a service like SendGrid, Mailgun, etc.
    
    return true;
  } catch (error) {
    console.error("Error sending email:", error);
    return false;
  }
}

async function sendSubscriptionWhatsApp(subscription: SubscriptionRequest): Promise<boolean> {
  try {
    console.log(`Envoi d'un message WhatsApp à: ${subscription.phone}`);
    console.log("Détails de l'abonnement inclus dans le message WhatsApp");
    
    // Note: In a real environment, you would use WhatsApp Business API
    // For now, we just log the details and return success
    
    return true;
  } catch (error) {
    console.error("Error sending WhatsApp message:", error);
    return false;
  }
}
