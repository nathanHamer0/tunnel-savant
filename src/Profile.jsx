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
 * @param {Function} setState - Setter function used to mediate appplication-wide component visibility.
 * @returns {String} Full name in capitalized CSV form "last_name, first_name".
 * @param {Function} setSearchFound - Setter function used mediate SearchNotFound component (i.e., an error message) visibility.
 */
function standardToCsvNaming(standardName, setState, setSearchFound) {
  if (!(standardName.includes("Enter") && standardName.includes(" "))) {
    return;
  }

  // Trim "Enter" key
  standardName = standardName.slice(0, -1 * "Enter".length);

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
 * @param {Function} setHtml - Setter function used to (re)set content of Profile HTML.
 * @param {Function} onBackButton - Sequence of (re)render actions to be carried out upon a click of a Profile component's back-button.
 * @param {Function} setState - Setter function used to mediate appplication-wide component visibility.
 * @param {Function} setSearchFound - Setter function used mediate SearchNotFound component (i.e., an error message) visibility.
 * @param {Function} setSearchString - Setter function used to build (or reset) the accumulating search string.
 */
function genProfile(
  data,
  setHtml,
  onBackButton,
  setState,
  setSearchFound,
  setSearchString
) {
  // Upon initial app render
  if (!data) {
    return;
  }

  // Relay verdict on success of API database search
  if (data == "PlayerNotFound") {
    try {
      throw new Error("InvalidInputException");
    } catch (error) {
      console.log(error.message);
      setSearchFound(false);
      setState(0);
      setSearchString("");
      return;
    }
  }
  setSearchFound(true);

  // Express fetched API data in HTML
  const playerName = data["player-name"];
  const teamName = data["team-name"];
  const aggregateTunnelPairData = data["aggregate-tunnel-pairs"];
  const tunnelPairData = data["tunnel-pairs"];
  setHtml(
    <>
      <div className="profile viewport">
        <section className="profile top">
          <button className="profile back" onClick={() => onBackButton()}>
            Back to Search
          </button>
          <h2 className="profile title">
            {playerName} | {teamName}
          </h2>
        </section>
        <section className="profile bottom">
          <img src={LOGOS[teamName]}></img>
          <Card
            tunnelClass={"A"}
            aggregateTunnelPairData={aggregateTunnelPairData}
            tunnelPairData={tunnelPairData}
          />
          <Card
            tunnelClass={"F-F"}
            aggregateTunnelPairData={aggregateTunnelPairData}
            tunnelPairData={tunnelPairData}
          />
          <Card
            tunnelClass={"F-B"}
            aggregateTunnelPairData={aggregateTunnelPairData}
            tunnelPairData={tunnelPairData}
          />
          <Card
            tunnelClass={"F-O"}
            aggregateTunnelPairData={aggregateTunnelPairData}
            tunnelPairData={tunnelPairData}
          />
          <Card
            tunnelClass={"B-O"}
            aggregateTunnelPairData={aggregateTunnelPairData}
            tunnelPairData={tunnelPairData}
          />
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
 * @param {Function} setState - Setter function used to mediate appplication-wide component visibility.
 * @param {Function} setSearchFound - Setter function used mediate SearchNotFound component (i.e., an error message) visibility.
 */
function regen(searchString, regenHtml, setState, setSearchFound) {
  // Upon initial app render
  if (!searchString) {
    return;
  }

  fetch(
    "http://localhost:5001/api/player/" +
      encodeURIComponent(
        standardToCsvNaming(searchString, setState, setSearchFound)
      ) +
      "/data" // http://localhost:5001/api/player/Gausman%2C%20Kevin/data
  )
    .then((res) => res.json()) // res.json() parses response body as JSON
    .then((data) => regenHtml(data)); // Retrieves the JSON data
}

function Profile({
  state,
  setState,
  searchString,
  setSearchString,
  setSearchFound,
}) {
  // setHtml() lets Profile know that its time to re-render as new HTML has been generated (for a new profile)
  const [html, setHtml] = useState(null);

  const onBackButton = () => {
    setSearchString("");
    setState(0);
  };
  const fetchThenRegen = () =>
    regen(
      searchString,
      (apiData) =>
        genProfile(
          apiData,
          setHtml,
          onBackButton,
          setState,
          setSearchFound,
          setSearchString
        ),
      setState,
      setSearchFound
    );

  // When the state has changed to 1, presumably, a search has been made, and so, its time to fetch the searched-for data (via regen()) and generate the new profile (via genProfile()) w/ fetchThenRegen()
  useEffect(() => (state == 1 ? fetchThenRegen() : undefined), [state]);
  return state == 1 && html;
}

export default Profile;

/////////////
// LEARNINGS
/////////////

// ~Line204
///////////
// Function must be given as a reference, not a call; hence, why the function is given as a call within a reference to an arrow-function. As calling the function directly gives the function's return, not the function itself. To give the function itself you must embed (i.e., call) the function within a reference to an arrow function (i.e., a plain function value).

// ~Line205
///////////
// regen(searchString, regenHtml) requires regenHtml argument to be an arrow-function so that it can harness api-fetch by taking it as an argument.
