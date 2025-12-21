/**
 * PYRAX Brevo (Sendinblue) Email Service
 * 
 * Handles all transactional emails for the admin portal including:
 * - Admin invitation/confirmation emails
 * - Password reset emails
 * - Security notifications
 */

const BREVO_API_KEY = process.env.BREVO_API_KEY;
const BREVO_API_URL = "https://api.brevo.com/v3/smtp/email";

// PYRAX Brand Colors
const PYRAX_ORANGE = "#F68724";
const PYRAX_AMBER = "#EC7B23";
const PYRAX_DARK = "#0A0A0B";
const PYRAX_DARK_SECONDARY = "#0F0F10";

// Logo URL (hosted on your CDN or website)
const PYRAX_LOGO_URL = "https://pyrax.org/pyrax-logo-full.png";
const PYRAX_ICON_URL = "https://pyrax.org/pyrax-icon.png";

interface EmailOptions {
  to: string;
  toName?: string;
  subject: string;
  htmlContent: string;
  textContent?: string;
}

/**
 * Send an email using Brevo API
 */
export async function sendEmail(options: EmailOptions): Promise<{ success: boolean; messageId?: string; error?: string }> {
  if (!BREVO_API_KEY) {
    console.error("BREVO_API_KEY not configured");
    return { success: false, error: "Email service not configured" };
  }

  try {
    const response = await fetch(BREVO_API_URL, {
      method: "POST",
      headers: {
        "accept": "application/json",
        "api-key": BREVO_API_KEY,
        "content-type": "application/json",
      },
      body: JSON.stringify({
        sender: {
          name: "PYRAX Admin Portal",
          email: "noreply@pyrax.org",
        },
        to: [
          {
            email: options.to,
            name: options.toName || options.to.split("@")[0],
          },
        ],
        subject: options.subject,
        htmlContent: options.htmlContent,
        textContent: options.textContent || stripHtml(options.htmlContent),
      }),
    });

    const data = await response.json();

    if (response.ok) {
      return { success: true, messageId: data.messageId };
    } else {
      return { success: false, error: data.message || "Failed to send email" };
    }
  } catch (error) {
    console.error("Email send error:", error);
    return { success: false, error: "Failed to send email" };
  }
}

/**
 * Strip HTML tags for plain text version
 */
function stripHtml(html: string): string {
  return html
    .replace(/<[^>]*>/g, "")
    .replace(/\s+/g, " ")
    .trim();
}

/**
 * Generate the base email template with PYRAX branding
 */
