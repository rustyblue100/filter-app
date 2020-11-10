import React, { useState, useEffect } from "react";
import axios from "axios";

import {
  Container,
  Grid,
  Card,
  Typography,
  FormControl,
  Checkbox,
  FormGroup,
  FormControlLabel,
  TextField,
} from "@material-ui/core";

const bedRooms = [{ roomsLabel: "1" }, { roomsLabel: "2" }];
const edifice = [{ buildingLabel: "A" }, { buildingLabel: "B" }];
const SquareFeets = [
  { sqFtLabel: "400-799" },
  { sqFtLabel: "800-999" },
  { sqFtLabel: "1000" },
];

const BASE = process.env.REACT_APP_AT_API_BASE;
const TABLE = process.env.REACT_APP_AT_TABLE_NAME;
const API_KEY = process.env.REACT_APP_AT_API_KEY;

const Units = () => {
  const [rooms, setRooms] = useState([]);
  const [buildings, setBuilding] = useState([]);
  let [sqFt, setSqFt] = useState([]);

  const [unitsFloor1, setUnitsFloor1] = useState([]);
  const [unitsFloor2, setUnitsFloor2] = useState([]);
  const [unitsFloor3, setUnitsFloor3] = useState([]);
  const [unitsFloor4, setUnitsFloor4] = useState([]);
  const [unitsFloor5, setUnitsFloor5] = useState([]);
  const [unitsFloor6, setUnitsFloor6] = useState([]);
  const [unitsFloor7, setUnitsFloor7] = useState([]);
  const [unitsFloor8, setUnitsFloor8] = useState([]);
  const [unitsFloor9, setUnitsFloor9] = useState([]);
  const [unitsFloor10, setUnitsFloor10] = useState([]);
  const [unitsFloor11, setUnitsFloor11] = useState([]);
  const [unitsFloor12, setUnitsFloor12] = useState([]);
  const [unitsFloor13, setUnitsFloor13] = useState([]);
  const [unitsFloor14, setUnitsFloor14] = useState([]);

  console.log([...unitsFloor1, ...unitsFloor2]);

  const combineUnits = [
    ...unitsFloor1,
    ...unitsFloor2,
    ...unitsFloor3,
    ...unitsFloor4,
    ...unitsFloor5,
    ...unitsFloor6,
    ...unitsFloor7,
    ...unitsFloor8,
    ...unitsFloor9,
    ...unitsFloor10,
    ...unitsFloor11,
    ...unitsFloor12,
    ...unitsFloor13,
    ...unitsFloor14,
  ];

  useEffect(() => {
    async function fetchData() {
      const headers = {
        Authorization: "Bearer " + API_KEY,
        "Content-Type": "application/json",
      };

      const fetchUtl = `https://api.airtable.com/v0/` + BASE + `/` + TABLE;

      //sort fetch by floors and availability
      const floor1 =
        fetchUtl + `?filterByFormula=level%3D1&availability!%3Dfalse`;
      const floor2 =
        fetchUtl + `?filterByFormula=level%3D2&availability!%3Dfalse`;
      const floor3 =
        fetchUtl + `?filterByFormula=level%3D3&availability!%3Dfalse`;
      const floor4 =
        fetchUtl + `?filterByFormula=level%3D4&availability!%3Dfalse`;
      const floor5 =
        fetchUtl + `?filterByFormula=level%3D5&availability!%3Dfalse`;
      const floor6 =
        fetchUtl + `?filterByFormula=level%3D6&availability!%3Dfalse`;
      const floor7 =
        fetchUtl + `?filterByFormula=level%3D7&availability!%3Dfalse`;
      const floor8 =
        fetchUtl + `?filterByFormula=level%3D8&availability!%3Dfalse`;
      const floor9 =
        fetchUtl + `?filterByFormula=level%3D9&availability!%3Dfalse`;
      const floor10 =
        fetchUtl + `?filterByFormula=level%3D10&availability!%3Dfalse`;
      const floor11 =
        fetchUtl + `?filterByFormula=level%3D11&availability!%3Dfalse`;
      const floor12 =
        fetchUtl + `?filterByFormula=level%3D12&availability!%3Dfalse`;
      const floor13 =
        fetchUtl + `?filterByFormula=level%3D13&availability!%3Dfalse`;
      const floor14 =
        fetchUtl + `?filterByFormula=level%3D14&availability!%3Dfalse`;

      try {
        const paramsArgs = {
          headers: headers,
        };

        const requestOne = axios.get(floor1, paramsArgs);
        const requestTwo = axios.get(floor2, paramsArgs);
        const requestThree = axios.get(floor3, paramsArgs);
        const requestFour = axios.get(floor4, paramsArgs);
        const requestFive = axios.get(floor5, paramsArgs);
        const requestSix = axios.get(floor6, paramsArgs);
        const requestSeven = axios.get(floor7, paramsArgs);
        const requestEight = axios.get(floor8, paramsArgs);
        const requestNine = axios.get(floor9, paramsArgs);
        const requestTen = axios.get(floor10, paramsArgs);
        const requestEleven = axios.get(floor11, paramsArgs);
        const requestTwelve = axios.get(floor12, paramsArgs);
        const requestThirtheen = axios.get(floor13, paramsArgs);
        const requestFourthteen = axios.get(floor14, paramsArgs);

        await axios
          .all([
            requestOne,
            requestTwo,
            requestThree,
            requestFour,
            requestFive,
            requestSix,
            requestSeven,
            requestEight,
            requestNine,
            requestTen,
            requestEleven,
            requestTwelve,
            requestThirtheen,
            requestFourthteen,
          ])
          .then(
            axios.spread((...responses) => {
              setUnitsFloor1(responses[0].data.records);
              setUnitsFloor2(responses[1].data.records);
              setUnitsFloor3(responses[2].data.records);
              setUnitsFloor4(responses[3].data.records);
              setUnitsFloor5(responses[4].data.records);
              setUnitsFloor6(responses[5].data.records);
              setUnitsFloor7(responses[6].data.records);
              setUnitsFloor8(responses[7].data.records);
              setUnitsFloor9(responses[8].data.records);
              setUnitsFloor10(responses[9].data.records);
              setUnitsFloor11(responses[10].data.records);
              setUnitsFloor12(responses[11].data.records);
              setUnitsFloor13(responses[12].data.records);
              setUnitsFloor14(responses[13].data.records);
            })
          );
      } catch (error) {
        console.error(error);
      }
      /* 
      setUnitsFloor1(unitsFloor1.map((n) => n.fields.unit)); */
      /*       const unitsData2 = unitsFloor2.map((n) => n.fields.unit);
      const unitsData3 = unitsFloor3.map((n) => n.fields.unit);
      const unitsData4 = unitsFloor4.map((n) => n.fields.unit);
      const unitsData5 = unitsFloor5.map((n) => n.fields.unit);
      const unitsData6 = unitsFloor6.map((n) => n.fields.unit);
      const unitsData7 = unitsFloor7.map((n) => n.fields.unit);
      const unitsData8 = unitsFloor8.map((n) => n.fields.unit);
      const unitsData9 = unitsFloor9.map((n) => n.fields.unit);
      const unitsData10 = unitsFloor10.map((n) => n.fields.unit);
      const unitsData11 = unitsFloor11.map((n) => n.fields.unit);
      const unitsData12 = unitsFloor12.map((n) => n.fields.unit);
      const unitsData13 = unitsFloor13.map((n) => n.fields.unit);
      const unitsData14 = unitsFloor14.map((n) => n.fields.unit);
    } */
    }
    fetchData();
  }, []);

  const filteredUnits =
    rooms.length || buildings.length || sqFt.length
      ? combineUnits.filter((apartment) => {
          /*        console.log("filtering", apartment); */

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
    <Container>
      <TextField value={(rooms, buildings, sqFt)} fullWidth />
      <FormControl>
        <FormGroup>
          {bedRooms.map((a, i) => (
            <FormControlLabel
              key={i}
              control={
                <Checkbox
                  onChange={(event) =>
                    setRooms((prev) =>
                      event.target.checked ? [...prev, a.roomsLabel] : []
                    )
                  }
                />
              }
              label={a.roomsLabel}
              value={a.roomsLabel}
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
                  onChange={(event) =>
                    setBuilding((prev) =>
                      event.target.checked ? [...prev, e.buildingLabel] : []
                    )
                  }
                />
              }
              label={e.buildingLabel}
              value={e.buildingLabel}
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
                  onChange={(event) =>
                    setSqFt((prev) =>
                      event.target.checked ? [...prev, s.sqFtLabel] : []
                    )
                  }
                />
              }
              label={s.sqFtLabel}
              value={s.sqFtLabel}
            />
          ))}
        </FormGroup>
      </FormControl>
      <Grid
        style={{ paddingTop: "100px" }}
        container
        direction="row"
        justify="flex-start"
        alignItems="center"
        spacing={3}
      >
        {filteredUnits.map((u, index) => (
          <Card
            style={{
              background: "lightgray",
              marginBottom: "2px",
              width: "400px",
              padding: "20px",
            }}
          >
            <Typography gutterBottom variant="h4">
              {u.fields.unit}
            </Typography>
            <Typography gutterBottom variant="h6">
              rooms: {u.fields.room}
            </Typography>
            <Typography gutterBottom variant="h6">
              building: {u.fields.building}
            </Typography>
            <Typography gutterBottom variant="h6">
              SqFt: {u.fields.area}
            </Typography>
          </Card>
        ))}
      </Grid>
    </Container>
  );
};

export default Units;
