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

import "./Hangman.css";

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
    <div className="Hangman">
      <h1>Hangman</h1>
      <div className="img-container">
        <img src={images[nWrong]} alt={`${nWrong} wrong guesses`} />
      </div>
      <div className="Hangman-content">
        <p>Attempts left :{` ${maxWrong - nWrong} / ${maxWrong}`}</p>
        <p
          className={`Hangman-word ${gameWon && "right-answer"} ${
            gameLose && "wrong-answer"
          }`}
        >
          {nWrong === maxWrong ? answer : guessedWord()}
        </p>
        <div className="Hangman-status">{gameState}</div>
        {(gameWon || gameLose) && (
          <button onClick={reset} className="Hangman-reset">
            Next word
          </button>
        )}
      </div>
    </div>
  );
};

export default Hangman;
