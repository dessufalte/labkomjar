// app/api/praktikum/[id]/route.js
import prisma from "@/lib/prima";

export async function GET(request, { params }) {
  const { id: idString } = params; // Ambil id sebagai string

  // 1. Validasi: Pastikan ID adalah angka yang valid sebelum di-parse
  const id = parseInt(idString, 10);
  if (isNaN(id)) {
    return new Response(JSON.stringify({ message: "ID harus berupa angka" }), {
      status: 400, // Bad Request
      headers: { 'Content-Type': 'application/json' },
    });
  }

  try {
    // 2. Gunakan ID yang sudah di-parse (bertipe angka) dalam query
    const praktikum = await prisma.prak.findUnique({
      where: {
        id: id, // Sekarang tipe datanya cocok
      },
      include: {
        modul: {
          orderBy: {
            judul_modul: 'asc',
          },
        },
      },
    });

    if (!praktikum) {
      return new Response(JSON.stringify({ message: "Praktikum tidak ditemukan" }), {
        status: 404,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    return new Response(JSON.stringify(praktikum), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });

  } catch (error) {
    console.error(`API Error in GET /api/praktikum/${id}:`, error);
    // 3. Pastikan konstruksi Response di catch block sudah benar
    return new Response(JSON.stringify({ message: "Terjadi kesalahan pada server" }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}
