import { Resend } from "resend";
import { NextResponse } from "next/server";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: Request) {
  const { email } = await req.json();

  if (!email) {
    return NextResponse.json({ error: "Email is required" }, { status: 400 });
  }

  await resend.emails.send({
    from: "waitlist@yourdomain.com",
    to: "your@email.com", // your email to receive notifications
    subject: "New Waitlist Signup",
    html: `<p>${email} just joined the waitlist.</p>`,
  });

  return NextResponse.json({ success: true });
}