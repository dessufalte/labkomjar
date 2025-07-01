// app/api/users/route.js
import prisma from "@/lib/prima";

export async function GET() {
  // Mengambil data users
  const users = await prisma.user.findMany();
  return new Response(JSON.stringify(users), { status: 200 });
}

export async function POST(request) {
  const { name, password } = await request.json();

  // Menambah data user baru
  const user = await prisma.user.create({
    data: {
      name,
      password,
      createdAt
    },
  });

  return new Response(JSON.stringify(user), { status: 201 });
}

export async function PUT(request) {
  const { id, name, password } = await request.json();

  // Update data user
  const user = await prisma.user.update({
    where: { id },
    data: {
      name,
      password,
      
    },
  });

  return new Response(JSON.stringify(user), { status: 200 });
}

export async function DELETE(request) {
  const { id } = await request.json();

  // Hapus user
  await prisma.user.delete({
    where: { id },
  });

  return new Response(null, { status: 204 });
}
