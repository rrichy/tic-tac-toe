import React from "react";
import "./strokeAnimations.css";

const StrokeX = ({ strokeColor = "green" }) => {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">
      <path
        className="x-stroke-1"
        d="M89.296889,10.491441Q53.036996,54.874655,16.777103,80.827167"
        style={{
          fill: "none",
          stroke: strokeColor,
          strokeWidth: "4",
          strokeLinecap: "round",
          strokeDashoffset: "112",
          strokeDasharray: "112",
        }}
      />
      <path
        className="x-stroke-2"
        d="M16.777103,12.491441C55.889932,45.070127,69.234309,58.715259,86.535984,87.244617"
        style={{
          fill: "none",
          stroke: strokeColor,
          strokeWidth: "4",
          strokeLinecap: "round",
          strokeDashoffset: "112",
          strokeDasharray: "112",
        }}
      />
    </svg>
  );
};

const StrokeO = ({ strokeColor = "red" }) => {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">
      <path
        className="o-stroke"
        d="M31.727060,12.581920C61.757420,0.925840,84.609960,22.326770,86.091340,44.240370C87.572720,66.153960,85.739700,83.707870,59.366730,88.603690C32.993760,93.499510,9.797390,83.747830,11.519600,58.012140Q13.241820,32.276450,45.348100,14.367800Q11.978570,15.107440,31.727060,12.581920Z"
        transform="matrix(1 0 0 1 0 0.40744972500000)"
        style={{
          fill: "none",
          stroke: strokeColor,
          strokeWidth: "4",
          strokeLinecap: "round",
          strokeDashoffset: "251",
          strokeDasharray: "251",
        }}
      />
    </svg>
  );
};

const StrokeLine = ({ strokeColor = "black", transform = "" }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 100 100"
      className="l-stroke"
      style={{ transform }}
    >
      <line
        className="l-stroke"
        x1="-43.522097"
        y1="0"
        x2="23.147903"
        y2="0"
        transform="matrix(1 0 0 1 60.19209749999999 50)"
        style={{
          fill: "none",
          stroke: strokeColor,
          strokeWidth: "4",
          strokeLinecap: "round",
          strokeDashoffset: "68",
          strokeDasharray: "68",
        }}
      />
    </svg>
  );
};

const StrokeSlant = ({ strokeColor = "black", transform = "" }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 100 100"
      className="s-stroke"
      style={{ transform }}
    >
      <line
        className="s-stroke"
        x1="-33.335000"
        y1="-36.716518"
        x2="33.335000"
        y2="29.953482"
        transform="matrix(1 0 0 1 50.00500000000000 53.38651800000000)"
        style={{
          fill: "none",
          stroke: strokeColor,
          strokeWidth: "4",
          strokeLinecap: "round",
          strokeDashoffset: "96",
          strokeDasharray: "96",
        }}
      />
    </svg>
  );
};

export { StrokeX, StrokeO, StrokeLine, StrokeSlant };
