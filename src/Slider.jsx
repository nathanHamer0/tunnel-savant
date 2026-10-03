import { useEffect, useState } from "react";
import "./Slider.css";

function calcIndicatorDisplacement(percentile) {
  return String(100 * percentile) + "%";
}

function calcIndicatorBackgroundColor(percentile) {
  if (percentile == 0.5) {
    return "rgb(255, 255, 255)";
  } else if (percentile < 0.5) {
    const rg = 255 * (2 * percentile);
    return "rgb(" + String(rg) + ", " + String(rg) + ", 255)";
  }
  const bg = 255 * (2 * percentile);
  return "rgb(255, " + String(bg) + ", " + String(bg) + ")";
}

function calcIndicatorBorderColor(percentile) {
  if (percentile == 0.5) {
    return "rgb(255, 255, 255)";
  } else if (percentile < 0.5) {
    return "rgb(173, 230, 230)";
  }
  return "rgb(230, 173, 173)";
}

function Slider({ tunnelPair, percentile, frequency }) {
  return (
    <>
      <div className="slider container">
        <span className="slider label">{tunnelPair}</span>
        <div
          className="slider bar"
          style={{
            backgroundColor: calcIndicatorBackgroundColor(percentile),
          }}
        >
          <div
            className="slider indicator"
            style={{
              left: calcIndicatorDisplacement(percentile),
              transform:
                "translateX(" + calcIndicatorDisplacement(percentile) + ")",
              backgroundColor: calcIndicatorBackgroundColor(percentile),
              borderColor: calcIndicatorBorderColor(percentile),
            }}
          >
            <span className="slider score" id="percentile">
              {percentile}
            </span>
          </div>
        </div>
        <span className="Slider score" id="frequency">
          {frequency}
        </span>
      </div>
    </>
  );
}

export default Slider;
