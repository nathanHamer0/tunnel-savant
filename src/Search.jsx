import { useEffect, useState } from "react";
import "./Search.css";
import SearchNotFound from "./SearchNotFound.jsx";
import tunnelingGraphic from "./assets/tunnelingGraphic.png";
import { csvToStandardNaming } from "./nameUtils.js";

/**
 * Fetches list of player names, formats them, and then sets them to the concerned render variable.
 *
 * @param {Function} setPlayerNames - Setter function used to set player names list.
 */
function fetchAndSetPlayerNames(setPlayerNames) {
  const API_URL = import.meta.env.VITE_API_URL ?? "http://localhost:5001"; // AI-GEN
  fetch(API_URL + "/api/players")
    .then((res) => res.json())
    .then((data) =>
      setPlayerNames(data.map((name) => csvToStandardNaming(name)))
    );
}

/**
 * Filters down list of player names to those containing the accumulating search string as a substring and then maps the result into a correspondence of event-responsive (re)render-triggering HTML list elements (i.e., that respond to to a click event by (re)setting the search string accordingly and (re)rendering to the search-specified Profile screen).
 *
 * @param {Boolean} dropdownVisibility - dropdown element visibility flag.
 * @param {Array} playerNames - Contains all player names.
 * @param {String} searchString - Accumulating search string of user input.
 * @param {Function} setSearchString - Setter function used to build or (re)set the accumulating search string.
 * @param {Function} setDropdownVisibility - Setter function used to mediate dropdown element visibility.
 * @param {Function} setState - Setter function used to mediate appplication-wide component visibility.
 */
function genDropdown(
  dropdownVisibility,
  playerNames,
  searchString,
  setSearchString,
  setDropdownVisibility,
  setState
) {
  return dropdownVisibility
    ? playerNames

        // Reduce dropdown list to those potential elements (names) specified by the search substring
        .filter((name) =>
          name.toLowerCase().includes(searchString.toLowerCase())
        )

        // Map potential elements (names) into list of HTML list elements that, upon selection, trigger a (re)render to the selection-specified profile screen
        .map((name) => (
          <li
            key={name}
            style={{ zIndex: 1, backgroundColor: "black" }}
            onMouseDown={() => {
              setSearchString(name);
              setDropdownVisibility(false);
              setState(1);
            }}
          >
            {name}
          </li>
        ))
    : null;
}

function Search({
  state,
  setState,
  searchString,
  setSearchString,
  searchFound,
}) {
  const [playerNames, setPlayerNames] = useState([]);
  const [dropdownVisibility, setDropdownVisibility] = useState(false);

  // Retrieve list of player names upon initial app-page render and map them as HTML options
  useEffect(() => fetchAndSetPlayerNames(setPlayerNames), []);

  // Reduce dropdown list to those potential elements (names) specified by the current search substring
  const filteredPlayerNames = playerNames.filter((name) =>
    name.toLowerCase().includes(searchString.toLowerCase())
  );

  const onEnterKey = (filteredPlayerNames) => {
    // Dropdown consisting of one name infers deterministic selection of that name upon "Enter"
    filteredPlayerNames.length == 1
      ? setSearchString(filteredPlayerNames[0])
      : undefined;

    setDropdownVisibility(false);
    setState(1);
  };
  return (
    state == 0 && (
      <>
        <div className="search viewport container">
          <div className="search top container">
            <h1>Tunnel Savant</h1>
          </div>
          <div className="search bottom container" id="parent">
            <div className="search bottom left container" id="child">
              <h2 className="search bottom left title">Intro</h2>
              <div className="search bottom left container" id="grandchild">
                <div>
                  <p>
                    A pitch tunneling pair is defined as two pitches of
                    differing type thrown in the same game occupying the same
                    region of 2D space all the way from their release point up
                    until the batter decision point (23.4 feet from homeplate).
                    Pitch tunneling is all about deception, as if a pitcher can
                    throw two pitches that in their initial trajectory appear
                    the same to the batter and then have their trajectories
                    diverge only after the batter has made their swing decision,
                    then they surely ought to have fooled the batter.
                  </p>
                </div>
                <img
                  className="search bottom left image"
                  src={tunnelingGraphic}
                ></img>
              </div>
            </div>
            <div className="search bottom right container" id="child">
              <h2 className="search bottom right title">App</h2>
              <div className="search bottom right container" id="grandchild">
                <p>
                  Search for any qualifying 2026 MLB pitcher (min ~50 innings
                  pitched) and see their tunnel usage metrics for every pitch
                  type pairing in their arsenal.
                </p>
                <h3>Pitcher Tunnel Usage Search</h3>
                <div className="search bottom right bar container">
                  <input
                    className="search bottom right bar"
                    type="text"
                    placeholder="Search player name"
                    value={searchString}
                    // Upon change in the HTML content of this element, take the related event, get the targeted HTML element of the event (this <input>), and retrieve its HTML content (what the user typed)
                    onChange={(e) => setSearchString(e.target.value)}
                    // Upon a key press event, get the pressed key of this event and (re)set visibility state if it is an "Enter" flag (suggesting input is complete)
                    onKeyDown={(e) =>
                      e.key == "Enter"
                        ? onEnterKey(filteredPlayerNames)
                        : undefined
                    }
                    onFocus={() => setDropdownVisibility(true)}
                    onBlur={() => setDropdownVisibility(false)}
                  ></input>
                  <ul className="search bottom right dropdown">
                    {genDropdown(
                      dropdownVisibility,
                      playerNames,
                      searchString,
                      setSearchString,
                      setDropdownVisibility,
                      setState
                    )}
                  </ul>
                </div>
                <SearchNotFound searchFound={searchFound} />
              </div>
            </div>
          </div>
        </div>
      </>
    )
  );
}

export default Search;
