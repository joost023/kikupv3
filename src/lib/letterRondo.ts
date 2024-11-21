import words from '@/data/words.json';

const VOWELS = ['A', 'E', 'I', 'O', 'U'];
const CONSONANTS = ['B', 'C', 'D', 'F', 'G', 'H', 'J', 'K', 'L', 'M', 'N', 'P', 'R', 'S', 'T', 'V', 'W', 'Z'];

export function generateLetterSet() {
  // Generate center letter (more likely to be a vowel)
  const centerLetter = Math.random() < 0.4 
    ? VOWELS[Math.floor(Math.random() * VOWELS.length)]
    : CONSONANTS[Math.floor(Math.random() * CONSONANTS.length)];

  // Generate surrounding letters (balanced mix of vowels and consonants)
  const surroundingLetters = [];
  const numVowels = 2 + Math.floor(Math.random() * 2); // 2-3 vowels
  const numConsonants = 8 - numVowels; // remaining spots for consonants

  // Add vowels
  for (let i = 0; i < numVowels; i++) {
    let letter;
    do {
      letter = VOWELS[Math.floor(Math.random() * VOWELS.length)];
    } while (surroundingLetters.includes(letter) || letter === centerLetter);
    surroundingLetters.push(letter);
  }

  // Add consonants
  for (let i = 0; i < numConsonants; i++) {
    let letter;
    do {
      letter = CONSONANTS[Math.floor(Math.random() * CONSONANTS.length)];
    } while (surroundingLetters.includes(letter) || letter === centerLetter);
    surroundingLetters.push(letter);
  }

  // Shuffle surrounding letters
  for (let i = surroundingLetters.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [surroundingLetters[i], surroundingLetters[j]] = [surroundingLetters[j], surroundingLetters[i]];
  }

  return {
    centerLetter,
    surroundingLetters
  };
}

export function isValidWord(word: string, centerLetter: string, availableLetters: string[]): boolean {
  // Convert to uppercase for comparison
  word = word.toUpperCase();
  centerLetter = centerLetter.toUpperCase();
  const allLetters = [...availableLetters, centerLetter];

  // Check if word exists in dictionary
  if (!words.includes(word.toLowerCase())) {
    return false;
  }

  // Check if word contains center letter
  if (!word.includes(centerLetter)) {
    return false;
  }

  // Check if word only uses available letters
  const letterCounts = new Map<string, number>();
  allLetters.forEach(letter => {
    letterCounts.set(letter, (letterCounts.get(letter) || 0) + 1);
  });

  const wordLetterCounts = new Map<string, number>();
  word.split('').forEach(letter => {
    wordLetterCounts.set(letter, (wordLetterCounts.get(letter) || 0) + 1);
  });

  for (const [letter, count] of wordLetterCounts) {
    const availableCount = letterCounts.get(letter) || 0;
    if (count > availableCount) {
      return false;
    }
  }

  return true;
}