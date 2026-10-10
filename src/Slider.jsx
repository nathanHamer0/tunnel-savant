import { useEffect, useState } from "react";
import "./Slider.css";

/**
 * Calculates this indicator's dispalcement along this Slider's bar based on the given percentile score for this Slider's statistic.
 *
 * @param {Number} percentile - floating point within the range 0 to 100.
 * @returns {String} HTML string conveying relative dispalcement.
 */
function calcIndicatorDisplacement(percentile) {
  return String(100 * percentile) + "%";
}

/**
 * Calculates this indicator's background color based on the given percentile score for this Slider's statistic.
 *
 * @param {Number} percentile - floating point within the range 0 to 100.
 * @returns {String} HTML string conveying color.
 */
function calcIndicatorBackgroundColor(percentile) {
  let color = "rgb(255, 255, 255)";

  // Color higher scores red
  if (percentile > 0.5) {
    // Dull purity proportionally to score (up non-reds)
    const bg = 255 * (1 - 2 * (percentile - 0.5)); // -0.5 to shift score (0.5,1] leftwards to origin (0,0.5]; 2* to scale score (0,0.5] up to 100% scale (0,1]; 1- to take inverse so higher (extreme/purest) scores are dulled the least
    color = "rgb(255, " + String(bg) + ", " + String(bg) + ")";

    // Color lower scores blue
  } else if (percentile < 0.5) {
    // Dull purity proportionally to score (up non-blues)
    const rg = 255 * (2 * percentile); // 2* to scale score [0,0.5) up to 100% scale [0,1); lower (extreme/purest) scores are dulled the least
    color = "rgb(" + String(rg) + ", " + String(rg) + ", 255)";
  }
  return color;
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
                "translate(-" +
                calcIndicatorDisplacement(percentile) +
                ", -50%)",
              backgroundColor: calcIndicatorBackgroundColor(percentile),
            }}
          >
            <span className="slider score" id="percentile">
              {(100 * percentile).toFixed(0)}
            </span>
          </div>
        </div>
        <span className="Slider score" id="frequency">
          {frequency.toFixed(2)}
        </span>
      </div>
    </>
  );
}

export default Slider;
