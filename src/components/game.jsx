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
      winner: "",
      lineType: 0, //1 -H/V, 2 - Slant
    };
  }

  componentDidMount() {
    if (this.state.turn === 2 && this.state.playerTwo === "Bot") this.botMove();
  }

  handleClick = async (e) => {
    const resume = !this.state.boardWon,
      opponent = this.state.playerTwo,
      currentTurn = this.state.turn;

    if (resume && (opponent === "Player 2" || currentTurn === 1)) {
      const index = parseInt(e.target.getAttribute("index"));
      let displayGrid = [...this.state.displayGrid];
      if (index >= 0 && !displayGrid[index]) {
        displayGrid[index] = currentTurn === 1 ? "x" : "o";

        await this.setState({ turn: currentTurn === 1 ? 2 : 1, displayGrid });
        this.checkBoard(currentTurn);

        if (opponent === "Bot" && !this.state.boardWon) this.botMove();
      }
    }
  };

  botMove = async () => {
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
    let displayGrid = [...this.state.displayGrid];

    const almostWin = (arr) => {
      let x = 0,
        o = 0,
        none = 0;
      arr.forEach((a) => {
        let b = this.state.displayGrid[a];
        if (b === "x") x++;
        else if (b === "o") o++;
        else none++;
      });
      return none === 1 && (x === 2 || o === 2);
    };

    let index;

    let almost = winningState.filter((w) => almostWin(w));
    if (almost.length) {
      let arr = almost.find((a) => a.some((b) => displayGrid[b] === "o"));
      index = arr
        ? arr.find((v) => !displayGrid[v])
        : almost[0].find((v) => !displayGrid[v]);
    } else {
      const possibleMoves = displayGrid
        .map((v, i) => (!v ? i : v))
        .filter((v) => v !== "x" && v !== "o");
      index = possibleMoves[Math.floor(Math.random() * possibleMoves.length)];
    }

    displayGrid[index] = "o";

    await this.setState({ turn: 1, displayGrid });
    this.checkBoard(2);
  };

  playAgain = async () => {
    await this.setState({ boardWon: false, displayGrid: Array(9).fill() });
    if (this.state.turn === 2 && this.state.playerTwo === "Bot") this.botMove();
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

    if (winning >= 0) {
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
        if (winning === 6) slantTransform = "";
        if (winning === 7) slantTransform = "rotate(90deg)";
      }

      if (prevturn === 1) scoreOne++;
      else scoreTwo++;

      let winner =
        (prevturn === 1 ? "Player 1" : this.state.playerTwo) + " has Won!";

      this.setState({ scoreOne, scoreTwo, boardWon: true, winner, lineType });
      return;
    }

    if (this.state.displayGrid.every((v) => v === "x" || v === "o")) {
      console.log("draw");
      this.setState({ boardWon: true, winner: "It's a Draw!", lineType: 0 });
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
          <PostGame
            playAgain={this.playAgain}
            quitGame={this.props.quitGame}
            winner={this.state.winner}
          />
        )}
      </React.Fragment>
    );
  }
}

export default Game;
