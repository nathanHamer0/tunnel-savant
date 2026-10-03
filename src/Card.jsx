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
const tunnelClassToPitchTypeIndex = {
  A: ["F-F", "F-B", "F-O", "B-O"],
  "F-F": ["FF", "SI", "FC"],
  "F-B": ["FF", "SI", "FC", "CU", "KC", "CS", "SL", "ST", "SV", "SC"],
  "F-O": ["FF", "SI", "FC", "CH", "FS", "FO"],
  "B-O": ["CU", "KC", "CS", "SL", "ST", "SV", "SC", "CH", "FS", "FO"],
};

function Card({ tunnelClass, aggregateTunnelPairData, TunnelPairData }) {
  const atpScore = aggregateTunnelPairData[tunnelClass];

  // TODO: create sliders for tunnel-pair data

  return (
    <>
      <div className="card container root">
        <h3 className="card subtitle">{tunnelClassTitles[tunnelClass]}</h3>
        <div>
          <Slider
            tunnelPair={"Overall"}
            percentile={atpScore}
            frequency={"NA"}
          />
          {/* Rest of sliders go here */}
        </div>
      </div>
    </>
  );
}

export default Card;
