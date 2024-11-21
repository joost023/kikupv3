export function generateWordSearch(words: string[]) {
  const size = 12;
  const grid: string[][] = Array(size).fill(null).map(() => Array(size).fill(''));
  const placedWords: { word: string; start: [number, number]; direction: [number, number] }[] = [];

  // All possible directions
  const directions: [number, number][] = [
    [0, 1],   // right
    [1, 0],   // down
    [1, 1],   // diagonal down-right
    [-1, 1],  // diagonal up-right
  ];

  function canPlaceWord(
    word: string,
    startRow: number,
    startCol: number,
    direction: [number, number]
  ): boolean {
    const [dRow, dCol] = direction;
    
    for (let i = 0; i < word.length; i++) {
      const row = startRow + i * dRow;
      const col = startCol + i * dCol;
      
      if (row < 0 || row >= size || col < 0 || col >= size) {
        return false;
      }
      
      if (grid[row][col] !== '' && grid[row][col] !== word[i]) {
        return false;
      }
    }
    
    return true;
  }

  function placeWord(
    word: string,
    startRow: number,
    startCol: number,
    direction: [number, number]
  ) {
    const [dRow, dCol] = direction;
    
    for (let i = 0; i < word.length; i++) {
      const row = startRow + i * dRow;
      const col = startCol + i * dCol;
      grid[row][col] = word[i];
    }
    
    placedWords.push({ word, start: [startRow, startCol], direction });
  }

  // Try to place each word
  for (const word of words) {
    let placed = false;
    let attempts = 0;
    const maxAttempts = 100;

    while (!placed && attempts < maxAttempts) {
      const direction = directions[Math.floor(Math.random() * directions.length)];
      const [dRow, dCol] = direction;
      
      // Calculate valid starting positions based on direction and word length
      const maxRow = dRow === 0 ? size - 1 : size - dRow * word.length;
      const maxCol = dCol === 0 ? size - 1 : size - dCol * word.length;
      const minRow = dRow < 0 ? Math.abs(dRow) * (word.length - 1) : 0;
      const minCol = dCol < 0 ? Math.abs(dCol) * (word.length - 1) : 0;
      
      const startRow = minRow + Math.floor(Math.random() * (maxRow - minRow + 1));
      const startCol = minCol + Math.floor(Math.random() * (maxCol - minCol + 1));

      if (canPlaceWord(word, startRow, startCol, direction)) {
        placeWord(word, startRow, startCol, direction);
        placed = true;
      }

      attempts++;
    }

    if (!placed) {
      console.error(`Could not place word: ${word}`);
    }
  }

  // Fill empty cells with random letters
  const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  for (let i = 0; i < size; i++) {
    for (let j = 0; j < size; j++) {
      if (grid[i][j] === '') {
        grid[i][j] = letters[Math.floor(Math.random() * letters.length)];
      }
    }
  }

  return { grid, placedWords };
}