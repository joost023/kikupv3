import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatTime(seconds: number): string {
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
}

export interface HighScore {
  name: string;
  time: number;
  word: string;
  date: string;
  gameId: string;
}

const STORAGE_KEY = 'kikup_highscores';

export function getLocalHighScores(gameId?: string): HighScore[] {
  try {
    const scores = localStorage.getItem(STORAGE_KEY);
    const allScores = scores ? JSON.parse(scores) : [];
    
    if (gameId) {
      return allScores.filter((score: HighScore) => score.gameId === gameId);
    }
    
    return allScores;
  } catch (error) {
    console.error('Error loading high scores:', error);
    return [];
  }
}

export function isNewHighScore(time: number, gameId: string): boolean {
  const scores = getLocalHighScores(gameId);
  return scores.length < 5 || time < Math.max(...scores.map(s => s.time));
}

export function saveHighScore(score: HighScore): HighScore[] {
  try {
    const allScores = getLocalHighScores();
    const gameScores = allScores.filter(s => s.gameId === score.gameId);
    const otherScores = allScores.filter(s => s.gameId !== score.gameId);
    
    const newGameScores = [...gameScores, score]
      .sort((a, b) => a.time - b.time)
      .slice(0, 5);
    
    const updatedScores = [...otherScores, ...newGameScores];
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedScores));
    
    return newGameScores;
  } catch (error) {
    console.error('Error saving high score:', error);
    return [];
  }
}

// Game IDs for consistent reference
export const GAME_IDS = {
  WORD_GAME: 'word-game',
  MEMORY: 'memory',
  WORD_SEARCH: 'word-search',
  TETRIS: 'tetris',
  SUDOKU: 'sudoku',
  SNAKE: 'snake'
} as const;

// Tetris colors
export const TETRIS_COLORS = {
  I: '#38F8AC', // KIKUP green
  O: '#FFD700', // Gold
  T: '#FF69B4', // Hot Pink
  S: '#00CED1', // Dark Turquoise
  Z: '#9370DB', // Medium Purple
  J: '#FFA500', // Orange
  L: '#4169E1'  // Royal Blue
};