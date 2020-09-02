import React, { Component } from "react";
import "./AlphaButtons.css";

class AlphaButtons extends Component {
  render() {
    return (
      <div>
        {this.props.sequence.split("").map((ltr) => (
          <button
            key={ltr}
            value={ltr}
            className="AlphaButtons"
            onClick={this.props.guess}
            disabled={this.props.guessedSet.has(ltr)}
          >
            {ltr}
          </button>
        ))}
      </div>
    );
  }
}

export default AlphaButtons;
