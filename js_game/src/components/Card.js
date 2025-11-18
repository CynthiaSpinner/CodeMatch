import React from 'react';
import '../styles/card.css';

const Card = ({ card, onClick, isFlipped, isMatched, isSelected }) => {
    const handleClick = (e) => {
        // Don't handle clicks on matched cards or if clicking on scrollable text
        if (isMatched || e.target.classList.contains('card-text')) {
            return;
        }
        if (!isFlipped) {
            onClick(card.id);
        }
    };

    return (
        <div 
            className={`card ${isFlipped ? 'flipped' : ''} ${isMatched ? 'matched' : ''} ${isSelected ? 'selected' : ''}`}
            onClick={handleClick}
        >
            <div className="card-inner">
                <div className="card-front">
                    <div className="card-icon">{card.icon || '?'}</div>
                    <div className="card-type">{card.type === 'question' ? 'Question' : 'Answer'}</div>
                </div>
                <div className="card-back">
                    <div className="card-content">
                        <div 
                            className="card-text"
                            onClick={(e) => e.stopPropagation()}
                            onMouseDown={(e) => e.stopPropagation()}
                        >
                            {card.content}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Card;