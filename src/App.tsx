import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Play, 
  Info, 
  Search, 
  Bell, 
  User, 
  ChevronRight, 
  ChevronLeft, 
  Plus, 
  X,
  Volume2,
  VolumeX,
  Star,
  Film,
  Tv,
  AlertCircle
} from 'lucide-react';
import { MOVIES_DATA, CATEGORIES } from './types';
import { fetchTrending, fetchByGenre, searchMovies, fetchVideos, getImageUrl, getFullMovieUrl, TMDBMovie, GENRES } from './services/tmdbService';

export default function App() {
  const [selectedCategory, setSelectedCategory] = useState('Todos');
  const [searchQuery, setSearchQuery] = useState('');
  const [movies, setMovies] = useState<TMDBMovie[]>([]);
  const [selectedMovie, setSelectedMovie] = useState<TMDBMovie | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [videoUrl, setVideoUrl] = useState<string | null>(null);
  const [playMode, setPlayMode] = useState<'trailer' | 'full'>('full');
  const [selectedSeason, setSelectedSeason] = useState(1);
  const [selectedEpisode, setSelectedEpisode] = useState(1);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const [isLoading, setIsLoading] = useState(true);
  const [apiKeyMissing, setApiKeyMissing] = useState(false);

  useEffect(() => {
    const checkApiKey = () => {
      if (!import.meta.env.VITE_TMDB_API_KEY) {
        setApiKeyMissing(true);
        // Fallback to mock data if no API key
        return false;
      }
      return true;
    };

    const loadInitialData = async () => {
      setIsLoading(true);
      if (checkApiKey()) {
        const trending = await fetchTrending();
        setMovies(trending);
      }
      setIsLoading(false);
    };

    loadInitialData();

    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const updateMovies = async () => {
      if (apiKeyMissing) return;
      setIsLoading(true);
      if (searchQuery) {
        const results = await searchMovies(searchQuery);
        setMovies(results);
      } else if (selectedCategory !== 'Todos') {
        const genreId = Object.keys(GENRES).find(key => GENRES[parseInt(key)] === selectedCategory);
        if (genreId) {
          const results = await fetchByGenre(parseInt(genreId));
          setMovies(results);
        }
      } else {
        const trending = await fetchTrending();
        setMovies(trending);
      }
      setIsLoading(false);
    };

    const timeoutId = setTimeout(updateMovies, 500);
    return () => clearTimeout(timeoutId);
  }, [selectedCategory, searchQuery, apiKeyMissing]);

  const featuredMovie = movies.length > 0 ? movies[0] : null;

  const handlePlay = async (movie: TMDBMovie, mode: 'trailer' | 'full' = 'full') => {
    setSelectedMovie(movie);
    setPlayMode(mode);
    
    if (mode === 'trailer') {
      const url = await fetchVideos(movie.id, movie.media_type || 'movie');
      setVideoUrl(url || 'https://www.w3schools.com/html/mov_bbb.mp4');
    } else {
      const url = getFullMovieUrl(movie.id, movie.media_type || 'movie', selectedSeason, selectedEpisode);
      setVideoUrl(url);
    }
    
    setIsPlaying(true);
  };

  const closePlayer = () => {
    setIsPlaying(false);
    setVideoUrl(null);
    setSelectedSeason(1);
    setSelectedEpisode(1);
  };

  const updateEpisode = (ep: number) => {
    setSelectedEpisode(ep);
    if (selectedMovie) {
      const url = getFullMovieUrl(selectedMovie.id, selectedMovie.media_type || 'movie', selectedSeason, ep);
      setVideoUrl(url);
    }
  };

  return (
    <div className="min-h-screen bg-[#0a0502] text-white font-sans selection:bg-orange-500 selection:text-white">
      {/* Navbar */}
      <nav className={`fixed top-0 w-full z-50 transition-all duration-500 ${isScrolled ? 'bg-[#0a0502]/95 backdrop-blur-md border-b border-white/10 py-3' : 'bg-gradient-to-b from-black/80 to-transparent py-5'}`}>
        <div className="max-w-7xl mx-auto px-4 md:px-8 flex items-center justify-between">
          <div className="flex items-center gap-8">
            <h1 className="text-2xl font-black tracking-tighter text-orange-500 italic">CINEDUB</h1>
            <div className="hidden md:flex items-center gap-6 text-sm font-medium text-white/70">
              <button onClick={() => setSelectedCategory('Todos')} className={`hover:text-white transition-colors ${selectedCategory === 'Todos' ? 'text-white' : ''}`}>Início</button>
              <button className="hover:text-white transition-colors">Séries</button>
              <button className="hover:text-white transition-colors">Filmes</button>
              <button className="hover:text-white transition-colors">Bombando</button>
              <button className="hover:text-white transition-colors">Minha Lista</button>
            </div>
          </div>
          
          <div className="flex items-center gap-6">
            <div className="relative group hidden sm:block">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/50 group-focus-within:text-orange-500 transition-colors" />
              <input 
                type="text" 
                placeholder="Títulos, pessoas, gêneros"
                className="bg-white/5 border border-white/10 rounded-full py-1.5 pl-10 pr-4 text-sm focus:outline-none focus:ring-2 focus:ring-orange-500/50 w-48 md:w-64 transition-all"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <Bell className="w-5 h-5 text-white/70 hover:text-white cursor-pointer transition-colors" />
            <div className="w-8 h-8 rounded bg-gradient-to-br from-orange-500 to-red-600 flex items-center justify-center cursor-pointer">
              <User className="w-5 h-5 text-white" />
            </div>
          </div>
        </div>
      </nav>

      {/* API Key Warning */}
      {apiKeyMissing && (
        <div className="fixed top-20 left-1/2 -translate-x-1/2 z-[60] w-full max-w-md px-4">
          <div className="bg-orange-500/10 backdrop-blur-md border border-orange-500/50 p-4 rounded-2xl flex items-start gap-4 shadow-2xl">
            <AlertCircle className="w-6 h-6 text-orange-500 shrink-0" />
            <div>
              <h4 className="text-sm font-black uppercase tracking-wider text-orange-500 mb-1">Configuração Necessária</h4>
              <p className="text-xs text-white/70 leading-relaxed">
                Para ver filmes reais, adicione sua chave da API do TMDB no arquivo <code className="bg-white/10 px-1 rounded">.env</code>. 
                Usando dados de demonstração por enquanto.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Hero Section */}
      {featuredMovie && (
        <section className="relative h-[85vh] w-full overflow-hidden">
          <div className="absolute inset-0">
            <img 
              src={getImageUrl(featuredMovie.backdrop_path)} 
              alt={featuredMovie.title || featuredMovie.name}
              className="w-full h-full object-cover scale-105"
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-[#0a0502] via-[#0a0502]/40 to-transparent" />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0a0502] via-transparent to-black/20" />
          </div>

          <div className="relative h-full max-w-7xl mx-auto px-4 md:px-8 flex flex-col justify-center">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="max-w-2xl"
            >
              <div className="flex items-center gap-2 mb-4">
                <span className="bg-orange-500 text-black text-[10px] font-black px-1.5 py-0.5 rounded uppercase tracking-wider">Original CineDub</span>
                <span className="text-white/60 text-sm font-medium">
                  {(featuredMovie.release_date || featuredMovie.first_air_date || '').split('-')[0]} • {featuredMovie.vote_average.toFixed(1)} ★
                </span>
              </div>
              <h2 className="text-5xl md:text-7xl font-black tracking-tighter mb-4 uppercase italic leading-none">
                {featuredMovie.title || featuredMovie.name}
              </h2>
              <p className="text-lg text-white/80 mb-8 line-clamp-3 font-light leading-relaxed">
                {featuredMovie.overview}
              </p>
            <div className="flex items-center gap-4">
              <button 
                onClick={() => handlePlay(featuredMovie, 'full')}
                className="flex items-center gap-2 bg-white text-black px-8 py-3 rounded-lg font-bold hover:bg-white/90 transition-all transform hover:scale-105 active:scale-95"
              >
                <Play className="w-5 h-5 fill-current" /> Assistir Filme
              </button>
              <button 
                onClick={() => handlePlay(featuredMovie, 'trailer')}
                className="flex items-center gap-2 bg-white/20 backdrop-blur-md text-white px-8 py-3 rounded-lg font-bold hover:bg-white/30 transition-all"
              >
                <Tv className="w-5 h-5" /> Ver Trailer
              </button>
              <button 
                onClick={() => setSelectedMovie(featuredMovie)}
                className="flex items-center gap-2 bg-white/20 backdrop-blur-md text-white px-8 py-3 rounded-lg font-bold hover:bg-white/30 transition-all"
              >
                <Info className="w-5 h-5" /> Mais Informações
              </button>
            </div>
          </motion.div>
        </div>

          <div className="absolute bottom-10 right-8 flex items-center gap-4">
            <button 
              onClick={() => setIsMuted(!isMuted)}
              className="p-3 rounded-full border border-white/20 bg-black/20 backdrop-blur-md hover:bg-white/20 transition-all"
            >
              {isMuted ? <VolumeX className="w-5 h-5" /> : <Volume2 className="w-5 h-5" />}
            </button>
            <div className="bg-white/10 backdrop-blur-md border-l-4 border-white px-4 py-2 text-sm font-bold">
              16+
            </div>
          </div>
        </section>
      )}

      {/* Categories Bar */}
      <div className="sticky top-[64px] z-40 bg-[#0a0502]/80 backdrop-blur-md py-4 border-b border-white/5">
        <div className="max-w-7xl mx-auto px-4 md:px-8 flex items-center gap-3 overflow-x-auto no-scrollbar">
          {CATEGORIES.map(cat => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`whitespace-nowrap px-4 py-1.5 rounded-full text-sm font-bold transition-all ${selectedCategory === cat ? 'bg-orange-500 text-black' : 'bg-white/5 text-white/60 hover:bg-white/10 hover:text-white'}`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Movie Rows */}
      <main className="max-w-7xl mx-auto px-4 md:px-8 py-12 space-y-16">
        <section>
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-2xl font-black tracking-tight uppercase italic flex items-center gap-2">
              <Film className="w-6 h-6 text-orange-500" /> {searchQuery ? `Resultados para "${searchQuery}"` : selectedCategory}
            </h3>
            <div className="flex items-center gap-2 text-white/40 hover:text-white cursor-pointer transition-colors text-sm font-bold">
              Ver tudo <ChevronRight className="w-4 h-4" />
            </div>
          </div>
          
          {isLoading ? (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 md:gap-6">
              {[...Array(10)].map((_, i) => (
                <div key={i} className="aspect-[16/9] rounded-xl bg-white/5 animate-pulse" />
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 md:gap-6">
              {(movies.length > 0 ? movies : (apiKeyMissing ? MOVIES_DATA.map(m => ({
                id: parseInt(m.id),
                title: m.title,
                overview: m.description,
                poster_path: '',
                backdrop_path: '',
                vote_average: m.rating,
                genre_ids: [],
                media_type: m.type as any
              })) : [])).map((movie) => (
                <motion.div
                  key={movie.id}
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  whileHover={{ y: -10 }}
                  className="group relative cursor-pointer"
                  onClick={() => setSelectedMovie(movie as any)}
                >
                  <div className="aspect-[16/9] rounded-xl overflow-hidden bg-white/5 border border-white/10 relative">
                    <img 
                      src={getImageUrl(movie.backdrop_path)} 
                      alt={movie.title || movie.name}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                      <div className="w-12 h-12 rounded-full bg-orange-500 flex items-center justify-center transform scale-0 group-hover:scale-100 transition-transform duration-300">
                        <Play className="w-6 h-6 text-black fill-current ml-1" />
                      </div>
                    </div>
                    <div className="absolute top-2 right-2 flex gap-1">
                      {movie.media_type === 'tv' ? (
                        <span className="bg-blue-500 text-[8px] font-black px-1.5 py-0.5 rounded uppercase tracking-tighter">Série</span>
                      ) : (
                        <span className="bg-orange-500 text-[8px] font-black px-1.5 py-0.5 rounded uppercase tracking-tighter">Filme</span>
                      )}
                    </div>
                  </div>
                  <div className="mt-3">
                    <h4 className="font-bold text-sm line-clamp-1 group-hover:text-orange-500 transition-colors">{movie.title || movie.name}</h4>
                    <div className="flex items-center gap-2 text-[10px] text-white/50 font-medium mt-1">
                      <span>{(movie.release_date || movie.first_air_date || '').split('-')[0]}</span>
                      <span>•</span>
                      <span className="flex items-center gap-0.5"><Star className="w-2.5 h-2.5 text-orange-500 fill-current" /> {movie.vote_average.toFixed(1)}</span>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </section>
      </main>

      {/* Movie Details Modal */}
      <AnimatePresence>
        {selectedMovie && !isPlaying && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-8"
          >
            <div className="absolute inset-0 bg-black/90 backdrop-blur-xl" onClick={() => setSelectedMovie(null)} />
            
            <motion.div 
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              className="relative w-full max-w-5xl bg-[#151619] rounded-3xl overflow-hidden shadow-2xl border border-white/10"
            >
              <button 
                onClick={() => setSelectedMovie(null)}
                className="absolute top-6 right-6 z-10 p-2 rounded-full bg-black/50 hover:bg-black/80 text-white transition-all"
              >
                <X className="w-6 h-6" />
              </button>

              <div className="grid md:grid-cols-2">
                <div className="relative aspect-video md:aspect-auto">
                  <img 
                    src={getImageUrl(selectedMovie.backdrop_path)} 
                    alt={selectedMovie.title || selectedMovie.name}
                    className="w-full h-full object-cover"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 flex items-center justify-center gap-4">
                    <button 
                      onClick={() => handlePlay(selectedMovie, 'full')}
                      className="w-20 h-20 rounded-full bg-orange-500 flex items-center justify-center hover:scale-110 transition-transform shadow-lg group"
                    >
                      <Play className="w-10 h-10 text-black fill-current ml-2 group-hover:scale-110 transition-transform" />
                    </button>
                  </div>
                </div>

                <div className="p-8 md:p-12 flex flex-col">
                  <div className="flex items-center gap-3 mb-4">
                    <span className="text-orange-500 font-black text-xs uppercase tracking-widest">
                      {selectedMovie.genre_ids.map(id => GENRES[id]).filter(Boolean).slice(0, 2).join(' / ') || 'Filme'}
                    </span>
                    <span className="text-white/40">•</span>
                    <span className="text-white/40 text-xs font-bold">
                      {(selectedMovie.release_date || selectedMovie.first_air_date || '').split('-')[0]}
                    </span>
                    <span className="text-white/40">•</span>
                    <div className="flex items-center gap-1 text-orange-500">
                      <Star className="w-3 h-3 fill-current" />
                      <span className="text-xs font-black">{selectedMovie.vote_average.toFixed(1)}</span>
                    </div>
                  </div>

                  <h2 className="text-4xl md:text-5xl font-black tracking-tighter uppercase italic mb-6 leading-none">
                    {selectedMovie.title || selectedMovie.name}
                  </h2>

                  <p className="text-white/70 font-light leading-relaxed mb-8 flex-grow">
                    {selectedMovie.overview}
                  </p>

                  <div className="flex items-center gap-4 mt-auto">
                    <button 
                      onClick={() => handlePlay(selectedMovie, 'full')}
                      className="flex-1 bg-white text-black py-4 rounded-xl font-black uppercase tracking-widest text-xs hover:bg-orange-500 transition-all"
                    >
                      Assistir Filme
                    </button>
                    <button 
                      onClick={() => handlePlay(selectedMovie, 'trailer')}
                      className="flex-1 bg-white/10 text-white py-4 rounded-xl font-black uppercase tracking-widest text-xs hover:bg-white/20 transition-all border border-white/10"
                    >
                      Trailer
                    </button>
                    <button className="p-4 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 transition-all">
                      <Plus className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Video Player Overlay */}
      <AnimatePresence>
        {isPlaying && selectedMovie && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[200] bg-black flex flex-col"
          >
            <div className="absolute top-0 left-0 right-0 p-8 z-10 flex items-center justify-between bg-gradient-to-b from-black/80 to-transparent">
              <div className="flex items-center gap-6">
                <button 
                  onClick={closePlayer}
                  className="p-2 rounded-full hover:bg-white/10 transition-all"
                >
                  <ChevronLeft className="w-8 h-8" />
                </button>
                <div>
                  <h3 className="text-xl font-black tracking-tight uppercase italic">{selectedMovie.title || selectedMovie.name}</h3>
                  {selectedMovie.media_type === 'tv' && playMode === 'full' && (
                    <p className="text-sm text-white/60 font-medium">Temporada {selectedSeason} • Episódio {selectedEpisode}</p>
                  )}
                </div>
              </div>
              <div className="flex items-center gap-4">
                {selectedMovie.media_type === 'tv' && playMode === 'full' && (
                  <div className="flex items-center gap-2 bg-white/10 backdrop-blur-md rounded-lg p-1 border border-white/10">
                    <button 
                      onClick={() => updateEpisode(Math.max(1, selectedEpisode - 1))}
                      className="p-2 hover:bg-white/10 rounded-md transition-all"
                    >
                      <ChevronLeft className="w-4 h-4" />
                    </button>
                    <span className="text-xs font-black px-2">EP {selectedEpisode}</span>
                    <button 
                      onClick={() => updateEpisode(selectedEpisode + 1)}
                      className="p-2 hover:bg-white/10 rounded-md transition-all"
                    >
                      <ChevronRight className="w-4 h-4" />
                    </button>
                  </div>
                )}
                <button className="p-2 rounded-full hover:bg-white/10 transition-all">
                  <Info className="w-6 h-6" />
                </button>
              </div>
            </div>

            <div className="flex-grow relative flex items-center justify-center">
              {videoUrl?.includes('youtube.com/embed') ? (
                <iframe 
                  className="w-full h-full max-h-screen border-none"
                  src={videoUrl}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              ) : (
                <video 
                  autoPlay 
                  controls 
                  className="w-full h-full max-h-screen object-contain"
                  src={videoUrl || ''}
                >
                  Seu navegador não suporta a tag de vídeo.
                </video>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Footer */}
      <footer className="bg-[#050505] border-t border-white/5 py-16">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-12 mb-16">
            <div className="space-y-4">
              <h4 className="text-white font-black uppercase italic tracking-widest text-xs">CineDub</h4>
              <ul className="space-y-2 text-sm text-white/40 font-medium">
                <li className="hover:text-white cursor-pointer transition-colors">Sobre nós</li>
                <li className="hover:text-white cursor-pointer transition-colors">Carreiras</li>
                <li className="hover:text-white cursor-pointer transition-colors">Imprensa</li>
              </ul>
            </div>
            <div className="space-y-4">
              <h4 className="text-white font-black uppercase italic tracking-widest text-xs">Ajuda</h4>
              <ul className="space-y-2 text-sm text-white/40 font-medium">
                <li className="hover:text-white cursor-pointer transition-colors">Central de Ajuda</li>
                <li className="hover:text-white cursor-pointer transition-colors">Termos de Uso</li>
                <li className="hover:text-white cursor-pointer transition-colors">Privacidade</li>
              </ul>
            </div>
            <div className="space-y-4">
              <h4 className="text-white font-black uppercase italic tracking-widest text-xs">Social</h4>
              <ul className="space-y-2 text-sm text-white/40 font-medium">
                <li className="hover:text-white cursor-pointer transition-colors">Instagram</li>
                <li className="hover:text-white cursor-pointer transition-colors">Twitter</li>
                <li className="hover:text-white cursor-pointer transition-colors">Facebook</li>
              </ul>
            </div>
            <div className="space-y-6">
              <h4 className="text-white font-black uppercase italic tracking-widest text-xs">Newsletter</h4>
              <div className="flex gap-2">
                <input 
                  type="email" 
                  placeholder="Seu e-mail"
                  className="bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-orange-500/50 flex-grow"
                />
                <button className="bg-orange-500 text-black px-4 py-2 rounded-lg font-bold text-sm">OK</button>
              </div>
            </div>
          </div>
          <div className="flex flex-col md:flex-row items-center justify-between pt-8 border-t border-white/5 gap-4">
            <p className="text-xs text-white/20 font-medium">© 2026 CineDub Entertainment. Todos os direitos reservados.</p>
            <div className="flex items-center gap-6">
              <span className="text-[10px] text-white/20 font-black uppercase tracking-widest">Feito com Amor no Brasil</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
