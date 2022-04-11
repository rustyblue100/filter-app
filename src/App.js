import Airtable from "airtable";
import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Header from "./components/Header";
import Unit from "./components/Unit";
import UnitList from "./components/UnitList";

const App = () => {
  const [combineUnits, setCombineUnits] = useState([]);

  useEffect(() => {
    function fetchAirtableData() {
      const base = new Airtable({
        apiKey: process.env.REACT_APP_AT_API_KEY,
      }).base(process.env.REACT_APP_AT_API_BASE);

      base("plan_prod")
        .select({ maxRecords: 200, view: "Grid view" })
        .all()
        .then((records) => {
          console.log(records);
          setCombineUnits(records);
        })
        .catch((err) => {
          // Handle error.
          console.log("error: " + err);
        });
    }

    fetchAirtableData();
  }, []);

  console.log(combineUnits);

  return (
    <>
      <Header />
      <Router>
        <div className="App"></div>
        <Switch>
          <Route
            exact
            path="/"
            render={() => <UnitList combineUnits={combineUnits} />}
          />

          <Route
            exact
            path="/unit/:unitNumber/:buildingId"
            render={() => <Unit data={combineUnits} />}
          />
        </Switch>
      </Router>
      {/*     <Footer /> */}
    </>
  );
};

export default App;
