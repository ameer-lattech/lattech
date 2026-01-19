export const runtime = "nodejs";

import { NextResponse } from "next/server";
import nodemailer from "nodemailer";
import { z } from "zod";
import { cleanDigits, cleanEmail, cleanText } from "@/app/libs/sanitiser";

const Schema = z.object({
  firstName: z.string().min(1, "Required"),
  businessName: z.string().min(1, "Required"),
  email: z.string().email("Invalid email"),
  service: z.string().min(1, "Required"),
  country: z.string().min(2, "Required").max(4, "Invalid"),
  dial: z.string().min(1, "Required").max(8, "Invalid"),
  phone: z.string().min(7, "Too short"),
  message: z.string().min(10, "Too short"),
  agree: z.literal(true),
});

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const cleaned = {
      firstName: cleanText(body.firstName, 40),
      businessName: cleanText(body.businessName, 60),
      email: cleanEmail(body.email, 120),
      service: cleanText(body.service, 80),
      country: cleanText(body.country, 4),
      dial: cleanText(body.dial, 8),
      phone: cleanDigits(body.phone, 15),
      message: cleanText(body.message, 800),

      // ✅ FIX: accept boolean true OR "true"
      agree: body.agree === true || body.agree === "true",
    };

    const parsed = Schema.safeParse(cleaned);

    if (!parsed.success) {
      return NextResponse.json(
        {
          ok: false,
          message: "Invalid input.",
          issues: parsed.error.issues.map((i) => ({
            path: i.path.join("."),
            message: i.message,
          })),
          // helpful in dev; harmless in prod
          cleaned,
        },
        { status: 400 }
      );
    }

    const data = parsed.data;
    const phoneE164 = `${data.dial}${data.phone}`;

    // ✅ ENV checks (better errors instead of silent fail)
    const SMTP_HOST = process.env.SMTP_HOST;
    const SMTP_PORT = process.env.SMTP_PORT || "587";
    const SMTP_USER = process.env.SMTP_USER;
    const SMTP_PASS = process.env.SMTP_PASS;
    const OWNER_EMAIL = process.env.OWNER_EMAIL;
    const FROM_EMAIL = process.env.FROM_EMAIL || SMTP_USER;

    if (!SMTP_HOST || !SMTP_USER || !SMTP_PASS || !OWNER_EMAIL || !FROM_EMAIL) {
      return NextResponse.json(
        { ok: false, message: "Email server is not configured." },
        { status: 500 }
      );
    }

    const transporter = nodemailer.createTransport({
      host: SMTP_HOST,
      port: Number(SMTP_PORT),
      secure: process.env.SMTP_SECURE === "true",
      auth: { user: SMTP_USER, pass: SMTP_PASS },
    });

    await transporter.sendMail({
      from: `"Website Contact" <${FROM_EMAIL}>`,
      to: OWNER_EMAIL,
      replyTo: data.email,
      subject: `New Contact Form – ${data.firstName}`,
      text: `Name: ${data.firstName}
Business: ${data.businessName}
Email: ${data.email}
Service: ${data.service}
Country: ${data.country}
Phone: ${phoneE164}

Message:
${data.message}
`,
    });

    await transporter.sendMail({
      from: `"Support Team" <${FROM_EMAIL}>`,
      to: data.email,
      subject: "We received your message",
      text: `Hi ${data.firstName},

Thanks for contacting us. Our team will respond to you shortly.

— Team`,
    });

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error(err);
    return NextResponse.json(
      { ok: false, message: "Server error" },
      { status: 500 }
    );
  }
}
