import React, { Component } from "react";
import Game from "./components/game";

const Mode = (props) => {
  return (
    <div id="mode">
      <p style={{ gridArea: "p1" }}>Player vs.</p>
      <button value="ai" style={{ gridArea: "comp" }} onClick={props.onClick}>
        Computer
      </button>
      <button value="player" style={{ gridArea: "p2" }} onClick={props.onClick}>
        Player
      </button>
    </div>
  );
};

class App extends Component {
  state = {
    start: false,
    opponent: "",
  };

  modeSelect = (e) => {
    console.log(e.target.value);
    const opponent = e.target.value === "ai" ? "Bot" : "Player 2";
    console.log(opponent);
    this.setState({ start: true, opponent });
  };

  quitGame = () => {
    this.setState({ start: false });
  };

  render() {
    return (
      <React.Fragment>
        {!this.state.start && <Mode onClick={this.modeSelect} />}
        {this.state.start && (
          <Game quitGame={this.quitGame} opponent={this.state.opponent} />
        )}
      </React.Fragment>
    );
  }
}

export default App;
