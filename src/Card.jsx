import { useEffect, useState } from "react";
import "./Card.css";
import Slider from "./Slider.jsx";

const tunnelClassTitles = {
  A: "Overview",
  "F-F": "Fastball-Fastball (F-F) Tunneling",
  "F-B": "Fastball-BreakingBall (F-B) Tunneling",
  "F-O": "Fastball-Offspeed (F-O) Tunneling",
  "B-O": "BreakingBall-Offspeed (B-O) Tunneling",
};
const tunnelClassIdx = {
  A: ["F-F", "F-B", "F-O", "B-O"],
  "F-F": [
    ["FF", "SI", "FC"],
    ["FF", "SI", "FC"],
  ],
  "F-B": [
    ["FF", "SI", "FC"],
    ["CU", "KC", "CS", "SL", "ST", "SV", "SC"],
  ],
  "F-O": [
    ["FF", "SI", "FC"],
    ["CH", "FS", "FO"],
  ],
  "B-O": [
    ["CU", "KC", "CS", "SL", "ST", "SV", "SC"],
    ["CH", "FS", "FO"],
  ],
};

/**
 * Creates sliders visualizing tunnel-pair data for tunnel-pairs of the targeted pitch types.
 *
 * @param {Array[Array[String]]} pitchTypes - Two arrays, one for each targeted pitch type in this card's tunnel class.
 * @param {Object[Object[Array[Number]]]} tunnelPairData - Tunnel-keyed (2D-pitch-type-keyed) jsonify'd python dictionary containing percentile-frequency 2-arrays.
 * @param {Array[String]} arsenal - All pitch types that this player throws.
 */
function createSliders(pitchTypes, tunnelPairData, arsenal) {
  let tpScores = [];

  // Establish pitch type class groupings for this tunnel class and player
  const pitchTypesA = pitchTypes[0].filter((pt) => arsenal.includes(pt));
  const pitchTypesB = pitchTypes[1].filter((pt) => arsenal.includes(pt));

  // Assemble slider data packs for each pairing
  for (let idx in pitchTypesA) {
    const ptA = pitchTypesA[idx];
    for (let jdx in pitchTypesB) {
      const ptB = pitchTypesB[jdx];
      const reverseTunnelPair = String(ptB) + "-" + String(ptA);
      if (
        ptA != ptB &&
        !tpScores.some(([tunnelPair, ,]) => tunnelPair == reverseTunnelPair)
      ) {
        const tunnelPair = String(ptA) + "-" + String(ptB);
        const tpScorePack = [[tunnelPair].concat(tunnelPairData[ptA][ptB])];
        tpScores = tpScores.concat(tpScorePack);
      }
    }
  }

  // Map slider data packs into Slider components
  return tpScores.map(([tunnelPair, perc, freq]) => (
    <Slider
      key={tunnelPair}
      tunnelPair={tunnelPair}
      percentile={perc}
      frequency={freq}
    />
  ));
}

function Card({
  tunnelClass,
  aggregateTunnelPairData,
  tunnelPairData,
  arsenal,
}) {
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
      <Slider
        key={tunnelSubclass}
        tunnelPair={tunnelSubclass}
        percentile={perc}
        frequency={freq}
      />
    ));
    // Tunnel-class card (standard case)
  } else {
    // TODO: function(s) should be generalized (modularized) so special case can use as well
    sliders = createSliders(tunnelIdx, tunnelPairData, arsenal);
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
