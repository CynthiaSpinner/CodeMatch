# CodeRecall (js_game)

Interactive React-based educational matching game that helps students learn web development and software engineering concepts through gamified question-and-answer matching.

**Live** [coderecall.pro](https://coderecall.pro)

## Features

- **Topic-based learning** – Choose from Web Development, Software Engineering, and General Tech, then pick a subcategory (e.g. JavaScript, React, Node.js, C#, ASP.NET, SQL, Algorithms).
- **Matching game** – Match question cards to answer cards; complete the board to finish the round.
- **Scoring & timer** – Track score and time; best score is persisted for the session.
- **Responsive UI** – Card-based layout with clear feedback for matches and game completion.

## Tech Stack

- **React** (Create React App)
- **CSS** (custom styles, no UI framework)
- **Netlify** (hosting)

## Project Structure

```
js_game/
├── src/
│   ├── App.js              # Main app state, game flow, topic → category mapping
│   ├── components/ui/      # Reusable UI (Card, TopicCard, Scoreboard, GameHeader, etc.)
│   ├── screens/            # HomeScreen, SubCategoryScreen, StartGameScreen, GameScreen, GameComplete
│   ├── services/           # dataService.js (loads question/answer data)
│   ├── data/               # questionsDatabase.json (Q&A by topic)
│   └── styles/             # Component and screen CSS
├── public/
└── package.json
```

## Getting Started

### Prerequisites

- Node.js (v14 or higher recommended)
- npm

### Install and run

```bash
git clone <your-repo-url>
cd js_game

npm install
npm start
```

Open [http://localhost:3000](http://localhost:3000) to play locally.

### Build for production

```bash
npm run build
```

Output is in the `build/` folder (e.g. for Netlify).

### Run tests

```bash
npm test
```

## Topics Covered

| Category            | Subcategories |
|---------------------|---------------|
| Web Development     | JavaScript, Node.js, React, UI/UX (HTML & CSS), SQL |
| Software Engineering| C#, ASP.NET, .NET Framework, SQL |
| General Tech        | Computer Hardware, Tech History, Computers, Algorithms |

## License

Private / educational use. Question content may be subject to curriculum licensing.
