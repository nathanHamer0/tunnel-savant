import { useEffect, useState } from "react";
import "./Profile.css";
import ATH from "./assets/logos/ATH.png";
import ATL from "./assets/logos/ATL.png";
import AZ from "./assets/logos/AZ.png";
import BAL from "./assets/logos/BAL.png";
import BOS from "./assets/logos/BOS.png";
import CHC from "./assets/logos/CHC.png";
import CHW from "./assets/logos/CHW.png";
import CIN from "./assets/logos/CIN.png";
import CLE from "./assets/logos/CLE.png";
import COL from "./assets/logos/COL.png";
import DET from "./assets/logos/DET.png";
import HOU from "./assets/logos/HOU.png";
import KC from "./assets/logos/KC.png";
import LAA from "./assets/logos/LAA.png";
import LAD from "./assets/logos/LAD.png";
import MIA from "./assets/logos/MIA.png";
import MIL from "./assets/logos/MIL.png";
import MIN from "./assets/logos/MIN.png";
import NYM from "./assets/logos/NYM.png";
import NYY from "./assets/logos/NYY.png";
import PHI from "./assets/logos/PHI.png";
import PIT from "./assets/logos/PIT.png";
import SD from "./assets/logos/SD.png";
import SEA from "./assets/logos/SEA.png";
import SF from "./assets/logos/SF.png";
import STL from "./assets/logos/STL.png";
import TB from "./assets/logos/TB.png";
import TEX from "./assets/logos/TEX.png";
import TOR from "./assets/logos/TOR.png";
import WSH from "./assets/logos/WSH.png";

import Card from "./Card.jsx";
const LOGOS = {
  ATH: ATH,
  ATL: ATL,
  AZ: AZ,
  BAL: BAL,
  BOS: BOS,
  CHC: CHC,
  CHW: CHW,
  CIN: CIN,
  CLE: CLE,
  COL: COL,
  DET: DET,
  HOU: HOU,
  KC: KC,
  LAA: LAA,
  LAD: LAD,
  MIA: MIA,
  MIL: MIL,
  MIN: MIN,
  NYM: NYM,
  NYY: NYY,
  PHI: PHI,
  PIT: PIT,
  SD: SD,
  SEA: SEA,
  SF: SF,
  STL: STL,
  TB: TB,
  TEX: TEX,
  TOR: TOR,
  WSH: WSH,
};

/**
 * Translates searched name (in standard format) to the CSV naming format and returns the result.
 *
 * @param {String} standardName - Full name in standard form "first_name last_name".
 * @returns {String} Full name in capitalized CSV form "last_name, first_name".
 */
function standardToCsvNaming(standardName) {
  // On initial app render
  if (!standardName.includes("Enter")) {
    return;
  }
  standardName = standardName.slice(0, -1 * "Enter".length);

  if (!standardName.includes(" ")) {
    try {
      throw new Error("InvalidInputException");
    } catch (error) {
      console.log(error.message);
    }
  }

  // Traverse to space delimiter
  let ch = 0;
  while (standardName[ch] != " ") {
    ch++;
  }

  // Partition at space delimiter
  // Capitalize partitions
  const firstName = standardName[0].toUpperCase() + standardName.slice(1, ch);
  const lastName =
    standardName[ch + 1].toUpperCase() + standardName.slice(ch + 2);
  return lastName + ", " + firstName;
}

/**
 * Generates HTML for a newly-apiData-specified Profile component and calls for its (re)rendering.
 *
 * @param {Object} data - Profile-specifying apiData.
 */
function genProfile(data, setHtml, onBackButton) {
  // On initial app render
  if (!data) {
    return;
  }

  const player_name = data["player-name"];
  const team_name = data["team-name"];
  const atp_data = data["aggregate-tunnel-pairs"];
  const tp_data = data["tunnel-pairs"];
  // TODO: funnel data to cards appropriately
  setHtml(
    <>
      <div className="profile viewport">
        <section className="profile top">
          <button className="profile back" onClick={() => onBackButton()}>
            Back to Search
          </button>
          <h2 className="profile title">
            {player_name} | {team_name}
          </h2>
        </section>
        <section className="profile bottom">
          <img src={LOGOS[team_name]}></img>
          <Card tunnelClass={"A"} />
          <Card tunnelClass={"F-F"} />
          <Card tunnelClass={"F-B"} />
          <Card tunnelClass={"F-O"} />
          <Card tunnelClass={"B-O"} />
        </section>
      </div>
    </>
  );
}

/**
 * Conducts regeneration of Profile component from fetching the searched-for apiData to feeding it to the Profile HTML
 * generator genProfile() via regenHtml().
 *
 * @param {String} searchString - Profile-specifying apiData.
 * @param {Function} regenHtml - Harnesses and feeds fetched apiData to the Profile HTML generator genProfile().
 */
function regen(searchString, regenHtml) {
  // On initial app render
  if (!searchString) {
    return;
  }

  fetch(
    "http://localhost:5001/api/player/" +
      encodeURIComponent(standardToCsvNaming(searchString)) +
      "/data" // http://localhost:5001/api/player/Gausman%2C%20Kevin/data
  )
    .then((res) => res.json()) // res.json() parses response body as JSON
    .then((data) => regenHtml(data)); // Retrieves the JSON data
}

function Profile({ state, setState, searchString, setSearchString }) {
  // setHtml() lets Profile know that its time to re-render as new HTML has been generated (for a new profile)
  const [html, setHtml] = useState(null);

  const onBackButton = () => {
    setSearchString("");
    setState(0);
  };
  const fetchThenRegen = regen(searchString, (apiData) =>
    genProfile(apiData, setHtml, onBackButton)
  );

  // When the state has changed, presumably, a search has been made, and so, its time to fetch the searched-for data (via regen()) and generate the new profile (via genProfile()) w/ fetchThenRegen()
  useEffect(() => fetchThenRegen, [state]);
  return state == 1 && html;
}

export default Profile;

/////////////
// LEARNINGS
/////////////

// ~Line137
///////////
// regen(searchString, regenHtml) requires regenHtml argument to be an arrow-function so that it can harness api-fetch by taking it as an argument.

// ~Line142
///////////
// Effect-function must be given as a reference, not a call; hence, why the effect-function is given as a variable. As calling the function directly gives the function's return as the argument, not the argument specified for (i.e., the function itself). To give the effect-function itself you must refer to the function as a plain function variable/value (e.g., as arrow function).
