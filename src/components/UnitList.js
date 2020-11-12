import React from "react";
import Units from "./Units";
import { useState, useEffect } from "react";

import {
  Container,
  Grid,
  Card,
  CardMedia,
  Typography,
  FormControl,
  Checkbox,
  FormGroup,
  FormControlLabel,
  TextField,
} from "@material-ui/core";

const UnitList = ({ combineUnits }) => {
  const [rooms, setRooms] = useState(
    localStorage.getItem("rooms") ? localStorage.getItem("rooms") : []
  );
  const [buildings, setBuilding] = useState(
    localStorage.getItem("building") ? localStorage.getItem("building") : []
  );
  let [sqFt, setSqFt] = useState(
    localStorage.getItem("sqft") ? localStorage.getItem("sqft") : []
  );

  const bedRooms = [{ roomsLabel: "1" }, { roomsLabel: "2" }];
  const edifice = [{ buildingLabel: "A" }, { buildingLabel: "B" }];
  const SquareFeets = [
    { sqFtLabel: "400-799" },
    { sqFtLabel: "800-999" },
    { sqFtLabel: "1000" },
  ];

  const filteredUnits =
    rooms.length || buildings.length || sqFt.length
      ? combineUnits.filter((apartment) => {
          const { room, building, area } = apartment.fields;

          let sqFtMod = "";
          switch (true) {
            case area >= 400 && area <= 799:
              sqFtMod = "400-799";
              break;
            case area >= 800 && area <= 999:
              sqFtMod = "800-999";
              break;
            case area >= 1000:
              sqFtMod = "1000";
              break;
            default:
              return "";
          }

          return (
            (!rooms.length || rooms.includes(room)) &&
            (!buildings.length || buildings.includes(building)) &&
            (!sqFt || !sqFt.length || sqFt.includes(sqFtMod))
          );
        })
      : combineUnits;
  return (
    <>
      <FormControl>
        <FormGroup>
          {bedRooms.map((a, i) => (
            <FormControlLabel
              key={i}
              control={
                <Checkbox
                  onChange={(event) => {
                    event.target.checked
                      ? localStorage.setItem("rooms", a.roomsLabel)
                      : localStorage.removeItem("rooms");
                    setRooms((prev) =>
                      event.target.checked ? [...prev, a.roomsLabel] : []
                    );
                  }}
                />
              }
              label={a.roomsLabel}
              value={a.roomsLabel}
              checked={
                localStorage.getItem("rooms") &&
                localStorage.getItem("rooms") === a.roomsLabel &&
                true
              }
            />
          ))}
        </FormGroup>
      </FormControl>
      <FormControl>
        <FormGroup>
          {edifice.map((e, i) => (
            <FormControlLabel
              key={i}
              control={
                <Checkbox
                  onChange={(event) => {
                    event.target.checked
                      ? localStorage.setItem("building", e.buildingLabel)
                      : localStorage.removeItem("building");

                    setBuilding((prev) =>
                      event.target.checked ? [...prev, e.buildingLabel] : []
                    );
                  }}
                />
              }
              label={e.buildingLabel}
              value={e.buildingLabel}
              checked={
                localStorage.getItem("building") &&
                localStorage.getItem("building") === e.buildingLabel &&
                true
              }
            />
          ))}
        </FormGroup>
      </FormControl>
      <FormControl>
        <FormGroup>
          {SquareFeets.map((s, i) => (
            <FormControlLabel
              key={i}
              control={
                <Checkbox
                  onChange={(event) => {
                    event.target.checked
                      ? localStorage.setItem("sqft", s.sqFtLabel)
                      : localStorage.removeItem("sqft");

                    setSqFt((prev) =>
                      event.target.checked ? [...prev, s.sqFtLabel] : []
                    );
                  }}
                />
              }
              label={s.sqFtLabel}
              value={s.sqFtLabel}
              checked={
                localStorage.getItem("sqft") &&
                localStorage.getItem("sqft") === s.sqFtLabel &&
                true
              }
            />
          ))}
        </FormGroup>
      </FormControl>
      <Container>
        <Units filteredUnits={filteredUnits} level={1} />
        <Units filteredUnits={filteredUnits} level={2} />
        <Units filteredUnits={filteredUnits} level={3} />
        <Units filteredUnits={filteredUnits} level={4} />
        <Units filteredUnits={filteredUnits} level={5} />
        <Units filteredUnits={filteredUnits} level={6} />
        <Units filteredUnits={filteredUnits} level={7} />
        <Units filteredUnits={filteredUnits} level={8} />
        <Units filteredUnits={filteredUnits} level={9} />
        <Units filteredUnits={filteredUnits} level={10} />
        <Units filteredUnits={filteredUnits} level={11} />
        <Units filteredUnits={filteredUnits} level={12} />
        <Units filteredUnits={filteredUnits} level={13} />
        <Units filteredUnits={filteredUnits} level={14} />
      </Container>
    </>
  );
};

export default UnitList;
