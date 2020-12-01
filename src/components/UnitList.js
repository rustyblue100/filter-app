import React from "react";
import Units from "./Units";
import { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import ArrowUpwardIcon from "@material-ui/icons/ArrowUpward";
import { motion } from "framer-motion";

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
    backgroundColor: theme.palette.background.default,
    backgroundImage:
      "linear-gradient(180deg,hsla(0,0%,100%,.1),hsla(0,0%,100%,0))",

    "&:before": {
      display: "block",
      width: 16,
      height: 16,
      backgroundImage:
        "url(\"data:image/svg+xml;charset=utf-8,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 16 16'%3E%3Cpath" +
        " fill-rule='evenodd' clip-rule='evenodd' d='M12 5c-.28 0-.53.11-.71.29L7 9.59l-2.29-2.3a1.003 " +
        "1.003 0 00-1.42 1.42l3 3c.18.18.43.29.71.29s.53-.11.71-.29l5-5A1.003 1.003 0 0012 5z' fill='rgb(204, 137, 99)'/%3E%3C/svg%3E\")",
      content: '""',
    },
    "input:hover ~ &": {
      backgroundColor: theme.palette.background.default,
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
    padding: "60px 0px 30px 0",
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
  form_labelDen: {
    paddingLeft: "10px",
    paddingTop: "10px",
    [theme.breakpoints.down("lg")]: { marginLeft: "-60px" },
    [theme.breakpoints.down("md")]: { marginLeft: "-20px" },
    height: "1px",
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
  const [top, setTop] = useState(false);
  const classes = useStyles();

  const [rooms, setRooms] = useState(
    sessionStorage.getItem("rooms") ? sessionStorage.getItem("rooms") : []
  );

  const [dens, setDens] = useState(
    sessionStorage.getItem("dens") ? sessionStorage.getItem("dens") : []
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
  const denDen = [{ denLabel: "1" }];
  const edifice = [{ buildingLabel: "A" }, { buildingLabel: "B" }];
  const SquareFeets = [
    { sqFtLabel: "600" },
    { sqFtLabel: "600-799" },
    { sqFtLabel: "800-999" },
    { sqFtLabel: "1000" },
  ];

  const filteredUnits =
    rooms.length || buildings.length || sqFt.length
      ? combineUnits.filter((apartment) => {
          const { room = "1", den, building, area } = apartment.fields;

          let sqFtMod = "";
          switch (true) {
            case area < 600:
              sqFtMod = "600";
              break;
            case area >= 600 && area <= 799:
              sqFtMod = "600-799";
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
            (!dens.length || dens.includes(den)) &&
            (!buildings.length || buildings.includes(building)) &&
            (!sqFt || !sqFt.length || sqFt.includes(sqFtMod))
          );
        })
      : combineUnits;

  useEffect(() => {
    window.onscroll = function () {
      if (
        document.body.scrollTop > 1000 ||
        document.documentElement.scrollTop > 1000
      ) {
        setTop(true);
      } else {
        setTop(false);
      }
    };
  }, []);

  const filters = {
    rooms,
    dens,
    buildings,
    sqFt,
  };

  const scrollTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.6 }}
    >
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

            <Grid item sm={6} md={2} lg={1}>
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

            <Grid item sm={2} md={1}>
              <FormControl className={classes.control}>
                <FormLabel
                  component="legend"
                  className={classes.form_label}
                  focused={false}
                ></FormLabel>
                <FormGroup className={classes.form_labelDen}>
                  {denDen.map((d, i) => {
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
                              setDens((prev) =>
                                event.target.checked
                                  ? [...prev, d.denLabel]
                                  : []
                              );
                            }}
                            name={d.denLabel}
                          />
                        }
                        label={d.denLabel && "+ den"}
                        value={d.denLabel}
                        checked={dens && dens.includes(d.denLabel) && true}
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
                      label={
                        s.sqFtLabel === "600"
                          ? "< 600"
                          : s.sqFtLabel === "1000"
                          ? "> 1000"
                          : s.sqFtLabel
                      }
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
                  setDens([]);
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
          <motion.div>
            <Container>
              {/*    <Pagination count={10} color="primary" /> */}

              {Array.apply(null, { length: 15 }).map((i, el) => {
                return (
                  <Units
                    key={el}
                    filteredUnits={filteredUnits}
                    level={el}
                    {...filters}
                  />
                );
              })}
            </Container>

            {top && (
              <Button
                /*  tabindex="0" */
                className="topButton"
                id="backtop"
                arial-label="scroll-top"
                onClick={() => scrollTop()}
              >
                <ArrowUpwardIcon fontSize="large" />
              </Button>
            )}
          </motion.div>
        </>
      ) : (
        <Container>
          <Box textAlign="center" pt={14}>
            <CircularProgress />
          </Box>
        </Container>
      )}
    </motion.div>
  );
};

export default UnitList;
