import { useEffect, useState } from "react";
import "./Card.css";
import Slider from "./Slider.jsx";

const tunnelClassTitles = {
  A: "Overview",
  "F-F": "Fastball-Fastball Tunneling",
  "F-B": "Fastball-BreakingBall Tunneling",
  "F-O": "Fastball-Offspeed Tunneling",
  "B-O": "BreakingBall-Offspeed Tunneling",
};
const tunnelClassIdx = {
  A: ["F-F", "F-B", "F-O", "B-O"],
  "F-F": ["FF", "SI", "FC"],
  "F-B": ["FF", "SI", "FC", "CU", "KC", "CS", "SL", "ST", "SV", "SC"],
  "F-O": ["FF", "SI", "FC", "CH", "FS", "FO"],
  "B-O": ["CU", "KC", "CS", "SL", "ST", "SV", "SC", "CH", "FS", "FO"],
};

/**
 * Creates sliders visualizing tunnel-pair data for tunnel-pairs of the targeted pitch types.
 *
 * @param {Array[String]} pitchTypes - Targeted pitch types.
 * @param {Object[Object[Array[Number]]]} tunnelPairData - Tunnel-keyed (2D-pitch-type-keyed) jsonify'd python dictionary containing percentile-frequency 2-arrays.
 */
function createSliders(pitchTypes, tunnelPairData) {
  let tpScores = [];
  for (let idx in pitchTypes) {
    const ptA = pitchTypes[idx];
    for (let jdx in pitchTypes) {
      const ptB = pitchTypes[jdx];
      const reverseTunnelPair = String(ptB) + "-" + String(ptA);
      if (
        tunnelPairData[ptA][ptB][0] != 0 &&
        !tpScores.some(([tunnelPair, ,]) => tunnelPair == reverseTunnelPair)
      ) {
        const tunnelPair = String(ptA) + "-" + String(ptB);
        const tpScorePack = [[tunnelPair].concat(tunnelPairData[ptA][ptB])];
        tpScores = tpScores.concat(tpScorePack);
      }
    }
  }
  return tpScores.map(([tunnelPair, perc, freq]) => (
    <Slider tunnelPair={tunnelPair} percentile={perc} frequency={freq} />
  ));
}

function Card({ tunnelClass, aggregateTunnelPairData, tunnelPairData }) {
  const overallScores = aggregateTunnelPairData[tunnelClass];
  const tunnelIdx = tunnelClassIdx[tunnelClass];
  let sliders;

  // Overview card (special case)
  let atpScores = [];
  if (tunnelClass == "A") {
    for (let idx in tunnelIdx) {
      const tunnelSubclass = tunnelIdx[idx];
      const atpScorePack = [
        [tunnelSubclass].concat(aggregateTunnelPairData[tunnelSubclass]),
      ];
      atpScores = atpScores.concat(atpScorePack);
    }
    sliders = atpScores.map(([tunnelSubclass, perc, freq]) => (
      <Slider tunnelPair={tunnelSubclass} percentile={perc} frequency={freq} />
    ));
    // Tunnel-class card (standard case)
  } else {
    // TODO: function(s) should be generalized (modularized) so special case can use as well
    sliders = createSliders(tunnelIdx, tunnelPairData);
  }

  return (
    <>
      <div className="card container root">
        <h3 className="card subtitle">{tunnelClassTitles[tunnelClass]}</h3>
        <div>
          <Slider
            tunnelPair={"Overall"}
            percentile={overallScores[0]}
            frequency={overallScores[1]}
          />
          {sliders}
        </div>
      </div>
    </>
  );
}

export default Card;
