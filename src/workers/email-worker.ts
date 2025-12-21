import { Worker, Job } from "bullmq";
import { getRedisConnection, QUEUE_NAMES, EmailNotificationJob } from "../lib/queue";

// Email service configuration - Using Brevo (formerly Sendinblue)
const BREVO_API_KEY = process.env.BREVO_API_KEY;
const BREVO_API_URL = "https://api.brevo.com/v3/smtp/email";
const FROM_EMAIL = process.env.FROM_EMAIL || "status@pyrax.org";
const FROM_NAME = process.env.FROM_NAME || "PYRAX Status";

// Email templates
const templates: Record<string, (data: Record<string, unknown>) => { subject: string; html: string }> = {
  incident_created: (data) => ({
    subject: `🚨 [PYRAX Status] ${data.serviceName}: ${data.title}`,
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <div style="background: linear-gradient(135deg, #F68724, #EC7B23); padding: 20px; text-align: center;">
          <h1 style="color: white; margin: 0;">PYRAX Status Alert</h1>
        </div>
        <div style="padding: 30px; background: #1a1a1a; color: #fff;">
          <div style="background: #dc2626; color: white; padding: 10px 15px; border-radius: 8px; margin-bottom: 20px;">
            <strong>⚠️ ${data.severity} Incident</strong>
          </div>
          <h2 style="color: #F68724; margin-top: 0;">${data.title}</h2>
          <p style="color: #ccc;">${data.description}</p>
          <p style="color: #888; font-size: 14px;">
            <strong>Service:</strong> ${data.serviceName}<br>
            <strong>Started:</strong> ${data.impactStart}<br>
            <strong>Status:</strong> Investigating
          </p>
          <a href="https://status.pyrax.org" style="display: inline-block; background: #F68724; color: #000; padding: 12px 24px; text-decoration: none; border-radius: 8px; font-weight: bold; margin-top: 20px;">
            View Status Page
          </a>
        </div>
        <div style="padding: 15px; background: #111; color: #666; text-align: center; font-size: 12px;">
          <a href="${data.unsubscribeUrl}" style="color: #888;">Unsubscribe</a> | 
          <a href="https://pyrax.org" style="color: #888;">pyrax.org</a>
        </div>
      </div>
    `,
  }),

  incident_updated: (data) => ({
    subject: `📝 [PYRAX Status] Update: ${data.title}`,
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <div style="background: linear-gradient(135deg, #F68724, #EC7B23); padding: 20px; text-align: center;">
          <h1 style="color: white; margin: 0;">PYRAX Status Update</h1>
        </div>
        <div style="padding: 30px; background: #1a1a1a; color: #fff;">
          <h2 style="color: #F68724; margin-top: 0;">${data.title}</h2>
          <div style="background: #333; padding: 15px; border-radius: 8px; border-left: 4px solid #F68724;">
            <p style="color: #fff; margin: 0;"><strong>${data.updateStatus}:</strong> ${data.updateMessage}</p>
            <p style="color: #888; font-size: 12px; margin: 10px 0 0 0;">${data.updateTime}</p>
          </div>
          <a href="https://status.pyrax.org" style="display: inline-block; background: #F68724; color: #000; padding: 12px 24px; text-decoration: none; border-radius: 8px; font-weight: bold; margin-top: 20px;">
            View Full Timeline
          </a>
        </div>
        <div style="padding: 15px; background: #111; color: #666; text-align: center; font-size: 12px;">
          <a href="${data.unsubscribeUrl}" style="color: #888;">Unsubscribe</a>
        </div>
      </div>
    `,
  }),

  incident_resolved: (data) => ({
    subject: `✅ [PYRAX Status] Resolved: ${data.title}`,
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <div style="background: linear-gradient(135deg, #22c55e, #16a34a); padding: 20px; text-align: center;">
          <h1 style="color: white; margin: 0;">Incident Resolved</h1>
        </div>
        <div style="padding: 30px; background: #1a1a1a; color: #fff;">
          <div style="background: #22c55e20; color: #22c55e; padding: 10px 15px; border-radius: 8px; margin-bottom: 20px;">
            <strong>✅ All Systems Operational</strong>
          </div>
          <h2 style="color: #22c55e; margin-top: 0;">${data.title}</h2>
          <p style="color: #ccc;">${data.serviceName} is now operating normally.</p>
          <p style="color: #888; font-size: 14px;">
            <strong>Duration:</strong> ${data.duration}<br>
            <strong>Resolved:</strong> ${data.resolvedAt}
          </p>
          <a href="https://status.pyrax.org" style="display: inline-block; background: #22c55e; color: #000; padding: 12px 24px; text-decoration: none; border-radius: 8px; font-weight: bold; margin-top: 20px;">
            View Status Page
          </a>
        </div>
        <div style="padding: 15px; background: #111; color: #666; text-align: center; font-size: 12px;">
          <a href="${data.unsubscribeUrl}" style="color: #888;">Unsubscribe</a>
        </div>
      </div>
    `,
  }),

  subscription_verify: (data) => ({
    subject: "Verify your PYRAX Status subscription",
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <div style="background: linear-gradient(135deg, #F68724, #EC7B23); padding: 20px; text-align: center;">
          <h1 style="color: white; margin: 0;">PYRAX Status</h1>
        </div>
        <div style="padding: 30px; background: #1a1a1a; color: #fff;">
          <h2 style="color: #F68724;">Verify Your Email</h2>
          <p style="color: #ccc;">Click the button below to confirm your subscription to PYRAX status updates.</p>
          <a href="${data.verifyUrl}" style="display: inline-block; background: #F68724; color: #000; padding: 12px 24px; text-decoration: none; border-radius: 8px; font-weight: bold; margin: 20px 0;">
            Verify Email
          </a>
          <p style="color: #666; font-size: 12px;">If you didn't subscribe, you can ignore this email.</p>
        </div>
      </div>
    `,
  }),

  subscription_welcome: (data) => ({
    subject: "Welcome to PYRAX Status Updates",
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <div style="background: linear-gradient(135deg, #F68724, #EC7B23); padding: 20px; text-align: center;">
          <h1 style="color: white; margin: 0;">Welcome!</h1>
        </div>
        <div style="padding: 30px; background: #1a1a1a; color: #fff;">
          <h2 style="color: #F68724;">You're Subscribed</h2>
          <p style="color: #ccc;">You'll now receive notifications about PYRAX system status changes, including:</p>
          <ul style="color: #ccc;">
            <li>Service outages and degradations</li>
            <li>Incident updates and resolutions</li>
            <li>Scheduled maintenance windows</li>
          </ul>
          <a href="https://status.pyrax.org" style="display: inline-block; background: #F68724; color: #000; padding: 12px 24px; text-decoration: none; border-radius: 8px; font-weight: bold; margin-top: 20px;">
            View Current Status
          </a>
        </div>
        <div style="padding: 15px; background: #111; color: #666; text-align: center; font-size: 12px;">
          <a href="${data.unsubscribeUrl}" style="color: #888;">Unsubscribe</a>
        </div>
      </div>
    `,
  }),
};

async function sendEmail(to: string, subject: string, html: string): Promise<boolean> {
  if (!BREVO_API_KEY) {
    console.log(`[EMAIL-WORKER] Brevo not configured. Would send to ${to}: ${subject}`);
    return true; // Return success in dev mode
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
          name: FROM_NAME,
          email: FROM_EMAIL,
        },
        to: [
          {
            email: to,
            name: to.split("@")[0],
          },
        ],
        subject,
        htmlContent: html,
      }),
    });

    if (!response.ok) {
      const error = await response.text();
      throw new Error(`Brevo error: ${error}`);
    }

    return true;
  } catch (error) {
    console.error("[EMAIL-WORKER] Failed to send email:", error);
    throw error;
  }
}

async function processEmailJob(job: Job<EmailNotificationJob>): Promise<void> {
  const { to, subject: customSubject, template, data } = job.data;

  const templateFn = templates[template];
  if (!templateFn) {
    throw new Error(`Unknown email template: ${template}`);
  }

  const { subject, html } = templateFn(data);
  await sendEmail(to, customSubject || subject, html);

  console.log(`[EMAIL-WORKER] Sent ${template} email to ${to}`);
}

export function createEmailWorker(): Worker {
  const worker = new Worker(QUEUE_NAMES.EMAIL_NOTIFICATION, processEmailJob, {
    connection: getRedisConnection(),
    concurrency: 10,
  });

  worker.on("completed", (job) => {
    console.log(`[EMAIL-WORKER] Job ${job.id} completed`);
  });

  worker.on("failed", (job, err) => {
    console.error(`[EMAIL-WORKER] Job ${job?.id} failed:`, err.message);
  });

  return worker;
}

if (require.main === module) {
  console.log("[EMAIL-WORKER] Starting...");
  const worker = createEmailWorker();

  process.on("SIGTERM", async () => {
    console.log("[EMAIL-WORKER] Shutting down...");
    await worker.close();
    process.exit(0);
  });
}
