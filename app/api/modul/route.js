import prisma from "@/lib/prima";

export async function GET() {
  const modul = await prisma.modul.findMany();
  return new Response(JSON.stringify(modul), { status: 200 });
}

export async function POST(request) {
  const { judul_modul, prakid } = await request.json();
  const modul = await prisma.modul.create({
    data: { judul_modul, prakid },
  });
  return new Response(JSON.stringify(modul), { status: 201 });
}

export async function PUT(request) {
  const { id, judul_modul, prakid } = await request.json();
  const modul = await prisma.modul.update({
    where: { id },
    data: { judul_modul, prakid },
  });
  return new Response(JSON.stringify(modul), { status: 200 });
}

export async function DELETE(request) {
  const { id } = await request.json();
  await prisma.modul.delete({
    where: { id },
  });
  return new Response(null, { status: 204 });
}
