import React from 'react';
import '../../styles/components/GameHeader.css';
import BackButton from './BackButton';

const GameHeader = ({ onBack, categoryInfo, disabled }) => {
  return (
    <div className="game-header">
      <BackButton onClick={onBack} disabled={disabled} />
      <div className="header-title-section">
        <h1>CodeRecall</h1>
        {categoryInfo && (
          <div className="category-label">
            {categoryInfo.main}: {categoryInfo.sub}
          </div>
        )}
      </div>
    </div>
  );
};

export default GameHeader;

