import React from "react";
import "./loading.css";

const boxStyle = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
};
const Loading = () => {
  return (
    <>
      <div class="pl" style={boxStyle}>
        <div class="pl__dot"></div>
        <div class="pl__dot"></div>
        <div class="pl__dot"></div>
        <div class="pl__dot"></div>
        <div class="pl__dot"></div>
        <div class="pl__dot"></div>
        <div class="pl__dot"></div>
        <div class="pl__dot"></div>
        <div class="pl__dot"></div>
        <div class="pl__dot"></div>
        <div class="pl__dot"></div>
        <div class="pl__dot"></div>
        <div class="pl__text">Loading…</div>
      </div>
    </>
  );
};

export default Loading;
