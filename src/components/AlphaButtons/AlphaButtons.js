import React from "react";
import "./AlphaButtons.css";

const AlphaButtons = ({ sequence, guess, guessedSet }) => {
  return (
    <>
      {sequence.split("").map((letter) => (
        <button
          key={letter}
          value={letter}
          className="AlphaButtons"
          onClick={guess}
          disabled={guessedSet.has(letter)}
        >
          {letter}
        </button>
      ))}
    </>
  );
};

export default AlphaButtons;
