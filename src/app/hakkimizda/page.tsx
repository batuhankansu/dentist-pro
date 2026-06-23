import { Award, Users, Heart, Shield, CheckCircle, ArrowRight } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";

const values = [
  {
    icon: Shield,
    title: "Güvenilir",
    description: "15 yıllık deneyim ve binlerce mutlu hasta.",
    color: "from-sky-400 to-sky-600",
  },
  {
    icon: Award,
    title: "Uzman Kadro",
    description: "Alanında uzman ve sertifikalı doktorlar.",
    color: "from-amber-400 to-orange-500",
  },
  {
    icon: Heart,
    title: "Hasta Odaklı",
    description: "Hasta memnuniyeti bizim için her şeyden önemli.",
    color: "from-rose-400 to-pink-500",
  },
  {
    icon: Users,
    title: "Modern Teknoloji",
    description: "En son teknoloji ekipmanlarla hizmet veriyoruz.",
    color: "from-emerald-400 to-teal-500",
  },
];

const milestones = [
  { year: "2009", event: "Kliniğimiz kuruldu" },
  { year: "2012", event: "İmplant merkezi açıldı" },
  { year: "2015", event: "10.000. hasta mutluluğuna ulaştık" },
  { year: "2018", event: "Yeni kliniğimize taşındık" },
  { year: "2020", event: "Dijital diş hekimliğine geçtik" },
  { year: "2024", event: "5. uzman doktorumuzu kadromuza kattık" },
];

export default function HakkimizdaPage() {
  return (
    <div className="flex flex-col">
      {/* Hero */}
      <section className="relative bg-gradient-to-br from-sky-50 via-white to-emerald-50 py-24 overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-sky-100 rounded-full blur-3xl opacity-50" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-emerald-100 rounded-full blur-3xl opacity-50" />
        <div className="container mx-auto px-4 text-center relative">
          <div className="inline-flex items-center gap-2 rounded-full bg-sky-100 px-4 py-2 text-sm text-sky-700 mb-6">
            <Heart className="h-4 w-4 fill-sky-500" />
            Hikayemiz
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4">
            Hakkımızda
          </h1>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">
            Kansu Diş Kliniği olarak 15 yılı aşkın süredir sağlığınıza hizmet
            ediyoruz.
          </p>
        </div>
      </section>

      {/* Story with Image */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="space-y-6">
              <h2 className="text-3xl md:text-4xl font-bold text-slate-900">
                Hikayemiz
              </h2>
              <div className="space-y-4 text-slate-600 leading-relaxed">
                <p>
                  Kansu Diş Kliniği, 2009 yılında Dr. Ahmet Kansu tarafından
                  kurulmuştur. Kurulduğumuz günden bu yana, hastalarımıza en
                  kaliteli diş hekimliği hizmetini sunmayı amaçlıyoruz.
                </p>
                <p>
                  Kliniğimizde modern teknolojiler ve en güncel tedavi
                  yöntemlerini kullanarak, hastalarımızın sağlığını ve
                  gülüşlerini güvence altına alıyoruz. Uzman kadromuz, her
                  hastamıza özel tedavi planları oluşturarak en iyi sonucu
                  elde etmek için çalışmaktadır.
                </p>
                <p>
                  Vizyonumuz, teknoloji ve insan odaklı yaklaşımımızla,
                  bölgemizin en güvenilir diş kliniği olmaktır. Misyonumuz ise,
                  her hastamıza özel, kaliteli ve erişilebilir sağlık hizmeti
                  sunmaktır.
                </p>
              </div>
              <Link
                href="/randevu"
                className={
                  buttonVariants({
                    className: "bg-sky-500 hover:bg-sky-600 text-white",
                  }) + " inline-flex items-center"
                }
              >
                Hemen Başlayın
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </div>
            <div className="relative">
              <div className="relative rounded-3xl overflow-hidden shadow-2xl">
                <img
                  src="https://images.unsplash.com/photo-1629909613654-28e377c37b09?w=800&q=80"
                  alt="Klinik iç mekan"
                  className="w-full h-[500px] object-cover"
                />
              </div>
              <div className="absolute -bottom-8 -right-8 bg-white rounded-2xl p-6 shadow-xl">
                <div className="flex items-center gap-4">
                  <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-sky-100 text-sky-600">
                    <Award className="h-7 w-7" />
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

      {/* Values */}
      <section className="py-20 bg-gradient-to-b from-slate-50 to-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900">
              Değerlerimiz
            </h2>
            <p className="text-slate-600 mt-4 max-w-2xl mx-auto">
              Bizi biz yapan değerler
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((value, index) => (
              <Card
                key={value.title}
                className="group card-hover border-0 shadow-lg text-center"
              >
                <CardContent className="p-8">
                  <div
                    className={`inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br ${value.color} text-white mb-6 transition-transform group-hover:scale-110`}
                  >
                    <value.icon className="h-8 w-8" />
                  </div>
                  <h3 className="font-bold text-xl text-slate-900 mb-2">
                    {value.title}
                  </h3>
                  <p className="text-slate-600">{value.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900">
              Yolculuğumuz
            </h2>
            <p className="text-slate-600 mt-4 max-w-2xl mx-auto">
              Klinik tarihindeki önemli anlar
            </p>
          </div>
          <div className="max-w-3xl mx-auto">
            {milestones.map((milestone, index) => (
              <div
                key={milestone.year}
                className="flex items-center gap-6 mb-8 last:mb-0"
              >
                <div className="flex-shrink-0 w-20 text-right">
                  <span className="text-2xl font-bold gradient-text">
                    {milestone.year}
                  </span>
                </div>
                <div className="relative">
                  <div className="w-4 h-4 rounded-full bg-sky-500 ring-4 ring-sky-100" />
                  {index < milestones.length - 1 && (
                    <div className="absolute top-4 left-1/2 -translate-x-1/2 w-0.5 h-16 bg-sky-200" />
                  )}
                </div>
                <div className="flex-1 p-4 bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow">
                  <p className="text-slate-700 font-medium">{milestone.event}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-gradient-to-r from-sky-500 to-emerald-500">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Bizimle Tanışın
          </h2>
          <p className="text-white/90 text-lg mb-8 max-w-2xl mx-auto">
            Kliniğimizi ziyaret edin ve ekibimizle tanışın
          </p>
          <Link
            href="/iletisim"
            className={
              buttonVariants({
                size: "lg",
                className: "bg-white text-sky-600 hover:bg-sky-50",
              }) + " inline-flex items-center"
            }
          >
            İletişime Geçin
            <ArrowRight className="ml-2 h-5 w-5" />
          </Link>
        </div>
      </section>
    </div>
  );
}
