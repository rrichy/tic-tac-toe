import React, { Component } from "react";
import Grid from "./grid";
import PostGame from "./postgame";

class Game extends Component {
  constructor(props) {
    super(props);
    this.state = {
      turn: Math.round(Math.random()) + 1,
      playerTwo: this.props.opponent,
      scoreOne: 0,
      scoreTwo: 0,
      displayGrid: Array(9).fill(),
      boardWon: false,
    };
  }

  handleClick = async (e) => {
    if (!this.state.boardWon) {
      const index = parseInt(e.target.getAttribute("index"));
      let displayGrid = [...this.state.displayGrid];
      if (!displayGrid[index]) {
        const currentTurn = this.state.turn;
        displayGrid[index] = currentTurn === 1 ? "x" : "o";

        await this.setState({ turn: currentTurn === 1 ? 2 : 1, displayGrid });
        this.checkBoard(currentTurn);
      }
    }
  };

  playAgain = () => {
    this.setState({ boardWon: false, displayGrid: Array(9).fill() });
  };

  checkBoard = (prevturn) => {
    const winningState = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];

    let state = winningState.map((c) =>
      c.map((i) => this.state.displayGrid[i])
    );
    if (
      state.some((c) => c.every((m) => m === "x") || c.every((m) => m === "o"))
    ) {
      console.log("board is won");
      let { scoreOne, scoreTwo } = this.state;

      if (prevturn === 1) scoreOne++;
      else scoreTwo++;

      this.setState({ scoreOne, scoreTwo, boardWon: true });
      return;
    }

    if (this.state.displayGrid.every((v) => v === "x" || v === "o")) {
      console.log("draw");
      this.setState({ boardWon: true });
      return;
    }
  };

  render() {
    return (
      <div id="board">
        {this.state.displayGrid.map((mark, index) => (
          <Grid
            key={index}
            mark={mark}
            index={index}
            handleClick={this.handleClick}
          />
        ))}
        <h4>Score Board</h4>
        <p>Player 1: {this.state.scoreOne}</p>
        <p>
          {this.state.playerTwo}: {this.state.scoreTwo}
        </p>
        {this.state.boardWon && (
          <PostGame playAgain={this.playAgain} quitGame={this.props.quitGame} />
        )}
      </div>
    );
  }
}

export default Game;
