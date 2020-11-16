import React from "react";
import Units from "./Units";
import { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import ArrowUpwardIcon from "@material-ui/icons/ArrowUpward";

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
  FormLabel,
  TextField,
  Box,
  CircularProgress,
} from "@material-ui/core";

import Pagination from "@material-ui/lab/Pagination";

const useStyles = makeStyles((theme) => ({
  root: {
    height: "24px",
    color: theme.palette.background.default,
  },

  icon: {
    borderRadius: 0,
    width: 16,
    height: 16,
    border: `1px solid  ${theme.palette.background.default}`,
    backgroundColor: "transparent",
    "$root.Mui-focusVisible &": {
      outline: "2px auto rgba(19,124,189,.6)",
      outlineOffset: 2,
    },
    "input:hover ~ &": {
      backgroundColor: "#ebf1f5",
    },
    "input:disabled ~ &": {
      boxShadow: "none",
      background: "rgba(206,217,224,.5)",
    },
  },
  checkedIcon: {
    backgroundColor: theme.palette.secondary.main,
    backgroundImage:
      "linear-gradient(180deg,hsla(0,0%,100%,.1),hsla(0,0%,100%,0))",
    "&:before": {
      display: "block",
      width: 16,
      height: 16,
      backgroundImage:
        "url(\"data:image/svg+xml;charset=utf-8,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 16 16'%3E%3Cpath" +
        " fill-rule='evenodd' clip-rule='evenodd' d='M12 5c-.28 0-.53.11-.71.29L7 9.59l-2.29-2.3a1.003 " +
        "1.003 0 00-1.42 1.42l3 3c.18.18.43.29.71.29s.53-.11.71-.29l5-5A1.003 1.003 0 0012 5z' fill='%23fff'/%3E%3C/svg%3E\")",
      content: '""',
    },
    "input:hover ~ &": {
      backgroundColor: theme.palette.secondary.main,
    },
  },
  media: {
    width: 600,
    height: 600,
    objectFit: "contain",
  },
  container_filter: {
    marginTop: "-20px",
    backgroundColor: theme.palette.primary.main,
    padding: "40px 0px",
  },
  container_grid: {},
  form_label: {
    lineHeight: 1.1,
    marginTop: "3px",
    color: theme.palette.background.default,
    textTransform: "uppercase",
    paddingRight: "15px",
    fontWeight: 700,
    [theme.breakpoints.down("xs")]: { fontSize: "14px" },
  },
  control: {
    flexDirection: "row",
    color: theme.palette.background.default,
    [theme.breakpoints.down("xs")]: { paddingTop: "24px" },
  },
  reset: {
    /*    textTransform: "lowercase", */
    color: theme.palette.background.default,
    fontSize: "12px",
    marginTop: "-7px",
    [theme.breakpoints.down("sm")]: { paddingTop: "24px" },
  },
  page_title: {
    [theme.breakpoints.down("xs")]: {},
    [theme.breakpoints.down("md")]: {
      marginBottom: "20px",
    },
  },
}));

const UnitList = ({ combineUnits }) => {
  const classes = useStyles();

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
    <>
      <Container maxWidth={false} className={classes.container_filter}>
        <Container>
          <Grid
            container
            alignItems="flex-start"
            justify="space-between"
            direction="row"
            spacing={2}
          >
            <Grid item sm={12} md={3}>
              <Typography
                variant="h1"
                color="secondary"
                className={classes.page_title}
              >
                Find your home
              </Typography>
            </Grid>

            <Grid item sm={6} md={2}>
              <FormControl className={classes.control}>
                <FormLabel
                  component="legend"
                  className={classes.form_label}
                  focused={false}
                >
                  Room
                  <br /> type
                </FormLabel>
                <FormGroup className={classes.label}>
                  {bedRooms.map((a, i) => {
                    return (
                      <FormControlLabel
                        key={i}
                        control={
                          <Checkbox
                            disableRipple={true}
                            classes={{
                              root: classes.root,
                              checked: classes.checked,
                            }}
                            icon={<span className={classes.icon} />}
                            checkedIcon={
                              <span className={classes.checkedIcon} />
                            }
                            onChange={(event) => {
                              sessionStorage.clear();
                              setRooms((prev) =>
                                event.target.checked
                                  ? [...prev, a.roomsLabel]
                                  : []
                              );
                            }}
                            name={a.roomsLabel + " BEDROOM"}
                          />
                        }
                        label={a.roomsLabel + " BEDROOM"}
                        value={a.roomsLabel}
                        checked={rooms && rooms.includes(a.roomsLabel) && true}
                      />
                    );
                  })}
                </FormGroup>
              </FormControl>
            </Grid>
            <Grid item sm={6} md={2}>
              <FormControl className={classes.control}>
                <FormLabel
                  component="legend"
                  className={classes.form_label}
                  focused={false}
                >
                  Square <br /> Footage
                </FormLabel>
                <FormGroup>
                  {SquareFeets.map((s, i) => (
                    <FormControlLabel
                      key={i}
                      control={
                        <Checkbox
                          disableRipple={true}
                          classes={{
                            root: classes.root,
                            checked: classes.checked,
                          }}
                          icon={<span className={classes.icon} />}
                          checkedIcon={<span className={classes.checkedIcon} />}
                          onChange={(event) => {
                            sessionStorage.clear();
                            setSqFt((prev) =>
                              event.target.checked ? [...prev, s.sqFtLabel] : []
                            );
                          }}
                          name={s.sqFtLabel}
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
            <Grid item sm={6} md={2}>
              <FormControl className={classes.control}>
                <FormLabel
                  component="legend"
                  className={classes.form_label}
                  focused={false}
                >
                  Building
                </FormLabel>
                <FormGroup>
                  {edifice.map((e, i) => (
                    <FormControlLabel
                      key={i}
                      control={
                        <Checkbox
                          disableRipple={true}
                          classes={{
                            root: classes.root,
                            checked: classes.checked,
                          }}
                          icon={<span className={classes.icon} />}
                          checkedIcon={<span className={classes.checkedIcon} />}
                          onChange={(event) => {
                            sessionStorage.clear();
                            setBuilding((prev) =>
                              event.target.checked
                                ? [...prev, e.buildingLabel]
                                : []
                            );
                          }}
                          name={e.buildingLabel}
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
            <Grid item xs={12} sm={6} md={2}>
              <Button
                className={classes.reset}
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
        </Container>
      </Container>

      {filteredUnits.length > 0 ? (
        <>
          <Container>
            {/*    <Pagination count={10} color="primary" /> */}
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
        </>
      ) : (
        <Container>
          <Box textAlign="center" pt={14}>
            <CircularProgress />
          </Box>
        </Container>
      )}
    </>
  );
};

export default UnitList;
