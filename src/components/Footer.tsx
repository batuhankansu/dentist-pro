import Link from "next/link";
import { Phone, Mail, MapPin, Clock, Globe, MessageCircle, Share2 } from "lucide-react";
import { Logo } from "@/components/Logo";

export function Footer() {
  return (
    <footer className="bg-slate-900 text-white relative overflow-hidden">
      <div className="absolute top-0 left-0 w-96 h-96 bg-sky-500/5 rounded-full blur-3xl" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-emerald-500/5 rounded-full blur-3xl" />
      <div className="container mx-auto px-4 py-16 relative">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          {/* Brand */}
          <div className="space-y-6">
            <Logo className="h-12 w-auto text-white" />
            <p className="text-slate-400 text-sm leading-relaxed">
              Sağlıklı gülüşler için profesyonel diş hekimliği hizmetleri.
              Uzman kadromuz ve modern teknolojilerimizle hizmetinizdeyiz.
            </p>
            <div className="flex gap-4">
              <a
                href="#"
                className="flex h-10 w-10 items-center justify-center rounded-lg bg-white/10 hover:bg-sky-500 text-white transition-colors"
              >
                <Globe className="h-5 w-5" />
              </a>
              <a
                href="#"
                className="flex h-10 w-10 items-center justify-center rounded-lg bg-white/10 hover:bg-sky-500 text-white transition-colors"
              >
                <MessageCircle className="h-5 w-5" />
              </a>
              <a
                href="#"
                className="flex h-10 w-10 items-center justify-center rounded-lg bg-white/10 hover:bg-sky-500 text-white transition-colors"
              >
                <Share2 className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-semibold mb-6 text-lg">Hızlı Bağlantılar</h3>
            <ul className="space-y-3">
              {[
                { href: "/", label: "Ana Sayfa" },
                { href: "/hakkimizda", label: "Hakkımızda" },
                { href: "/doktorlar", label: "Doktorlarımız" },
                { href: "/randevu", label: "Randevu Al" },
                { href: "/iletisim", label: "İletişim" },
              ].map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-slate-400 hover:text-white text-sm transition-colors hover:translate-x-1 inline-block"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="font-semibold mb-6 text-lg">Hizmetlerimiz</h3>
            <ul className="space-y-3 text-slate-400 text-sm">
              {[
                "Diş Beyazlatma",
                "İmplant",
                "Dolgu",
                "Kanal Tedavisi",
                "Ortodonti",
                "Diş Çekimi",
              ].map((service) => (
                <li key={service} className="hover:text-white transition-colors cursor-pointer">
                  {service}
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-semibold mb-6 text-lg">İletişim</h3>
            <ul className="space-y-4">
              <li className="flex items-start gap-3 text-slate-400 text-sm">
                <Phone className="h-5 w-5 text-sky-500 shrink-0 mt-0.5" />
                <div>
                  <p className="text-white font-medium">0500 123 45 67</p>
                  <p>7/24 Ulaşılabilir</p>
                </div>
              </li>
              <li className="flex items-start gap-3 text-slate-400 text-sm">
                <Mail className="h-5 w-5 text-sky-500 shrink-0 mt-0.5" />
                <div>
                  <p className="text-white font-medium">info@kansudis.com</p>
                  <p>Size yardımcı olalım</p>
                </div>
              </li>
              <li className="flex items-start gap-3 text-slate-400 text-sm">
                <MapPin className="h-5 w-5 text-sky-500 shrink-0 mt-0.5" />
                <div>
                  <p className="text-white font-medium">Atatürk Cad. No:123</p>
                  <p>Kadıköy, İstanbul</p>
                </div>
              </li>
              <li className="flex items-start gap-3 text-slate-400 text-sm">
                <Clock className="h-5 w-5 text-sky-500 shrink-0 mt-0.5" />
                <div>
                  <p className="text-white font-medium">Pzt-Cmt: 09:00 - 18:00</p>
                  <p>Cumartesi: 09:00 - 14:00</p>
                </div>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-slate-800 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-slate-400 text-sm">
            &copy; {new Date().getFullYear()} Kansu Diş Kliniği. Tüm hakları saklıdır.
          </p>
          <div className="flex gap-6 text-sm text-slate-400">
            <a href="#" className="hover:text-white transition-colors">
              Gizlilik Politikası
            </a>
            <a href="#" className="hover:text-white transition-colors">
              Kullanım Şartları
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
