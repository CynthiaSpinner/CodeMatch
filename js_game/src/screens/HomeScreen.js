import React, { useState } from 'react';
import '../styles/screens/HomeScreen.css';
import '../styles/components/TopicCard.css';
import Footer from '../components/ui/Footer.js';
import TopicCard from '../components/ui/TopicCard.js';
import SubCategoryScreen from './SubCategoryScreen.js';

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
      <SubCategoryScreen
        topic={selectedMainTopic}
        onSelectSubCategory={handleSubCategoryClick}
        onBack={handleBack}
      />
    );
  }

  return (
    <div className="home-screen">
      <div className="home-header">
        <div className="home-header-content">
          <h2 className="home-header-title">CodeMatch</h2>
          <p className="home-header-subtitle">Test your knowledge with this interactive memory matching game</p>
        </div>
      </div>
      <div className="home-content">
        <h1 className="home-title">Welcome</h1>
        <p className="home-subtitle">Choose a topic to start learning!</p>
        
        <div className="topics-grid">
          {mainTopics.map(topic => (
            <TopicCard
              key={topic.id}
              topic={topic}
              onClick={() => handleMainTopicClick(topic)}
              showDescription={true}
            />
          ))}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default HomeScreen;

