import { Routes, Route, useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import HomePage from './pages/HomePage';
import GamePage from './pages/GamePage';
import GamesPage from './pages/GamesPage';
import MemoryPage from './pages/MemoryPage';
import WordSearchPage from './pages/WordSearchPage';
import TetrisPage from './pages/TetrisPage';
import SudokuPage from './pages/SudokuPage';
import SnakePage from './pages/SnakePage';
import ShopPage from './pages/ShopPage';
import AboutPage from './pages/AboutPage';
import BlogPage from './pages/BlogPage';
import BlogPostPage from './pages/BlogPostPage';
import AdminPage from './pages/AdminPage';
import { Toaster } from './components/ui/toaster';
import * as analytics from './lib/analytics';

export default function App() {
  const location = useLocation();

  useEffect(() => {
    // Track page views
    analytics.pageview(location.pathname + location.search);
  }, [location]);

  return (
    <div className="min-h-screen bg-black text-white">
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/spellen" element={<GamesPage />} />
        <Route path="/kikup-woord-spel" element={<GamePage />} />
        <Route path="/kikup-memory-spel" element={<MemoryPage />} />
        <Route path="/kikup-woordzoeker-spel" element={<WordSearchPage />} />
        <Route path="/kikup-bloks-spel" element={<TetrisPage />} />
        <Route path="/kikup-sudoku-spel" element={<SudokuPage />} />
        <Route path="/kikup-snake-spel" element={<SnakePage />} />
        <Route path="/winkel" element={<ShopPage />} />
        <Route path="/over-ons" element={<AboutPage />} />
        <Route path="/blog" element={<BlogPage />} />
        <Route path="/blog/:id" element={<BlogPostPage />} />
        <Route path="/admin" element={<AdminPage />} />
      </Routes>
      <Toaster />
    </div>
  );
}