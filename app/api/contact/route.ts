import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

export async function POST(request: Request) {
  try {
    const { name, phone, email, message } = await request.json();

    if (!name || !phone || !email || !message) {
      return NextResponse.json(
        { error: "All fields are required" },
        { status: 400 }
      );
    }

    // Phone number validation (strips +91, 0, spaces, and validates 10 digits starting with 6-9)
    const strippedPhone = phone.replace(/[\s\-\+\(\)]/g, "").replace(/^91/, "").replace(/^0/, "");
    const phoneRegex = /^[6-9]\d{9}$/;
    if (!phoneRegex.test(strippedPhone)) {
      return NextResponse.json(
        { error: "Please enter a valid 10-digit mobile number (starts with 6-9)." },
        { status: 400 }
      );
    }

    // Email validation
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: "Please enter a valid email address." },
        { status: 400 }
      );
    }

    // SMTP Configuration from environment variables
    const smtpHost = process.env.SMTP_HOST;
    const smtpPort = process.env.SMTP_PORT;
    const smtpUser = process.env.SMTP_USER;
    const smtpPass = process.env.SMTP_PASSWORD;
    const toEmail = process.env.CONTACT_EMAIL || "lakshyahospitalsocial@gmail.com";

    // Resilient fallback if SMTP is not configured yet
    if (!smtpHost || !smtpUser || !smtpPass) {
      console.warn(
        "⚠️ SMTP environment variables (SMTP_HOST, SMTP_USER, SMTP_PASSWORD) are not set. Form submitted successfully in sandbox mode:",
        { name, phone, email, message }
      );
      
      return NextResponse.json({
        success: true,
        message: "Message received (Sandbox mode - SMTP not configured).",
      });
    }

    const transporter = nodemailer.createTransport({
      host: smtpHost,
      port: parseInt(smtpPort || "587"),
      secure: smtpPort === "465", // true for 465, false for other ports
      auth: {
        user: smtpUser,
        pass: smtpPass,
      },
    });

    const mailOptions = {
      from: `"${name} (Lakshya Hospital Inquiry)" <${smtpUser}>`,
      to: toEmail,
      replyTo: email,
      subject: `New Contact Form Inquiry from ${name}`,
      html: `
        <div style="background-color: #f3f4f6; padding: 32px 16px; font-family: 'DM Sans', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; min-height: 100%;">
          <div style="max-width: 600px; margin: 0 auto; background-color: #ffffff; background: #ffffff; border-radius: 20px; overflow: hidden; box-shadow: 0 4px 6px -1px rgba(0,0,0,0.05); border: 1px solid #e5e7eb;">
            
            <!-- BRAND HEADER -->
            <div style="background: linear-gradient(135deg, #0b132b 0%, #1e1b4b 100%); padding: 32px 24px; text-align: center; border-bottom: 4px solid #06b6d4;">
              <h1 style="color: #ffffff; margin: 0; font-size: 22px; font-weight: 800; letter-spacing: 0.5px;">LAKSHYA HOSPITAL</h1>
              <p style="color: #22d3ee; margin: 6px 0 0 0; font-size: 11px; font-weight: 700; letter-spacing: 1.5px; text-transform: uppercase;">New Patient Inquiry Received</p>
            </div>

            <!-- EMAIL BODY -->
            <div style="padding: 32px 24px;">
              <p style="margin: 0 0 20px 0; font-size: 15px; color: #374151; line-height: 1.6;">
                Hello Team,
              </p>
              <p style="margin: 0 0 24px 0; font-size: 14px; color: #4b5563; line-height: 1.6;">
                A new contact form inquiry has been submitted by a visitor on the Lakshya Hospital website. Below are the submission details:
              </p>

              <!-- DETAILS GRID TABLE -->
              <table style="width: 100%; border-collapse: collapse; margin-bottom: 28px; font-size: 14px;">
                <tbody>
                  <tr style="border-bottom: 1px solid #f3f4f6;">
                    <td style="padding: 12px 8px; font-weight: 700; color: #1f2937; width: 140px;">Patient Name</td>
                    <td style="padding: 12px 8px; color: #4b5563;">${name}</td>
                  </tr>
                  <tr style="border-bottom: 1px solid #f3f4f6;">
                    <td style="padding: 12px 8px; font-weight: 700; color: #1f2937;">Phone Number</td>
                    <td style="padding: 12px 8px; color: #2563eb; font-weight: 600;">
                      <a href="tel:${phone}" style="color: #2563eb; text-decoration: none;">${phone}</a>
                    </td>
                  </tr>
                  <tr style="border-bottom: 1px solid #f3f4f6;">
                    <td style="padding: 12px 8px; font-weight: 700; color: #1f2937;">Email Address</td>
                    <td style="padding: 12px 8px; color: #2563eb;">
                      <a href="mailto:${email}" style="color: #2563eb; text-decoration: none;">${email}</a>
                    </td>
                  </tr>
                </tbody>
              </table>

              <!-- INQUIRY MESSAGE CARD -->
              <div style="background-color: #f9fafb; border-left: 4px solid #2563eb; border-radius: 8px; padding: 20px; margin-bottom: 24px; box-shadow: inset 0 1px 2px rgba(0,0,0,0.02);">
                <h4 style="margin: 0 0 8px 0; color: #1f2937; font-size: 11px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px;">Message / Inquiry</h4>
                <p style="margin: 0; color: #4b5563; font-size: 14px; line-height: 1.6; white-space: pre-wrap; font-style: italic;">
                  "${message}"
                </p>
              </div>

              <!-- CALL TO ACTION ACTION PANEL -->
              <div style="text-align: center; margin-top: 32px; padding-top: 24px; border-top: 1px solid #f3f4f6;">
                <a href="tel:${phone}" style="background-color: #2563eb; color: #ffffff; padding: 12px 24px; border-radius: 10px; font-size: 14px; font-weight: 700; text-decoration: none; display: inline-block;">
                  Call Patient Now
                </a>
              </div>
            </div>

            <!-- FOOTER PANEL -->
            <div style="background-color: #f9fafb; padding: 24px; border-top: 1px solid #e5e7eb; text-align: center;">
              <p style="margin: 0; font-size: 12px; color: #9ca3af; font-weight: 600;">LAKSHYA HOSPITAL KANPUR</p>
              <p style="margin: 4px 0 0 0; font-size: 11px; color: #9ca3af; line-height: 1.5;">
                Kidwai Nagar, Kanpur, Uttar Pradesh, India<br/>
                24/7 Helpline: +91 93356 05848 | <a href="mailto:lakshyahospitalsocial@gmail.com" style="color: #6b7280; text-decoration: underline;">lakshyahospitalsocial@gmail.com</a>
              </p>
            </div>

          </div>
        </div>
      `,
    };

    await transporter.sendMail(mailOptions);

    return NextResponse.json({ success: true, message: "Email sent successfully!" });
  } catch (error: any) {
    console.error("Error sending email:", error);
    return NextResponse.json(
      { error: "Failed to send message: " + error.message },
      { status: 500 }
    );
  }
}
