"use client";

import { useState } from "react";
import { Save, Key, MessageSquare, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";

export default function AdminAyarlarPage() {
  const [twilioConfig, setTwilioConfig] = useState({
    accountSid: "",
    authToken: "",
    phoneNumber: "",
  });

  const [resendConfig, setResendConfig] = useState({
    apiKey: "",
    fromEmail: "noreply@kansudis.com",
  });

  const [clinicInfo, setClinicInfo] = useState({
    name: "Kansu Diş Kliniği",
    phone: "0500 123 45 67",
    email: "info@kansudis.com",
    address: "Atatürk Cad. No: 123, Kadıköy, İstanbul",
    workingHours: "Pzt-Cuma: 09:00 - 18:00, Cmt: 09:00 - 14:00",
  });

  const saveTwilio = () => {
    toast.success("Twilio ayarları kaydedildi");
  };

  const saveResend = () => {
    toast.success("Email ayarları kaydedildi");
  };

  const saveClinicInfo = () => {
    toast.success("Klinik bilgileri kaydedildi");
  };

  const testSMS = () => {
    toast.success("Test SMS gönderildi (Demo)");
  };

  const testEmail = () => {
    toast.success("Test email gönderildi (Demo)");
  };

  return (
    <div className="p-6 space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-900">Ayarlar</h1>
        <p className="text-slate-600">Sistem ve iletişim ayarlarını yönetin</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Clinic Info */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Key className="h-5 w-5" />
              Klinik Bilgileri
            </CardTitle>
            <CardDescription>Temel klinik iletişim bilgileri</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label>Klinik Adı</Label>
              <Input
                value={clinicInfo.name}
                onChange={(e) =>
                  setClinicInfo({ ...clinicInfo, name: e.target.value })
                }
              />
            </div>
            <div className="space-y-2">
              <Label>Telefon</Label>
              <Input
                value={clinicInfo.phone}
                onChange={(e) =>
                  setClinicInfo({ ...clinicInfo, phone: e.target.value })
                }
              />
            </div>
            <div className="space-y-2">
              <Label>E-posta</Label>
              <Input
                value={clinicInfo.email}
                onChange={(e) =>
                  setClinicInfo({ ...clinicInfo, email: e.target.value })
                }
              />
            </div>
            <div className="space-y-2">
              <Label>Adres</Label>
              <Input
                value={clinicInfo.address}
                onChange={(e) =>
                  setClinicInfo({ ...clinicInfo, address: e.target.value })
                }
              />
            </div>
            <div className="space-y-2">
              <Label>Çalışma Saatleri</Label>
              <Input
                value={clinicInfo.workingHours}
                onChange={(e) =>
                  setClinicInfo({ ...clinicInfo, workingHours: e.target.value })
                }
              />
            </div>
            <Button onClick={saveClinicInfo} className="bg-sky-500 hover:bg-sky-600">
              <Save className="mr-2 h-4 w-4" />
              Kaydet
            </Button>
          </CardContent>
        </Card>

        {/* Twilio Config */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <MessageSquare className="h-5 w-5" />
              SMS Ayarları (Twilio)
            </CardTitle>
            <CardDescription>SMS gönderimi için Twilio ayarları</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label>Account SID</Label>
              <Input
                type="password"
                placeholder="ACxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx"
                value={twilioConfig.accountSid}
                onChange={(e) =>
                  setTwilioConfig({ ...twilioConfig, accountSid: e.target.value })
                }
              />
            </div>
            <div className="space-y-2">
              <Label>Auth Token</Label>
              <Input
                type="password"
                placeholder="Auth token"
                value={twilioConfig.authToken}
                onChange={(e) =>
                  setTwilioConfig({ ...twilioConfig, authToken: e.target.value })
                }
              />
            </div>
            <div className="space-y-2">
              <Label>Telefon Numarası</Label>
              <Input
                placeholder="+1234567890"
                value={twilioConfig.phoneNumber}
                onChange={(e) =>
                  setTwilioConfig({
                    ...twilioConfig,
                    phoneNumber: e.target.value,
                  })
                }
              />
            </div>
            <div className="flex gap-2">
              <Button onClick={saveTwilio} className="bg-sky-500 hover:bg-sky-600">
                <Save className="mr-2 h-4 w-4" />
                Kaydet
              </Button>
              <Button variant="outline" onClick={testSMS}>
                Test Gönder
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Resend Config */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Mail className="h-5 w-5" />
              Email Ayarları (Resend)
            </CardTitle>
            <CardDescription>Email gönderimi için Resend ayarları</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label>API Key</Label>
              <Input
                type="password"
                placeholder="re_xxxxxxxxxxxxxxxxxxxx"
                value={resendConfig.apiKey}
                onChange={(e) =>
                  setResendConfig({ ...resendConfig, apiKey: e.target.value })
                }
              />
            </div>
            <div className="space-y-2">
              <Label>Gönderen E-posta</Label>
              <Input
                type="email"
                placeholder="noreply@kansudis.com"
                value={resendConfig.fromEmail}
                onChange={(e) =>
                  setResendConfig({ ...resendConfig, fromEmail: e.target.value })
                }
              />
            </div>
            <div className="flex gap-2">
              <Button onClick={saveResend} className="bg-sky-500 hover:bg-sky-600">
                <Save className="mr-2 h-4 w-4" />
                Kaydet
              </Button>
              <Button variant="outline" onClick={testEmail}>
                Test Gönder
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Reminder Settings */}
        <Card>
          <CardHeader>
            <CardTitle>Hatırlatma Ayarları</CardTitle>
            <CardDescription>Otomatik hatırlatma ayarları</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label>SMS Hatırlatma (Saat)</Label>
              <Input
                type="number"
                placeholder="24"
                defaultValue={24}
              />
              <p className="text-sm text-slate-500">
                Randevudan kaç saat önce SMS gönderilsin
              </p>
            </div>
            <div className="space-y-2">
              <Label>Email Hatırlatma (Saat)</Label>
              <Input
                type="number"
                placeholder="48"
                defaultValue={48}
              />
              <p className="text-sm text-slate-500">
                Randevudan kaç saat önce email gönderilsin
              </p>
            </div>
            <Button className="bg-sky-500 hover:bg-sky-600">
              <Save className="mr-2 h-4 w-4" />
              Kaydet
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
