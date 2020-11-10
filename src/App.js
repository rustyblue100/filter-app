import React, { useState, useEffect } from "react";

import dataJson from "./cardsLayout.json";
import FilterMethod01 from "./components/FilterMethod01";

const fetchUrl = dataJson;
const App = () => {
  return (
    <div className="App">
      {" "}
      <FilterMethod01 />
    </div>
  );
};

export default App;
