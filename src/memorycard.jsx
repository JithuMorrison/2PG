import React, { useState, useEffect } from 'react';

const MemoryCardGame = () => {
  const [count, setCount] = useState(0);
  const [prevCard, setPrevCard] = useState(null);
  const [prevVal, setPrevVal] = useState("");
  const [totalMatched, setTotalMatched] = useState(0);
  const [totalTries, setTotalTries] = useState(6);
  const [message, setMessage] = useState("Number of Tries Left: 6");
  const [types, setTypes] = useState([]);
  const [flippedCards, setFlippedCards] = useState([]);
  const [matchedCards, setMatchedCards] = useState([]);

  const imageList = [
    'https://wallpaperaccess.com/full/536168.jpg',
    'https://th.bing.com/th/id/R.8c5fa4093b79b4af7dfefe6e892b4f00?rik=qJrb4sH6I7HboQ&riu=http%3a%2f%2f1.bp.blogspot.com%2f-xkfWG7QaxHw%2fTWP3ZHrNzJI%2fAAAAAAAAARI%2fZgcKTK5xqaY%2fs1600%2fanimals_664.jpg&ehk=o880F3uJkyNH%2bkiRo2rznrK7dQUS1RgJtFhF%2fiC8zms%3d&risl=&pid=ImgRaw&r=0',
    'https://i0.wp.com/cdn.outdoorhub.com/wp-content/uploads/sites/2/2019/08/StabsGrizzlyBearMountDoogieDowler.jpg',
    'https://th.bing.com/th/id/OIP.I8F_Ea-FKK2wyY3JscaA7QHaE8?rs=1&pid=ImgDetMain',
    'https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/cute-baby-animals-1558535060.jpg?crop=0.752xw:1.00xh;0.125xw,0&resize=640:*',
    'https://th.bing.com/th/id/R.417b3a9823b281eaac5abbd0e18de53f?rik=sFAymY5wYhad%2bQ&riu=http%3a%2f%2fgetwallpapers.com%2fwallpaper%2ffull%2f4%2f4%2f6%2f482684.jpg&ehk=fJDWnP0PzDC2JeLOgqFEMFrFsbtqit5J0%2baxcpxTOpM%3d&risl=&pid=ImgRaw&r=0',
    'https://th.bing.com/th/id/R.5a575bac13497a068affd69c25fe332a?rik=nNjmBWKoUk3QOA&riu=http%3a%2f%2fwww.ontracksafaris.com%2fassets%2fimages%2fsri-510x574.jpg&ehk=46YyWUoSjaThhGBoxoHZi1Si2CLtQ82j2zRg9zmi2z8%3d&risl=&pid=ImgRaw&r=0',
    'https://th.bing.com/th/id/OIP.SdZZIkNrq9GOGBMFHjgUhwHaHa?rs=1&pid=ImgDetMain'
  ];
  
  const resetGame = () => {
    setCount(0);
    setPrevCard(null);
    setPrevVal("");
    setTotalMatched(0);
    setTotalTries(6);
    setMessage("Number of Tries Left: 6");
    setFlippedCards([]);
    setMatchedCards([]);
    setTypes(types.sort(() => Math.random() - 0.5));
  };

  useEffect(() => {
    // Initialize game
    const initialTypes = [0, 1, 2, 3, 4, 6, 3, 5, 5, 6, 0, 4, 7, 7, 1, 2];
    setTypes(initialTypes.sort(() => Math.random() - 0.5));
  }, []);

  const handleCardClick = (index, imgIndex) => {
    if (totalTries === 0 || count >= 2 || flippedCards.includes(index) || matchedCards.includes(index)) {
      return;
    }

    // Flip the card
    setFlippedCards([...flippedCards, index]);
    
    if (count === 0) {
      // First card of the pair
      setCount(1);
      setPrevCard(index);
      setPrevVal(imgIndex);
    } else {
      // Second card of the pair
      setCount(2);
      
      setTimeout(() => {
        if (prevVal === imgIndex) {
          // Match found
          setMatchedCards([...matchedCards, index, prevCard]);
          setTotalMatched(totalMatched + 2);
          
          if (totalMatched + 2 === 16) {
            setMessage("You Win");
          }
        } else {
          // No match
          setFlippedCards(flippedCards.filter(card => card !== prevCard));
          const newTries = totalTries - 1;
          setTotalTries(newTries);
          
          if (newTries === 0) {
            setMessage("You Lose");
          } else {
            setMessage(`Number of Tries Left: ${newTries}`);
          }
        }
        
        // Reset for next turn
        setCount(0);
        setPrevCard(null);
        setPrevVal("");
      }, 1000);
    }
  };

  return (
    <div style={{ fontFamily: 'Arial, sans-serif', textAlign: 'center', marginTop: '-40px' }}>
      <h1>Memory Card Game</h1>
      <div 
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(4, 100px)',
          gap: '10px',
          justifyContent: 'center',
          marginTop: '20px'
        }}
      >
        {types.map((type, index) => {
          const isFlipped = flippedCards.includes(index);
          const isMatched = matchedCards.includes(index);
          
          return (
            <div
              key={index}
              onClick={() => handleCardClick(index, type)}
              style={{
                width: '100px',
                height: '100px',
                backgroundColor: isMatched ? '#8aff8a' : isFlipped ? '#242424' : '#ddd',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '24px',
                cursor: 'pointer',
                borderRadius: '10px',
                transition: '0.3s ease',
                position: 'relative',
                pointerEvents: isMatched ? 'none' : 'auto'
              }}
            >
              {isFlipped && (
                <img 
                  src={imageList[type]} 
                  alt={`Card ${index}`}
                  style={{
                    width: '80%',
                    height: '80%',
                    objectFit: 'cover',
                    borderRadius: '10px'
                  }}
                />
              )}
            </div>
          );
        })}
      </div>
      <div style={{ marginTop: '20px', fontSize: '20px', fontWeight: 'bold' }}>
        {message}
        {(message === "You Win" || message === "You Lose") && (
            <button
              onClick={resetGame}
              style={{
                display: 'block',
                margin: '20px auto 0',
                padding: '10px 20px',
                fontSize: '16px',
                backgroundColor: '#4CAF50',
                color: 'white',
                border: 'none',
                borderRadius: '5px',
                cursor: 'pointer',
                marginTop: '10px',
              }}
            >
              Play Again
            </button>
        )}
      </div>
    </div>
  );
};

export default MemoryCardGame;