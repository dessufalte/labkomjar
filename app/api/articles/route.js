import prisma from "@/lib/prima";

export async function GET() {
  const articles = await prisma.post.findMany({
    include: {
      author: true,
    },
  });
  return new Response(JSON.stringify(articles), { status: 200 });
}

export async function POST(request) {
  const { title, content, authorId } = await request.json();

  // Validasi apakah authorId ada
  if (!authorId) {
    return new Response(JSON.stringify({ error: "Author ID is required" }), {
      status: 400,
    });
  }

  try {
    // Periksa apakah authorId valid di database
    const author = await prisma.user.findUnique({
      where: { id: authorId },
    });

    // Jika author tidak ditemukan, kembalikan error
    if (!author) {
      return new Response(
        JSON.stringify({ error: "Invalid Author ID. User not found." }),
        { status: 400 }
      );
    }

    // Membuat artikel baru
    const article = await prisma.post.create({
      data: {
        title,
        content,
        userId: authorId, // Relasi dengan authorId
      },
    });

    return new Response(JSON.stringify(article), { status: 201 });
  } catch (error) {
    console.error("Error creating article:", error); // Log error lebih rinci
    return new Response(
      JSON.stringify({
        error: "Failed to create article",
        details: error.message,
      }),
      { status: 500 }
    );
  }
}

export async function PUT(request) {
  const { id, title, content } = await request.json();
  const article = await prisma.post.update({
    where: { id },
    data: { title, content, author },
  });
  return new Response(JSON.stringify(article), { status: 200 });
}

export async function DELETE(request) {
  const { id } = await request.json();
  await prisma.post.delete({
    where: { id },
  });
  return new Response(null, { status: 204 });
}
