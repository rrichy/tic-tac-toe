import React from "react";

const PostGame = ({ playAgain, quitGame }) => {
  return (
    <div id="post-game">
      <button onClick={playAgain}>Play Again</button>
      <button onClick={quitGame}>Quit</button>
    </div>
  );
};

export default PostGame;
