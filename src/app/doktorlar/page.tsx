import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Award, Calendar } from "lucide-react";

const doctors = [
  {
    id: "1",
    name: "Dr. Ahmet Kansu",
    specialty: "Genel Diş Hekimliği",
    bio: "15 yıllık deneyim ile genel diş hekimliği ve implant tedavileri.",
    image: "https://images.unsplash.com/photo-1622253692010-333f2da6031d?w=400&h=500&fit=crop&crop=top",
    experience: "15 Yıl",
    specialties: ["İmplant", "Diş Beyazlatma", "Genel Tedavi"],
  },
  {
    id: "2",
    name: "Dr. Ayşe Yılmaz",
    specialty: "Ortodonti",
    bio: "Ortodontik tedaviler ve diş telleri konusunda uzman.",
    image: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=400&h=500&fit=crop&crop=top",
    experience: "12 Yıl",
    specialties: ["Diş Teli", "Şeffaf Plak", "Çene Düzeltme"],
  },
  {
    id: "3",
    name: "Dr. Mehmet Demir",
    specialty: "Endodonti",
    bio: "Kanal tedavisi ve diş pulp hastalıkları uzmanı.",
    image: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=400&h=500&fit=crop&crop=top",
    experience: "10 Yıl",
    specialties: ["Kanal Tedavisi", "Diş Crowns", "Acil Tedavi"],
  },
  {
    id: "4",
    name: "Dr. Zeynep Kaya",
    specialty: "Pedodonti",
    bio: "Çocuk diş hekimliği alanında uzman.",
    image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&h=500&fit=crop&crop=top",
    experience: "8 Yıl",
    specialties: ["Çocuk Diş Hekimliği", "Koruyucu Hekimlik", "Eğlenceli Tedavi"],
  },
  {
    id: "5",
    name: "Dr. Ali Çelik",
    specialty: "Diş Cerrahisi",
    bio: "Diş çekimi, implant cerrahisi ve ağız cerrahisi uzmanı.",
    image: "https://images.unsplash.com/photo-1537368910025-700350fe46c7?w=400&h=500&fit=crop&crop=top",
    experience: "14 Yıl",
    specialties: ["İmplant Cerrahisi", "Diş Çekimi", "Gömülü Diş"],
  },
];

export default function DoktorlarPage() {
  return (
    <div className="flex flex-col">
      {/* Hero */}
      <section className="relative bg-gradient-to-br from-sky-50 via-white to-emerald-50 py-24 overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-sky-100 rounded-full blur-3xl opacity-50" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-emerald-100 rounded-full blur-3xl opacity-50" />
        <div className="container mx-auto px-4 text-center relative">
          <div className="inline-flex items-center gap-2 rounded-full bg-sky-100 px-4 py-2 text-sm text-sky-700 mb-6">
            <Award className="h-4 w-4" />
            Uzman Kadromuz
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4">
            Doktorlarımız
          </h1>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">
            Alanında uzman doktor kadromuz ile sağlığınıza hizmet ediyoruz.
          </p>
        </div>
      </section>

      {/* Doctors Grid */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {doctors.map((doctor) => (
              <Card
                key={doctor.id}
                className="group card-hover border-0 shadow-lg overflow-hidden"
              >
                <div className="relative h-96 overflow-hidden bg-slate-100">
                  <img
                    src={doctor.image}
                    alt={doctor.name}
                    className="w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/20 to-transparent" />
                  <div className="absolute bottom-4 left-4 right-4">
                    <div className="flex items-center gap-2">
                      <div className="flex items-center gap-1 px-2 py-1 bg-white/20 text-white rounded-full text-xs backdrop-blur-sm">
                        <Award className="h-3 w-3" />
                        {doctor.experience}
                      </div>
                    </div>
                  </div>
                </div>
                <CardContent className="p-6">
                  <h3 className="text-xl font-bold text-slate-900 group-hover:text-sky-600 transition-colors">
                    {doctor.name}
                  </h3>
                  <p className="text-sky-600 font-medium mt-1">
                    {doctor.specialty}
                  </p>
                  <p className="text-slate-600 mt-3 text-sm line-clamp-2">
                    {doctor.bio}
                  </p>
                  <div className="flex flex-wrap gap-2 mt-4">
                    {doctor.specialties.map((spec) => (
                      <span
                        key={spec}
                        className="px-2 py-1 bg-sky-50 text-sky-700 text-xs rounded-full"
                      >
                        {spec}
                      </span>
                    ))}
                  </div>
                  <div className="flex gap-3 mt-6">
                    <Link
                      href={`/randevu?doctor=${doctor.id}`}
                      className={
                        buttonVariants({
                          size: "sm",
                          className: "bg-sky-500 hover:bg-sky-600 text-white flex-1",
                        }) + " flex items-center justify-center"
                      }
                    >
                      <Calendar className="mr-2 h-4 w-4" />
                      Randevu Al
                    </Link>
                    <Link
                      href={`/doktorlar/${doctor.id}`}
                      className={
                        buttonVariants({
                          size: "sm",
                          variant: "outline",
                          className: "flex-1",
                        }) + " flex items-center justify-center"
                      }
                    >
                      Detay
                    </Link>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
