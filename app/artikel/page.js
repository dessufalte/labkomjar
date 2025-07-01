// pages/projects.js atau app/projects/page.js
import ThreeLayout from "../_Components/threelayout";
import ListLayout from "../_Components/listlayout";
import Navbar from "../_Components/navbar";
import { getRepositories } from "../lib/github";
import GitHubRepoCard from "./_Components/GitHubRepoCard";
import GitHubStats from "./_Components/GitHubStats";

const BeritaArtikel = async () => {
  // Cek apakah lingkungan saat ini adalah 'development'
  if (process.env.IN_DEV === '1') {
    return (
      <div className="bg-slate-700 w-full min-h-screen">
        <Navbar />
        <div className="flex flex-col items-center justify-center h-[calc(100vh-80px)] text-center px-4">
          {/* Ikon Development dari Font Awesome (sebagai SVG) */}
          <svg 
            className="w-16 h-16 text-cyan-400 mb-6 animate-spin" 
            xmlns="http://www.w3.org/2000/svg" 
            fill="none" 
            viewBox="0 0 24 24" 
            stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
          </svg>
          <h1 className="text-3xl font-bold text-slate-100 mb-2">
            Halaman dalam Pengembangan
          </h1>
          <p className="text-slate-400 max-w-md">
            Komponen lain pada halaman ini disembunyikan sementara untuk mempercepat proses development. Konten akan tampil kembali secara otomatis pada versi produksi.
          </p>
        </div>
      </div>
    );
  }

  // --- Kode Asli Anda Akan Berjalan di Lingkungan Produksi ---
  const repositories = await getRepositories();
  
  // Calculate stats
  const totalStars = repositories.reduce((sum, repo) => sum + repo.stargazers_count, 0);
  const totalForks = repositories.reduce((sum, repo) => sum + repo.forks_count, 0);
  const languages = [...new Set(repositories.map(repo => repo.language).filter(Boolean))];
  
  const featuredRepos = repositories.slice(0, 6);
  const otherRepos = repositories.slice(6);

  return (
    <div className="bg-slate-700 w-full min-h-screen">
      <Navbar />
      <ThreeLayout>
        {/* Sidebar with Stats */}
        <div className="">
          <GitHubStats 
            totalRepos={repositories.length}
            totalStars={totalStars}
            totalForks={totalForks}
            languages={languages}
          />
        </div>

        {/* Main Content */}
        <ListLayout>
          <div className="space-y-8">
            {/* Header */}
            <div>
              <h1 className="font-bold text-3xl text-slate-200 mb-2">
                My Projects
              </h1>
              <p className="text-slate-400 text-sm leading-relaxed">
                A collection of open source projects, experiments, and tools I've built. 
                From web applications to developer utilities, these repositories showcase 
                my journey in software development.
              </p>
            </div>

            {/* Featured Projects */}
            {featuredRepos.length > 0 && (
              <div>
                <h2 className="text-xl font-semibold text-slate-200 mb-4 flex items-center">
                  <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                  Featured Projects
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {featuredRepos.map((repo) => (
                    <GitHubRepoCard key={repo.id} repo={repo} featured={true} />
                  ))}
                </div>
              </div>
            )}

            {/* All Other Projects */}
            {otherRepos.length > 0 && (
              <div>
                <h2 className="text-xl font-semibold text-slate-200 mb-4 flex items-center">
                  <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M3 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd" />
                  </svg>
                  All Projects ({otherRepos.length})
                </h2>
                <div className="space-y-3">
                  {otherRepos.map((repo) => (
                    <GitHubRepoCard key={repo.id} repo={repo} featured={false} />
                  ))}
                </div>
              </div>
            )}

            {/* Empty State */}
            {repositories.length === 0 && (
              <div className="text-center py-12">
                <svg className="w-16 h-16 mx-auto text-slate-500 mb-4" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z" clipRule="evenodd" />
                </svg>
                <h3 className="text-lg font-medium text-slate-300 mb-2">No repositories found</h3>
                <p className="text-slate-500">Check your GitHub token and username configuration.</p>
              </div>
            )}

            {/* View All on GitHub Link */}
            <div className="flex flex-row hover:bg-cyan-700 hover:from-teal-700 transition-all ease-in justify-between items-center bg-gradient-to-r from-cyan-700 to-teal-700 text-white p-4 rounded-lg cursor-pointer">
              <div>
                <h3 className="font-semibold">View all projects on GitHub</h3>
                <p className="text-sm text-slate-200">Explore more repositories and contributions</p>
              </div>
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
            </div>
          </div>
        </ListLayout>
      </ThreeLayout>
    </div>
  );
};

export default BeritaArtikel;
