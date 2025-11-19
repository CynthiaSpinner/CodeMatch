import React from 'react';
import '../../styles/components/TopicCard.css';

const TopicCard = ({ topic, onClick, showDescription = false }) => {
  const color = topic.color || '#667eea';
  
  return (
    <div
      className="topic-card"
      onClick={onClick}
      data-color={color}
    >
      <div className="topic-icon" data-color={color}>
        {topic.icon}
      </div>
      <h3 className="topic-name">{topic.name}</h3>
      {showDescription && topic.description && (
        <p className="topic-description">{topic.description}</p>
      )}
    </div>
  );
};

export default TopicCard;

