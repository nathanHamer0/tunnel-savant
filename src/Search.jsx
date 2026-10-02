import { useEffect, useState } from "react";
import "./Search.css";

function Search({ state, setState, searchString, setSearchString }) {
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
              keyboardEvent.key == "Shift"
                ? null
                : (setSearchString(searchString + keyboardEvent.key),
                  keyboardEvent.key == "Enter" ? setState(1) : null)
            } // `onKeyDown` automatically passes pressed key as argument to called function
          ></input>
        </div>
      </>
    )
  );
}

export default Search;