function getEmailTemplate(content: string, preheader?: string): string {
  return `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <title>PYRAX</title>
  <!--[if mso]>
  <noscript>
    <xml>
      <o:OfficeDocumentSettings>
        <o:PixelsPerInch>96</o:PixelsPerInch>
      </o:OfficeDocumentSettings>
    </xml>
  </noscript>
  <![endif]-->
  <style>
    @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap');
    
    body {
      margin: 0;
      padding: 0;
      font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
      background-color: ${PYRAX_DARK};
      color: #ffffff;
    }
    
    .email-container {
      max-width: 600px;
      margin: 0 auto;
      background-color: ${PYRAX_DARK_SECONDARY};
    }
    
    .header {
      background: linear-gradient(135deg, ${PYRAX_ORANGE} 0%, ${PYRAX_AMBER} 100%);
      padding: 32px 24px;
      text-align: center;
    }
    
    .logo {
      max-width: 180px;
      height: auto;
    }
    
    .content {
      padding: 40px 32px;
      background-color: ${PYRAX_DARK_SECONDARY};
    }
    
    .footer {
      padding: 24px 32px;
      text-align: center;
      background-color: ${PYRAX_DARK};
      border-top: 1px solid rgba(255, 255, 255, 0.1);
    }
    
    h1 {
      color: #ffffff;
      font-size: 24px;
      font-weight: 700;
      margin: 0 0 16px 0;
    }
    
    p {
      color: #a0a0a0;
      font-size: 14px;
      line-height: 1.6;
      margin: 0 0 16px 0;
    }
    
    .highlight {
      color: ${PYRAX_ORANGE};
      font-weight: 600;
    }
    
    .button {
      display: inline-block;
      background: linear-gradient(135deg, ${PYRAX_ORANGE} 0%, ${PYRAX_AMBER} 100%);
      color: #0A0A0B !important;
      text-decoration: none;
      padding: 14px 32px;
      border-radius: 8px;
      font-weight: 600;
      font-size: 14px;
      margin: 24px 0;
    }
    
    .button:hover {
      opacity: 0.9;
    }
    
    .info-box {
      background-color: rgba(246, 135, 36, 0.1);
      border: 1px solid rgba(246, 135, 36, 0.2);
      border-radius: 8px;
      padding: 16px;
      margin: 24px 0;
    }
    
    .info-box p {
      color: #ffffff;
      margin: 0;
    }
    
    .warning-box {
      background-color: rgba(239, 68, 68, 0.1);
      border: 1px solid rgba(239, 68, 68, 0.2);
      border-radius: 8px;
      padding: 16px;
      margin: 24px 0;
    }
    
    .warning-box p {
      color: #fca5a5;
      margin: 0;
    }
    
    .divider {
      height: 1px;
      background-color: rgba(255, 255, 255, 0.1);
      margin: 24px 0;
    }
    
    .footer-text {
      color: #666666;
      font-size: 12px;
    }
    
    .footer-link {
      color: ${PYRAX_ORANGE};
      text-decoration: none;
    }
    
    @media only screen and (max-width: 600px) {
      .content {
        padding: 24px 16px;
      }
      .header {
        padding: 24px 16px;
      }
    }
  </style>
</head>
<body>
  ${preheader ? `<div style="display:none;font-size:1px;color:#0A0A0B;line-height:1px;max-height:0px;max-width:0px;opacity:0;overflow:hidden;">${preheader}</div>` : ""}
  
  <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" style="background-color: ${PYRAX_DARK};">
    <tr>
      <td align="center" style="padding: 40px 16px;">
        <table role="presentation" cellspacing="0" cellpadding="0" border="0" class="email-container" width="600" style="max-width: 600px; background-color: ${PYRAX_DARK_SECONDARY}; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 24px rgba(0, 0, 0, 0.4);">
          
          <!-- Header with Logo -->
          <tr>
            <td class="header" style="background: linear-gradient(135deg, ${PYRAX_ORANGE} 0%, ${PYRAX_AMBER} 100%); padding: 32px 24px; text-align: center;">
              <img src="${PYRAX_LOGO_URL}" alt="PYRAX" class="logo" style="max-width: 180px; height: auto;" />
            </td>
          </tr>
          
          <!-- Content -->
          <tr>
            <td class="content" style="padding: 40px 32px; background-color: ${PYRAX_DARK_SECONDARY};">
              ${content}
            </td>
          </tr>
          
          <!-- Footer -->
          <tr>
            <td class="footer" style="padding: 24px 32px; text-align: center; background-color: ${PYRAX_DARK}; border-top: 1px solid rgba(255, 255, 255, 0.1);">
              <img src="${PYRAX_ICON_URL}" alt="PYRAX" style="width: 32px; height: 32px; margin-bottom: 12px;" />
              <p class="footer-text" style="color: #666666; font-size: 12px; margin: 0 0 8px 0;">
                © ${new Date().getFullYear()} PYRAX LLC. All rights reserved.
              </p>
              <p class="footer-text" style="color: #666666; font-size: 12px; margin: 0 0 8px 0;">
                PYRAX™ is a pending trademark of PYRAX LLC.
              </p>
              <p class="footer-text" style="color: #555555; font-size: 11px; margin: 16px 0 0 0;">
                This email was sent to you because you were invited to the PYRAX Admin Portal.<br/>
                If you did not request this, please ignore this email.
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
}

/**
 * Send admin invitation/confirmation email
 */
export async function sendAdminInvitationEmail(
  email: string,
  confirmationToken: string,
  invitedBy?: string
): Promise<{ success: boolean; error?: string }> {
  const confirmationUrl = `${process.env.NEXT_PUBLIC_APP_URL || "https://pyrax.org"}/admin/confirm?token=${confirmationToken}`;
  
  const content = `
    <h1 style="color: #ffffff; font-size: 24px; font-weight: 700; margin: 0 0 16px 0;">
      🔥 Welcome to PYRAX Admin Portal
    </h1>
    
    <p style="color: #a0a0a0; font-size: 14px; line-height: 1.6; margin: 0 0 16px 0;">
      You've been invited to join the <span style="color: ${PYRAX_ORANGE}; font-weight: 600;">PYRAX Admin Portal</span> as an administrator.
    </p>
    
    ${invitedBy ? `
    <p style="color: #a0a0a0; font-size: 14px; line-height: 1.6; margin: 0 0 16px 0;">
      Invited by: <span style="color: #ffffff; font-weight: 500;">${invitedBy}</span>
    </p>
    ` : ""}
    
    <div style="background-color: rgba(246, 135, 36, 0.1); border: 1px solid rgba(246, 135, 36, 0.2); border-radius: 8px; padding: 16px; margin: 24px 0;">
      <p style="color: #ffffff; margin: 0; font-size: 14px;">
        <strong>Email:</strong> ${email}
      </p>
    </div>
    
    <p style="color: #a0a0a0; font-size: 14px; line-height: 1.6; margin: 0 0 16px 0;">
      To activate your admin account and gain access to the portal, please click the button below:
    </p>
    
    <div style="text-align: center;">
      <a href="${confirmationUrl}" style="display: inline-block; background: linear-gradient(135deg, ${PYRAX_ORANGE} 0%, ${PYRAX_AMBER} 100%); color: #0A0A0B !important; text-decoration: none; padding: 14px 32px; border-radius: 8px; font-weight: 600; font-size: 14px; margin: 24px 0;">
        ✅ Confirm My Account
      </a>
    </div>
    
    <div style="height: 1px; background-color: rgba(255, 255, 255, 0.1); margin: 24px 0;"></div>
    
    <p style="color: #666666; font-size: 12px; line-height: 1.6; margin: 0 0 8px 0;">
      Or copy and paste this link into your browser:
    </p>
    <p style="color: ${PYRAX_ORANGE}; font-size: 12px; word-break: break-all; margin: 0 0 16px 0;">
      ${confirmationUrl}
    </p>
    
    <div style="background-color: rgba(239, 68, 68, 0.1); border: 1px solid rgba(239, 68, 68, 0.2); border-radius: 8px; padding: 16px; margin: 24px 0;">
      <p style="color: #fca5a5; margin: 0; font-size: 13px;">
        ⚠️ <strong>Security Notice:</strong> This invitation link will expire in 72 hours. Only @pyrax.org email addresses are authorized for admin access.
      </p>
    </div>
  `;

  const htmlContent = getEmailTemplate(content, "You've been invited to the PYRAX Admin Portal - Confirm your account");

  return sendEmail({
    to: email,
    subject: "🔥 PYRAX Admin Portal - Confirm Your Account",
    htmlContent,
  });
}

/**
 * Send confirmation success email
 */
export async function sendConfirmationSuccessEmail(email: string): Promise<{ success: boolean; error?: string }> {
  const loginUrl = `${process.env.NEXT_PUBLIC_APP_URL || "https://pyrax.org"}/admin/login`;
  
  const content = `
    <h1 style="color: #ffffff; font-size: 24px; font-weight: 700; margin: 0 0 16px 0;">
      ✅ Account Confirmed!
    </h1>
    
    <p style="color: #a0a0a0; font-size: 14px; line-height: 1.6; margin: 0 0 16px 0;">
      Your PYRAX Admin Portal account has been successfully activated.
    </p>
    
    <div style="background-color: rgba(34, 197, 94, 0.1); border: 1px solid rgba(34, 197, 94, 0.2); border-radius: 8px; padding: 16px; margin: 24px 0;">
      <p style="color: #86efac; margin: 0; font-size: 14px;">
        🎉 You can now log in to the admin portal with your credentials.
      </p>
    </div>
    
    <div style="text-align: center;">
      <a href="${loginUrl}" style="display: inline-block; background: linear-gradient(135deg, ${PYRAX_ORANGE} 0%, ${PYRAX_AMBER} 100%); color: #0A0A0B !important; text-decoration: none; padding: 14px 32px; border-radius: 8px; font-weight: 600; font-size: 14px; margin: 24px 0;">
        🔐 Go to Admin Portal
      </a>
    </div>
    
    <div style="height: 1px; background-color: rgba(255, 255, 255, 0.1); margin: 24px 0;"></div>
    
    <p style="color: #666666; font-size: 12px; line-height: 1.6; margin: 0;">
      If you didn't request this, please contact security@pyrax.org immediately.
    </p>
  `;

  const htmlContent = getEmailTemplate(content, "Your PYRAX Admin account has been confirmed");

  return sendEmail({
    to: email,
    subject: "✅ PYRAX Admin Account Confirmed",
    htmlContent,
  });
}

export { getEmailTemplate, PYRAX_ORANGE, PYRAX_AMBER, PYRAX_DARK };
