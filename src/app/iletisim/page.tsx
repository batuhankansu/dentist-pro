import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { buttonVariants } from "@/components/ui/button";
import Link from "next/link";
import { Phone, Mail, MapPin, Clock, MessageCircle } from "lucide-react";

const contactInfo = [
  {
    icon: Phone,
    title: "Telefon",
    details: ["0500 123 45 67", "0500 987 65 43"],
    action: "tel:+905001234567",
  },
  {
    icon: Mail,
    title: "E-posta",
    details: ["info@kansudis.com", "randevu@kansudis.com"],
    action: "mailto:info@kansudis.com",
  },
  {
    icon: MapPin,
    title: "Adres",
    details: ["Atatürk Cad. No: 123", "Kadıköy, İstanbul"],
    action: "https://maps.google.com",
  },
  {
    icon: Clock,
    title: "Çalışma Saatleri",
    details: ["Pzt-Cuma: 09:00 - 18:00", "Cumartesi: 09:00 - 14:00"],
    action: null,
  },
];

export default function IletisimPage() {
  return (
    <div className="flex flex-col">
      {/* Hero */}
      <section className="bg-gradient-to-br from-sky-50 via-white to-emerald-50 py-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4">
            İletişim
          </h1>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">
            Bize ulaşmak için aşağıdaki bilgileri kullanabilirsiniz.
          </p>
        </div>
      </section>

      {/* Contact Cards */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {contactInfo.map((item) => (
              <Card key={item.title} className="border-0 shadow-md">
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-sky-100 text-sky-600 shrink-0">
                      <item.icon className="h-6 w-6" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold text-lg text-slate-900">
                        {item.title}
                      </h3>
                      <div className="mt-2 space-y-1">
                        {item.details.map((detail) => (
                          <p key={detail} className="text-slate-600">
                            {item.action ? (
                              <a
                                href={item.action}
                                className="hover:text-sky-600 transition-colors"
                              >
                                {detail}
                              </a>
                            ) : (
                              detail
                            )}
                          </p>
                        ))}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Map Placeholder */}
          <div className="mt-12 max-w-4xl mx-auto">
            <Card className="border-0 shadow-md overflow-hidden">
              <div className="h-80 bg-slate-200 flex items-center justify-center">
                <div className="text-center text-slate-500">
                  <MapPin className="h-12 w-12 mx-auto mb-4" />
                  <p>Harita burada gösterilecek</p>
                  <p className="text-sm">Google Maps API entegrasyonu gerekli</p>
                </div>
              </div>
            </Card>
          </div>

          {/* CTA */}
          <div className="mt-12 text-center">
            <Card className="max-w-2xl mx-auto border-0 shadow-md bg-sky-50">
              <CardContent className="p-8">
                <h2 className="text-2xl font-bold text-slate-900 mb-4">
                  Hemen İletişime Geçin
                </h2>
                <p className="text-slate-600 mb-6">
                  Sorularınız için bizi arayın veya WhatsApp üzerinden yazın.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <a
                    href="tel:+905001234567"
                    className={buttonVariants({ className: "bg-sky-500 hover:bg-sky-600 text-white" })}
                  >
                    <Phone className="mr-2 h-4 w-4" />
                    Hemen Ara
                  </a>
                  <a
                    href="https://wa.me/905001234567"
                    target="_blank"
                    rel="noopener noreferrer"
                    className={buttonVariants({ variant: "outline" })}
                  >
                    <MessageCircle className="mr-2 h-4 w-4" />
                    WhatsApp
                  </a>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </div>
  );
}
