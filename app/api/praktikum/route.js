// app/api/praktikum/route.js

import prisma from "@/lib/prima";

export async function GET(request) {
  console.log("📥 Masuk ke route handler");

  try {
    const praktikum = await prisma.Prak.findMany({
      orderBy: {
        id: 'asc',
      },
    });

    console.log("📤 Data berhasil diambil:", praktikum);

    return new Response(JSON.stringify(praktikum), {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
      },
    });

  } catch (error) {
    console.error("❌ Error:", error);
    return new Response(JSON.stringify({ message: "Terjadi kesalahan pada server" }), {
      status: 500,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }
}
