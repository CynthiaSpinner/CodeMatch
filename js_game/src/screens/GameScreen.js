import React from 'react';
import '../styles/screens/GameScreen.css';
import '../styles/components/GameHeader.css';
import '../styles/components/Scoreboard.css';
import '../styles/screens/StartGameScreen.css';
import '../styles/components/GameComplete.css';
import '../styles/components/LoadingSpinner.css';
import GameHeader from '../components/ui/GameHeader';
import Scoreboard from '../components/ui/Scoreboard';
import StartGameScreen from './StartGameScreen';
import GameComplete from '../components/ui/GameComplete';
import LoadingSpinner from '../components/ui/LoadingSpinner';
import Card from '../components/ui/Card';
import Footer from '../components/ui/Footer';

const GameScreen = ({
  categoryInfo,
  onBack,
  score,
  totalPairs,
  gameTime,
  bestScore,
  gameStarted,
  cards,
  flippedCards,
  matchedCards,
  selectedCards,
  onCardClick,
  onStartGame,
  isGameComplete,
  finalScore,
  onPlayAgain,
  loading,
  isResetting,
  onResetGame
}) => {
  return (
    <div className="App">
      <header className={`App-header ${gameStarted ? 'game-started' : ''}`}>
        <GameHeader
          onBack={onBack}
          categoryInfo={categoryInfo}
          disabled={loading || isResetting}
        />
        <Scoreboard
          score={score}
          totalPairs={totalPairs}
          gameTime={gameTime}
          bestScore={bestScore}
          gameStarted={gameStarted}
        />
        {!gameStarted && cards.length > 0 && !loading && (
          <StartGameScreen onStartGame={onStartGame} />
        )}
        {isGameComplete && (
          <GameComplete
            finalScore={finalScore}
            gameTime={gameTime}
            onPlayAgain={onPlayAgain}
            disabled={isResetting || loading}
          />
        )}
        {loading ? (
          <LoadingSpinner />
        ) : gameStarted ? (
          <>
            <div className="cards-container">
              {cards.map(card => (
                <Card
                  key={card.id}
                  card={card}
                  onClick={onCardClick}
                  isFlipped={flippedCards.includes(card.id)}
                  isMatched={matchedCards.includes(card.id)}
                  isSelected={selectedCards.includes(card.id)}
                />
              ))}
            </div>
            <button
              className="reset-button"
              onClick={onResetGame}
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
};

export default GameScreen;

