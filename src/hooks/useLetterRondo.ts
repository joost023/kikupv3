import { useState, useCallback, useEffect } from 'react';
import { useToast } from '@/hooks/use-toast';
import { generateLetterSet, isValidWord } from '@/lib/letterRondo';
import { getLocalHighScores, saveHighScore, isNewHighScore, GAME_IDS } from '@/lib/utils';

export function useLetterRondo() {
  const [centerLetter, setCenterLetter] = useState('');
  const [surroundingLetters, setSurroundingLetters] = useState<string[]>([]);
  const [currentWord, setCurrentWord] = useState('');
  const [foundWords, setFoundWords] = useState<string[]>([]);
  const [longestWord, setLongestWord] = useState('');
  const [isWinner, setIsWinner] = useState(false);
  const [gameStarted, setGameStarted] = useState(false);
  const [timerRunning, setTimerRunning] = useState(false);
  const [showNameDialog, setShowNameDialog] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [highScores, setHighScores] = useState(() => 
    getLocalHighScores(GAME_IDS.LETTER_RONDO)
  );
  const { toast } = useToast();

  const initGame = useCallback(() => {
    const { centerLetter: newCenter, surroundingLetters: newSurrounding } = generateLetterSet();
    setCenterLetter(newCenter);
    setSurroundingLetters(newSurrounding);
    setCurrentWord('');
    setFoundWords([]);
    setLongestWord('');
    setIsWinner(false);
    setGameStarted(false);
    setTimerRunning(false);
    setCurrentTime(0);
    setShowNameDialog(false);
  }, []);

  useEffect(() => {
    initGame();
  }, [initGame]);

  const handleLetterClick = useCallback((letter: string) => {
    if (!gameStarted) {
      setGameStarted(true);
      setTimerRunning(true);
    }
    
    setCurrentWord(prev => prev + letter);
  }, [gameStarted]);

  const handleSubmitWord = useCallback(() => {
    if (currentWord.length < 3) {
      toast({
        title: "Woord te kort",
        description: "Woorden moeten minimaal 3 letters lang zijn",
        variant: "destructive"
      });
      return;
    }

    if (foundWords.includes(currentWord.toLowerCase())) {
      toast({
        title: "Woord al gevonden",
        description: "Probeer een ander woord",
        variant: "destructive"
      });
      return;
    }

    if (isValidWord(currentWord, centerLetter, surroundingLetters)) {
      setFoundWords(prev => [...prev, currentWord.toLowerCase()]);
      
      if (currentWord.length > longestWord.length) {
        setLongestWord(currentWord);
        toast({
          title: "Nieuw langste woord!",
          description: `${currentWord} (${currentWord.length} letters)`,
        });

        // Als het woord 8 of meer letters heeft, win je het spel
        if (currentWord.length >= 8) {
          setIsWinner(true);
          setTimerRunning(false);
        }
      } else {
        toast({
          title: "Geldig woord",
          description: `${currentWord} (${currentWord.length} letters)`,
        });
      }
    } else {
      toast({
        title: "Ongeldig woord",
        description: "Dit woord is niet geldig of gebruikt niet de juiste letters",
        variant: "destructive"
      });
    }

    setCurrentWord('');
  }, [currentWord, centerLetter, surroundingLetters, longestWord, foundWords, toast]);

  const handleReset = useCallback(() => {
    setCurrentWord('');
  }, []);

  const handleTimerComplete = useCallback((time: number) => {
    if (isWinner) {
      setCurrentTime(time);
      if (isNewHighScore(time, GAME_IDS.LETTER_RONDO)) {
        setShowNameDialog(true);
      }
    }
  }, [isWinner]);

  const handleNameSubmit = useCallback((name: string) => {
    const newScore = {
      name,
      time: currentTime,
      word: `Letterrondo - ${longestWord} (${longestWord.length} letters)`,
      date: new Date().toLocaleDateString(),
      gameId: GAME_IDS.LETTER_RONDO
    };
    const updatedScores = saveHighScore(newScore);
    setHighScores(updatedScores);
    setShowNameDialog(false);
    initGame();
  }, [currentTime, longestWord, initGame]);

  return {
    centerLetter,
    surroundingLetters,
    currentWord,
    foundWords,
    longestWord,
    isWinner,
    timerRunning,
    showNameDialog,
    currentTime,
    highScores,
    handleLetterClick,
    handleSubmitWord,
    handleReset,
    handleTimerComplete,
    handleNameSubmit,
    initGame
  };
}