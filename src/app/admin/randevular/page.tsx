"use client";

import { useState, useEffect } from "react";
import {
  CheckCircle,
  XCircle,
  Clock,
  Phone,
  Mail,
  MessageSquare,
  RefreshCw,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";

interface Appointment {
  id: string;
  doctorId: string;
  doctorName: string;
  patientName: string;
  patientEmail?: string;
  patientPhone: string;
  appointmentDate: string;
  startTime: string;
  endTime: string;
  status: string;
  notes?: string;
  reminderSent: boolean;
  createdAt: string;
}

export default function AdminRandevularPage() {
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [filter, setFilter] = useState<string>("all");
  const [selectedAppointment, setSelectedAppointment] =
    useState<Appointment | null>(null);
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [editDate, setEditDate] = useState("");
  const [editTime, setEditTime] = useState("");

  useEffect(() => {
    fetchAppointments();
  }, []);

  const fetchAppointments = () => {
    fetch("/api/appointments")
      .then((res) => res.json())
      .then(setAppointments)
      .catch(() => {
        setAppointments([
          {
            id: "1",
            doctorId: "1",
            doctorName: "Dr. Ahmet Kansu",
            patientName: "Ahmet Yılmaz",
            patientEmail: "ahmet@email.com",
            patientPhone: "0500 111 22 33",
            appointmentDate: new Date(Date.now() + 86400000).toISOString(),
            startTime: "10:00",
            endTime: "10:30",
            status: "confirmed",
            notes: "Diş kontrolü",
            reminderSent: false,
            createdAt: new Date().toISOString(),
          },
          {
            id: "2",
            doctorId: "2",
            doctorName: "Dr. Ayşe Yılmaz",
            patientName: "Fatma Kaya",
            patientPhone: "0500 444 55 66",
            appointmentDate: new Date(Date.now() + 172800000).toISOString(),
            startTime: "14:00",
            endTime: "14:30",
            status: "pending",
            reminderSent: false,
            createdAt: new Date().toISOString(),
          },
          {
            id: "3",
            doctorId: "1",
            doctorName: "Dr. Ahmet Kansu",
            patientName: "Mehmet Demir",
            patientPhone: "0500 777 88 99",
            appointmentDate: new Date().toISOString(),
            startTime: "11:00",
            endTime: "11:30",
            status: "completed",
            reminderSent: true,
            createdAt: new Date(Date.now() - 86400000).toISOString(),
          },
          {
            id: "4",
            doctorId: "3",
            doctorName: "Dr. Mehmet Demir",
            patientName: "Zeynep Arslan",
            patientPhone: "0500 888 99 00",
            appointmentDate: new Date(Date.now() + 259200000).toISOString(),
            startTime: "09:30",
            endTime: "10:00",
            status: "pending",
            reminderSent: false,
            createdAt: new Date().toISOString(),
          },
        ]);
      });
  };

  const updateStatus = async (id: string, status: string) => {
    // In production, call API
    setAppointments((prev) =>
      prev.map((apt) => (apt.id === id ? { ...apt, status } : apt))
    );
    toast.success(
      `Randevu ${
        status === "confirmed"
          ? "onaylandı"
          : status === "cancelled"
          ? "iptal edildi"
          : "güncellendi"
      }`
    );
    setEditDialogOpen(false);
  };

  const sendReminder = async (appointment: Appointment) => {
    // In production, call SMS/Email API
    toast.success(`${appointment.patientName} için hatırlatma gönderildi`);
    setAppointments((prev) =>
      prev.map((apt) =>
        apt.id === appointment.id ? { ...apt, reminderSent: true } : apt
      )
    );
  };

  const openEditDialog = (appointment: Appointment) => {
    setSelectedAppointment(appointment);
    setEditDate(new Date(appointment.appointmentDate).toISOString().split("T")[0]);
    setEditTime(appointment.startTime);
    setEditDialogOpen(true);
  };

  const saveEdit = () => {
    if (!selectedAppointment) return;
    setAppointments((prev) =>
      prev.map((apt) =>
        apt.id === selectedAppointment.id
          ? {
              ...apt,
              appointmentDate: new Date(editDate).toISOString(),
              startTime: editTime,
            }
          : apt
      )
    );
    toast.success("Randevu güncellendi");
    setEditDialogOpen(false);
  };

  const filteredAppointments =
    filter === "all"
      ? appointments
      : appointments.filter((apt) => apt.status === filter);

  const formatDate = (dateStr: string) => {
    return new Date(dateStr).toLocaleDateString("tr-TR", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });
  };

  const getStatusBadge = (status: string) => {
    const config: Record<string, { variant: "default" | "secondary" | "destructive" | "outline"; label: string }> = {
      pending: { variant: "outline", label: "Bekliyor" },
      confirmed: { variant: "default", label: "Onaylandı" },
      completed: { variant: "secondary", label: "Tamamlandı" },
      cancelled: { variant: "destructive", label: "İptal" },
    };
    const { variant, label } = config[status] || { variant: "outline" as const, label: status };
    return <Badge variant={variant}>{label}</Badge>;
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Randevular</h1>
          <p className="text-slate-600">Tüm randevuları yönetin</p>
        </div>
        <Button variant="outline" onClick={fetchAppointments}>
          <RefreshCw className="mr-2 h-4 w-4" />
          Yenile
        </Button>
      </div>

      {/* Filters */}
      <div className="flex gap-2 flex-wrap">
        {[
          { value: "all", label: "Tümü" },
          { value: "pending", label: "Bekleyen" },
          { value: "confirmed", label: "Onaylanan" },
          { value: "completed", label: "Tamamlanan" },
          { value: "cancelled", label: "İptal" },
        ].map((f) => (
          <Button
            key={f.value}
            variant={filter === f.value ? "default" : "outline"}
            size="sm"
            onClick={() => setFilter(f.value)}
            className={filter === f.value ? "bg-sky-500 hover:bg-sky-600" : ""}
          >
            {f.label}
          </Button>
        ))}
      </div>

      {/* Appointments List */}
      <div className="space-y-4">
        {filteredAppointments.length === 0 ? (
          <Card>
            <CardContent className="p-12 text-center text-slate-500">
              Bu kategoride randevu bulunmuyor.
            </CardContent>
          </Card>
        ) : (
          filteredAppointments.map((apt) => (
            <Card key={apt.id}>
              <CardContent className="p-4">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                  <div className="flex items-center gap-4">
                    <div className="h-12 w-12 rounded-full bg-sky-100 flex items-center justify-center text-sky-600 font-bold shrink-0">
                      {apt.patientName.charAt(0)}
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <p className="font-semibold text-slate-900">
                          {apt.patientName}
                        </p>
                        {getStatusBadge(apt.status)}
                      </div>
                      <p className="text-sm text-slate-600">
                        {apt.doctorName} • {formatDate(apt.appointmentDate)}{" "}
                        {apt.startTime}
                      </p>
                      <div className="flex items-center gap-3 mt-1 text-sm text-slate-500">
                        <span className="flex items-center gap-1">
                          <Phone className="h-3 w-3" />
                          {apt.patientPhone}
                        </span>
                        {apt.patientEmail && (
                          <span className="flex items-center gap-1">
                            <Mail className="h-3 w-3" />
                            {apt.patientEmail}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                  <div className="flex gap-2 flex-wrap">
                    {apt.status === "pending" && (
                      <>
                        <Button
                          size="sm"
                          onClick={() => updateStatus(apt.id, "confirmed")}
                          className="bg-green-600 hover:bg-green-700"
                        >
                          <CheckCircle className="mr-1 h-4 w-4" />
                          Onayla
                        </Button>
                        <Button
                          size="sm"
                          variant="destructive"
                          onClick={() => updateStatus(apt.id, "cancelled")}
                        >
                          <XCircle className="mr-1 h-4 w-4" />
                          İptal
                        </Button>
                      </>
                    )}
                    {apt.status === "confirmed" && (
                      <Button
                        size="sm"
                        onClick={() => updateStatus(apt.id, "completed")}
                        className="bg-purple-600 hover:bg-purple-700"
                      >
                        Tamamlandı
                      </Button>
                    )}
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => openEditDialog(apt)}
                    >
                      Düzenle
                    </Button>
                    {!apt.reminderSent && apt.status !== "cancelled" && (
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => sendReminder(apt)}
                      >
                        <MessageSquare className="mr-1 h-4 w-4" />
                        Hatırlat
                      </Button>
                    )}
                  </div>
                </div>
                {apt.notes && (
                  <div className="mt-3 p-3 bg-slate-50 rounded-lg text-sm text-slate-600">
                    <strong>Not:</strong> {apt.notes}
                  </div>
                )}
              </CardContent>
            </Card>
          ))
        )}
      </div>

      {/* Edit Dialog */}
      <Dialog open={editDialogOpen} onOpenChange={setEditDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Randevu Düzenle</DialogTitle>
            <DialogDescription>
              {selectedAppointment?.patientName} -{" "}
              {selectedAppointment?.doctorName}
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label>Tarih</Label>
              <Input
                type="date"
                value={editDate}
                onChange={(e) => setEditDate(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label>Saat</Label>
              <Input
                type="time"
                value={editTime}
                onChange={(e) => setEditTime(e.target.value)}
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setEditDialogOpen(false)}>
              İptal
            </Button>
            <Button onClick={saveEdit} className="bg-sky-500 hover:bg-sky-600">
              Kaydet
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
