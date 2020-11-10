import React, { useState, useEffect } from "react";

import dataJson from "./cardsLayout.json";
import Units from "./components/Units";

const fetchUrl = dataJson;
const App = () => {
  return (
    <div className="App">
      {" "}
      <Units />
    </div>
  );
};

export default App;
