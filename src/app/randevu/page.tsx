"use client";

import { useState, useEffect, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Calendar, User, Phone, Mail, FileText, CheckCircle, ArrowLeft, ArrowRight, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { CustomCalendar } from "@/components/CustomCalendar";

interface Doctor {
  id: string;
  name: string;
  specialty: string;
  imageUrl?: string | null;
}

interface TimeSlot {
  time: string;
  available: boolean;
}

const steps = [
  { id: 1, title: "Doktor Seçin", icon: User },
  { id: 2, title: "Tarih & Saat", icon: Calendar },
  { id: 3, title: "Bilgileriniz", icon: FileText },
  { id: 4, title: "Onay", icon: CheckCircle },
];

function RandevuForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const preselectedDoctor = searchParams.get("doctor");

  const [currentStep, setCurrentStep] = useState(1);
  const [doctors, setDoctors] = useState<Doctor[]>([]);
  const [selectedDoctor, setSelectedDoctor] = useState<Doctor | null>(null);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [selectedTime, setSelectedTime] = useState<string>("");
  const [timeSlots, setTimeSlots] = useState<TimeSlot[]>([]);
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    patientName: "",
    patientEmail: "",
    patientPhone: "",
    notes: "",
  });

  // Fetch doctors
  useEffect(() => {
    fetch("/api/doctors")
      .then((res) => res.json())
      .then((data) => {
        setDoctors(data);
        if (preselectedDoctor) {
          const doc = data.find((d: Doctor) => d.id === preselectedDoctor);
          if (doc) {
            setSelectedDoctor(doc);
            setCurrentStep(2);
          }
        }
      })
      .catch(() => {
        // Demo data
        const demoDoctors = [
          { id: "1", name: "Dr. Ahmet Kansu", specialty: "Genel Diş Hekimliği" },
          { id: "2", name: "Dr. Ayşe Yılmaz", specialty: "Ortodonti" },
          { id: "3", name: "Dr. Mehmet Demir", specialty: "Endodonti" },
          { id: "4", name: "Dr. Zeynep Kaya", specialty: "Pedodonti" },
          { id: "5", name: "Dr. Ali Çelik", specialty: "Diş Cerrahisi" },
        ];
        setDoctors(demoDoctors);
        if (preselectedDoctor) {
          const doc = demoDoctors.find((d) => d.id === preselectedDoctor);
          if (doc) {
            setSelectedDoctor(doc);
            setCurrentStep(2);
          }
        }
      });
  }, [preselectedDoctor]);

  // Fetch time slots when date is selected
  useEffect(() => {
    if (selectedDoctor && selectedDate) {
      fetch(
        `/api/availability?doctorId=${selectedDoctor.id}&date=${selectedDate.toISOString()}`
      )
        .then((res) => res.json())
        .then((data) => setTimeSlots(data))
        .catch(() => {
          // Demo time slots
          const slots: TimeSlot[] = [];
          for (let h = 9; h < 18; h++) {
            slots.push({ time: `${h.toString().padStart(2, "0")}:00`, available: Math.random() > 0.3 });
            slots.push({ time: `${h.toString().padStart(2, "0")}:30`, available: Math.random() > 0.3 });
          }
          setTimeSlots(slots);
        });
    }
  }, [selectedDoctor, selectedDate]);

  const handleSubmit = async () => {
    if (!selectedDoctor || !selectedDate || !selectedTime) return;

    setLoading(true);
    try {
      const response = await fetch("/api/appointments", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          doctorId: selectedDoctor.id,
          patientName: formData.patientName,
          patientEmail: formData.patientEmail,
          patientPhone: formData.patientPhone,
          appointmentDate: selectedDate.toISOString(),
          startTime: selectedTime,
          endTime: calculateEndTime(selectedTime),
          notes: formData.notes,
        }),
      });

      if (response.ok) {
        toast.success("Randevunuz başarıyla oluşturuldu!");
        router.push("/randevu/onay");
      } else {
        toast.error("Bir hata oluştu. Lütfen tekrar deneyin.");
      }
    } catch {
      toast.success("Randevunuz başarıyla oluşturuldu! (Demo)");
      router.push("/randevu/onay");
    } finally {
      setLoading(false);
    }
  };

  const calculateEndTime = (time: string): string => {
    const [h, m] = time.split(":").map(Number);
    const endMinutes = m + 30;
    const endHour = h + Math.floor(endMinutes / 60);
    return `${endHour.toString().padStart(2, "0")}:${(endMinutes % 60).toString().padStart(2, "0")}`;
  };

  const formatDate = (date: Date) => {
    return date.toLocaleDateString("tr-TR", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);

  return (
    <div className="flex flex-col min-h-screen">
      {/* Header */}
      <section className="bg-gradient-to-br from-sky-50 via-white to-emerald-50 py-12">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-3xl md:text-4xl font-bold text-slate-900 mb-2">
            Randevu Al
          </h1>
          <p className="text-slate-600">
            Adımları takip ederek kolayca randevu oluşturun
          </p>
        </div>
      </section>

      {/* Steps Indicator */}
      <div className="bg-white border-b">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-center gap-2 md:gap-4">
            {steps.map((step, index) => (
              <div key={step.id} className="flex items-center">
                <div
                  className={`flex items-center gap-2 px-3 py-2 rounded-full text-sm font-medium transition-colors ${
                    currentStep === step.id
                      ? "bg-sky-500 text-white"
                      : currentStep > step.id
                      ? "bg-green-100 text-green-700"
                      : "bg-slate-100 text-slate-500"
                  }`}
                >
                  {currentStep > step.id ? (
                    <CheckCircle className="h-4 w-4" />
                  ) : (
                    <step.icon className="h-4 w-4" />
                  )}
                  <span className="hidden md:inline">{step.title}</span>
                </div>
                {index < steps.length - 1 && (
                  <div
                    className={`hidden md:block w-8 h-0.5 mx-2 ${
                      currentStep > step.id ? "bg-green-300" : "bg-slate-200"
                    }`}
                  />
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          {/* Step 1: Select Doctor */}
          {currentStep === 1 && (
            <div className="space-y-6">
              <h2 className="text-2xl font-bold text-slate-900 text-center">
                Doktorunuzu Seçin
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {doctors.map((doctor) => (
                  <Card
                    key={doctor.id}
                    className={`cursor-pointer transition-all hover:shadow-lg ${
                      selectedDoctor?.id === doctor.id
                        ? "ring-2 ring-sky-500 shadow-lg"
                        : ""
                    }`}
                    onClick={() => setSelectedDoctor(doctor)}
                  >
                    <CardContent className="p-6">
                      <div className="flex items-center gap-4">
                        <div className="h-16 w-16 rounded-full bg-sky-100 flex items-center justify-center text-sky-600 text-xl font-bold shrink-0">
                          {doctor.name.split(" ").slice(-1)[0].charAt(0)}
                        </div>
                        <div>
                          <h3 className="font-semibold text-slate-900">
                            {doctor.name}
                          </h3>
                          <p className="text-sm text-sky-600">
                            {doctor.specialty}
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
              <div className="flex justify-end">
                <Button
                  onClick={() => setCurrentStep(2)}
                  disabled={!selectedDoctor}
                  className="bg-sky-500 hover:bg-sky-600"
                >
                  Devam Et
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </div>
            </div>
          )}

          {/* Step 2: Select Date & Time */}
          {currentStep === 2 && (
            <div className="space-y-6">
              <h2 className="text-2xl font-bold text-slate-900 text-center">
                Tarih ve Saat Seçin
              </h2>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Calendar */}
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Tarih Seçin</CardTitle>
                  </CardHeader>
                  <CardContent className="flex justify-center">
                    <CustomCalendar
                      selectedDate={selectedDate}
                      onDateSelect={setSelectedDate}
                      minDate={tomorrow}
                      disabledDays={[0]}
                    />
                  </CardContent>
                </Card>

                {/* Time Slots */}
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Saat Seçin</CardTitle>
                  </CardHeader>
                  <CardContent>
                    {selectedDate ? (
                      <div className="grid grid-cols-3 gap-2">
                        {timeSlots.map((slot) => (
                          <button
                            key={slot.time}
                            onClick={() =>
                              slot.available && setSelectedTime(slot.time)
                            }
                            disabled={!slot.available}
                            className={`p-3 rounded-lg text-sm font-medium transition-colors ${
                              selectedTime === slot.time
                                ? "bg-sky-500 text-white"
                                : slot.available
                                ? "bg-slate-100 text-slate-700 hover:bg-sky-100"
                                : "bg-slate-50 text-slate-300 cursor-not-allowed line-through"
                            }`}
                          >
                            <Clock className="h-3 w-3 inline mr-1" />
                            {slot.time}
                          </button>
                        ))}
                      </div>
                    ) : (
                      <div className="text-center py-12 text-slate-500">
                        <Calendar className="h-12 w-12 mx-auto mb-4 opacity-50" />
                        <p>Önce bir tarih seçin</p>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </div>

              {selectedDate && selectedTime && (
                <Card className="bg-sky-50 border-sky-200">
                  <CardContent className="p-4">
                    <p className="text-sky-800">
                      <strong>Seçilen:</strong>{" "}
                      {formatDate(selectedDate)} - {selectedTime}
                    </p>
                  </CardContent>
                </Card>
              )}

              <div className="flex justify-between">
                <Button variant="outline" onClick={() => setCurrentStep(1)}>
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  Geri
                </Button>
                <Button
                  onClick={() => setCurrentStep(3)}
                  disabled={!selectedDate || !selectedTime}
                  className="bg-sky-500 hover:bg-sky-600"
                >
                  Devam Et
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </div>
            </div>
          )}

          {/* Step 3: Patient Info */}
          {currentStep === 3 && (
            <div className="space-y-6">
              <h2 className="text-2xl font-bold text-slate-900 text-center">
                İletişim Bilgileriniz
              </h2>
              <Card className="max-w-2xl mx-auto">
                <CardContent className="p-6 space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="patientName">Ad Soyad *</Label>
                    <Input
                      id="patientName"
                      placeholder="Adınız ve soyadınız"
                      value={formData.patientName}
                      onChange={(e) =>
                        setFormData({ ...formData, patientName: e.target.value })
                      }
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="patientPhone">Telefon *</Label>
                    <Input
                      id="patientPhone"
                      placeholder="05XX XXX XX XX"
                      value={formData.patientPhone}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          patientPhone: e.target.value,
                        })
                      }
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="patientEmail">E-posta</Label>
                    <Input
                      id="patientEmail"
                      type="email"
                      placeholder="ornek@email.com"
                      value={formData.patientEmail}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          patientEmail: e.target.value,
                        })
                      }
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="notes">Notlar</Label>
                    <Textarea
                      id="notes"
                      placeholder="Eklemek istediğiniz notlar (isteğe bağlı)"
                      value={formData.notes}
                      onChange={(e) =>
                        setFormData({ ...formData, notes: e.target.value })
                      }
                    />
                  </div>
                </CardContent>
              </Card>
              <div className="flex justify-between max-w-2xl mx-auto">
                <Button variant="outline" onClick={() => setCurrentStep(2)}>
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  Geri
                </Button>
                <Button
                  onClick={() => setCurrentStep(4)}
                  disabled={!formData.patientName || !formData.patientPhone}
                  className="bg-sky-500 hover:bg-sky-600"
                >
                  Devam Et
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </div>
            </div>
          )}

          {/* Step 4: Confirmation */}
          {currentStep === 4 && (
            <div className="space-y-6">
              <h2 className="text-2xl font-bold text-slate-900 text-center">
                Randevu Onayı
              </h2>
              <Card className="max-w-2xl mx-auto">
                <CardContent className="p-6 space-y-4">
                  <div className="space-y-3">
                    <div className="flex justify-between py-2 border-b">
                      <span className="text-slate-600">Doktor</span>
                      <span className="font-medium">{selectedDoctor?.name}</span>
                    </div>
                    <div className="flex justify-between py-2 border-b">
                      <span className="text-slate-600">Uzmanlık</span>
                      <span className="font-medium">
                        {selectedDoctor?.specialty}
                      </span>
                    </div>
                    <div className="flex justify-between py-2 border-b">
                      <span className="text-slate-600">Tarih</span>
                      <span className="font-medium">
                        {selectedDate && formatDate(selectedDate)}
                      </span>
                    </div>
                    <div className="flex justify-between py-2 border-b">
                      <span className="text-slate-600">Saat</span>
                      <span className="font-medium">{selectedTime}</span>
                    </div>
                    <div className="flex justify-between py-2 border-b">
                      <span className="text-slate-600">Hasta</span>
                      <span className="font-medium">
                        {formData.patientName}
                      </span>
                    </div>
                    <div className="flex justify-between py-2 border-b">
                      <span className="text-slate-600">Telefon</span>
                      <span className="font-medium">
                        {formData.patientPhone}
                      </span>
                    </div>
                    {formData.patientEmail && (
                      <div className="flex justify-between py-2 border-b">
                        <span className="text-slate-600">E-posta</span>
                        <span className="font-medium">
                          {formData.patientEmail}
                        </span>
                      </div>
                    )}
                    {formData.notes && (
                      <div className="py-2">
                        <span className="text-slate-600">Notlar</span>
                        <p className="mt-1 text-sm">{formData.notes}</p>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
              <div className="flex justify-between max-w-2xl mx-auto">
                <Button variant="outline" onClick={() => setCurrentStep(3)}>
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  Geri
                </Button>
                <Button
                  onClick={handleSubmit}
                  disabled={loading}
                  className="bg-sky-500 hover:bg-sky-600"
                >
                  {loading ? (
                    "Gönderiliyor..."
                  ) : (
                    <>
                      <CheckCircle className="mr-2 h-4 w-4" />
                      Randevu Oluştur
                    </>
                  )}
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default function RandevuPage() {
  return (
    <Suspense fallback={<div className="flex items-center justify-center min-h-screen"><div className="text-center"><div className="animate-spin rounded-full h-12 w-12 border-b-2 border-sky-500 mx-auto mb-4"></div><p className="text-slate-600">Yükleniyor...</p></div></div>}>
      <RandevuForm />
    </Suspense>
  );
}
