// pages/projects/[name].js atau app/projects/[name]/page.js
import { notFound } from 'next/navigation';
import Link from 'next/link';
import Navbar from "../../_Components/navbar";
import { getRepository, getLanguages, getCommits } from "@/lib/github";

// Fungsi helper untuk mendapatkan warna berdasarkan bahasa pemrograman
const getLanguageColor = (lang) => {
  const colors = {
    JavaScript: '#f1e05a',
    HTML: '#e34c26',
    CSS: '#563d7c',
    Python: '#3572A5',
    Java: '#b07219',
    TypeScript: '#2b7489',
    Shell: '#89e051',
    C: '#555555',
    'C++': '#f34b7d',
    PHP: '#4F5D95',
    Ruby: '#701516',
    Go: '#00ADD8',
    Swift: '#ffac45',
    Kotlin: '#F18E33',
    Rust: '#dea584',
    Vue: '#41b883',
    Svelte: '#ff3e00',
    Other: '#ededed'
  };
  return colors[lang] || colors['Other'];
};


const ProjectDetail = async ({ params }) => {
  const { name } = params;
  const [projectData, languages, commits] = await Promise.all([
    getRepository(name),
    getLanguages(name),
    getCommits(name, 5)
  ]);

  if (!projectData.repo) {
    notFound();
  }

  const { repo, contents, readme } = projectData;

  // Hitung persentase bahasa
  const totalBytes = Object.values(languages).reduce((sum, bytes) => sum + bytes, 0);
  const languagePercentages = Object.entries(languages).map(([lang, bytes]) => ({
    name: lang,
    percentage: ((bytes / totalBytes) * 100).toFixed(1),
    color: getLanguageColor(lang)
  })).sort((a, b) => b.percentage - a.percentage);

  return (
    <div className="bg-slate-700 w-full min-h-screen">
      <Navbar />
      
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Breadcrumb */}
        <nav className="mb-6">
          <div className="flex items-center space-x-2 text-sm">
            <Link href="/projects" className="text-blue-400 hover:text-blue-300">
              Projects
            </Link>
            <svg className="w-4 h-4 text-slate-400" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
            </svg>
            <span className="text-slate-300">{repo.name}</span>
          </div>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Konten Utama */}
          <div className="lg:col-span-3">
            {/* Header Repositori */}
            <div className="bg-slate-800 rounded-lg border border-slate-600 p-6 mb-6">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <div className="flex items-center space-x-2 mb-2">
                    <svg className="w-5 h-5 text-slate-400" fill="currentColor" viewBox="0 0 16 16">
                      <path d="M2 2.5A2.5 2.5 0 014.5 0h8.75a.75.75 0 01.75.75v12.5a.75.75 0 01-.75.75h-2.5a.75.75 0 110-1.5h1.75v-2h-8a1 1 0 00-.714 1.7.75.75 0 01-1.072 1.05A2.495 2.495 0 012 11.5v-9zm10.5-1V9h-8c-.356 0-.694.074-1 .208V2.5a1 1 0 011-1h8zM5 12.25v3.25a.25.25 0 00.4.2l1.45-1.087a.25.25 0 01.3 0L8.6 15.7a.25.25 0 00.4-.2v-3.25a.25.25 0 00-.25-.25h-3.5a.25.25 0 00-.25.25z"/>
                    </svg>
                    <h1 className="text-2xl font-bold text-blue-400">{repo.name}</h1>
                    <span className="text-xs bg-slate-700 text-slate-300 px-2 py-1 rounded-full border border-slate-600">
                      {repo.visibility || 'Public'}
                    </span>
                  </div>
                  
                  {repo.description && (
                    <p className="text-slate-300 mb-4">{repo.description}</p>
                  )}

                  {repo.homepage && (
                    <div className="mb-4">
                      <a 
                        href={repo.homepage}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center space-x-1 text-blue-400 hover:text-blue-300 text-sm"
                      >
                        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M12.586 4.586a2 2 0 112.828 2.828l-3 3a2 2 0 01-2.828 0 1 1 0 00-1.414 1.414 4 4 0 005.656 0l3-3a4 4 0 00-5.656-5.656l-1.5 1.5a1 1 0 101.414 1.414l1.5-1.5zm-5 5a2 2 0 012.828 0 1 1 0 101.414-1.414 4 4 0 00-5.656 0l-3 3a4 4 0 105.656 5.656l1.5-1.5a1 1 0 10-1.414-1.414l-1.5 1.5a2 2 0 11-2.828-2.828l3-3z" clipRule="evenodd" />
                        </svg>
                        <span>{repo.homepage}</span>
                      </a>
                    </div>
                  )}
                </div>

                <div className="flex items-center space-x-2">
                  <a
                    href={repo.html_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-slate-700 hover:bg-slate-600 text-slate-200 px-4 py-2 rounded-lg border border-slate-600 transition-colors duration-200 text-sm font-medium"
                  >
                    View on GitHub
                  </a>
                  
                  {repo.clone_url && (
                    <button
                      onClick={() => navigator.clipboard.writeText(repo.clone_url)}
                      className="bg-green-700 hover:bg-green-600 text-white px-4 py-2 rounded-lg transition-colors duration-200 text-sm font-medium"
                    >
                      Clone
                    </button>
                  )}
                </div>
              </div>

              {/* Statistik Repositori */}
              <div className="flex items-center space-x-6 text-sm text-slate-400">
                <div className="flex items-center space-x-1">
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 16 16">
                    <path d="M8 .25a.75.75 0 01.673.418l1.882 3.815 4.21.612a.75.75 0 01.416 1.279l-3.046 2.97.719 4.192a.75.75 0 01-1.088.791L8 12.347l-3.766 1.98a.75.75 0 01-1.088-.79l.719-4.192L.818 6.374a.75.75 0 01.416-1.28l4.21-.611L7.327.668A.75.75 0 018 .25z"/>
                  </svg>
                  <span>{repo.stargazers_count} stars</span>
                </div>
                
                <div className="flex items-center space-x-1">
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 16 16">
                    <path d="M5 3.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm0 2.122a2.25 2.25 0 10-1.5 0v.878A2.25 2.25 0 005.75 8.5h1.5v2.128a2.251 2.251 0 101.5 0V8.5h1.5a2.25 2.25 0 002.25-2.25v-.878a2.25 2.25 0 10-1.5 0v.878a.75.75 0 01-.75.75h-4.5A.75.75 0 015 6.25v-.878z"/>
                  </svg>
                  <span>{repo.forks_count} forks</span>
                </div>

                <div className="flex items-center space-x-1">
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 16 16">
                    <path d="M8 9.5a1.5 1.5 0 100-3 1.5 1.5 0 000 3z"/>
                    <path fillRule="evenodd" d="M8 0a8 8 0 100 16A8 8 0 008 0zM1.5 8a6.5 6.5 0 1113 0 6.5 6.5 0 01-13 0z" clipRule="evenodd"/>
                  </svg>
                  <span>{repo.open_issues_count} issues</span>
                </div>

                <span>Updated {new Date(repo.updated_at).toLocaleDateString()}</span>
              </div>
            </div>

            {/* Browser File */}
            <div className="bg-slate-800 rounded-lg border border-slate-600 mb-6">
              <div className="border-b border-slate-600 p-4">
                <h2 className="text-lg font-semibold text-slate-200">Files</h2>
              </div>
              
              <div className="divide-y divide-slate-600">
                {contents.map((item) => (
                  <div key={item.name} className="flex items-center justify-between p-4 hover:bg-slate-700/50 transition-colors duration-200">
                    <div className="flex items-center space-x-3">
                      <div className="text-blue-400">
                        {item.type === 'dir' ? (
                          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 16 16">
                            <path d="M1.75 1A1.75 1.75 0 000 2.75v10.5C0 14.216.784 15 1.75 15h12.5A1.75 1.75 0 0016 13.25v-8.5A1.75 1.75 0 0014.25 3H7.5a.25.25 0 01-.2-.1l-.9-1.2C6.07 1.26 5.55 1 5 1H1.75z"/>
                          </svg>
                        ) : (
                          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 16 16">
                            <path d="M2 1.75C2 .784 2.784 0 3.75 0h6.586c.464 0 .909.184 1.237.513l2.914 2.914c.329.328.513.773.513 1.237v9.586A1.75 1.75 0 0113.25 16h-9.5A1.75 1.75 0 012 14.25V1.75zm1.75-.25a.25.25 0 00-.25.25v12.5c0 .138.112.25.25.25h9.5a.25.25 0 00.25-.25V6h-2.75A1.75 1.75 0 019 4.25V1.5H3.75zm6.75.062V4.25c0 .138.112.25.25.25h2.688a.252.252 0 00-.011-.013l-2.914-2.914a.246.246 0 00-.013-.011z"/>
                          </svg>
                        )}
                      </div>
                      <span className="text-slate-200 font-medium">{item.name}</span>
                    </div>
                    
                    <div className="text-slate-400 text-sm">
                      {item.size && `${(item.size / 1024).toFixed(1)} KB`}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* README */}
            {readme && (
              <div className="bg-slate-800 rounded-lg border border-slate-600">
                <div className="border-b border-slate-600 p-4">
                  <h2 className="text-lg font-semibold text-slate-200 flex items-center">
                    <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 16 16">
                      <path d="M0 1.75C0 .784.784 0 1.75 0h12.5C15.216 0 16 .784 16 1.75v12.5A1.75 1.75 0 0114.25 16H1.75A1.75 1.75 0 010 14.25V1.75zm1.75-.25a.25.25 0 00-.25.25v12.5c0 .138.112.25.25.25h12.5a.25.25 0 00.25-.25V1.75a.25.25 0 00-.25-.25H1.75z"/>
                      <path d="M3.5 3.75a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM4.25 7a.75.75 0 000 1.5h5a.75.75 0 000-1.5h-5zm0 3.25a.75.75 0 000 1.5h7.5a.75.75 0 000-1.5h-7.5z"/>
                    </svg>
                    README.md
                  </h2>
                </div>
                
                <div className="p-6">
                  <div className="prose prose-invert max-w-none">
                    <pre className="whitespace-pre-wrap text-slate-300 text-sm leading-relaxed">
                      {readme}
                    </pre>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="space-y-6">
              {/* Bahasa */}
              {languagePercentages.length > 0 && (
                <div className="bg-slate-800 rounded-lg border border-slate-600 p-4">
                  <h3 className="font-semibold text-slate-200 mb-3">Languages</h3>
                  
                  {/* Bilah Bahasa */}
                  <div className="mb-3">
                    <div className="flex rounded-full overflow-hidden h-2">
                      {languagePercentages.map((lang) => (
                        <div
                          key={lang.name}
                          className="h-full"
                          style={{
                            backgroundColor: lang.color,
                            width: `${lang.percentage}%`
                          }}
                        />
                      ))}
                    </div>
                  </div>

                  {/* Daftar Bahasa */}
                  <div className="space-y-2">
                    {languagePercentages.slice(0, 5).map((lang) => (
                      <div key={lang.name} className="flex items-center justify-between text-sm">
                        <div className="flex items-center space-x-2">
                          <span
                            className="w-3 h-3 rounded-full"
                            style={{ backgroundColor: lang.color }}
                          />
                          <span className="text-slate-300">{lang.name}</span>
                        </div>
                        <span className="text-slate-400">{lang.percentage}%</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Commit Terbaru */}
              {commits.length > 0 && (
                <div className="bg-slate-800 rounded-lg border border-slate-600 p-4">
                  <h3 className="font-semibold text-slate-200 mb-3">Recent Commits</h3>
                  
                  <div className="space-y-3">
                    {commits.slice(0, 3).map((commit) => (
                      <div key={commit.sha} className="border-l-2 border-blue-500 pl-3">
                        <p className="text-slate-300 text-sm line-clamp-2 mb-1">
                          {commit.commit.message.split('\n')[0]}
                        </p>
                        <div className="flex items-center space-x-2 text-xs text-slate-400">
                          <span>{commit.commit.author.name}</span>
                          <span>•</span>
                          <span>{new Date(commit.commit.author.date).toLocaleDateString()}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Info Repositori */}
              <div className="bg-slate-800 rounded-lg border border-slate-600 p-4">
                <h3 className="font-semibold text-slate-200 mb-3">About</h3>
                
                <div className="space-y-3 text-sm">
                  {repo.topics && repo.topics.length > 0 && (
                    <div>
                      <div className="flex flex-wrap gap-1">
                        {repo.topics.map((topic) => (
                          <span
                            key={topic}
                            className="bg-blue-900/30 text-blue-300 px-2 py-1 rounded-full text-xs border border-blue-700"
                          >
                            {topic}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}

                  <div className="space-y-2 text-slate-400">
                    <div className="flex items-center space-x-2">
                      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 16 16">
                        <path d="M1.75 1A1.75 1.75 0 000 2.75v10.5C0 14.216.784 15 1.75 15h12.5A1.75 1.75 0 0016 13.25v-8.5A1.75 1.75 0 0014.25 3H7.5a.25.25 0 01-.2-.1l-.9-1.2C6.07 1.26 5.55 1 5 1H1.75z"/>
                      </svg>
                      <span>{repo.size} KB</span>
                    </div>
                    
                    <div className="flex items-center space-x-2">
                      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 16 16">
                        <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.64 3.75-1.07.28-.87.51-1.07.51-.17.55-.38.55-.19 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95z"/>
                      </svg>
                      <span>{repo.license ? repo.license.name : 'No license'}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectDetail;
