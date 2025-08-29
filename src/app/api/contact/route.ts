import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
// import nodemailer from "nodemailer";
import sanitizeHtml from "sanitize-html";

function encodeHtml(str: string): string {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

export async function POST(req: NextRequest) {
  const { name, email, subject, message, turnstileToken } = await req.json();

  // --- 1. Basic Validation ---
  if (!name || !email || !subject || !message || !turnstileToken) {
    return NextResponse.json(
      { error: "All fields are required." },
      { status: 400 },
    );
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return NextResponse.json(
      { error: "Invalid email format." },
      { status: 400 },
    );
  }

  // --- 2. Cloudflare Turnstile Verification (with Dev Bypass) ---
  const isDev = process.env.NODE_ENV === "development";

  if (isDev && turnstileToken === "development_bypass_token") {
    console.log("Turnstile verification bypassed in development mode.");
    // Skip actual verification and proceed
  } else {
    // Original verification logic
    const secretKey = process.env.TURNSTILE_SECRET_KEY;
    if (!secretKey) {
      console.error("TURNSTILE_SECRET_KEY is not set.");
      return NextResponse.json(
        { error: "Server configuration error." },
        { status: 500 },
      );
    }

    try {
      const turnstileResponse = await fetch(
        "https://challenges.cloudflare.com/turnstile/v0/siteverify",
        {
          method: "POST",
          headers: { "Content-Type": "application/x-www-form-urlencoded" },
          body: `secret=${secretKey}&response=${turnstileToken}`,
        },
      );
      const turnstileData = await turnstileResponse.json();

      if (!turnstileData.success) {
        console.warn("Turnstile verification failed:", turnstileData);
        return NextResponse.json(
          { error: "CAPTCHA verification failed." },
          { status: 401 },
        );
      }
    } catch (error) {
      console.error("Error verifying Turnstile:", error);
      return NextResponse.json(
        { error: "Failed to verify CAPTCHA." },
        { status: 500 },
      );
    }
  }

  // --- 3. Sanitization (Crucial Step) ---
  const sanitizedName = sanitizeHtml(encodeHtml(name.trim()), {
    allowedTags: [],
    allowedAttributes: {},
  });
  const sanitizedEmail = sanitizeHtml(email.trim(), {
    allowedTags: [],
    allowedAttributes: {},
  });
  const sanitizedSubject = sanitizeHtml(encodeHtml(subject.trim()), {
    allowedTags: [],
    allowedAttributes: {},
  });
  const sanitizedMessage = sanitizeHtml(encodeHtml(message.trim()), {
    allowedTags: [],
    allowedAttributes: {},
  });

  if (
    sanitizedName.length > 100 ||
    sanitizedEmail.length > 100 ||
    sanitizedSubject.length > 200 ||
    sanitizedMessage.length > 2000
  ) {
    return NextResponse.json(
      { error: "Input exceeds maximum length." },
      { status: 400 },
    );
  }

  // --- 4. Send Notification (Discord Webhook or Email) ---
  const errors: string[] = [];

  // --- Discord Webhook ---
  const discordWebhookUrl = process.env.DISCORD_WEBHOOK_URL;

  if (discordWebhookUrl) {
    const webhookPayload = {
      username: "Website Contact Form",
      embeds: [
        {
          title: `New Contact: ${sanitizedSubject}`,
          description: sanitizedMessage,
          color: 7420950,
          fields: [
            {
              name: "From",
              value: sanitizedName,
              inline: true,
            },
            {
              name: "Email",
              value: sanitizedEmail,
              inline: true,
            },
          ],
          timestamp: new Date().toISOString(),
          footer: {
            text: "Contact Form Submission",
          },
        },
      ],
    };

    try {
      const discordResponse = await fetch(discordWebhookUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(webhookPayload),
      });

      if (!discordResponse.ok) {
        throw new Error(
          `Discord webhook failed: ${discordResponse.status} ${discordResponse.statusText}`,
        );
      }
      console.log("Discord webhook sent successfully.");
    } catch (webhookError) {
      errors.push("Failed to send Discord webhook.");
      console.error("Error sending Discord webhook:", webhookError);
    }
  } else {
    errors.push(
      "Discord webhook URL is not set. Skipping Discord notification.",
    );
    console.warn(
      "Discord webhook URL is not set. Skipping Discord notification.",
    );
  }

  /* Boomer zone
  const emailHost = process.env.EMAIL_HOST;
  const emailPort = process.env.EMAIL_PORT;
  const emailUser = process.env.EMAIL_USER;
  const emailPass = process.env.EMAIL_PASS;
  const targetEmail = process.env.TARGET_EMAIL;

  if (emailHost && emailPort && emailUser && emailPass && targetEmail) {
    const transporter = nodemailer.createTransport({
      host: emailHost,
      port: parseInt(emailPort as string, 10),
      secure: parseInt(emailPort as string, 10) === 465,
      auth: {
        user: emailUser,
        pass: emailPass,
      },
    });

    try {
      await transporter.sendMail({
        from: `"${sanitizedName}" <${emailUser}>`,
        replyTo: sanitizedEmail,
        to: targetEmail,
        subject: `New Contact: ${sanitizedSubject}`,
        html: `
          <p><strong>Name:</strong> ${sanitizedName}</p>
          <p><strong>Email:</strong> <a href="mailto:${sanitizedEmail}">${sanitizedEmail}</a></p>
          <p><strong>Subject:</strong> ${sanitizedSubject}</p>
          <p><strong>Message:</strong></p>
          <p style="white-space: pre-wrap; background-color: #f6f6f6; padding: 10px; border-radius: 5px;">${sanitizedMessage}</p>
        `,
        text: `Name: ${sanitizedName}\nEmail: ${sanitizedEmail}\nSubject: ${sanitizedSubject}\nMessage: ${sanitizedMessage}`,
      });
      console.log("Email sent successfully.");
    } catch (emailError) {
      errors.push("Failed to send email.");
      console.error("Error sending email:", emailError);
    }
  } else {
    errors.push("Email configuration missing.");
    console.warn("Email configuration is incomplete. Skipping email notification.");
  }
*/
  if (errors.length > 0) {
    return NextResponse.json(
      { error: "Some notifications failed to send.", details: errors },
      { status: 500 },
    );
  }

  return NextResponse.json(
    { message: "Form submitted successfully!" },
    { status: 200 },
  );
}
