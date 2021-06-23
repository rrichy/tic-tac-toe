import React from "react";
import { StrokeX, StrokeO } from "./strokes";

const Grid = ({ mark, index, handleClick }) => {
  return (
    <div
      id={"grid-" + index}
      index={index}
      className="grid-item"
      onClick={handleClick}
    >
      {mark === "x" && <StrokeX />}
      {mark === "o" && <StrokeO />}
    </div>
  );
};

export default Grid;
