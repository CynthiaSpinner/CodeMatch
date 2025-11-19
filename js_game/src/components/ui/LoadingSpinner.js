import React from 'react';
import '../../styles/components/LoadingSpinner.css';

const LoadingSpinner = ({ message = 'Loading questions and answers...' }) => {
  return (
    <div className="loading-container">
      <div className="spinner"></div>
      <p>{message}</p>
    </div>
  );
};

export default LoadingSpinner;

