import "./App.css";
import { getRandomWord } from "./utils";
import { useState } from "react";

function App() {
  const [currWord, setCurrentWord] = useState(getRandomWord());
  const [guessedLetters, setGuessedLetters] = useState([]);
  const [userInput, setUserInput] = useState("");
  const [numGuessesLeft, setNumGuessesLeft] = useState(10);

  // Score Tracking States
  const [totalWins, setTotalWins] = useState(0);
  const [totalRounds, setTotalRounds] = useState(0);

  const generateWordDisplay = () => {
    const wordDisplay = [];
    for (let letter of currWord) {
      if (guessedLetters.includes(letter)) {
        wordDisplay.push(letter);
      } else {
        wordDisplay.push("_");
      }
    }
    return wordDisplay.join(" ");
  };

  const handleInputChange = (e) => {
    const value = e.target.value.toLowerCase();
    // Validate: only 1 letter and no duplicates
    if (value.match(/[a-z]/i) || value === "") {
      setUserInput(value);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (userInput && !guessedLetters.includes(userInput)) {
      const newGuessedLetters = [...guessedLetters, userInput];
      setGuessedLetters(newGuessedLetters);

      if (!currWord.includes(userInput)) {
        setNumGuessesLeft(numGuessesLeft - 1);
      }

      // Check for win immediately to update score
      const isWin = currWord
        .split("")
        .every((letter) => newGuessedLetters.includes(letter));
      if (isWin) {
        setTotalWins(totalWins + 1);
      }
    }
    setUserInput("");
  };

  const resetGame = () => {
    setTotalRounds(totalRounds + 1);
    setCurrentWord(getRandomWord());
    setGuessedLetters([]);
    setNumGuessesLeft(10);
  };

  const isWon = currWord
    .split("")
    .every((letter) => guessedLetters.includes(letter));
  const isLost = numGuessesLeft === 0;

  return (
    <div className="card">
      <h1>Guess The Word 🚀</h1>

      {/* Scoreboard Section */}
      <div className="scoreboard">
        <p>
          Wins: {totalWins} | Rounds Played: {totalRounds}
        </p>
      </div>

      {/* Visual Feedback: Color changes based on guesses left */}
      <h3 style={{ color: numGuessesLeft < 4 ? "red" : "inherit" }}>
        Guesses Remaining: {numGuessesLeft}
      </h3>

      <div className="word-display">{generateWordDisplay()}</div>

      <h3>Guessed Letters</h3>
      <p>{guessedLetters.length > 0 ? guessedLetters.join(", ") : "-"}</p>

      {isWon || isLost ? (
        <div className="status-message">
          <h2 className={isWon ? "win" : "loss"}>
            {isWon
              ? "You Won! 🎉"
              : `Out of guesses! The word was: ${currWord}`}
          </h2>
          <button onClick={resetGame}>Next Round</button>
        </div>
      ) : (
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            value={userInput}
            onChange={handleInputChange}
            maxLength={1}
            placeholder="?"
            autoFocus
          />
          <button type="submit" disabled={!userInput}>
            Guess
          </button>
        </form>
      )}
    </div>
  );
}

export default App;
