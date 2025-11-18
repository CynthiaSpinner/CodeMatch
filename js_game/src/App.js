import React, { useEffect, useState } from 'react';
import './styles/App.css';
import DataService from './services/dataService.js';
import Card from './components/Card.js';
import HomeScreen from './components/HomeScreen.js';
import Footer from './components/Footer.js';

function App() {
  const [showHome, setShowHome] = useState(true);
  const [selectedTopic, setSelectedTopic] = useState(null);
  const [cards, setCards] = useState([]);
  const [loading, setLoading] = useState(false);
  const [flippedCards, setFlippedCards] = useState([]);
  const [matchedCards, setMatchedCards] = useState([]);
  const [selectedCards, setSelectedCards] = useState([]);
  const [score, setScore] = useState(0);
  const [bestScore, setBestScore] = useState(0);
  const [isGameComplete, setIsGameComplete] = useState(false);
  const [isResetting, setIsResetting] = useState(false);
  const [gameStarted, setGameStarted] = useState(false);
  const [gameTime, setGameTime] = useState(0);
  const [timerInterval, setTimerInterval] = useState(null);
  const [finalScore, setFinalScore] = useState(0);

  const handleTopicSelect = async (topic) => {
    setSelectedTopic(topic);
    setShowHome(false);
    setLoading(true);
    
    try {
      const result = await DataService.getData(topic, false); // Allow cache on initial load
      if (result && Array.isArray(result) && result.length >= 8) {
        const validCards = result.filter(card => 
          card && card.id && card.type && card.content && card.matchId
        );
        
        if (validCards.length >= 8) {
          setCards(validCards);
          console.log('✅ Game loaded successfully with', validCards.length, 'cards');
        } else {
          console.error('Invalid cards received');
        }
      } else if (result && Array.isArray(result) && result.length < 8) {
        console.warn('Received fewer cards than expected:', result.length);
        const validCards = result.filter(card => 
          card && card.id && card.type && card.content && card.matchId
        );
        if (validCards.length >= 8) {
          setCards(validCards);
        }
      }
    } catch (error) {
      console.error('Error loading game:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleBackToHome = () => {
    setShowHome(true);
    setSelectedTopic(null);
    setCards([]);
    setFlippedCards([]);
    setMatchedCards([]);
    setSelectedCards([]);
    setScore(0);
    setIsGameComplete(false);
    setGameStarted(false);
    setGameTime(0);
    setFinalScore(0);
    if (timerInterval) {
      clearInterval(timerInterval);
      setTimerInterval(null);
    }
  };

  const handleStartGame = () => {
    setGameStarted(true);
    setGameTime(0);
    setScore(0);
    setFlippedCards([]);
    setMatchedCards([]);
    setSelectedCards([]);
    setIsGameComplete(false);
  };

  // Timer effect
  useEffect(() => {
    if (gameStarted && !isGameComplete) {
      const interval = setInterval(() => {
        setGameTime(prev => prev + 1);
      }, 1000);
      setTimerInterval(interval);
      return () => {
        clearInterval(interval);
        setTimerInterval(null);
      };
    } else if (isGameComplete) {
      // Timer will be cleared by the cleanup function above
    }
  }, [gameStarted, isGameComplete]);

  // Check for game completion whenever matched cards change
  useEffect(() => {
    if (cards.length > 0 && matchedCards.length === cards.length && gameStarted) {
      setIsGameComplete(true);
      // Calculate final score based on time (faster = higher score)
      // Base score: 10000, minus 10 points per second
      const calculatedScore = Math.max(0, 10000 - (gameTime * 10));
      setFinalScore(calculatedScore);
      
      // Update best score if needed
      setBestScore(prevBest => {
        if (calculatedScore > prevBest) {
          localStorage.setItem('matchingGameBestScore', calculatedScore.toString());
          return calculatedScore;
        }
        return prevBest;
      });
      
      console.log('Game complete! All cards matched in', gameTime, 'seconds. Score:', calculatedScore);
    } else {
      setIsGameComplete(false);
    }
  }, [matchedCards, cards.length, gameStarted, gameTime]);

  useEffect(() => {
    const savedBestScore = localStorage.getItem('matchingGameBestScore');
    if (savedBestScore) {
      setBestScore(parseInt(savedBestScore));
    }
  }, []);

  const handleCardClick = (cardId) => {
    // Don't allow clicking if game hasn't started
    if (!gameStarted) return;
    
    // Don't allow clicking if 2 cards are already selected
    if (selectedCards.length >= 2) return;
    
    // Don't allow clicking already flipped or matched cards
    if (flippedCards.includes(cardId) || matchedCards.includes(cardId)) return;

    const newSelected = [...selectedCards, cardId];
    setSelectedCards(newSelected);
    setFlippedCards([...flippedCards, cardId]);

    // If 2 cards are selected, check for match
    if (newSelected.length === 2) {
      const [firstId, secondId] = newSelected;
      const firstCard = cards.find(c => c.id === firstId);
      const secondCard = cards.find(c => c.id === secondId);

      // Check if one is question and other is answer, and they match
      if (firstCard && secondCard) {
        // Ensure one is question and one is answer
        if (firstCard.type === secondCard.type) {
          console.log('Both cards are same type, no match');
          setTimeout(() => {
            setFlippedCards(prev => prev.filter(id => !newSelected.includes(id)));
          }, 1000);
          setSelectedCards([]);
          return;
        }

        // Check if they match: either first matches second, or second matches first
        const firstMatchesSecond = firstCard.matchId === secondId;
        const secondMatchesFirst = secondCard.matchId === firstId;
        const isMatch = firstMatchesSecond || secondMatchesFirst;

        console.log('Matching check:', {
          firstCard: {
            id: firstId,
            type: firstCard.type,
            content: firstCard.content.substring(0, 40),
            matchId: firstCard.matchId
          },
          secondCard: {
            id: secondId,
            type: secondCard.type,
            content: secondCard.content.substring(0, 40),
            matchId: secondCard.matchId
          },
          firstMatchesSecond,
          secondMatchesFirst,
          isMatch
        });

        if (isMatch) {
          // Match found!
          setMatchedCards(prev => {
            const newMatched = [...prev, firstId, secondId];
            return newMatched;
          });
          
          setScore(prevScore => prevScore + 1);
          
          console.log('✅ Match found!', {
            question: firstCard.type === 'question' ? firstCard.content : secondCard.content,
            answer: firstCard.type === 'answer' ? firstCard.content : secondCard.content
          });
        } else {
          // No match - flip back after delay
          console.log('❌ No match:', {
            first: firstCard.content.substring(0, 40),
            second: secondCard.content.substring(0, 40),
            reason: `First expects ${firstCard.matchId}, Second expects ${secondCard.matchId}`
          });
          setTimeout(() => {
            setFlippedCards(prev => prev.filter(id => !newSelected.includes(id)));
          }, 1000);
        }
      }
      
      setSelectedCards([]);
    }
  };

  const resetGame = async () => {
    // Prevent multiple simultaneous resets
    if (isResetting || loading) {
      console.log('Reset already in progress, please wait...');
      return;
    }
    
    if (!selectedTopic) {
      console.error('No topic selected');
      return;
    }
    
    setIsResetting(true);
    setLoading(true);
    
    // Clear all game state first
    setFlippedCards([]);
    setMatchedCards([]);
    setSelectedCards([]);
    setScore(0);
    setIsGameComplete(false);
    setGameStarted(false);
    setGameTime(0);
    setFinalScore(0);
    setCards([]); // Clear cards immediately
    if (timerInterval) {
      clearInterval(timerInterval);
      setTimerInterval(null);
    }
    
    // Clear cache to force new randomization
    // The cache will be bypassed by getting fresh data
    
    let attempts = 0;
    const maxAttempts = 3;
    
    while (attempts < maxAttempts) {
      try {
        console.log(`Loading new game data (attempt ${attempts + 1}/${maxAttempts})...`);
        
        const result = await DataService.getData(selectedTopic, true); // Force refresh for new randomization
        
        // Validate result (accept 8 or more cards, minimum 8 for 4 pairs)
        if (result && Array.isArray(result) && result.length >= 8) {
          // Ensure all cards have required properties
          const validCards = result.filter(card => 
            card && card.id && card.type && card.content && card.matchId
          );
          
          if (validCards.length >= 8) {
            setCards(validCards);
            console.log('✅ New game loaded successfully with', validCards.length, 'cards');
            setLoading(false);
            setIsResetting(false);
            return; // Success - exit function
          } else {
            console.warn(`Only ${validCards.length} valid cards, need at least 8. Retrying...`);
          }
        } else {
          console.warn(`Invalid result: expected at least 8 cards, got ${result?.length || 0}. Retrying...`);
        }
      } catch (error) {
        console.error(`Attempt ${attempts + 1} failed:`, error.message);
      }
      
      attempts++;
      
      // Wait a bit before retrying (except on last attempt)
      if (attempts < maxAttempts) {
        await new Promise(resolve => setTimeout(resolve, 1000));
      }
    }
    
    // If we get here, all attempts failed
    console.error('Failed to load cards after', maxAttempts, 'attempts');
    setLoading(false);
    setIsResetting(false);
    // Keep cards empty so user can try again
  };

  if (showHome) {
    return <HomeScreen onSelectTopic={handleTopicSelect} />;
  }

  return (
    <div className="App">
      <header className="App-header">
        <div className="game-header">
          <button 
            className="back-button" 
            onClick={handleBackToHome}
            disabled={loading || isResetting}
          >
            ← Back to Topics
          </button>
                 <h1>Code Match</h1>
          <div className="scoreboard">
            {gameStarted && (
              <>
                <div className="score">Matches: {score}/{cards.length / 2}</div>
                <div className="timer">Time: {Math.floor(gameTime / 60)}:{(gameTime % 60).toString().padStart(2, '0')}</div>
                <div className="best-score">Best: {bestScore.toLocaleString()}</div>
              </>
            )}
            {!gameStarted && cards.length > 0 && (
              <div className="best-score">Best Score: {bestScore.toLocaleString()}</div>
            )}
          </div>
        </div>
        {!gameStarted && cards.length > 0 && !loading && (
          <div className="start-game-container">
            <p>Match questions with their answers! Click cards to flip them.</p>
            <button className="start-game-button" onClick={handleStartGame}>
              Start Game
            </button>
          </div>
        )}
        {isGameComplete && (
          <div className="game-complete">
            <h2>🎉 Congratulations! You matched them all!</h2>
            <p className="final-score">Final Score: {finalScore.toLocaleString()}</p>
            <p className="final-time">Time: {Math.floor(gameTime / 60)}:{(gameTime % 60).toString().padStart(2, '0')}</p>
            <button onClick={resetGame} disabled={isResetting || loading}>
              {isResetting || loading ? 'Loading...' : 'Play Again'}
            </button>
          </div>
        )}
        {loading ? (
          <div className="loading-container">
            <div className="spinner"></div>
            <p>Loading questions and answers...</p>
          </div>
        ) : gameStarted ? (
          <>
            <div className="cards-container">
              {cards.map(card => (
                <Card
                  key={card.id}
                  card={card}
                  onClick={handleCardClick}
                  isFlipped={flippedCards.includes(card.id)}
                  isMatched={matchedCards.includes(card.id)}
                  isSelected={selectedCards.includes(card.id)}
                />
              ))}
            </div>
            <button 
              className="reset-button" 
              onClick={resetGame}
              disabled={isResetting || loading}
            >
              {isResetting || loading ? 'Loading...' : 'Start Again'}
            </button>
          </>
        ) : null}
      </header>
      <Footer />
    </div>
  );
}

export default App;
