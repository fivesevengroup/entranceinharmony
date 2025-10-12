import nodemailer from "nodemailer";

// Strato.de SMTP configuration
const transporter = nodemailer.createTransport({
  host: "smtp.strato.de",
  port: 465,
  secure: true, // SSL
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

interface VoucherEmailData {
  recipientEmail: string;
  recipientName: string;
  buyerName: string;
  amount: number;
  orderNumber: string;
  message?: string;
  deliveryMethod: "digital" | "postal";
  purchaseType: "custom" | "service";
  serviceSnapshotName?: string;
}

export async function sendVoucherEmail(data: VoucherEmailData) {
  const {
    recipientEmail,
    recipientName,
    buyerName,
    amount,
    orderNumber,
    message,
    deliveryMethod,
    purchaseType,
    serviceSnapshotName,
  } = data;

  // Only send email for digital vouchers
  if (deliveryMethod !== "digital") {
    console.log(`Skipping email for postal voucher ${orderNumber}`);
    return;
  }

  const voucherTitle = purchaseType === "service" && serviceSnapshotName
    ? `Gutschein für ${serviceSnapshotName}`
    : `Wertgutschein über ${amount}€`;

  const htmlContent = `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Ihr Geschenkgutschein</title>
    </head>
    <body style="margin: 0; padding: 0; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; background-color: #f5f0ed;">
      <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="background-color: #f5f0ed; padding: 40px 20px;">
        <tr>
          <td align="center">
            <table role="presentation" width="600" cellspacing="0" cellpadding="0" border="0" style="max-width: 600px; background-color: #ffffff; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);">
              
              <!-- Header mit Logo/Branding -->
              <tr>
                <td style="background: linear-gradient(135deg, #d4af6a 0%, #b8935d 100%); padding: 40px 30px; text-align: center;">
                  <h1 style="margin: 0; color: #ffffff; font-size: 32px; font-weight: 300; letter-spacing: 2px;">
                    ENTRANCE IN HARMONY
                  </h1>
                  <p style="margin: 10px 0 0 0; color: #ffffff; font-size: 14px; opacity: 0.95;">
                    Beauty & Aesthetics
                  </p>
                </td>
              </tr>

              <!-- Hauptinhalt -->
              <tr>
                <td style="padding: 40px 30px;">
                  <h2 style="margin: 0 0 20px 0; color: #2c2c2c; font-size: 24px; font-weight: 300;">
                    Liebe/r ${recipientName},
                  </h2>
                  
                  <p style="margin: 0 0 20px 0; color: #555555; font-size: 16px; line-height: 1.6;">
                    ${buyerName} hat Ihnen einen wunderbaren Geschenkgutschein geschenkt!
                  </p>

                  ${message ? `
                    <div style="background-color: #f9f6f3; border-left: 4px solid #d4af6a; padding: 15px 20px; margin: 0 0 30px 0; border-radius: 4px;">
                      <p style="margin: 0; color: #555555; font-size: 15px; font-style: italic; line-height: 1.5;">
                        "${message}"
                      </p>
                    </div>
                  ` : ''}

                  <!-- Gutschein Card -->
                  <div style="background: linear-gradient(135deg, #f9f6f3 0%, #f5f0ed 100%); border: 2px solid #d4af6a; border-radius: 8px; padding: 30px; margin: 30px 0; text-align: center;">
                    <p style="margin: 0 0 10px 0; color: #888888; font-size: 12px; text-transform: uppercase; letter-spacing: 1px;">
                      Gutschein-Nr.
                    </p>
                    <p style="margin: 0 0 20px 0; color: #2c2c2c; font-size: 16px; font-family: monospace; letter-spacing: 1px;">
                      ${orderNumber}
                    </p>
                    
                    <div style="height: 1px; background-color: #d4af6a; margin: 20px 0; opacity: 0.3;"></div>
                    
                    <p style="margin: 0 0 10px 0; color: #888888; font-size: 14px;">
                      ${voucherTitle}
                    </p>
                    <p style="margin: 0; color: #d4af6a; font-size: 42px; font-weight: 300;">
                      ${amount}€
                    </p>
                  </div>

                  <!-- Einlöseinformationen -->
                  <div style="background-color: #f9f6f3; padding: 20px; border-radius: 8px; margin: 20px 0;">
                    <h3 style="margin: 0 0 15px 0; color: #2c2c2c; font-size: 18px; font-weight: 400;">
                      So lösen Sie Ihren Gutschein ein
                    </h3>
                    <ul style="margin: 0; padding: 0 0 0 20px; color: #555555; font-size: 15px; line-height: 1.8;">
                      <li>Gutschein ist 1 Jahr ab Ausstellungsdatum gültig</li>
                      <li>Einlösbar für alle Behandlungen bei Entrance in Harmony</li>
                      <li>Termin bitte vorab per WhatsApp oder Telefon vereinbaren</li>
                      <li>Bitte Gutschein-Nummer beim Termin bereithalten</li>
                    </ul>
                  </div>

                  <!-- Kontakt & Terminbuchung -->
                  <div style="text-align: center; margin: 30px 0;">
                    <p style="margin: 0 0 15px 0; color: #555555; font-size: 15px;">
                      Vereinbaren Sie jetzt Ihren Wunschtermin:
                    </p>
                    <a href="https://wa.me/491709287722" style="display: inline-block; background-color: #25D366; color: #ffffff; text-decoration: none; padding: 14px 30px; border-radius: 6px; font-size: 16px; font-weight: 500; margin: 5px;">
                      📱 WhatsApp: 0170 9287722
                    </a>
                    <p style="margin: 15px 0 0 0; color: #888888; font-size: 14px;">
                      oder per E-Mail: info@entranceinharmony.de
                    </p>
                  </div>
                </td>
              </tr>

              <!-- Footer -->
              <tr>
                <td style="background-color: #2c2c2c; padding: 30px; text-align: center;">
                  <p style="margin: 0 0 10px 0; color: #ffffff; font-size: 16px; font-weight: 300;">
                    Entrance in Harmony by Elena Hartstein
                  </p>
                  <p style="margin: 0 0 15px 0; color: #cccccc; font-size: 14px;">
                    Höhfeld 5, 57299 Burbach
                  </p>
                  <p style="margin: 0; color: #cccccc; font-size: 13px;">
                    <a href="tel:+491709287722" style="color: #d4af6a; text-decoration: none;">0170 9287722</a> • 
                    <a href="mailto:info@entranceinharmony.de" style="color: #d4af6a; text-decoration: none;">info@entranceinharmony.de</a>
                  </p>
                </td>
              </tr>
            </table>
          </td>
        </tr>
      </table>
    </body>
    </html>
  `;

  const textContent = `
Liebe/r ${recipientName},

${buyerName} hat Ihnen einen Geschenkgutschein geschenkt!

${message ? `Persönliche Nachricht:\n"${message}"\n\n` : ''}

GUTSCHEIN-DETAILS:
${voucherTitle}
Wert: ${amount}€
Gutschein-Nr.: ${orderNumber}

SO LÖSEN SIE DEN GUTSCHEIN EIN:
• Gültig 1 Jahr ab Ausstellungsdatum
• Einlösbar für alle Behandlungen bei Entrance in Harmony
• Termin vorab per WhatsApp oder Telefon vereinbaren
• Gutschein-Nummer beim Termin bereithalten

TERMIN VEREINBAREN:
WhatsApp: 0170 9287722
E-Mail: info@entranceinharmony.de

---
Entrance in Harmony by Elena Hartstein
Höhfeld 5, 57299 Burbach
Tel: 0170 9287722
E-Mail: info@entranceinharmony.de
  `.trim();

  try {
    const info = await transporter.sendMail({
      from: `"Entrance in Harmony" <${process.env.EMAIL_USER}>`,
      to: recipientEmail,
      subject: `🎁 Ihr Geschenkgutschein von ${buyerName} - Entrance in Harmony`,
      text: textContent,
      html: htmlContent,
    });

    console.log(`Voucher email sent successfully: ${info.messageId}`);
    return info;
  } catch (error) {
    console.error("Error sending voucher email:", error);
    throw error;
  }
}

// Bestätigungs-Email an Käufer
export async function sendPurchaseConfirmationEmail(data: VoucherEmailData & { buyerEmail: string }) {
  const {
    buyerEmail,
    buyerName,
    recipientName,
    amount,
    orderNumber,
    deliveryMethod,
    purchaseType,
    serviceSnapshotName,
  } = data;

  const voucherTitle = purchaseType === "service" && serviceSnapshotName
    ? `Gutschein für ${serviceSnapshotName}`
    : `Wertgutschein über ${amount}€`;

  const deliveryInfo = deliveryMethod === "digital"
    ? "Der Gutschein wurde per E-Mail an den Empfänger versendet."
    : "Der Gutschein wird innerhalb von 2-3 Werktagen per Post zugestellt.";

  const htmlContent = `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <title>Bestellbestätigung</title>
    </head>
    <body style="margin: 0; padding: 0; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; background-color: #f5f0ed;">
      <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="background-color: #f5f0ed; padding: 40px 20px;">
        <tr>
          <td align="center">
            <table role="presentation" width="600" cellspacing="0" cellpadding="0" border="0" style="max-width: 600px; background-color: #ffffff; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);">
              
              <tr>
                <td style="background: linear-gradient(135deg, #d4af6a 0%, #b8935d 100%); padding: 40px 30px; text-align: center;">
                  <h1 style="margin: 0; color: #ffffff; font-size: 32px; font-weight: 300; letter-spacing: 2px;">
                    ✓ BESTELLUNG BESTÄTIGT
                  </h1>
                </td>
              </tr>

              <tr>
                <td style="padding: 40px 30px;">
                  <h2 style="margin: 0 0 20px 0; color: #2c2c2c; font-size: 24px; font-weight: 300;">
                    Hallo ${buyerName},
                  </h2>
                  
                  <p style="margin: 0 0 20px 0; color: #555555; font-size: 16px; line-height: 1.6;">
                    vielen Dank für Ihren Kauf! Ihr Geschenkgutschein wurde erfolgreich erstellt.
                  </p>

                  <div style="background-color: #f9f6f3; border-radius: 8px; padding: 20px; margin: 20px 0;">
                    <h3 style="margin: 0 0 15px 0; color: #2c2c2c; font-size: 18px;">Bestelldetails</h3>
                    <table style="width: 100%; border-collapse: collapse;">
                      <tr>
                        <td style="padding: 8px 0; color: #888888; font-size: 14px;">Bestellnummer:</td>
                        <td style="padding: 8px 0; color: #2c2c2c; font-size: 14px; text-align: right; font-family: monospace;">${orderNumber}</td>
                      </tr>
                      <tr>
                        <td style="padding: 8px 0; color: #888888; font-size: 14px;">Gutschein:</td>
                        <td style="padding: 8px 0; color: #2c2c2c; font-size: 14px; text-align: right;">${voucherTitle}</td>
                      </tr>
                      <tr>
                        <td style="padding: 8px 0; color: #888888; font-size: 14px;">Wert:</td>
                        <td style="padding: 8px 0; color: #d4af6a; font-size: 18px; text-align: right; font-weight: 500;">${amount}€</td>
                      </tr>
                      <tr>
                        <td style="padding: 8px 0; color: #888888; font-size: 14px;">Empfänger:</td>
                        <td style="padding: 8px 0; color: #2c2c2c; font-size: 14px; text-align: right;">${recipientName}</td>
                      </tr>
                      <tr>
                        <td style="padding: 8px 0; color: #888888; font-size: 14px;">Versandart:</td>
                        <td style="padding: 8px 0; color: #2c2c2c; font-size: 14px; text-align: right;">${deliveryMethod === "digital" ? "Digital (E-Mail)" : "Per Post"}</td>
                      </tr>
                    </table>
                  </div>

                  <div style="background-color: #e8f5e9; border-left: 4px solid #4caf50; padding: 15px 20px; margin: 20px 0; border-radius: 4px;">
                    <p style="margin: 0; color: #2e7d32; font-size: 15px;">
                      ✓ ${deliveryInfo}
                    </p>
                  </div>

                  <p style="margin: 20px 0; color: #555555; font-size: 15px; line-height: 1.6;">
                    Bei Fragen stehen wir Ihnen gerne zur Verfügung!
                  </p>
                </td>
              </tr>

              <tr>
                <td style="background-color: #2c2c2c; padding: 30px; text-align: center;">
                  <p style="margin: 0 0 10px 0; color: #ffffff; font-size: 16px; font-weight: 300;">
                    Entrance in Harmony by Elena Hartstein
                  </p>
                  <p style="margin: 0; color: #cccccc; font-size: 13px;">
                    Höhfeld 5, 57299 Burbach | Tel: 0170 9287722 | info@entranceinharmony.de
                  </p>
                </td>
              </tr>
            </table>
          </td>
        </tr>
      </table>
    </body>
    </html>
  `;

  try {
    const info = await transporter.sendMail({
      from: `"Entrance in Harmony" <${process.env.EMAIL_USER}>`,
      to: buyerEmail,
      subject: `✓ Bestellbestätigung - Gutschein ${orderNumber}`,
      html: htmlContent,
    });

    console.log(`Confirmation email sent to buyer: ${info.messageId}`);
    return info;
  } catch (error) {
    console.error("Error sending confirmation email:", error);
    throw error;
  }
}
