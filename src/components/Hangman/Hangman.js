import React, { useState } from "react";

import AlphaButtons from "../AlphaButtons/AlphaButtons";

import gallow from "../../images/gallow.png";
import head from "../../images/head.png";
import corpus from "../../images/corpus.png";
import leftHand from "../../images/leftHand.png";
import rightHand from "../../images/rightHand.png";
import leftLeg from "../../images/leftLeg.png";
import rightLeg from "../../images/rightLeg.png";

import { randomWord } from "./words";

const Hangman = () => {
  const [nWrong, setNWrong] = useState(0);
  const [guessed, setGuessed] = useState(new Set());
  const [answer, setAnswer] = useState(randomWord());
  const [rerender, setRerender] = useState(false);

  const guessedWord = () =>
    answer.split("").map((letter) => (guessed.has(letter) ? letter : "_"));

  const handleGuess = (evt) => {
    const letter = evt.target.value;
    setGuessed(guessed.add(letter));
    setRerender(!rerender);
    setNWrong(nWrong + (answer.includes(letter) ? 0 : 1));
  };

  const generateButtons = () => (
    <AlphaButtons
      sequence="abcdefghijklmnopqrstuvwxyz"
      guessedSet={guessed}
      guess={handleGuess}
    />
  );

  const reset = () => {
    setNWrong(0);
    setGuessed(new Set());
    setAnswer(randomWord());
  };

  const maxWrong = 6;
  const images = [gallow, head, corpus, leftHand, rightHand, leftLeg, rightLeg];

  let gameState = generateButtons();
  if (nWrong === maxWrong) gameState = "GAME OVER !";
  if (guessedWord().join("") === answer) gameState = "CORRECT !";

  const gameWon = guessedWord().join("") === answer,
    gameLose = nWrong === maxWrong;

  return (
    <div className="text-whitesmoke">
      <h1 className="mt-[0.5rem] mb-[2rem] text-[2.5rem] font-thin md:text-[4rem]">
        Hangman
      </h1>
      <div className="flex flex-col justify-between space-y-16 p-5 md:flex-row">
        <div className="mx-auto md:ml-[5rem] md:w-[25%]">
          <img
            className="h-[30vh]"
            src={images[nWrong]}
            alt={`${nWrong} wrong guesses`}
          />
        </div>
        <div className="mx-auto flex flex-col justify-between text-xl md:w-[75%]">
          <p className="mb-[2rem] text-[1.6rem]">
            Attempts left :{` ${maxWrong - nWrong} / ${maxWrong}`}
          </p>
          <p
            className={`my-[2rem] text-[2.5rem] tracking-[1rem] md:my-[3rem]  md:tracking-[2rem] ${
              gameWon && "text-[3.5rem] text-darkYellow"
            } ${gameLose && "text-[3.5rem] text-maroon"}`}
          >
            {nWrong === maxWrong ? answer : guessedWord()}
          </p>
          <div className="mx-auto my-[2rem] text-center text-xl md:w-1/2 md:text-[1.5rem]">
            {gameState}
          </div>

          {(gameWon || gameLose) && (
            <button
              onClick={reset}
              className="mx-auto block w-[8rem] rounded-[13px] border-[2px] border-solid border-maroon bg-darkBlack text-[1rem] hover:cursor-pointer hover:bg-boardGreen hover:font-bold hover:text-black"
            >
              Next word
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Hangman;
