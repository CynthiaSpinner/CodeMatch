import React from 'react';
import '../../styles/components/Scoreboard.css';

const Scoreboard = ({ score, totalPairs, gameTime, bestScore, gameStarted }) => {
  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="scoreboard">
      {gameStarted ? (
        <>
          <div className="score">Matches: {score}/{totalPairs}</div>
          <div className="timer">Time: {formatTime(gameTime)}</div>
          <div className="best-score">Best: {bestScore.toLocaleString()}</div>
        </>
      ) : (
        <div className="best-score">Best Score: {bestScore.toLocaleString()}</div>
      )}
    </div>
  );
};

export default Scoreboard;

