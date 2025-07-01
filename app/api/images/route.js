import prisma from "@/lib/prima";

export async function GET() {
  const images = await prisma.image.findMany();
  return new Response(JSON.stringify(images), { status: 200 });
}

export async function POST(request) {
  const { title, url } = await request.json();
  const image = await prisma.image.create({
    data: { title, url },
  });
  return new Response(JSON.stringify(image), { status: 201 });
}

export async function PUT(request) {
  const { id, title, url } = await request.json();
  const image = await prisma.image.update({
    where: { id },
    data: { title, url },
  });
  return new Response(JSON.stringify(image), { status: 200 });
}

export async function DELETE(request) {
  const { id } = await request.json();
  await prisma.image.delete({
    where: { id },
  });
  return new Response(null, { status: 204 });
}
