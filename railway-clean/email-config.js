// E:\Document\SmartFarm\railway-clean\email-config.js
const nodemailer = require("nodemailer");

class EmailService {
  constructor() {
    this.enabled = !!(process.env.EMAIL_USER && process.env.EMAIL_PASS);

    if (!this.enabled) {
      console.warn("⚠️ Email service not configured - set EMAIL_USER and EMAIL_PASS to enable email.");
      this.transporter = null;
      return;
    }

    // Use the correct Nodemailer API: createTransport (NOT createTransporter)
    this.transporter = nodemailer.createTransport({
      // Example Gmail setup; swap to your SMTP if needed
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });
  }

  async send({ to, subject, text, html }) {
    if (!this.enabled) return { skipped: true };

    const info = await this.transporter.sendMail({
      from: process.env.EMAIL_FROM || process.env.EMAIL_USER,
      to,
      subject,
      text,
      html,
    });

    return info;
  }
}

module.exports = new EmailService();
