import React from "react";
import Units from "./Units";
import { useState, useEffect } from "react";

import {
  Container,
  Grid,
  Card,
  CardMedia,
  Typography,
  Button,
  FormControl,
  Checkbox,
  FormGroup,
  FormControlLabel,
  TextField,
} from "@material-ui/core";

const UnitList = ({ combineUnits }) => {
  const [rooms, setRooms] = useState(
    sessionStorage.getItem("rooms") ? sessionStorage.getItem("rooms") : []
  );

  const [buildings, setBuilding] = useState(
    sessionStorage.getItem("buildings")
      ? sessionStorage.getItem("buildings")
      : []
  );
  let [sqFt, setSqFt] = useState(
    sessionStorage.getItem("sqFt") ? sessionStorage.getItem("sqFt") : []
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

  const filters = {
    rooms,
    buildings,
    sqFt,
  };

  return (
    <Container maxWidth="lg">
      <Grid container justify="flext-start" alignItems="flex-start'">
        <Grid item xs={4}>
          <Typography variant="h1">Find your home</Typography>
        </Grid>

        <Grid item md={2}>
          <FormControl>
            <FormGroup>
              {bedRooms.map((a, i) => {
                return (
                  <FormControlLabel
                    key={i}
                    control={
                      <Checkbox
                        onChange={(event) => {
                          sessionStorage.clear();
                          setRooms((prev) =>
                            event.target.checked ? [...prev, a.roomsLabel] : []
                          );
                        }}
                      />
                    }
                    label={a.roomsLabel}
                    value={a.roomsLabel}
                    checked={rooms && rooms.includes(a.roomsLabel) && true}
                  />
                );
              })}
            </FormGroup>
          </FormControl>
        </Grid>
        <Grid item md={2}>
          <FormControl>
            <FormGroup>
              {SquareFeets.map((s, i) => (
                <FormControlLabel
                  key={i}
                  control={
                    <Checkbox
                      onChange={(event) => {
                        sessionStorage.clear();
                        setSqFt((prev) =>
                          event.target.checked ? [...prev, s.sqFtLabel] : []
                        );
                      }}
                    />
                  }
                  label={s.sqFtLabel}
                  value={s.sqFtLabel}
                  checked={sqFt && sqFt.includes(s.sqFtLabel) && true}
                />
              ))}
            </FormGroup>
          </FormControl>
        </Grid>
        <Grid item md={1}>
          <FormControl>
            <FormGroup>
              {edifice.map((e, i) => (
                <FormControlLabel
                  key={i}
                  control={
                    <Checkbox
                      onChange={(event) => {
                        sessionStorage.clear();
                        setBuilding((prev) =>
                          event.target.checked ? [...prev, e.buildingLabel] : []
                        );
                      }}
                    />
                  }
                  label={e.buildingLabel}
                  value={e.buildingLabel}
                  checked={
                    buildings && buildings.includes(e.buildingLabel) && true
                  }
                />
              ))}
            </FormGroup>
          </FormControl>
        </Grid>
        <Grid item xs={1}>
          <Button
            onClick={() => {
              setRooms([]);
              setBuilding([]);
              setSqFt([]);
              sessionStorage.clear();
            }}
          >
            reset filters
          </Button>
        </Grid>
      </Grid>

      <Units filteredUnits={filteredUnits} level={1} {...filters} />
      <Units filteredUnits={filteredUnits} level={2} {...filters} />
      <Units filteredUnits={filteredUnits} level={3} {...filters} />
      <Units filteredUnits={filteredUnits} level={4} {...filters} />
      <Units filteredUnits={filteredUnits} level={5} {...filters} />
      <Units filteredUnits={filteredUnits} level={6} {...filters} />
      <Units filteredUnits={filteredUnits} level={7} {...filters} />
      <Units filteredUnits={filteredUnits} level={8} {...filters} />
      <Units filteredUnits={filteredUnits} level={9} {...filters} />
      <Units filteredUnits={filteredUnits} level={10} {...filters} />
      <Units filteredUnits={filteredUnits} level={11} {...filters} />
      <Units filteredUnits={filteredUnits} level={12} {...filters} />
      <Units filteredUnits={filteredUnits} level={13} {...filters} />
      <Units filteredUnits={filteredUnits} level={14} {...filters} />
    </Container>
  );
};

export default UnitList;
