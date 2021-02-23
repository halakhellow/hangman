import React, { Component } from "react";

import AlphaButtons from "../AlphaButtons/AlphaButtons";

import img0 from "../../images/0.png";
import img1 from "../../images/1.png";
import img2 from "../../images/2.png";
import img3 from "../../images/3.png";
import img4 from "../../images/4.png";
import img5 from "../../images/5.png";
import img6 from "../../images/6.png";

import { randomWord } from "./words";

import "./Hangman.css";

class Hangman extends Component {
  static defaultProps = {
    maxWrong: 6,
    images: [img0, img1, img2, img3, img4, img5, img6],
  };

  constructor(props) {
    super(props);
    this.state = { nWrong: 0, guessed: new Set(), answer: randomWord() };
  }

  guessedWord() {
    return this.state.answer
      .split("")
      .map((letter) => (this.state.guessed.has(letter) ? letter : "_"));
  }

  handleGuess = (evt) => {
    let letter = evt.target.value;
    this.setState((st) => ({
      guessed: st.guessed.add(letter),
      nWrong: st.nWrong + (st.answer.includes(letter) ? 0 : 1),
    }));
  };

  generateButtons() {
    return (
      <AlphaButtons
        sequence="abcdefghijklmnopqrstuvwxyz"
        guessedSet={this.state.guessed}
        guess={this.handleGuess}
      />
    );
  }

  reset = () => {
    this.setState({
      nWrong: 0,
      guessed: new Set(),
      answer: randomWord(),
    });
  };

  render() {
    let { nWrong, answer } = this.state;
    let { maxWrong, images } = this.props;
    let gameState = this.generateButtons();
    if (nWrong === maxWrong) gameState = "GAME OVER !";
    if (this.guessedWord().join("") === answer) gameState = "CORRECT !";
    let gameWon = this.guessedWord().join("") === answer,
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
            {nWrong === maxWrong ? answer : this.guessedWord()}
          </p>
          <div className="Hangman-status">{gameState}</div>
          {(gameWon || gameLose) && (
            <button onClick={this.reset} className="Hangman-reset">
              Next word
            </button>
          )}
        </div>
      </div>
    );
  }
}

export default Hangman;
