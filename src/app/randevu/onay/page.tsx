import Link from "next/link";
import { CheckCircle, Calendar, Home } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

export default function RandevuOnayPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <section className="flex-1 flex items-center justify-center py-20">
        <div className="container mx-auto px-4">
          <Card className="max-w-md mx-auto text-center">
            <CardContent className="p-8 space-y-6">
              <div className="flex justify-center">
                <div className="h-20 w-20 rounded-full bg-green-100 flex items-center justify-center">
                  <CheckCircle className="h-10 w-10 text-green-600" />
                </div>
              </div>
              <div>
                <h1 className="text-2xl font-bold text-slate-900 mb-2">
                  Randevunuz Oluşturuldu!
                </h1>
                <p className="text-slate-600">
                  Randevu isteğiniz başarıyla alındı. Onaylandığında SMS ve
                  e-posta ile bilgilendirileceksiniz.
                </p>
              </div>
              <div className="bg-sky-50 rounded-lg p-4 text-sm text-sky-800">
                <p>
                  <strong>Not:</strong> Randevunuz onay sürecindedir. Onay
                 landığında size SMS ve e-posta ile bildirim gönderilecektir.
                </p>
              </div>
              <div className="flex flex-col gap-3">
                <Link
                  href="/"
                  className={buttonVariants({ className: "bg-sky-500 hover:bg-sky-600 text-white" })}
                >
                  <Home className="mr-2 h-4 w-4" />
                  Ana Sayfaya Dön
                </Link>
                <Link
                  href="/randevu"
                  className={buttonVariants({ variant: "outline" })}
                >
                  <Calendar className="mr-2 h-4 w-4" />
                  Yeni Randevu Al
                </Link>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  );
}
