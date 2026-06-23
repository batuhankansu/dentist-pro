"use client";

import { useState, useEffect } from "react";
import {
  Calendar,
  Users,
  Clock,
  CheckCircle,
  XCircle,
  TrendingUp,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface Appointment {
  id: string;
  doctorName: string;
  patientName: string;
  patientPhone: string;
  appointmentDate: string;
  startTime: string;
  status: string;
}

export default function AdminDashboard() {
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [stats, setStats] = useState({
    total: 0,
    pending: 0,
    confirmed: 0,
    completed: 0,
    cancelled: 0,
  });

  useEffect(() => {
    fetch("/api/appointments")
      .then((res) => res.json())
      .then((data) => {
        setAppointments(data);
        setStats({
          total: data.length,
          pending: data.filter((a: Appointment) => a.status === "pending").length,
          confirmed: data.filter((a: Appointment) => a.status === "confirmed").length,
          completed: data.filter((a: Appointment) => a.status === "completed").length,
          cancelled: data.filter((a: Appointment) => a.status === "cancelled").length,
        });
      })
      .catch(() => {
        // Demo data
        setAppointments([
          {
            id: "1",
            doctorName: "Dr. Ahmet Kansu",
            patientName: "Ahmet Yılmaz",
            patientPhone: "0500 111 22 33",
            appointmentDate: new Date(Date.now() + 86400000).toISOString(),
            startTime: "10:00",
            status: "confirmed",
          },
          {
            id: "2",
            doctorName: "Dr. Ayşe Yılmaz",
            patientName: "Fatma Kaya",
            patientPhone: "0500 444 55 66",
            appointmentDate: new Date(Date.now() + 172800000).toISOString(),
            startTime: "14:00",
            status: "pending",
          },
          {
            id: "3",
            doctorName: "Dr. Ahmet Kansu",
            patientName: "Mehmet Demir",
            patientPhone: "0500 777 88 99",
            appointmentDate: new Date().toISOString(),
            startTime: "11:00",
            status: "completed",
          },
        ]);
        setStats({ total: 3, pending: 1, confirmed: 1, completed: 1, cancelled: 0 });
      });
  }, []);

  const statCards = [
    {
      title: "Toplam Randevu",
      value: stats.total,
      icon: Calendar,
      color: "text-blue-600",
      bg: "bg-blue-100",
    },
    {
      title: "Bekleyen",
      value: stats.pending,
      icon: Clock,
      color: "text-yellow-600",
      bg: "bg-yellow-100",
    },
    {
      title: "Onaylanan",
      value: stats.confirmed,
      icon: CheckCircle,
      color: "text-green-600",
      bg: "bg-green-100",
    },
    {
      title: "Tamamlanan",
      value: stats.completed,
      icon: TrendingUp,
      color: "text-purple-600",
      bg: "bg-purple-100",
    },
  ];

  const getStatusBadge = (status: string) => {
    const variants: Record<string, "default" | "secondary" | "destructive" | "outline"> = {
      pending: "outline",
      confirmed: "default",
      completed: "secondary",
      cancelled: "destructive",
    };
    const labels: Record<string, string> = {
      pending: "Bekliyor",
      confirmed: "Onaylandı",
      completed: "Tamamlandı",
      cancelled: "İptal",
    };
    return (
      <Badge variant={variants[status] || "outline"}>
        {labels[status] || status}
      </Badge>
    );
  };

  const formatDate = (dateStr: string) => {
    return new Date(dateStr).toLocaleDateString("tr-TR", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });
  };

  return (
    <div className="p-6 space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-900">Dashboard</h1>
        <p className="text-slate-600">Hoş geldiniz! İşte genel durum.</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {statCards.map((stat) => (
          <Card key={stat.title}>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-slate-600">{stat.title}</p>
                  <p className="text-3xl font-bold text-slate-900 mt-1">
                    {stat.value}
                  </p>
                </div>
                <div className={`p-3 rounded-lg ${stat.bg}`}>
                  <stat.icon className={`h-6 w-6 ${stat.color}`} />
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Recent Appointments */}
      <Card>
        <CardHeader>
          <CardTitle>Son Randevular</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {appointments.slice(0, 5).map((apt) => (
              <div
                key={apt.id}
                className="flex items-center justify-between p-4 bg-slate-50 rounded-lg"
              >
                <div className="flex items-center gap-4">
                  <div className="h-10 w-10 rounded-full bg-sky-100 flex items-center justify-center text-sky-600 font-medium">
                    {apt.patientName.charAt(0)}
                  </div>
                  <div>
                    <p className="font-medium text-slate-900">
                      {apt.patientName}
                    </p>
                    <p className="text-sm text-slate-600">
                      {apt.doctorName} • {formatDate(apt.appointmentDate)}{" "}
                      {apt.startTime}
                    </p>
                  </div>
                </div>
                {getStatusBadge(apt.status)}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
