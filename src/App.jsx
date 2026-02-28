import React, { useState, useMemo } from 'react';
import { Search, Gamepad2, X, Maximize2, ExternalLink } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import gamesData from './games.json';

export default function App() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedGame, setSelectedGame] = useState(null);
  const [isFullscreen, setIsFullscreen] = useState(false);

  const filteredGames = useMemo(() => {
    return gamesData.filter(game => 
      game.title.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [searchQuery]);

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen();
      setIsFullscreen(true);
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen();
        setIsFullscreen(false);
      }
    }
  };

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-zinc-100 font-sans selection:bg-emerald-500/30">
      {/* Header */}
      <header className="sticky top-0 z-40 border-b border-white/5 bg-[#0a0a0a]/80 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-emerald-500 rounded-lg flex items-center justify-center">
              <Gamepad2 className="w-5 h-5 text-black" />
            </div>
            <h1 className="text-xl font-bold tracking-tight bg-gradient-to-r from-white to-zinc-400 bg-clip-text text-transparent">
              Unblocked Hub
            </h1>
          </div>

          <div className="relative flex-1 max-w-md mx-4">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500" />
            <input
              type="text"
              placeholder="Search games..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-zinc-900/50 border border-white/10 rounded-full py-2 pl-10 pr-4 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/50 transition-all"
            />
          </div>

          <div className="hidden sm:flex items-center gap-4 text-sm font-medium text-zinc-400">
            <a href="#" className="hover:text-white transition-colors">Home</a>
            <a href="#" className="hover:text-white transition-colors">Categories</a>
            <a href="#" className="hover:text-white transition-colors">About</a>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col gap-8">
          {/* Hero Section */}
          <section className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-emerald-500/10 to-transparent border border-white/5 p-8 sm:p-12">
            <div className="relative z-10 max-w-2xl">
              <h2 className="text-4xl sm:text-5xl font-bold mb-4 tracking-tight">
                Play Anywhere, <br />
                <span className="text-emerald-500">No Restrictions.</span>
              </h2>
              <p className="text-zinc-400 text-lg mb-8">
                Access your favorite web games instantly. Fast, free, and completely unblocked for school or work.
              </p>
              <button 
                onClick={() => setSelectedGame(gamesData[0])}
                className="bg-emerald-500 hover:bg-emerald-400 text-black font-semibold px-6 py-3 rounded-xl transition-all active:scale-95 flex items-center gap-2"
              >
                Play Random Game
              </button>
            </div>
            <div className="absolute top-0 right-0 w-1/2 h-full opacity-20 pointer-events-none">
               <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-emerald-500/40 via-transparent to-transparent blur-3xl"></div>
            </div>
          </section>

          {/* Games Grid */}
          <section>
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-semibold">Popular Games</h3>
              <span className="text-xs text-zinc-500 uppercase tracking-widest">{filteredGames.length} Games Found</span>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              <AnimatePresence mode="popLayout">
                {filteredGames.map((game) => (
                  <motion.div
                    key={game.id}
                    layout
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    whileHover={{ y: -4 }}
                    className="group relative bg-zinc-900/50 border border-white/5 rounded-2xl overflow-hidden cursor-pointer"
                    onClick={() => setSelectedGame(game)}
                  >
                    <div className="aspect-video overflow-hidden">
                      <img
                        src={game.thumbnail}
                        alt={game.title}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                        referrerPolicy="no-referrer"
                      />
                    </div>
                    <div className="p-4">
                      <div className="flex items-center justify-between">
                        <h4 className="font-medium text-zinc-100">{game.title}</h4>
                        <div className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                          <Maximize2 className="w-4 h-4 text-zinc-400" />
                        </div>
                      </div>
                    </div>
                    <div className="absolute inset-0 bg-emerald-500/10 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>

            {filteredGames.length === 0 && (
              <div className="text-center py-20">
                <p className="text-zinc-500">No games found matching your search.</p>
              </div>
            )}
          </section>
        </div>
      </main>

      {/* Game Modal */}
      <AnimatePresence>
        {selectedGame && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-8 bg-black/95 backdrop-blur-sm"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="relative w-full max-w-6xl h-full flex flex-col bg-zinc-900 rounded-3xl border border-white/10 overflow-hidden shadow-2xl"
            >
              {/* Modal Header */}
              <div className="flex items-center justify-between p-4 border-b border-white/5">
                <div className="flex items-center gap-3">
                  <h3 className="text-lg font-semibold">{selectedGame.title}</h3>
                  <span className="text-xs px-2 py-1 bg-emerald-500/10 text-emerald-500 rounded-md border border-emerald-500/20">
                    Live
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={toggleFullscreen}
                    className="p-2 hover:bg-white/5 rounded-lg text-zinc-400 hover:text-white transition-colors"
                    title="Fullscreen"
                  >
                    <Maximize2 className="w-5 h-5" />
                  </button>
                  <a
                    href={selectedGame.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 hover:bg-white/5 rounded-lg text-zinc-400 hover:text-white transition-colors"
                    title="Open in new tab"
                  >
                    <ExternalLink className="w-5 h-5" />
                  </a>
                  <button
                    onClick={() => setSelectedGame(null)}
                    className="p-2 hover:bg-white/5 rounded-lg text-zinc-400 hover:text-white transition-colors"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>
              </div>

              {/* Game Viewport */}
              <div className="flex-1 bg-black relative">
                <iframe
                  src={selectedGame.url}
                  className="w-full h-full border-0"
                  allow="fullscreen; autoplay; encrypted-media; picture-in-picture"
                  title={selectedGame.title}
                />
              </div>

              {/* Modal Footer */}
              <div className="p-4 bg-zinc-900/50 flex items-center justify-between text-xs text-zinc-500">
                <div className="flex items-center gap-4">
                  <span>Powered by Unblocked Hub</span>
                  <span>•</span>
                  <span>Safe & Secure</span>
                </div>
                <div className="flex items-center gap-2">
                  <span>Report Issue</span>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Footer */}
      <footer className="border-t border-white/5 py-12 mt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-8">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 bg-zinc-800 rounded flex items-center justify-center">
              <Gamepad2 className="w-4 h-4 text-zinc-400" />
            </div>
            <span className="text-sm font-semibold text-zinc-400">Unblocked Hub</span>
          </div>
          <p className="text-zinc-500 text-sm">
            © {new Date().getFullYear()} Unblocked Hub. All games are property of their respective owners.
          </p>
          <div className="flex items-center gap-6 text-sm text-zinc-500">
            <a href="#" className="hover:text-white transition-colors">Privacy</a>
            <a href="#" className="hover:text-white transition-colors">Terms</a>
            <a href="#" className="hover:text-white transition-colors">Contact</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
