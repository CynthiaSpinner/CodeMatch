import React from 'react';
import '../styles/screens/StartGameScreen.css';

const StartGameScreen = ({ onStartGame }) => {
  return (
    <div className="start-game-container">
      <p>Match questions with their answers! Click cards to flip them.</p>
      <button className="start-game-button" onClick={onStartGame}>
        Start Game
      </button>
    </div>
  );
};

export default StartGameScreen;

