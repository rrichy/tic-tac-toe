import React from "react";

const PostGame = ({ winner, playAgain, quitGame }) => {
  return (
    <div id="post-game">
      <p style={{ gridArea: "win" }}>{winner}</p>
      <button onClick={playAgain} style={{ gridArea: "again" }}>
        Play Again
      </button>
      <button onClick={quitGame} style={{ gridArea: "quit" }}>
        Quit
      </button>
    </div>
  );
};

export default PostGame;
