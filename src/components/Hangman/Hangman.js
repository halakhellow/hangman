import React, { Component } from "react";

import AlphaButtons from "../AlphaButtons/AlphaButtons";

import img0 from "../../images/0.jpg";
import img1 from "../../images/1.jpg";
import img2 from "../../images/2.jpg";
import img3 from "../../images/3.jpg";
import img4 from "../../images/4.jpg";
import img5 from "../../images/5.jpg";
import img6 from "../../images/6.jpg";

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
    this.handleGuess = this.handleGuess.bind(this);
    this.reset = this.reset.bind(this);
  }

  guessedWord() {
    return this.state.answer
      .split("")
      .map((ltr) => (this.state.guessed.has(ltr) ? ltr : "_"));
  }

  handleGuess(evt) {
    let ltr = evt.target.value;
    this.setState((st) => ({
      guessed: st.guessed.add(ltr),
      nWrong: st.nWrong + (st.answer.includes(ltr) ? 0 : 1),
    }));
  }
  generateButtons() {
    return (
      <AlphaButtons
        sequence="abcdefghijklmnopqrstuvwxyz"
        guessedSet={this.state.guessed}
        guess={this.handleGuess}
      />
    );
  }
  reset() {
    this.setState({
      nWrong: 0,
      guessed: new Set(),
      answer: randomWord(),
    });
  }
  render() {
    let gameState = this.generateButtons();
    if (this.state.nWrong === this.props.maxWrong) gameState = "GAME OVER !";
    if (this.guessedWord().join("") === this.state.answer)
      gameState = "You Win!";
    return (
      <div className="Hangman">
        <h1>Hangman</h1>
        <div className="img-container">
          <img
            src={this.props.images[this.state.nWrong]}
            alt={`${this.state.nWrong} wrong guesses`}
          />
        </div>
        <div className="Hangman-content">
          <p>Attempts left : {this.props.maxWrong - this.state.nWrong}</p>
          <p className="Hangman-word">
            {this.state.nWrong === this.props.maxWrong
              ? this.state.answer
              : this.guessedWord()}
          </p>
          <div className="Hangman-status">{gameState}</div>
          <button onClick={this.reset} className="Hangman-reset">
            Reset
          </button>
        </div>
      </div>
    );
  }
}

export default Hangman;
