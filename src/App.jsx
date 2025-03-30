import { useState } from 'react';
import './App.css';
import TicTacToe from './tictactoe';
import Game2048Lite from './game2048';
import MemoryCardGame from './memorycard';

function App() {
  const [currentSection, setCurrentSection] = useState('TicTacToe');

  const renderSection = () => {
    switch (currentSection) {
      case 'TicTacToe':
        return <TicTacToe />;
      case '2048game':
        return <Game2048Lite/>;
        case 'memorycard':
          return <MemoryCardGame/>;
      // Add more games/components here as needed
      default:
        return <div>Select a game</div>;
    }
  };

  return (
    <div className="App">
      <h1>Choose a Game</h1>
      <select
        value={currentSection}
        onChange={(e) => {
          setCurrentSection(e.target.value);
          e.target.blur(); // 👈 Remove focus
        }}
        style={{ marginBottom: '20px', padding: '5px 10px' }}
      >
        <option value="TicTacToe">Tic Tac Toe</option>
        <option value="2048game">2048 game</option>
        <option value="memorycard">Memory Card</option>
        {/* Add more <option>s here for other games/components */}
      </select>

      {renderSection()}
    </div>
  );
}

export default App;
