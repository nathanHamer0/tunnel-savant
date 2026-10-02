import { useEffect, useState } from "react";
import "./App.css";

import Search from "./Search.jsx";
import Profile from "./Profile.jsx";

function App() {
  const [state, setState] = useState(0);
  const [searchString, setSearchString] = useState("");

  return (
    <>
      <Search
        state={state}
        setState={setState}
        searchString={searchString}
        setSearchString={setSearchString}
      />
      <Profile
        state={state}
        setState={setState}
        searchString={searchString}
        setSearchString={setSearchString}
      />
    </>
  );
}

export default App;
