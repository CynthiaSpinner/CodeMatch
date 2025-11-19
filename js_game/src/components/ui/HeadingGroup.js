import React from 'react';
import '../../styles/components/HeadingGroup.css';

const HeadingGroup = ({ 
  title, 
  subtitle, 
  variant = 'primary', // 'primary', 'secondary', 'brand'
  align = 'center' 
}) => {
  return (
    <div className={`heading-group heading-group-${variant} heading-align-${align}`}>
      <h1 className="heading-title">{title}</h1>
      {subtitle && <p className="heading-subtitle">{subtitle}</p>}
    </div>
  );
};

export default HeadingGroup;

