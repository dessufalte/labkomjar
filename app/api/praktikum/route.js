import prisma from "@/lib/prima";

export async function GET() {
  const praktikum = await prisma.prak.findMany();
  return new Response(JSON.stringify(praktikum), { status: 200 });
}

export async function POST(request) {
  const { title, description } = await request.json();
  const praktikum = await prisma.prak.create({
    data: { title, description },
  });
  return new Response(JSON.stringify(praktikum), { status: 201 });
}

export async function PUT(request) {
  const { id, title, description } = await request.json();
  const praktikum = await prisma.prak.update({
    where: { id },
    data: { title, description },
  });
  return new Response(JSON.stringify(praktikum), { status: 200 });
}

export async function DELETE(request) {
  const { id } = await request.json();
  await prisma.prak.delete({
    where: { id },
  });
  return new Response(null, { status: 204 });
}
