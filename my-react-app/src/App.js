import React from 'react';
import './App.css';  // CSSをインポート


function App() {
  const countries = [
    { name: "Japan", area: "Asia" },
    { name: "Brazil", area: "South America" },
    { name: "Canada", area: "North America" },
    { name: "Australia", area: "Oceania" },
    { name: "Germany", area: "Europe" },
    { name: "India", area: "Asia" },
    { name: "Russia", area: "Europe/Asia" },
    { name: "Mexico", area: "North America" },
    { name: "France", area: "Europe" },
    { name: "Italy", area: "Europe" },
    { name: "China", area: "Asia" },
    { name: "United States", area: "North America" },
    { name: "Argentina", area: "South America" },
    { name: "Egypt", area: "Africa" },
    { name: "South Africa", area: "Africa" },
    { name: "Nigeria", area: "Africa" },
    { name: "Kenya", area: "Africa" },
    { name: "England", area: "Europe" },
    { name: "Spain", area: "Europe" },
    { name: "Portugal", area: "Europe" },
    { name: "Belgium", area: "Europe" },
    { name: "Netherlands", area: "Europe" },
    { name: "Norway", area: "Europe" },
    { name: "Sweden", area: "Europe" },
    { name: "Finland", area: "Europe" },
    { name: "Turkey", area: "Europe/Asia" },
    { name: "Saudi Arabia", area: "Asia" },
    { name: "Iran", area: "Asia" },
    { name: "Iraq", area: "Asia" },
    { name: "Thailand", area: "Asia" },
    { name: "Vietnam", area: "Asia" },
    { name: "South Korea", area: "Asia" },
    { name: "North Korea", area: "Asia" },
    { name: "Malaysia", area: "Asia" },
    { name: "Indonesia", area: "Asia" },
    { name: "Philippines", area: "Asia" },
    { name: "Pakistan", area: "Asia" },
    { name: "Bangladesh", area: "Asia" },
    { name: "Kazakhstan", area: "Asia" },
    { name: "Uzbekistan", area: "Asia" },
    { name: "Chile", area: "South America" },
    { name: "Colombia", area: "South America" },
    { name: "Peru", area: "South America" },
    { name: "Venezuela", area: "South America" },
    { name: "Bolivia", area: "South America" },
    { name: "Paraguay", area: "South America" },
    { name: "Uruguay", area: "South America" },
    { name: "New Zealand", area: "Oceania" },
    { name: "Fiji", area: "Oceania" },
    { name: "Samoa", area: "Oceania" },
    { name: "Papua New Guinea", area: "Oceania" },
    { name: "Greece", area: "Europe" },
    { name: "Hungary", area: "Europe" },
    { name: "Poland", area: "Europe" },
    { name: "Austria", area: "Europe" },
    { name: "Switzerland", area: "Europe" },
    { name: "Denmark", area: "Europe" },
    { name: "Iceland", area: "Europe" },
    { name: "Cuba", area: "North America" }
  ];

  const [remainingCountries, setRemainingCountries] = React.useState([...countries]);
  const [blueCountry, setBlueCountry] = React.useState("[Ready!]");
  const [redCountry, setRedCountry] = React.useState("[Ready!]");
// eslint-disable-next-line no-unused-vars
//  /* const [blueDelay, setBlueDelay] = React.useState(0); Removed as per user request */
  const [redDelay, setRedDelay] = React.useState(5);
  const [gameHistory, setGameHistory] = React.useState([]);
  const [score, setScore] = React.useState({ Red: 0, Blue: 0 });
  const [quizCount, setQuizCount] = React.useState(0);

  const startGame = () => {
    setQuizCount(0);
    setGameHistory([]);
    triggerQuiz();
  };

  const resetGame = () => {
    setRemainingCountries([...countries]);
    setBlueCountry("[Ready!]");
    setRedCountry("[Ready!]");
    setGameHistory([]);
    setScore({ Red: 0, Blue: 0 });  // 得点を0にリセット
    setQuizCount(0);
};

  const handleAdjustRedDelay = (increment) => () => {
    setRedDelay((prev) => Math.max(0, prev + increment));
  };

  const triggerQuiz = () => {
    if (quizCount >= 10) {
      alert('Quiz limit reached. Resetting game.');
      resetGame();
      return;
    }

    if (remainingCountries.length < 2) {
      setRemainingCountries([...countries]);
    }

    const shuffledCountries = remainingCountries.sort(() => Math.random() - 0.5);
    if (shuffledCountries.length < 2) {
      console.error('Not enough countries to continue the quiz.');
      return; // Quit the function to prevent errors
    }

    const blueSelected = shuffledCountries[0];
    const redSelected = shuffledCountries[1];

    setBlueCountry(blueSelected.name);
    setTimeout(() => setRedCountry(redSelected.name), redDelay * 1000);

    setRemainingCountries(
      remainingCountries.filter(
        (country) => country !== blueSelected && country !== redSelected
      )
    );

    setQuizCount(quizCount + 1);
  };

  const updateScoreAndHistory = (winner, country) => {
    setScore((prev) => ({ ...prev, [winner]: prev[winner] + 1 }));
    setGameHistory((prev) => [...prev, `Q${prev.length + 1}. ${winner}-${country}`]);
    setBlueCountry("[Ready!]");
    setRedCountry("[Ready!]");
    setTimeout(triggerQuiz, 3000); // Wait for 3 seconds before starting next quiz, as per user request
  };

  const handleCorrectAnswer = (winner, country) => () => {
    updateScoreAndHistory(winner, country);
  };

  return (
    <div className="App">
      <div className="header">Country Quiz Game</div>
      
      {/* クイズコンテナの中で国名を表示するセクション */}
      <div className="quiz-container">
        {quizCount === 0 ? <button onClick={startGame} className="start-button">Start</button> : <button onClick={resetGame} className="restart-button">Restart</button>}
        {/* 得点表示 */}
        <div className="score">
          <span className="score-blue">{score.Blue}</span>
          <span style={{ color: "black" }}> vs </span>
          <span className="score-red">{score.Red}</span>
        </div>

         {/* 国名と地域名を表示するためのFlexboxコンテナ */}
          <div className="country-container" style={{ display: 'flex', justifyContent: 'space-around', alignItems: 'center' }}>
              <div className="blue-country country-name">
                  {blueCountry}
                  <br />
                  <span className="country-area">({countries.find(country => country.name === blueCountry)?.area})</span>
              </div>
              <div className="red-country country-name">
                  {redCountry || "Waiting..."}
                  <br />
                  <span className="country-area">({countries.find(country => country.name === redCountry)?.area})</span>
              </div>
          </div>
         {/* Correctボタンのセクション */}
        <div className="flex-row" style={{ display: 'flex', justifyContent: 'space-around', alignItems: 'center' }}>
          <button onClick={handleCorrectAnswer("Blue", blueCountry)} className="button-blue">Correct</button>
          <button onClick={handleCorrectAnswer("Red", redCountry)} className="button-red">Correct</button>
        </div>
        <div className="handicap-adjuster">
            <button onClick={handleAdjustRedDelay(-1)} className="handicap-button">-</button>
            <div className="handicap-text">
                Handicap for Red:<br />
                {redDelay} seconds
            </div>
            <button onClick={handleAdjustRedDelay(1)} className="handicap-button">+</button>
        </div>

        <div className="history-entry">
        {gameHistory.map((entry, index) => (
        <div key={index} className={`history-entry ${entry.includes("Blue") ? "bg-blue" : "bg-red"}`}>{entry.replace(/Blue-|Red-/, '')}</div>
        ))}

        </div>
      </div>
    </div>
  );  
}

export default App;