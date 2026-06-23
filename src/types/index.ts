export interface Doctor {
  id: string;
  name: string;
  specialty: string;
  email?: string | null;
  phone?: string | null;
  imageUrl?: string | null;
  bio?: string | null;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface Appointment {
  id: string;
  doctorId: string;
  patientName: string;
  patientEmail?: string | null;
  patientPhone: string;
  appointmentDate: Date;
  startTime: string;
  endTime: string;
  status: "pending" | "confirmed" | "cancelled" | "completed";
  notes?: string | null;
  reminderSent: boolean;
  createdAt: Date;
  updatedAt: Date;
  doctor?: Doctor;
}

export interface Availability {
  id: string;
  doctorId: string;
  dayOfWeek: number;
  startTime: string;
  endTime: string;
  isAvailable: boolean;
}

export interface TimeSlot {
  time: string;
  available: boolean;
}

export interface AppointmentInput {
  doctorId: string;
  patientName: string;
  patientEmail?: string;
  patientPhone: string;
  appointmentDate: string;
  startTime: string;
  endTime: string;
  notes?: string;
}
