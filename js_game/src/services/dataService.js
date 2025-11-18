// DataService.js
/**
 * DataService - Professional service for managing learning data
 * 
 * Features:
 * - Loads question-answer pairs from local database
 * - Creates matching game cards
 * - Caching to improve performance
 */

import questionsDatabase from '../data/questionsDatabase.json';

const DataService = (config = {}) => {
    // Cache for storing fetched questions by topic
    const questionCache = new Map();
    
    // Cache duration: 1 hour (3600000 ms)
    const CACHE_DURATION = 3600000;

    // Topic configuration with display names and icons
    const topicConfig = {
        // Web Development sub-categories
        'javascript': {
            name: 'JavaScript',
            icon: 'JS'
        },
        'nodejs': {
            name: 'Node.js',
            icon: '●'
        },
        'react': {
            name: 'React',
            icon: '◉'
        },
        'html-css': {
            name: 'UI/UX (HTML & CSS)',
            icon: '■'
        },
        // Software Engineering sub-categories
        'csharp': {
            name: 'C#',
            icon: 'C#'
        },
        'aspnet': {
            name: 'ASP.NET',
            icon: '▲'
        },
        'dotnet': {
            name: '.NET Framework',
            icon: '◆'
        },
        // General Tech sub-categories
        'machine-learning': {
            name: 'Computer Hardware',
            icon: '◼'
        },
        'tech-history': {
            name: 'Tech History',
            icon: '◈'
        },
        'computers': {
            name: 'Computers',
            icon: '◉'
        },
        'algorithms': {
            name: 'Algorithms',
            icon: '◊'
        },
        // SQL (shared between webdev and software-engineering)
        'sql': {
            name: 'SQL Relational Database',
            icon: '▣'
        }
    };

    // Fetching question-answer pairs from local database
    const getData = async (topic = 'javascript', forceRefresh = false) => {
        try {
            const config = topicConfig[topic] || topicConfig['javascript'];
            
            // If force refresh, clear cache for this topic
            if (forceRefresh) {
                questionCache.delete(topic);
                console.log(`Force refresh requested - clearing cache for ${config.name}`);
            }
            
            // Check cache first (unless force refresh is requested)
            if (!forceRefresh) {
                const cached = questionCache.get(topic);
                if (cached && (Date.now() - cached.timestamp) < CACHE_DURATION) {
                    console.log(`Using cached questions for ${config.name}...`);
                    // Even with cache, re-shuffle for variety
                    const shuffled = [...cached.cards];
                    for (let i = shuffled.length - 1; i > 0; i--) {
                        const j = Math.floor(Math.random() * (i + 1));
                        [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
                    }
                    return shuffled;
                }
            }
            
            console.log(`Loading ${config.name} questions from local database...`);
            
            // Get questions for this topic from the database
            const topicQuestions = questionsDatabase[topic];
            
            if (!topicQuestions || !Array.isArray(topicQuestions) || topicQuestions.length === 0) {
                throw new Error(`No questions found for topic: ${topic}`);
            }
            
            console.log(`Found ${topicQuestions.length} questions for ${config.name}`);
            
            // Shuffle questions to randomize selection (using Fisher-Yates shuffle for better randomness)
            const shuffledQuestions = [...topicQuestions];
            for (let i = shuffledQuestions.length - 1; i > 0; i--) {
                const j = Math.floor(Math.random() * (i + 1));
                [shuffledQuestions[i], shuffledQuestions[j]] = [shuffledQuestions[j], shuffledQuestions[i]];
            }
            
            // Select up to 8 pairs (16 cards) or use all available if less than 8
            const pairsToUse = Math.min(8, Math.floor(shuffledQuestions.length));
            const selectedPairs = shuffledQuestions.slice(0, pairsToUse);
            
            console.log(`Using ${pairsToUse} question-answer pairs for the game`);
            
            // Create cards for matching game
            const cards = [];
            
            // Create question cards
            selectedPairs.forEach((pair, index) => {
                cards.push({
                    id: `q_${topic}_${index}`,
                    type: 'question',
                    content: pair.question,
                    matchId: `a_${topic}_${index}`,
                    icon: config.icon,
                    topicName: config.name
                });
            });
            
            // Create answer cards
            selectedPairs.forEach((pair, index) => {
                cards.push({
                    id: `a_${topic}_${index}`,
                    type: 'answer',
                    content: pair.answer,
                    matchId: `q_${topic}_${index}`,
                    icon: config.icon,
                    topicName: config.name
                });
            });
            
            // Validate we have enough cards (at least 8 cards = 4 pairs minimum)
            const minCards = 8; // Minimum 4 pairs
            if (cards.length < minCards) {
                console.error(`Only created ${cards.length} cards, need at least ${minCards}. Question pairs: ${selectedPairs.length}`);
                throw new Error(`Failed to create enough cards. Got ${cards.length}, need at least ${minCards}.`);
            }
            
            // Log if we're using fewer than 16 cards
            if (cards.length < 16) {
                console.warn(`Using ${cards.length} cards (${selectedPairs.length} pairs) instead of 16 cards (8 pairs)`);
            }
            
            // Shuffle cards using Fisher-Yates shuffle for better randomness
            const shuffled = [...cards];
            for (let i = shuffled.length - 1; i > 0; i--) {
                const j = Math.floor(Math.random() * (i + 1));
                [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
            }
            
            // Validate shuffled cards
            if (shuffled.length !== cards.length) {
                console.error(`Shuffled cards count mismatch: ${shuffled.length} instead of ${cards.length}`);
                throw new Error(`Card count mismatch: ${shuffled.length}`);
            }
            
            // Validate each card has required properties
            const invalidCards = shuffled.filter(card => 
                !card.id || !card.type || !card.content || !card.matchId
            );
            
            if (invalidCards.length > 0) {
                console.error('Invalid cards found:', invalidCards);
                throw new Error(`Found ${invalidCards.length} invalid cards`);
            }
            
            // Log some sample pairs for debugging
            console.log('Sample question-answer pairs:', selectedPairs.slice(0, 3).map(p => ({
                question: p.question.substring(0, 40) + '...',
                answer: p.answer.substring(0, 40) + '...'
            })));
            
            console.log(`Successfully created ${shuffled.length} matching cards from local database`);
            
            // Cache the results
            questionCache.set(topic, {
                cards: shuffled,
                timestamp: Date.now()
            });
            
            return shuffled;
        } catch (error) {
            console.error('Database Error:', error);
            throw error;
        }
    };

    return {
        getData
    };
};

export default DataService();

