import { NextRequest, NextResponse } from "next/server";

// Demo appointments storage
const demoAppointments: Array<{
  id: string;
  doctorId: string;
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
  doctorName?: string;
}> = [
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
];

export async function GET() {
  // In production, fetch from database with doctor info
  return NextResponse.json(demoAppointments);
}

export async function POST(request: NextRequest) {
  const body = await request.json();

  // In production, save to database
  const newAppointment = {
    id: `apt-${Date.now()}`,
    ...body,
    status: "pending",
    reminderSent: false,
    createdAt: new Date().toISOString(),
  };

  demoAppointments.push(newAppointment);

  // Here you would send notification to admin
  // await sendEmail({ to: adminEmail, subject: "Yeni Randevu İsteği", ... });

  return NextResponse.json(newAppointment, { status: 201 });
}

export async function PUT(request: NextRequest) {
  const body = await request.json();
  const { id, ...updateData } = body;

  // In production, update in database
  const index = demoAppointments.findIndex((apt) => apt.id === id);
  if (index !== -1) {
    demoAppointments[index] = { ...demoAppointments[index], ...updateData };
    return NextResponse.json(demoAppointments[index]);
  }

  return NextResponse.json({ error: "Appointment not found" }, { status: 404 });
}
