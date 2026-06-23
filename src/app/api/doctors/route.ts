import { NextRequest, NextResponse } from "next/server";

// Demo doctors data
const demoDoctors = [
  {
    id: "1",
    name: "Dr. Ahmet Kansu",
    specialty: "Genel Diş Hekimliği",
    email: "ahmet@kansudis.com",
    phone: "0500 111 22 33",
    imageUrl: null,
    bio: "15 yıllık deneyim ile genel diş hekimliği ve implant tedavileri.",
    isActive: true,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: "2",
    name: "Dr. Ayşe Yılmaz",
    specialty: "Ortodonti",
    email: "ayse@kansudis.com",
    phone: "0500 222 33 44",
    imageUrl: null,
    bio: "Ortodontik tedaviler ve diş telleri konusunda uzman.",
    isActive: true,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: "3",
    name: "Dr. Mehmet Demir",
    specialty: "Endodonti",
    email: "mehmet@kansudis.com",
    phone: "0500 333 44 55",
    imageUrl: null,
    bio: "Kanal tedavisi ve diş pulp hastalıkları uzmanı.",
    isActive: true,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: "4",
    name: "Dr. Zeynep Kaya",
    specialty: "Pedodonti",
    email: "zeynep@kansudis.com",
    phone: "0500 444 55 66",
    imageUrl: null,
    bio: "Çocuk diş hekimliği alanında uzman.",
    isActive: true,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: "5",
    name: "Dr. Ali Çelik",
    specialty: "Diş Cerrahisi",
    email: "ali@kansudis.com",
    phone: "0500 555 66 77",
    imageUrl: null,
    bio: "Diş çekimi, implant cerrahisi ve ağız cerrahisi uzmanı.",
    isActive: true,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
];

export async function GET() {
  // In production, fetch from database
  // const doctors = await prisma.doctor.findMany({ where: { isActive: true } });
  return NextResponse.json(demoDoctors);
}

export async function POST(request: NextRequest) {
  const body = await request.json();
  // In production, save to database
  // const doctor = await prisma.doctor.create({ data: body });
  return NextResponse.json({ id: "new-id", ...body }, { status: 201 });
}
