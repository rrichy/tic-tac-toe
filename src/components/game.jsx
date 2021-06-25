import React, { Component } from "react";
import Grid from "./grid";
import PostGame from "./postgame";
import "./game.css";

import { StrokeLine, StrokeSlant } from "./strokes";

let lineTransform = "",
  slantTransform = "";

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
      lineType: 1, //1 -H/V, 2 - Slant
    };
  }

  handleClick = async (e) => {
    if (!this.state.boardWon) {
      const index = parseInt(e.target.getAttribute("index"));
      let displayGrid = [...this.state.displayGrid];
      console.log(index);
      if (index >= 0 && !displayGrid[index]) {
        const currentTurn = this.state.turn;
        displayGrid[index] = currentTurn === 1 ? "x" : "o";

        await this.setState({ turn: currentTurn === 1 ? 2 : 1, displayGrid });
        this.checkBoard(currentTurn);
        console.log(displayGrid);
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
      ),
      winning = state.findIndex(
        (c) => c.every((m) => m === "x") || c.every((m) => m === "o")
      );

    // console.log(winning);

    if (winning >= 0) {
      console.log("board is won");
      let { scoreOne, scoreTwo, lineType } = this.state;

      if (winning <= 5) {
        lineType = 1;
        if (winning === 0) lineTransform = "translateY(-33.33%)";
        if (winning === 1) lineTransform = "";
        if (winning === 2) lineTransform = "translateY(33.33%)";
        if (winning === 3) lineTransform = "rotate(90deg) translateY(33.333%)";
        if (winning === 4) lineTransform = "rotate(90deg)";
        if (winning === 5) lineTransform = "rotate(90deg) translateY(-33.333%)";
      } else {
        lineType = 2;
        if (winning === 7) slantTransform = "rotate(90deg)";
      }

      if (prevturn === 1) scoreOne++;
      else scoreTwo++;

      console.log(
        `${prevturn === 1 ? "Player 1" : this.state.playerTwo} has won`
      );
      this.setState({ scoreOne, scoreTwo, boardWon: true, lineType });
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
      <React.Fragment>
        <div id="game-info">
          <p className={"info-item" + (this.state.turn === 1 ? " active" : "")}>
            Player 1
          </p>
          <p>
            {this.state.scoreOne}:{this.state.scoreTwo}
          </p>
          <p className={"info-item" + (this.state.turn === 2 ? " active" : "")}>
            {this.state.playerTwo}
          </p>
        </div>
        {this.state.boardWon && this.state.lineType === 1 && (
          <StrokeLine transform={lineTransform} />
        )}
        {this.state.boardWon && this.state.lineType === 2 && (
          <StrokeSlant transform={slantTransform} />
        )}
        <div id="board" className={this.state.boardWon ? "disabled" : ""}>
          {this.state.displayGrid.map((mark, index) => (
            <Grid
              key={index}
              mark={mark}
              index={index}
              handleClick={this.handleClick}
            />
          ))}
        </div>
        {this.state.boardWon && (
          <PostGame playAgain={this.playAgain} quitGame={this.props.quitGame} />
        )}
      </React.Fragment>
    );
  }
}

export default Game;
