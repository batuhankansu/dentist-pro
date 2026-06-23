import Link from "next/link";
import {
  Calendar,
  Phone,
  Shield,
  Clock,
  Star,
  Award,
  Heart,
  Sparkles,
  CheckCircle,
  ArrowRight,
  Zap,
  Users,
} from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { HeroSlider } from "@/components/HeroSlider";
import { TestimonialsSlider } from "@/components/TestimonialsSlider";
import { ClinicGallery } from "@/components/ClinicGallery";
import { BeforeAfterSection } from "@/components/BeforeAfterSection";

const services = [
  {
    icon: Sparkles,
    title: "Diş Beyazlatma",
    description: "Profesyonel beyazlatma ile parlak gülüşler.",
    image: "https://images.unsplash.com/photo-1606811841689-23dfddce3e95?w=400&q=80",
    color: "from-amber-400 to-orange-500",
  },
  {
    icon: Shield,
    title: "İmplant",
    description: "Kalıcı diş implantları ile doğal gülüş.",
    image: "https://images.unsplash.com/photo-1571772996211-2f02c9727629?w=400&q=80",
    color: "from-sky-400 to-blue-500",
  },
  {
    icon: Heart,
    title: "Kanal Tedavisi",
    description: "Ağrısız ve başarılı kanal tedavisi.",
    image: "https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?w=400&q=80",
    color: "from-rose-400 to-pink-500",
  },
  {
    icon: Star,
    title: "Dolgu",
    description: "Estetik ve dayanıklı dolgu uygulamaları.",
    image: "https://images.unsplash.com/photo-1629909615184-74f495363b67?w=400&q=80",
    color: "from-emerald-400 to-teal-500",
  },
  {
    icon: Award,
    title: "Ortodonti",
    description: "Düzgün dişler için ortodontik tedavi.",
    image: "https://images.unsplash.com/photo-1598256989800-fe5f95da9787?w=400&q=80",
    color: "from-violet-400 to-purple-500",
  },
  {
    icon: CheckCircle,
    title: "Diş Çekimi",
    description: "Acısız diş çekimi ve cerrahi müdahale.",
    image: "https://images.unsplash.com/photo-1629909613654-28e377c37b09?w=400&q=80",
    color: "from-cyan-400 to-sky-500",
  },
];

const stats = [
  { number: "15+", label: "Yıl Deneyim", icon: Award },
  { number: "10.000+", label: "Mutlu Hasta", icon: Users },
  { number: "5", label: "Uzman Doktor", icon: Heart },
  { number: "%98", label: "Hasta Memnuniyeti", icon: Star },
];

const features = [
  {
    icon: Zap,
    title: "Hızlı Tedavi",
    description: "Minimum bekleme süresi ile hızlı tedavi.",
  },
  {
    icon: Shield,
    title: "Garanti",
    description: "Tüm tedavilerimizde garanti veriyoruz.",
  },
  {
    icon: Clock,
    title: "7/24 Destek",
    description: "Acil durumlarda bize ulaşabilirsiniz.",
  },
];

