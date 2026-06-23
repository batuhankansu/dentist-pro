import { Resend } from "resend";

const resendApiKey = process.env.RESEND_API_KEY;

if (!resendApiKey) {
  console.warn("Resend API key not configured");
}

const resend = resendApiKey ? new Resend(resendApiKey) : null;

export async function sendEmail({
  to,
  subject,
  html,
}: {
  to: string;
  subject: string;
  html: string;
}) {
  if (!resend) {
    console.warn("Resend not configured, skipping email");
    return { success: false, error: "Resend not configured" };
  }

  try {
    const result = await resend.emails.send({
      from: "Kansu Diş Kliniği <noreply@kansudis.com>",
      to,
      subject,
      html,
    });
    return { success: true, id: result.data?.id };
  } catch (error) {
    console.error("Email send error:", error);
    return { success: false, error: "Failed to send email" };
  }
}

export function formatAppointmentEmail(
  doctorName: string,
  date: string,
  time: string,
  patientName: string,
  type: "confirmation" | "reminder" | "cancellation"
): { subject: string; html: string } {
  const subjects = {
    confirmation: "Randevu Onayı - Kansu Diş Kliniği",
    reminder: "Randevu Hatırlatması - Kansu Diş Kliniği",
    cancellation: "Randevu İptali - Kansu Diş Kliniği",
  };

  const htmlContents = {
    confirmation: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #0EA5E9;">Randevu Onaylandı</h2>
        <p>Sayın ${patientName},</p>
        <p>Randevunuz başarıyla oluşturuldu ve onaylandı.</p>
        <div style="background: #F1F5F9; padding: 20px; border-radius: 8px; margin: 20px 0;">
          <p><strong>Doktor:</strong> ${doctorName}</p>
          <p><strong>Tarih:</strong> ${date}</p>
          <p><strong>Saat:</strong> ${time}</p>
        </div>
        <p>Randevunuza 24 saat kala SMS ile hatırlatma alacaksınız.</p>
        <p>Herhangi bir değişiklik için lütfen bizimle iletişime geçin.</p>
        <hr style="border: none; border-top: 1px solid #eee; margin: 20px 0;">
        <p style="color: #666; font-size: 12px;">Kansu Diş Kliniği | Bu otomatik bir e-postadır.</p>
      </div>
    `,
    reminder: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #0EA5E9;">Randevu Hatırlatması</h2>
        <p>Sayın ${patientName},</p>
        <p>Bu bir hatırlatma e-postasıdır. Yarın randevunuz bulunmaktadır.</p>
        <div style="background: #F1F5F9; padding: 20px; border-radius: 8px; margin: 20px 0;">
          <p><strong>Doktor:</strong> ${doctorName}</p>
          <p><strong>Tarih:</strong> ${date}</p>
          <p><strong>Saat:</strong> ${time}</p>
        </div>
        <p>Lütfen randevunuza zamanında gelin.</p>
        <hr style="border: none; border-top: 1px solid #eee; margin: 20px 0;">
        <p style="color: #666; font-size: 12px;">Kansu Diş Kliniği | Bu otomatik bir e-postadır.</p>
      </div>
    `,
    cancellation: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #EF4444;">Randevu İptal Edildi</h2>
        <p>Sayın ${patientName},</p>
        <p>Aşağıdaki randevunuz iptal edilmiştir:</p>
        <div style="background: #FEF2F2; padding: 20px; border-radius: 8px; margin: 20px 0;">
          <p><strong>Doktor:</strong> ${doctorName}</p>
          <p><strong>Tarih:</strong> ${date}</p>
          <p><strong>Saat:</strong> ${time}</p>
        </div>
        <p>Yeni bir randevu almak için lütfen web sitemizi ziyaret edin.</p>
        <hr style="border: none; border-top: 1px solid #eee; margin: 20px 0;">
        <p style="color: #666; font-size: 12px;">Kansu Diş Kliniği | Bu otomatik bir e-postadır.</p>
      </div>
    `,
  };

  return {
    subject: subjects[type],
    html: htmlContents[type],
  };
}
