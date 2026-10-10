import { useEffect, useState } from "react";
import "./Search.css";
import SearchNotFound from "./SearchNotFound.jsx";
import tunnelingGraphic from "./assets/tunnelingGraphic.png";

/**
 * Processes given keyboard event.
 *
 * @param {KeyboardEvent} keyboardEvent - Pressed key retrievable via .key attribute.
 * @param {String} searchString - accumulating search string conducted by user input.
 * @param {Function} setSearchString - Setter function used to build the accumulating search string.
 * @param {Function} setState - Setter function used to mediate appplication-wide component visibility.
 */
function processkeyboardEvent(
  keyboardEvent,
  searchString,
  setSearchString,
  setState
) {
  if (keyboardEvent.key == "Backspace") {
    setSearchString(searchString.slice(0, -1));

    // Ignore capitalizing shifts
  } else if (keyboardEvent.key != "Shift") {
    setSearchString(searchString + keyboardEvent.key);

    // Advance to Profile state upon search completion (re-render)
    if (keyboardEvent.key == "Enter") {
      setState(1);
    }
  }
}

function Search({
  state,
  setState,
  searchString,
  setSearchString,
  searchFound,
}) {
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
                <input
                  className="search bottom right bar"
                  id="home"
                  type="text"
                  placeholder="Search player name"
                  onKeyDown={(keyboardEvent) =>
                    processkeyboardEvent(
                      keyboardEvent,
                      searchString,
                      setSearchString,
                      setState
                    )
                  }
                ></input>
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
