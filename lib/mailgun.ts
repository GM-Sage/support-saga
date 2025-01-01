import formData from "form-data";
import Mailgun from "mailgun.js";

const mailgun = new Mailgun(formData);
const client = mailgun.client({
  username: "api",
  key: process.env.MAILGUN_API_KEY || "",
});

/**
 * Send an email using Mailgun
 * @param {string} to - Recipient email address
 * @param {string} subject - Subject of the email
 * @param {string} text - Plain text version of the email content
 * @param {string} html - HTML version of the email content (optional)
 * @param {string} from - Sender email address (optional, defaults to MAILGUN_SENDER_EMAIL)
 * @returns {Promise<any>} - Response from Mailgun
 */
export async function sendEmail({
  to,
  subject,
  text,
  html,
  from = process.env.MAILGUN_SENDER_EMAIL || "no-reply@support-saga.com",
}: {
  to: string;
  subject: string;
  text: string;
  html?: string;
  from?: string;
}) {
  if (!to || !subject || !text) {
    throw new Error("Missing required parameters: 'to', 'subject', or 'text'.");
  }

  try {
    const response = await client.messages.create(process.env.MAILGUN_DOMAIN || "", {
      from,
      to,
      subject,
      text,
      html,
    });
    console.log("Email sent successfully:", response);
    return response;
  } catch (error) {
    console.error("Error sending email:", error);
    throw error;
  }
}
