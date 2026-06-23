import { NextRequest, NextResponse } from "next/server";

// Demo availability data
const demoAvailability: Record<string, Array<{ time: string; available: boolean }>> = {};

// Generate random availability for demo
function generateAvailability(doctorId: string, dateStr: string) {
  const key = `${doctorId}-${dateStr}`;
  if (!demoAvailability[key]) {
    const slots = [];
    for (let h = 9; h < 18; h++) {
      slots.push({ time: `${h.toString().padStart(2, "0")}:00`, available: Math.random() > 0.3 });
      slots.push({ time: `${h.toString().padStart(2, "0")}:30`, available: Math.random() > 0.3 });
    }
    demoAvailability[key] = slots;
  }
  return demoAvailability[key];
}

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const doctorId = searchParams.get("doctorId");
  const date = searchParams.get("date");

  if (!doctorId || !date) {
    return NextResponse.json(
      { error: "doctorId and date are required" },
      { status: 400 }
    );
  }

  // In production, fetch from database
  // const availability = await prisma.availability.findMany({
  //   where: { doctorId, isAvailable: true }
  // });
  // Then filter by date and existing appointments

  const dateStr = new Date(date).toISOString().split("T")[0];
  const slots = generateAvailability(doctorId, dateStr);

  return NextResponse.json(slots);
}
