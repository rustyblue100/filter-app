import { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import LazyLoad from "react-lazyload";

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

const useStyles = makeStyles({
  root: {
    maxWidth: 345,
  },
  media: {
    height: 140,
  },
});

const bedRooms = [{ roomsLabel: "1" }, { roomsLabel: "2" }];
const edifice = [{ buildingLabel: "A" }, { buildingLabel: "B" }];
const SquareFeets = [
  { sqFtLabel: "400-799" },
  { sqFtLabel: "800-999" },
  { sqFtLabel: "1000" },
];

const Units = ({ combineUnits }) => {
  const classes = useStyles();

  const [rooms, setRooms] = useState([]);
  const [buildings, setBuilding] = useState([]);
  let [sqFt, setSqFt] = useState([]);

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
      {/*    <TextField value={(rooms, buildings, sqFt)} fullWidth /> */}
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
        justify="space-around"
        alignItems="center"
      >
        {console.log(
          filteredUnits.filter((unit) => unit.fields.level === String(11))
        )}
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

            <LazyLoad height={200} once>
              <CardMedia
                className={classes.media}
                image={
                  u.fields.planpng && u.fields.planpng[0].thumbnails.large.url
                }
                title="Paella dish"
              />
            </LazyLoad>
          </Card>
        ))}
      </Grid>
    </Container>
  );
};

export default Units;
