// app/api/praktikum/route.js

import prisma from "@/lib/prima";

export async function GET(request) {
  console.log("📥 Masuk ke route handler");

  try {
    const praktikum = await prisma.Prak.findMany({
      orderBy: {
        id: "asc",
      },
    });

    console.log("📤 Data berhasil diambil:", praktikum);

    return new Response(JSON.stringify(praktikum), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
      },
    });

  } catch (error) {
    let message = "Unknown error";

    // Tangani jika error adalah instance Error atau bukan object
    if (error instanceof Error) {
      message = error.message;
    } else if (typeof error === "string") {
      message = error;
    } else if (typeof error === "object" && error !== null) {
      try {
        message = JSON.stringify(error);
      } catch {
        message = "[unserializable error object]";
      }
    }

    console.error("❌ Error:", message);

    return new Response(
      JSON.stringify({ message: "Terjadi kesalahan pada server" }),
      {
        status: 500,
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
  }
}
