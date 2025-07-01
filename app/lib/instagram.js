// lib/instagram.js

// Fungsi untuk mengambil postingan Instagram terbaru dari profil publik
export async function getInstagramPosts() {
  const username = process.env.INSTAGRAM_USERNAME;

  if (!username) {
    console.error("Error: INSTAGRAM_USERNAME tidak ditemukan di file .env.local");
    return [];
  }

  // --- URL ENDPOINT YANG DIPERBARUI ---
  // Metode ini menambahkan parameter khusus untuk meminta data JSON langsung dari halaman profil.
  const url = `https://www.instagram.com/u/${username}/?__a=1&__d=dis`;
  
  console.log(`[DEBUG] Mencoba mengambil data dari URL: ${url}`);

  try {
    const response = await fetch(url, {
      headers: {
        // User-Agent tetap penting untuk meniru browser
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/109.0.0.0 Safari/537.36',
      },
      // Nonaktifkan cache Next.js untuk debugging, bisa diaktifkan kembali nanti
      cache: 'no-store', 
    });

    if (!response.ok) {
      // Memberikan log yang lebih detail jika terjadi error
      console.error(`[ERROR] Respons dari Instagram: ${response.status} ${response.statusText}`);
      const errorText = await response.text();
      console.error(`[ERROR] Body Respons: ${errorText.substring(0, 500)}...`); // Tampilkan sebagian kecil dari body error
      throw new Error(`Gagal mengambil data Instagram. Status: ${response.status}`);
    }

    const data = await response.json();
    
    // --- JALUR DATA JSON YANG DIPERBARUI ---
    // Struktur JSON dari endpoint baru ini berbeda.
    const posts = data?.graphql?.user?.edge_owner_to_timeline_media?.edges;

    if (!posts) {
      console.warn("Tidak ada postingan yang ditemukan atau struktur data Instagram berubah lagi.");
      return [];
    }

    // Memformat data (logika ini sebagian besar tetap sama)
    return posts.map(({ node }) => ({
      id: node.id,
      imageUrl: node.display_url, 
      postUrl: `https://www.instagram.com/p/${node.shortcode}/`, 
      caption: node.edge_media_to_caption?.edges[0]?.node?.text || "Tidak ada caption",
      likes: node.edge_media_like?.count,
      comments: node.edge_media_to_comment?.count,
      isVideo: node.is_video,
    }));

  } catch (error) {
    console.error("Terjadi kesalahan fatal saat mengambil postingan Instagram:", error.message);
    return [];
  }
}
