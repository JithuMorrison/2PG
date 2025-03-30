import React, { useState, useEffect } from 'react';

const generateInitialGrid = (size) => {
  const grid = Array(size)
    .fill(null)
    .map(() => Array(size).fill(0));

  addRandomTile(grid);
  addRandomTile(grid);
  return grid;
};

const addRandomTile = (grid) => {
  const empty = [];
  grid.forEach((row, rIdx) => {
    row.forEach((cell, cIdx) => {
      if (cell === 0) empty.push([rIdx, cIdx]);
    });
  });

  if (empty.length > 0) {
    const [r, c] = empty[Math.floor(Math.random() * empty.length)];
    grid[r][c] = Math.random() < 0.9 ? 2 : 4;
  }
};

const Game2048Lite = () => {
  const size = 3; // 3x3 grid for simplicity
  const [grid, setGrid] = useState(generateInitialGrid(size));
  const [gameOver, setGameOver] = useState(false);

  const handleKeyDown = (e) => {
    if (gameOver) return;

    let newGrid = [...grid.map(row => [...row])];
    let moved = false;

    const moveRowLeft = (row) => {
      let arr = row.filter(val => val !== 0);
      for (let i = 0; i < arr.length - 1; i++) {
        if (arr[i] === arr[i + 1]) {
          arr[i] *= 2;
          arr[i + 1] = 0;
        }
      }
      return arr.filter(val => val !== 0).concat(Array(size - arr.filter(val => val !== 0).length).fill(0));
    };

    const rotateGrid = (g, clockwise = true) => {
      const newG = Array(size).fill(null).map(() => Array(size).fill(0));
      for (let r = 0; r < size; r++) {
        for (let c = 0; c < size; c++) {
          if (clockwise) newG[c][size - 1 - r] = g[r][c];
          else newG[size - 1 - c][r] = g[r][c];
        }
      }
      return newG;
    };

    const isGridEqual = (a, b) => {
      return a.every((row, r) => row.every((val, c) => val === b[r][c]));
    };

    let originalGrid = [...newGrid.map(row => [...row])];

    switch (e.key) {
      case 'ArrowLeft':
        newGrid = newGrid.map(row => moveRowLeft(row));
        break;
      case 'ArrowRight':
        newGrid = newGrid.map(row => moveRowLeft(row.reverse()).reverse());
        break;
      case 'ArrowUp':
        newGrid = rotateGrid(newGrid, false);
        newGrid = newGrid.map(row => moveRowLeft(row));
        newGrid = rotateGrid(newGrid, true);
        break;
      case 'ArrowDown':
        newGrid = rotateGrid(newGrid, false);
        newGrid = newGrid.map(row => moveRowLeft(row.reverse()).reverse());
        newGrid = rotateGrid(newGrid, true);
        break;
      default:
        return;
    }

    if (!isGridEqual(originalGrid, newGrid)) {
      addRandomTile(newGrid);
      setGrid(newGrid);
    } else {
      checkGameOver(grid);
    }
  };

  const checkGameOver = (grid) => {
    for (let r = 0; r < size; r++) {
      for (let c = 0; c < size; c++) {
        if (grid[r][c] === 0) return false;
        if (c < size - 1 && grid[r][c] === grid[r][c + 1]) return false;
        if (r < size - 1 && grid[r][c] === grid[r + 1][c]) return false;
      }
    }
    setGameOver(true);
    return true;
  };

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  });

  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      fontFamily: 'Arial, sans-serif'
    }}>
      <h1>2048 Lite - 3x3</h1>
      <div style={{
        display: 'grid',
        gridTemplateColumns: `repeat(${size}, 80px)`,
        gap: '10px'
      }}>
        {grid.map((row, rowIndex) =>
          row.map((cell, colIndex) => (
            <div key={`${rowIndex}-${colIndex}`} style={{
              width: '80px',
              height: '80px',
              backgroundColor: cell === 0 ? '#ccc' : '#e0c282',
              color: '#333',
              fontSize: '24px',
              fontWeight: 'bold',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              borderRadius: '8px',
              boxShadow: 'inset 0 0 5px #aaa'
            }}>
              {cell !== 0 ? cell : ''}
            </div>
          ))
        )}
      </div>
      {gameOver && <h2 style={{ color: 'red', marginTop: '20px' }}>Game Over!</h2>}
      <p style={{ marginTop: '20px' }}>Use arrow keys to play</p>
    </div>
  );
};

export default Game2048Lite;