import React, { useState } from "react";
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

const apartmentData = [
  {
    title: "Unit 1",
    rooms: "1",
    building: "A",

    sqFt: "400",
  },
  {
    title: "Unit 2",
    rooms: "1",
    building: "A",
    sqFt: "1500",
  },
  {
    title: "Unit 3",
    rooms: "1",
    building: "A",
    sqFt: "800",
  },
  { title: "Unit 4", rooms: "2", building: "A", sqFt: "856" },
  {
    title: "Unit 5",
    rooms: "2",
    building: "A",
    sqFt: "1001",
  },
  {
    title: "Unit 6",
    rooms: "1",
    building: "B",
    sqFt: "600",
  },
  {
    title: "Unit 7",
    rooms: "1",
    building: "B",
    sqFt: "600",
  },
];

const apartment = [{ roomsLabel: "1" }, { roomsLabel: "2" }];
const edifice = [{ buildingLabel: "A" }, { buildingLabel: "B" }];
const SquareFeets = [
  { sqFtLabel: "400-799" },
  { sqFtLabel: "800-999" },
  { sqFtLabel: "1000" },
];

const FilterMethod01 = () => {
  const [rooms, setRooms] = useState([]);
  const [building, setBuilding] = useState([]);
  let [sqFt, setSqFt] = useState([]);

  console.log(rooms, building, sqFt);

  const filteredUnits =
    rooms.length || building.length || sqFt.length
      ? apartmentData.filter((apartment) => {
          console.log("filtering", apartment);

          let sqFtMod = "";
          switch (true) {
            case apartment.sqFt >= 400 && apartment.sqFt <= 799:
              sqFtMod = "400-799";
              break;
            case apartment.sqFt >= 800 && apartment.sqFt <= 999:
              sqFtMod = "800-999";
              break;
            case apartment.sqFt >= 1000:
              sqFtMod = "1000";
              break;
            default:
              return "";
          }

          return (
            (!rooms.length || rooms.includes(apartment.rooms)) &&
            (!building.length || building.includes(apartment.building)) &&
            (!apartment.sqFt || !sqFt.length || sqFt.includes(sqFtMod))
          );
        })
      : apartmentData;

  return (
    <Container>
      <TextField value={(rooms, building, sqFt)} fullWidth />
      <FormControl>
        <FormGroup>
          {apartment.map((apartment, i) => (
            <FormControlLabel
              key={i}
              control={
                <Checkbox
                  onChange={(event) =>
                    setRooms((prev) =>
                      event.target.checked
                        ? [...prev, apartment.roomsLabel]
                        : []
                    )
                  }
                />
              }
              label={apartment.roomsLabel}
              value={apartment.roomsLabel}
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
        spacing={30}
      >
        {filteredUnits.map((apartment, index) => (
          <Card
            style={{
              background: "lightgray",
              marginBottom: "2px",
              width: "400px",
              padding: "20px",
            }}
          >
            <Typography gutterBottom variant="h4">
              {apartment.title}
            </Typography>
            <Typography gutterBottom variant="h6">
              rooms: {apartment.rooms}
            </Typography>
            <Typography gutterBottom variant="h6">
              building: {apartment.building}
            </Typography>
            <Typography gutterBottom variant="h6">
              SqFt: {apartment.sqFt}
            </Typography>
          </Card>
        ))}
      </Grid>
    </Container>
  );
};

export default FilterMethod01;
