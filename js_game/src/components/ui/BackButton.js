import React from 'react';
import '../../styles/components/BackButton.css';

const BackButton = ({ onClick, disabled, children = '← Back to Topics' }) => {
  return (
    <button 
      className="back-button-component" 
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  );
};

export default BackButton;

