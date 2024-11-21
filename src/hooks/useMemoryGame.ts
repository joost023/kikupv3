import { useState, useCallback, useEffect } from 'react';
import { useToast } from '@/hooks/use-toast';
import { getLocalHighScores, saveHighScore, isNewHighScore, GAME_IDS } from '@/lib/utils';
import { getMemoryCards } from '@/lib/memoryCards';
import type { MemoryCard } from '@/types/memory';

export function useMemoryGame() {
  const [cards, setCards] = useState<MemoryCard[]>([]);
  const [flippedIndices, setFlippedIndices] = useState<number[]>([]);
  const [matchedPairs, setMatchedPairs] = useState<number[]>([]);
  const [moves, setMoves] = useState(0);
  const [isWinner, setIsWinner] = useState(false);
  const [gameStarted, setGameStarted] = useState(false);
  const [timerRunning, setTimerRunning] = useState(false);
  const [showNameDialog, setShowNameDialog] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [highScores, setHighScores] = useState(() => 
    getLocalHighScores(GAME_IDS.MEMORY)
  );
  const { toast } = useToast();

  const resetGame = useCallback(() => {
    const shuffledCards = getMemoryCards();
    setCards(shuffledCards);
    setFlippedIndices([]);
    setMatchedPairs([]);
    setMoves(0);
    setIsWinner(false);
    setGameStarted(false);
    setTimerRunning(false);
    setCurrentTime(0);
    setShowNameDialog(false);
  }, []);

  useEffect(() => {
    resetGame();
  }, [resetGame]);

  const handleTimerComplete = useCallback((time: number) => {
    if (isWinner) {
      setCurrentTime(time);
      if (isNewHighScore(time, GAME_IDS.MEMORY)) {
        setShowNameDialog(true);
      }
    }
  }, [isWinner]);

  const checkForWin = useCallback(() => {
    if (matchedPairs.length === cards.length && cards.length > 0) {
      setIsWinner(true);
      setTimerRunning(false);
      toast({
        title: "Gefeliciteerd!",
        description: "Je hebt alle paren gevonden!",
      });
    }
  }, [cards.length, matchedPairs.length, toast]);

  const handleCardClick = useCallback((index: number) => {
    if (flippedIndices.length === 2) return;

    if (!gameStarted) {
      setGameStarted(true);
      setTimerRunning(true);
    }

    setFlippedIndices(prev => [...prev, index]);

    if (flippedIndices.length === 1) {
      setMoves(prev => prev + 1);
      
      const firstCard = cards[flippedIndices[0]];
      const secondCard = cards[index];

      if (firstCard.id === secondCard.id) {
        setMatchedPairs(prev => [...prev, flippedIndices[0], index]);
        setFlippedIndices([]);
      } else {
        setTimeout(() => {
          setFlippedIndices([]);
        }, 1000);
      }
    }
  }, [cards, flippedIndices, gameStarted]);

  useEffect(() => {
    checkForWin();
  }, [matchedPairs.length, checkForWin]);

  const handleNameSubmit = useCallback((name: string) => {
    const newScore = {
      name,
      time: currentTime,
      word: `Memory - ${moves} moves`,
      date: new Date().toLocaleDateString(),
      gameId: GAME_IDS.MEMORY
    };
    const updatedScores = saveHighScore(newScore);
    setHighScores(updatedScores);
    setShowNameDialog(false);
    resetGame();
  }, [currentTime, moves, resetGame]);

  return {
    cards,
    flippedIndices,
    matchedPairs,
    moves,
    isWinner,
    timerRunning,
    showNameDialog,
    currentTime,
    highScores,
    handleCardClick,
    handleTimerComplete,
    handleNameSubmit,
    resetGame
  };
}