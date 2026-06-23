import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  const { to, message, type } = await request.json();

  // In production, use Twilio
  // import { sendSMS } from "@/lib/twilio";
  // const result = await sendSMS(to, message);

  console.log(`[SMS] To: ${to}, Type: ${type}, Message: ${message}`);

  return NextResponse.json({
    success: true,
    message: "SMS sent successfully (demo mode)",
  });
}
