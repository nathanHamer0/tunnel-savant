import { useEffect, useState } from "react";
import "./SearchNotFound.css";

function SearchNotFound({ searchFound }) {
  return (
    !searchFound && (
      <>
        <div className="SearchNotFound container">
          <p className="SearchNotFound msg">
            Player could not be found. Try again in "{"{"}firstname
            {"}"}
            {"{"}lastname{"}"}" format.
          </p>
        </div>
      </>
    )
  );
}

export default SearchNotFound;
