import { useEffect, useState } from "react";
import "./App.css";

import Search from "./Search.jsx";
import Profile from "./Profile.jsx";

function App() {
  const [state, setState] = useState(0);
  const [searchString, setSearchString] = useState("");
  const [searchFound, setSearchFound] = useState(true);

  return (
    <>
      <Search
        state={state}
        setState={setState}
        searchString={searchString}
        setSearchString={setSearchString}
        searchFound={searchFound}
      />
      <Profile
        state={state}
        setState={setState}
        searchString={searchString}
        setSearchString={setSearchString}
        searchFound={searchFound}
        setSearchFound={setSearchFound}
      />
    </>
  );
}

export default App;
