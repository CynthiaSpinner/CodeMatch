import React from 'react';
import '../styles/screens/SubCategoryScreen.css';
import '../styles/components/BackButton.css';
import BackButton from '../components/ui/BackButton';
import TopicCard from '../components/ui/TopicCard';
import Footer from '../components/ui/Footer';

const SubCategoryScreen = ({ topic, onSelectSubCategory, onBack }) => {
  return (
    <div className="subcategory-screen">
      <div className="subcategory-header-container">
        <div className="subcategory-header">
          <BackButton onClick={onBack} />
        </div>
      </div>
      <div className="subcategory-content">
        <h1 className="subcategory-title">{topic.name}</h1>
        <p className="subcategory-subtitle">Choose a sub-category to start learning!</p>
        
        <div className="subcategory-grid">
          {topic.subCategories.map(subCategory => (
            <TopicCard
              key={subCategory.id}
              topic={{
                ...subCategory,
                color: subCategory.color || topic.color
              }}
              onClick={() => onSelectSubCategory(subCategory.id)}
            />
          ))}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default SubCategoryScreen;

