import React, { useState } from 'react';
import '../styles/HomeScreen.css';
import Footer from './Footer.js';

const HomeScreen = ({ onSelectTopic }) => {
  const [selectedMainTopic, setSelectedMainTopic] = useState(null);

  const mainTopics = [
    {
      id: 'webdev',
      name: 'Web Development',
      description: 'Frontend and backend web technologies',
      color: '#61DAFB',
      icon: '◉',
      subCategories: [
        { id: 'javascript', name: 'JavaScript', icon: 'JS', color: '#F7DF1E' },
        { id: 'nodejs', name: 'Node.js', icon: '●', color: '#339933' },
        { id: 'react', name: 'React', icon: '◉', color: '#61DAFB' },
        { id: 'html-css', name: 'UI/UX (HTML & CSS)', icon: '■', color: '#E34F26' },
        { id: 'sql', name: 'SQL Relational Database', icon: '▣', color: '#336791' }
      ]
    },
    {
      id: 'software-engineering',
      name: 'Software Engineering',
      description: 'Software development and engineering',
      color: '#239120',
      icon: '◆',
      subCategories: [
        { id: 'csharp', name: 'C#', icon: 'C#', color: '#239120' },
        { id: 'aspnet', name: 'ASP.NET', icon: '▲', color: '#512BD4' },
        { id: 'dotnet', name: '.NET Framework', icon: '◆', color: '#512BD4' },
        { id: 'sql', name: 'SQL Relational Database', icon: '▣', color: '#336791' }
      ]
    },
    {
      id: 'general-tech',
      name: 'General Tech',
      description: 'Technology history and concepts',
      color: '#4A90E2',
      icon: '◊',
      subCategories: [
        { id: 'machine-learning', name: 'Computer Hardware', icon: '◼', color: '#FF6B6B' },
        { id: 'tech-history', name: 'Tech History', icon: '◈', color: '#4ECDC4' },
        { id: 'computers', name: 'Computers', icon: '◉', color: '#4A90E2' },
        { id: 'algorithms', name: 'Algorithms', icon: '◊', color: '#95E1D3' }
      ]
    }
  ];

  const handleMainTopicClick = (topic) => {
    setSelectedMainTopic(topic);
  };

  const handleSubCategoryClick = (subCategoryId) => {
    onSelectTopic(subCategoryId);
  };

  const handleBack = () => {
    setSelectedMainTopic(null);
  };

  if (selectedMainTopic) {
    return (
      <div className="home-screen">
        <div className="home-content">
          <button className="back-button-home" onClick={handleBack}>
            ← Back to Topics
          </button>
          <h1 className="home-title">{selectedMainTopic.name}</h1>
          <p className="home-subtitle">Choose a sub-category to start learning!</p>
          
          <div className="topics-grid">
            {selectedMainTopic.subCategories.map(subCategory => (
              <div
                key={subCategory.id}
                className="topic-card"
                onClick={() => handleSubCategoryClick(subCategory.id)}
                style={{ borderColor: subCategory.color || selectedMainTopic.color }}
              >
                <div className="topic-icon" style={{ color: subCategory.color || selectedMainTopic.color }}>
                  {subCategory.icon}
                </div>
                <h3 className="topic-name">{subCategory.name}</h3>
              </div>
            ))}
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="home-screen">
      <div className="home-header">
        <div className="home-header-content">
          <h2 className="home-header-title">Code Match</h2>
          <p className="home-header-subtitle">Test your knowledge with interactive matching games</p>
        </div>
      </div>
      <div className="home-content">
        <h1 className="home-title">Welcome to Code Match!</h1>
        <p className="home-subtitle">Choose a topic to start learning!</p>
        
        <div className="topics-grid">
          {mainTopics.map(topic => (
            <div
              key={topic.id}
              className="topic-card"
              onClick={() => handleMainTopicClick(topic)}
              style={{ borderColor: topic.color }}
            >
              <div className="topic-icon" style={{ color: topic.color }}>
                {topic.icon}
              </div>
              <h3 className="topic-name">{topic.name}</h3>
              <p className="topic-description">{topic.description}</p>
            </div>
          ))}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default HomeScreen;

