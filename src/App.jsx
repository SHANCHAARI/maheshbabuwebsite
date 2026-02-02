import React, { useEffect, useState } from 'react';
import Lenis from 'lenis';
import './styles/global.css';
import CustomCursor from './components/CustomCursor';
import Home from './scenes/Home';
import MovieUniverse from './scenes/MovieUniverse';
import MovieDetail from './scenes/MovieDetail';
import PosterWall from './scenes/PosterWall';
import SongMoments from './scenes/SongMoments';
import SoulWall from './scenes/SoulWall';

import { soundManager } from './utils/SoundManager';

function App() {
  const [selectedMovie, setSelectedMovie] = useState(null);

  // Initialize sound on first click anywhere
  useEffect(() => {
    const initSound = () => {
      soundManager.init();
      window.removeEventListener('click', initSound);
    };
    window.addEventListener('click', initSound);
    return () => window.removeEventListener('click', initSound);
  }, []);

  useEffect(() => {
    const lenis = new Lenis({
      duration: 0.8, // Tighter, less floaty
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      direction: 'vertical',
      gestureDirection: 'vertical',
      smooth: true,
      mouseMultiplier: 0.8, // Slower scrolling for weight
      smoothTouch: false,
      touchMultiplier: 1.5,
    });

    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    return () => {
      lenis.destroy();
    };
  }, []);

  return (
    <div className="App" onClick={() => soundManager.init()}> {/* Global Click to start Audio */}
      <CustomCursor />

      {/* Cinematic Detail Overlay */}
      {selectedMovie && (
        <MovieDetail movie={selectedMovie} onClose={() => setSelectedMovie(null)} />
      )}

      <main>
        <Home />
        <MovieUniverse onMovieSelect={setSelectedMovie} />
        <PosterWall />
        <SongMoments />
        <SoulWall />
      </main>
    </div>
  );
}

export default App;
