import twilio from "twilio";

const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const twilioPhone = process.env.TWILIO_PHONE_NUMBER;

if (!accountSid || !authToken || !twilioPhone) {
  console.warn("Twilio credentials not configured");
}

const client = accountSid && authToken ? twilio(accountSid, authToken) : null;

export async function sendSMS(to: string, message: string) {
  if (!client || !twilioPhone) {
    console.warn("Twilio not configured, skipping SMS");
    return { success: false, error: "Twilio not configured" };
  }

  try {
    const result = await client.messages.create({
      body: message,
      from: twilioPhone,
      to,
    });
    return { success: true, sid: result.sid };
  } catch (error) {
    console.error("SMS send error:", error);
    return { success: false, error: "Failed to send SMS" };
  }
}

export function formatAppointmentSMS(
  doctorName: string,
  date: string,
  time: string,
  type: "confirmation" | "reminder" | "cancellation"
): string {
  const messages = {
    confirmation: `Kansu Diş Kliniği: Randevunuz onaylandı! Doktor: ${doctorName}, Tarih: ${date}, Saat: ${time}. iptal etmek için lütfen bizimle iletişime geçin.`,
    reminder: `Kansu Diş Kliniği Hatırlatma: Yarın ${date} saat ${time}'de ${doctorName} ile randevunuz var. Lütfen zamanında olun.`,
    cancellation: `Kansu Diş Kliniği: Randevunuz iptal edildi. Doktor: ${doctorName}, Tarih: ${date}, Saat: ${time}.`,
  };
  return messages[type];
}