export default function HomePage() {
  return (
    <div className="flex flex-col">
      {/* Hero Slider */}
      <HeroSlider />

      {/* Stats */}
      <section className="py-16 bg-white relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-sky-50 to-emerald-50 opacity-50" />
        <div className="container mx-auto px-4 relative">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div
                key={stat.label}
                className="text-center animate-slide-up"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-sky-100 to-sky-50 text-sky-600 mb-4">
                  <stat.icon className="h-8 w-8" />
                </div>
                <div className="text-3xl md:text-4xl font-bold gradient-text">
                  {stat.number}
                </div>
                <div className="text-sm text-slate-600 mt-1 font-medium">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Services */}
      <section className="py-24 relative">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 rounded-full bg-sky-100 px-4 py-2 text-sm text-sky-700 mb-4">
              <Sparkles className="h-4 w-4" />
              Hizmetlerimiz
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900">
              Size En İyi Hizmeti
              <span className="gradient-text"> Sunuyoruz</span>
            </h2>
            <p className="text-slate-600 mt-4 max-w-2xl mx-auto text-lg">
              Modern teknolojiler ve uzman kadromuzla size en iyi hizmeti
              sunuyoruz.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <Card
                key={service.title}
                className="group card-hover border-0 shadow-lg overflow-hidden"
              >
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={service.image}
                    alt={service.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div
                    className={`absolute inset-0 bg-gradient-to-t ${service.color} opacity-60`}
                  />
                  <div className="absolute bottom-4 left-4 right-4">
                    <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-white/90 text-slate-800 backdrop-blur-sm">
                      <service.icon className="h-6 w-6" />
                    </div>
                  </div>
                </div>
                <CardHeader className="pb-2">
                  <CardTitle className="text-xl group-hover:text-sky-600 transition-colors">
                    {service.title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-base">
                    {service.description}
                  </CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Before & After */}
      <BeforeAfterSection />

      {/* Features */}
      <section className="py-24 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-sky-500/10 rounded-full blur-3xl" />
          <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl" />
        </div>
        <div className="container mx-auto px-4 relative">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="space-y-8">
              <div>
                <div className="inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 text-sm text-white/80 mb-4">
                  <Zap className="h-4 w-4" />
                  Neden Biz?
                </div>
                <h2 className="text-3xl md:text-4xl font-bold text-white">
                  Sağlığınız İçin
                  <span className="text-sky-400"> En İyisi</span>
                </h2>
              </div>
              <div className="space-y-6">
                {features.map((feature, index) => (
                  <div
                    key={feature.title}
                    className="flex items-start gap-4 p-4 rounded-xl bg-white/5 hover:bg-white/10 transition-colors"
                  >
                    <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-sky-500/20 text-sky-400 shrink-0">
                      <feature.icon className="h-6 w-6" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-white text-lg">
                        {feature.title}
                      </h3>
                      <p className="text-white/60 mt-1">{feature.description}</p>
                    </div>
                  </div>
                ))}
              </div>
              <Link
                href="/randevu"
                className={buttonVariants({
                  size: "lg",
                  className: "bg-sky-500 hover:bg-sky-600 text-white",
                })}
              >
                <Calendar className="mr-2 h-5 w-5" />
                Hemen Başlayın
              </Link>
            </div>
            <div className="relative">
              <div className="relative rounded-3xl overflow-hidden shadow-2xl">
                <img
                  src="https://images.unsplash.com/photo-1629909613654-28e377c37b09?w=800&q=80"
                  alt="Modern klinik"
                  className="w-full h-[500px] object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 to-transparent" />
              </div>
              <div className="absolute -bottom-8 -left-8 bg-white rounded-2xl p-6 shadow-xl">
                <div className="flex items-center gap-4">
                  <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-sky-100 text-sky-600">
                    <CheckCircle className="h-7 w-7" />
                  </div>
                  <div>
                    <p className="font-bold text-2xl text-slate-900">15+</p>
                    <p className="text-slate-600 text-sm">Yıllık Deneyim</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Clinic Gallery */}
      <ClinicGallery />

      {/* Testimonials */}
      <TestimonialsSlider />

      {/* CTA Section */}
      <section className="py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-sky-500 to-emerald-500 animate-gradient" />
        <div className="absolute inset-0">
          <div className="absolute top-10 left-10 w-32 h-32 bg-white/10 rounded-full blur-2xl" />
          <div className="absolute bottom-10 right-10 w-40 h-40 bg-white/10 rounded-full blur-2xl" />
        </div>
        <div className="container mx-auto px-4 relative text-center">
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">
            Hemen Randevu Alın
          </h2>
          <p className="text-white/90 text-lg mb-10 max-w-2xl mx-auto">
            Sağlıklı gülüşler için ilk adımı atın. Online randevu sistemimizle
            kolayca randevu oluşturun.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/randevu"
              className={buttonVariants({
                size: "lg",
                className:
                  "bg-white text-sky-600 hover:bg-sky-50 shadow-xl hover:shadow-2xl transition-all",
              })}
            >
              <Calendar className="mr-2 h-5 w-5" />
              Randevu Oluştur
            </Link>
            <a
              href="tel:+905001234567"
              className="inline-flex items-center justify-center gap-2 h-11 px-8 rounded-lg border border-white/30 bg-transparent text-white hover:bg-white/10 transition-colors"
            >
              <Phone className="h-5 w-5" />
              Bizi Arayın
            </a>
          </div>
        </div>
      </section>

      {/* Working Hours */}
      <section className="py-24">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <Card className="shadow-2xl overflow-hidden border-0">
              <div className="grid grid-cols-1 md:grid-cols-2">
                <div className="relative h-64 md:h-auto">
                  <img
                    src="https://images.unsplash.com/photo-1571772996211-2f02c9727629?w=800&q=80"
                    alt="Klinik"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-r from-sky-600/90 to-sky-500/90" />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-center text-white">
                      <Clock className="h-16 w-16 mx-auto mb-4" />
                      <h3 className="text-3xl font-bold">Çalışma Saatleri</h3>
                    </div>
                  </div>
                </div>
                <CardContent className="p-8 md:p-12">
                  <div className="space-y-4">
                    {[
                      { day: "Pazartesi - Cuma", hours: "09:00 - 18:00", active: true },
                      { day: "Cumartesi", hours: "09:00 - 14:00", active: true },
                      { day: "Pazar", hours: "Kapalı", active: false },
                    ].map((item) => (
                      <div
                        key={item.day}
                        className={`flex items-center justify-between p-4 rounded-xl transition-colors ${
                          item.active
                            ? "bg-sky-50 hover:bg-sky-100"
                            : "bg-slate-50 opacity-60"
                        }`}
                      >
                        <span className="font-medium text-slate-900">
                          {item.day}
                        </span>
                        <span
                          className={`font-semibold ${
                            item.active ? "text-sky-600" : "text-slate-400"
                          }`}
                        >
                          {item.hours}
                        </span>
                      </div>
                    ))}
                  </div>
                  <div className="mt-8">
                    <Link
                      href="/randevu"
                      className={buttonVariants({
                        className:
                          "w-full bg-sky-500 hover:bg-sky-600 text-white",
                      })}
                    >
                      <Calendar className="mr-2 h-5 w-5" />
                      Randevu Al
                    </Link>
                  </div>
                </CardContent>
              </div>
            </Card>
          </div>
        </div>
      </section>
    </div>
  );
}
