import { useEffect, useState } from "react";
import "./Search.css";
import SearchNotFound from "./SearchNotFound.jsx";

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
        <div className="search container">
          <h1 className="search title">Tunnel Savant</h1>
          <input
            className="search bar"
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
      </>
    )
  );
}

export default Search;
