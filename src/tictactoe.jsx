import React, { useState } from 'react';

const TicTacToe = () => {
  const [board, setBoard] = useState(Array(9).fill(null));
  const [isXNext, setIsXNext] = useState(true);
  const [winner, setWinner] = useState(null);

  // Function to handle a player's move
  const handleClick = (index) => {
    if (board[index] || winner) return; // Ignore if square is already filled or game is over

    const newBoard = board.slice();
    newBoard[index] = isXNext ? 'X' : 'O';
    setBoard(newBoard);
    setIsXNext(!isXNext);

    const gameWinner = calculateWinner(newBoard);
    if (gameWinner) {
      setWinner(gameWinner);
    }
  };

  // Function to calculate the winner
  const calculateWinner = (board) => {
    const lines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];

    for (let i = 0; i < lines.length; i++) {
      const [a, b, c] = lines[i];
      if (board[a] && board[a] === board[b] && board[a] === board[c]) {
        return board[a]; // 'X' or 'O'
      }
    }
    return null;
  };

  // Function to render the board
  const renderSquare = (index) => {
    return (
      <button className="square" onClick={() => handleClick(index)} style={styles.square}>
        {board[index]}
      </button>
    );
  };

  // Function to reset the game
  const resetGame = () => {
    setBoard(Array(9).fill(null));
    setIsXNext(true);
    setWinner(null);
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>Tic Tac Toe</h1>
      {winner ? (
        <h2 style={styles.winnerText}>{winner} Wins!</h2>
      ) : (
        <h2 style={styles.nextPlayerText}>Next Player: {isXNext ? 'X' : 'O'}</h2>
      )}
      <div style={styles.board}>
        {[0, 1, 2].map((row) => (
          <div style={styles.boardRow} key={row}>
            {[0, 1, 2].map((col) => renderSquare(row * 3 + col))}
          </div>
        ))}
      </div>
      <button onClick={resetGame} style={styles.resetButton}>Restart Game</button>
    </div>
  );
};

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: '20px',
    width: '400px',
    margin: '0 auto',
    fontFamily: 'Arial, sans-serif',
    border: '1px solid #ccc',
    borderRadius: '10px',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
  },
  title: {
    fontSize: '24px',
    fontWeight: 'bold',
    marginBottom: '20px',
    color: '#333',
  },
  winnerText: {
    fontSize: '20px',
    fontWeight: 'bold',
    color: '#28A745',
  },
  nextPlayerText: {
    fontSize: '18px',
    color: '#555',
  },
  board: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  boardRow: {
    display: 'flex',
  },
  square: {
    width: '60px',
    height: '60px',
    fontSize: '24px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',   
    margin: '5px',
    backgroundColor: '#f0f0f0',
    border: '2px solid #ddd',
    cursor: 'pointer',
    fontWeight: 'bold',
    color: 'black',
  },
  resetButton: {
    marginTop: '20px',
    padding: '10px 20px',
    fontSize: '16px',
    backgroundColor: '#28A745',
    color: 'white',
    border: 'none',
    cursor: 'pointer',
  },
};

export default TicTacToe;
