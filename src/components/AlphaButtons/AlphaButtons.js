import React from "react";

const AlphaButtons = ({ sequence, guess, guessedSet }) => {
  return (
    <>
      {sequence.split("").map((letter) => (
        <button
          key={letter}
          value={letter}
          className="mt-[5px] mr-[3px] mb-[4px]  w-[2.5rem] cursor-pointer rounded-[0.7rem] border-[2px] border-solid border-maroon bg-darkYellow p-2 text-xl font-semibold text-black shadow-md shadow-lightGreen disabled:opacity-[0.5] disabled:hover:cursor-not-allowed md:w-[3rem] md:rounded-[1rem] md:text-2xl [&:not(:disabled)]:hover:bg-darkBlack [&:not(:disabled)]:hover:text-whitesmoke"
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
