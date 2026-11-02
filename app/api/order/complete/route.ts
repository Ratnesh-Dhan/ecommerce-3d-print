import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

export async function POST(request: Request) {
  try {
    const { email, paymentId, amount } = await request.json();

    const host = process.env.SMTP_HOST || "smtp.gmail.com";
    const port = Number(process.env.SMTP_PORT || 587);
    const user = process.env.SMTP_USER;
    const pass = process.env.SMTP_PASS;
    const adminEmail = process.env.CONTACT_EMAIL || "threeditron.1005@gmail.com";

    let emailStatus = "Not Sent (SMTP config missing)";
    if (user && pass && user !== "your_gmail_app_password") {
      const transporter = nodemailer.createTransport({
        host,
        port,
        secure: port === 465,
        auth: { user, pass },
      });

      const clientMailOptions = {
        from: `"THREEDITRON Support" <${user}>`,
        to: email,
        subject: "Order Confirmation – THREEDITRON 🎉",
        html: `
          <div style="font-family:Arial,sans-serif;max-width:600px;margin:auto;color:#111;border:1px solid #eab308;border-radius:12px;overflow:hidden;">
            <div style="background:#000;padding:20px;text-align:center;border-bottom:2px solid #eab308;">
              <h1 style="color:#eab308;margin:0;font-size:24px;letter-spacing:1px;">THREEDITRON</h1>
              <p style="color:#888;margin:5px 0 0;font-size:12px;">Your 3D Print Order is Confirmed</p>
            </div>
            <div style="padding:24px;background:#fafafa;">
              <h2 style="margin-top:0;color:#111;">Hello,</h2>
              <p style="line-height:1.6;color:#444;">Thank you for your purchase! Below are your order details.</p>
              <div style="background:#fff;border:1px solid #e2e8f0;padding:16px;border-radius:8px;margin:20px 0;">
                <h3 style="margin-top:0;color:#eab308;border-bottom:1px solid #f1f5f9;padding-bottom:8px;">Order Summary</h3>
                <table style="width:100%;font-size:13px;line-height:1.8;">
                  <tr><td style="color:#666;font-weight:bold;">Payment ID:</td><td>${paymentId}</td></tr>
                  <tr><td style="color:#666;font-weight:bold;">Amount Paid:</td><td>₹${amount}</td></tr>
                </table>
              </div>
              <p style="font-size:11px;color:#888;line-height:1.4;">If you have any questions, feel free to reply to this email.</p>
            </div>
            <div style="background:#000;color:#fff;padding:15px;text-align:center;font-size:11px;">
              <p style="margin:0;">© 2026 THREEDITRON. Sidhgora, Jamshedpur, JH, India.</p>
              <p style="margin:5px 0 0;color:#eab308;">Phone: +91 7209827299 | Email: threeditron.1005@gmail.com</p>
            </div>
          </div>
        `,
      };

      await transporter.sendMail(clientMailOptions);
      emailStatus = "Email Sent Successfully";
    } else {
      console.warn("SMTP credentials missing; email not sent.");
    }

    return NextResponse.json({ success: true, emailStatus });
  } catch (error) {
    console.error("Order completion email error:", error);
    return NextResponse.json({ success: false, error: "Failed to send order confirmation email" }, { status: 500 });
  }
}
