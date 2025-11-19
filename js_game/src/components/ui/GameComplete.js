import React from 'react';
import '../../styles/components/GameComplete.css';

const GameComplete = ({ finalScore, gameTime, onPlayAgain, disabled }) => {
  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="game-complete">
      <h2>🎉 Congratulations! You matched them all!</h2>
      <p className="final-score">Final Score: {finalScore.toLocaleString()}</p>
      <p className="final-time">Time: {formatTime(gameTime)}</p>
      <button onClick={onPlayAgain} disabled={disabled}>
        {disabled ? 'Loading...' : 'Play Again'}
      </button>
    </div>
  );
};

export default GameComplete;

