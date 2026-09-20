import { NextResponse } from "next/server";
import { Resend } from "resend";

export async function GET() {
  const apiKey = process.env.RESEND_API_KEY;

  if (!apiKey || apiKey === "re_xxxxxxxxx") {
    return NextResponse.json(
      {
        error: "RESEND_API_KEY is not set yet in .env.local. Please replace 're_xxxxxxxxx' with your actual Resend API key.",
      },
      { status: 400 }
    );
  }

  const resend = new Resend(apiKey);

  try {
    const { data, error } = await resend.emails.send({
      from: process.env.RESEND_FROM_EMAIL || "onboarding@resend.dev",
      to: "saneeedotin@gmail.com",
      subject: "Hello World · Studio Memento Resend Test",
      html: "<p>Congrats on sending your <strong>first email</strong> from Studio Memento!</p>",
    });

    if (error) {
      return NextResponse.json({ success: false, error }, { status: 500 });
    }

    return NextResponse.json({
      success: true,
      message: "Test email successfully sent to saneeedotin@gmail.com!",
      data,
    });
  } catch (err: any) {
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}
