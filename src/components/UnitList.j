import React from "react";
import Units from "./Units";
import { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import ArrowUpwardIcon from "@material-ui/icons/ArrowUpward";
import { motion } from "framer-motion";
import Header from "./Header";
import Footer from "./Footer";
import Floor from "../utils/floorGenerator";
import LazyLoad from "react-lazyload";
import KeyboardArrowDownIcon from "@material-ui/icons/KeyboardArrowDown";
import SkipNavContent from "../components/SkipNavContent";
import Airtable from "airtable";
import ReactPixel from "react-facebook-pixel";
import CookieConsent from "react-cookie-consent";

import {
  Container,
  Grid,
  Typography,
  Button,
  FormControl,
  CardMedia,
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
    maxWidth: "100%",
    maxHeight: "668px",
    objectFit: "contain",
    marginBottom: "100px",
  },
  container_filter: {
    marginTop: "-20px",
    [theme.breakpoints.down("sm")]: {
      marginTop: "-55px",
    },
    backgroundColor: theme.palette.primary.main,
    padding: "40px 0px 40px 0",
  },
  container_grid: {},
  label: {
    "& .MuiFormControlLabel-label": {
      [theme.breakpoints.down("sm")]: {
        fontSize: "11px",
      },
    },
  },
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

    [theme.breakpoints.down("lg")]: { paddingLeft: "2.3rem" },
    [theme.breakpoints.down("md")]: { paddingLeft: "2.3rem" },

    [theme.breakpoints.down("sm")]: { paddingLeft: "5rem", marginTop: "0rem" },

    [theme.breakpoints.down("xs")]: { paddingLeft: "0rem", marginTop: "0rem" },

    height: "1px",
  },
  control: {
    flexDirection: "row",
    color: theme.palette.background.default,
    [theme.breakpoints.down("xs")]: { paddingTop: "24px" },
  },
  reset: {
    fontFamily: theme.typography.fontFamily,
    textTransform: "uppercase",
    color: theme.palette.background.default,
    fontSize: "16px",
    fontWeight: "700",

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
  const [roomPrices, setRoomPrices] = useState([]);
  const classes = useStyles();

  const [cookieConsent, setCookieConsent] = useState(false);

  const BASE = process.env.REACT_APP_AT_API_BASE;
  const API_KEY = process.env.REACT_APP_AT_API_KEY;

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
    { sqFtLabel: "800-1000" },
    { sqFtLabel: "1000" },
  ];

  /* Facebook Pixel */
  useEffect(() => {
    function getCookie(name) {
      var cookieArr = document.cookie.split(";");
      for (var i = 0; i < cookieArr.length; i++) {
        var cookiePair = cookieArr[i].split("=");
        if (name == cookiePair[0].trim()) {
          return decodeURIComponent(cookiePair[1]);
        }
      }
      return null;
    }

    /*     const advancedMatching = { em: "some@email.com" }; */
    const options = {
      autoConfig: true, // set pixel's autoConfig. More info: https://developers.facebook.com/docs/facebook-pixel/advanced/
      debug: false, // enable logs
    };

    if (typeof fbq === "undefined") {
      ReactPixel.init("618921886057604", null, options);
    }

    if (cookieConsent || getCookie("CookieConsent")) {
      ReactPixel.pageView();
    } else {
      ReactPixel.revokeConsent();
    }
  }, [cookieConsent]);

  /*   const filteredUnits =
    rooms.length || dens.length || buildings.length || sqFt.length
      ? combineUnits.filter((apartment) => {
          const { Beds = "1", den = "0", building = "A", SQFT } = apartment;

          let sqFtMod = "";
          switch (true) {
            case SQFT < 600:
              sqFtMod = "600";
              break;
            case SQFT >= 600 && SQFT <= 799:
              sqFtMod = "600-799";
              break;
            case SQFT >= 800 && SQFT <= 999:
              sqFtMod = "800-1000";
              break;
            case SQFT >= 1000:
              sqFtMod = "1000";
              break;
            default:
              return "";
          }

          return (
            (!rooms.length || rooms.includes(Beds)) &&
            (!dens.length || dens.includes(den)) &&
            (!buildings.length || buildings.includes(building)) &&
            (!sqFt || !sqFt.length || sqFt.includes(sqFtMod))
          );
        })
      : combineUnits; */

  const filteredUnits = rooms.length
    ? combineUnits.filter((key) => {
        return !rooms.length || rooms.includes(key.Beds);
      })
    : combineUnits;

  useEffect(() => {
    window.onscroll = function() {
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

  /* Dynamic room filter from airtable */
  useEffect(() => {
    const base = new Airtable({ apiKey: API_KEY }).base(BASE);

    Airtable.configure({
      endpointUrl: "https://api.airtable.com",
      apiKey: API_KEY,
    });

    base("prices")
      .select({ /* maxRecords: 10,  */ view: "Grid view" })
      .all()
      .then((records) => {
        setRoomPrices(records);
      })
      .catch((err) => {
        // Handle error.
        console.log("error: " + err);
      });
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
      initial={{ opacity: 0.7 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.6 }}
    >
      <CookieConsent
        style={{ backgroundColor: "#1c2e40b3" }}
        acceptOnScroll={true}
        acceptOnScrollPercentage={50}
        buttonStyle={{
          backgroundColor: "rgb(204, 137, 99)",
          color: "#1c2e40",
        }}
        onAccept={(byScroll) => {
          setCookieConsent(true);
          if (byScroll) {
            return ReactPixel.grantConsent();
          }
          return ReactPixel.grantConsent();
        }}
      >
        We use cookies to enable us to better understand how the site is used.
        By continuing to use this site, you agree to ours{" "}
        <a
          style={{ color: "rgb(204, 137, 99)" }}
          href="https://www.crombie.ca/privacy-policy/"
          alt="privacy policy"
          target="_blank"
          rel="noopener noreferrer"
        >
          privacy policy
        </a>
        .
      </CookieConsent>
      <Header />

      <main>
        <Container maxWidth={false} className={classes.container_filter}>
          <Container>
            <Grid
              container
              alignItems="flex-start"
              justify="space-between"
              direction="row"
              spacing={2}
            >
              <Grid item sm={12} md={4} lg={4}>
                <Typography
                  variant="h1"
                  style={{ color: "#cc8963" }}
                  className={classes.page_title}
                >
                  Find your home
                </Typography>
              </Grid>

              <Grid item xs={12} sm={4} md={4} lg={4}>
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
                          label={`${a.roomsLabel} ${
                            parseInt(a.roomsLabel) === 1
                              ? `BEDROOM ${
                                  roomPrices[0]
                                    ? roomPrices[0].fields.price
                                    : ""
                                }`
                              : `BEDROOM ${
                                  roomPrices[1]
                                    ? roomPrices[1].fields.price
                                    : ""
                                }`
                          }
                        `}
                          value={a.roomsLabel}
                          checked={
                            rooms && rooms.includes(a.roomsLabel) && true
                          }
                        />
                      );
                    })}
                  </FormGroup>
                </FormControl>
              </Grid>

              {/*             <Grid item sm={4} md={1} lg={2} xl={1}>
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
                        label={d.denLabel && "+ DEN"}
                        value={d.denLabel}
                        checked={dens && dens.includes(d.denLabel) && true}
                      />
                    );
                  })}
                </FormGroup>
              </FormControl>
            </Grid>
            <Grid item sm={6} md={2} lg={2}>
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
            </Grid> */}
              <Grid item xs={12} sm={4} md={4} lg={4}>
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
                            checkedIcon={
                              <span className={classes.checkedIcon} />
                            }
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
                        label={
                          e.buildingLabel === "A" ? "125 Bronte" : "133 Bronte"
                        }
                        value={e.buildingLabel}
                        checked={
                          buildings &&
                          buildings.includes(e.buildingLabel) &&
                          true
                        }
                      />
                    ))}
                  </FormGroup>
                </FormControl>
              </Grid>
              {/*             <Grid item xs={12} sm={6} md={2}>
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
            </Grid> */}
            </Grid>
          </Container>
        </Container>

        {filteredUnits ? (
          <>
            <motion.div>
              <SkipNavContent id="main-content">
                <Container>
                  {filteredUnits[0] && filteredUnits[0].FloorplanImageURL ? (
                    <>
                      <Box my={6} display="flex" justifyContent="center"></Box>
                      <Grid container direction="row" spacing={2}>
                        {filteredUnits[0].FloorplanImageURL.split(",")
                          .map((imgPdf, index) => {
                            return (
                              <Grid
                                key={index}
                                item
                                xs={12}
                                md={6}
                                tabIndex="0"
                                style={{ outlineColor: "#F7F1F0" }}
                              >
                                <LazyLoad
                                  once={true}
                                  offset={800}
                                  placeholder={
                                    <div
                                      style={{
                                        width: "100%",
                                      }}
                                    >
                                      Scroll down <br></br>
                                      <KeyboardArrowDownIcon />
                                    </div>
                                  }
                                >
                                  <a
                                    href="https://brontevillageapartments.securecafe.com/onlineleasing/bronte-village/oleapplication.aspx?stepname=Floorplan&UnitID=28087459&FloorPlanID=3537467&myOlePropertyid=1282041"
                                    alt={
                                      "Availability link for two bedrooms flooplan"
                                    }
                                    target="_blank"
                                    rel="noreferrer"
                                  >
                                    <CardMedia
                                      className={`${classes.media}`}
                                      image={imgPdf && imgPdf}
                                      component={"img"}
                                      alt={filteredUnits[0].FloorplanImageName.split(
                                        ","
                                      ).filter((n, i) => i === index)}
                                      title={filteredUnits[0].FloorplanImageName.split(
                                        ","
                                      ).filter((n, i) => i === index)}
                                    />
                                  </a>
                                </LazyLoad>
                              </Grid>
                            );
                          })

                          /* Building filter A */
                          .filter((buildinA, index) => {
                            function buildingMod() {
                              if (buildings.includes("A")) {
                                return "125BronteVillage";
                              } else if (buildings.includes("B")) {
                                return "133BronteRd";
                              } else {
                                return "";
                              }
                            }

                            if (buildings.length) {
                              return buildinA.props.children.props.children.props.children.props.alt[0].includes(
                                buildingMod()
                              );
                            } else {
                              return buildinA;
                            }
                          })}
                      </Grid>
                    </>
                  ) : (
                    ""
                  )}

                  {/*Two Bedrooms */}

                  {filteredUnits[1] && filteredUnits[1].FloorplanImageURL && (
                    <>
                      <Box mb={8} display="flex" justifyContent="center">
                        <Typography variant="h2">2 Bedrooms</Typography>
                      </Box>
                      <Grid container direction="row" spacing={2}>
                        {filteredUnits[1].FloorplanImageURL.split(",")
                          .map((imgPdf, index) => {
                            return (
                              <Grid
                                key={index}
                                item
                                xs={12}
                                md={6}
                                tabIndex="0"
                                style={{ outlineColor: "#F7F1F0" }}
                              >
                                <LazyLoad
                                  once={true}
                                  offset={800}
                                  placeholder={
                                    <div
                                      style={{
                                        width: "100%",
                                      }}
                                    >
                                      Scroll down <br></br>
                                      <KeyboardArrowDownIcon />
                                    </div>
                                  }
                                >
                                  <a
                                    href="https://brontevillageapartments.securecafe.com/onlineleasing/bronte-village/oleapplication.aspx?stepname=Floorplan&UnitID=28087459&FloorPlanID=3537467&myOlePropertyid=1282041"
                                    alt={
                                      "Availability link for two bedrooms flooplan"
                                    }
                                    target="_blank"
                                    rel="noreferrer"
                                  >
                                    <CardMedia
                                      className={`${classes.media}`}
                                      image={imgPdf && imgPdf}
                                      component={"img"}
                                      alt={filteredUnits[1].FloorplanImageName.split(
                                        ","
                                      ).filter((n, i) => i === index)}
                                      title={filteredUnits[1].FloorplanImageName.split(
                                        ","
                                      ).filter((n, i) => i === index)}
                                    />
                                  </a>
                                </LazyLoad>
                              </Grid>
                            );
                          })

                          /* Building filter B */
                          .filter((buildinB, index) => {
                            function buildingMod() {
                              if (buildings.includes("A")) {
                                return "125BronteVillage";
                              } else if (buildings.includes("B")) {
                                return "133BronteRd";
                              } else {
                                return "";
                              }
                            }

                            if (buildings.length) {
                              return buildinB.props.children.props.children.props.children.props.alt[0].includes(
                                buildingMod()
                              );
                            } else {
                              return buildinB;
                            }
                          })}
                      </Grid>
                    </>
                  )}

                  {/*    <Pagination count={10} color="primary" /> */}

                  {/*               {Array.from({ length: 15 }).map((i, el) => {
                return (
                  <Units
                    key={el}
                    filteredUnits={filteredUnits}
                    level={el}
                    {...filters}
                  />
                );
              })} */}
                </Container>
              </SkipNavContent>
            </motion.div>
          </>
        ) : (
          <Container>
            <Box textAlign="center" pt={14}>
              <CircularProgress />
            </Box>
          </Container>
        )}
      </main>
      <Footer />
    </motion.div>
  );
};

export default UnitList;
