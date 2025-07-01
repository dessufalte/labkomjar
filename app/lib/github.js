// lib/github.js

import { collectSegments } from "next/dist/build/segment-config/app/app-segments";
import { Octokit } from "octokit";

// --- Validasi Variabel Lingkungan ---
const GITHUB_TOKEN = process.env.GITHUB_TOKEN;
const GITHUB_USERNAME = process.env.GITHUB_USERNAME;

if (!GITHUB_USERNAME) {
  throw new Error(
    "FATAL: GITHUB_USERNAME tidak ditemukan di file .env.local Anda."
  );
}

// --- Inisialisasi Klien Octokit ---
// Inisialisasi hanya akan menyertakan auth jika token ada.
const octokit = new Octokit({
  auth: GITHUB_TOKEN,
});

// --- Fungsi API ---

/**
 * Mengambil daftar repositori dari pengguna GitHub yang ditentukan.
 * @returns {Promise<Array>} Sebuah array berisi objek repositori.
 */
// lib/github.js

// ... (kode import dan validasi variabel lainnya)

export async function getRepositories() {
  // TAMBAHKAN BARIS INI UNTUK DEBUGGING
  console.log(
    `[DEBUG] Username yang akan digunakan untuk API call: "${GITHUB_USERNAME}"`
  );

  try {
    const response = await octokit.request("GET /users/{username}/repos", {
      username: GITHUB_USERNAME, // Pastikan variabel ini yang digunakan
      // ... (parameter lainnya)
    });
    console.log(response)
    // ... (sisa kode)
  } catch (error) {
    // ... (sisa kode)
  }
}
