// Sudoku generator and solver
export function generateSudoku(difficulty: 'easy' | 'medium' | 'hard' = 'medium') {
  // Create a solved Sudoku grid
  const solvedGrid = createSolvedGrid();
  
  // Remove numbers based on difficulty
  const cellsToRemove = {
    easy: 30,
    medium: 40,
    hard: 50
  }[difficulty];

  const puzzle = solvedGrid.map(row => [...row]);
  let removed = 0;

  while (removed < cellsToRemove) {
    const row = Math.floor(Math.random() * 9);
    const col = Math.floor(Math.random() * 9);
    
    if (puzzle[row][col] !== 0) {
      puzzle[row][col] = 0;
      removed++;
    }
  }

  return {
    initial: puzzle,
    solution: solvedGrid
  };
}

function createSolvedGrid(): number[][] {
  const grid = Array(9).fill(0).map(() => Array(9).fill(0));
  fillGrid(grid);
  return grid;
}

function fillGrid(grid: number[][]): boolean {
  for (let row = 0; row < 9; row++) {
    for (let col = 0; col < 9; col++) {
      if (grid[row][col] === 0) {
        const numbers = shuffle([1, 2, 3, 4, 5, 6, 7, 8, 9]);
        
        for (const num of numbers) {
          if (isValid(grid, row, col, num)) {
            grid[row][col] = num;
            
            if (fillGrid(grid)) {
              return true;
            }
            
            grid[row][col] = 0;
          }
        }
        return false;
      }
    }
  }
  return true;
}

function isValid(grid: number[][], row: number, col: number, num: number): boolean {
  // Check row
  for (let x = 0; x < 9; x++) {
    if (grid[row][x] === num) return false;
  }
  
  // Check column
  for (let x = 0; x < 9; x++) {
    if (grid[x][col] === num) return false;
  }
  
  // Check 3x3 box
  const boxRow = Math.floor(row / 3) * 3;
  const boxCol = Math.floor(col / 3) * 3;
  
  for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 3; j++) {
      if (grid[boxRow + i][boxCol + j] === num) return false;
    }
  }
  
  return true;
}

function shuffle<T>(array: T[]): T[] {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

export function checkSolution(grid: number[][], solution: number[][]): boolean {
  return grid.every((row, i) => 
    row.every((cell, j) => cell === solution[i][j])
  );
}