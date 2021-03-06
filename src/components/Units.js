import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Grid,
  Typography,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { motion } from "framer-motion";
import React, { useEffect } from "react";
import { Link, useLocation } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  overtides: {
    MuiButton: {
      outlined: {
        borderRadius: "0",
      },
    },
  },
  more: {
    color: theme.palette.background.default,

    "&:hover": {
      backgroundColor: theme.palette.primary.main,
    },
  },

  card: {
    maxWidth: "355px",
    marginBottom: "20px",
    backgroundColor: "transparent",
  },
  cardContent: { padding: 0 },
  cardActions: { padding: "10px 0" },
  media: {
    marginTop: "10px",
    maxWidth: "100%",
    height: "400px",
    objectFit: "contain",
    border: `1px solid  ${theme.palette.primary.main}`,
    padding: "20px",
    boxSizing: "border-box",
  },
  floor: {},
  control: {},
}));

const Units = ({ filteredUnits, level, rooms, dens, buildings, sqFt }) => {
  const classes = useStyles();
  const location = useLocation();

  useEffect(() => {
    const item =
      location.state &&
      document.getElementById(`restore-${location.state.level}`);

    if (location.state && location.state.level === "1") {
      return window.scrollTo(0, 0);
    }

    if (item) {
      return item.scrollIntoView(true);
    }

    window.history.replaceState(null, "");
  }, [location]);

  // Change level labels
  function levelLabels() {
    switch (true) {
      case level === 1:
        return <sup>st</sup>;
      case level === 2:
        return <sup>nd</sup>;
      case level === 3:
        return <sup>rd</sup>;
      case level >= 4:
        return <sup>th</sup>;
      default:
        return "";
    }
  }

  function handleLocalStorage() {
    if (
      rooms &&
      !rooms.includes(sessionStorage.getItem("rooms")) &&
      rooms.length > 0
    ) {
      sessionStorage.setItem("rooms", JSON.stringify(rooms));
    }

    if (
      dens &&
      !dens.includes(sessionStorage.getItem("dens")) &&
      dens.length > 0
    ) {
      sessionStorage.setItem("dens", JSON.stringify(dens));
    }

    if (
      buildings &&
      !buildings.includes(sessionStorage.getItem("buildings")) &&
      buildings.length > 0
    ) {
      sessionStorage.setItem("buildings", JSON.stringify(buildings));
    }

    if (
      sqFt &&
      !sqFt.includes(sessionStorage.getItem("sqFt")) &&
      sqFt.length > 0
    ) {
      sessionStorage.setItem("sqFt", JSON.stringify(sqFt));
    }
  }

  return (
    <motion.div
      style={{ paddingTop: String(level) === 1 ? "40px" : "20px" }}
      exit={{ opacity: 0 }}
      initial="initial"
      animate="animate"
    >
      {filteredUnits.some(
        (unit) =>
          unit && unit.fields.level > 0 && unit.fields.level === String(level)
      ) && (
        <Box
          component="div"
          className={classes.floor}
          id={`restore-${String(level)}`}
        >
          <Typography gutterBottom variant="h2">
            {level}
            {levelLabels()} floor
          </Typography>
        </Box>
      )}
      <Grid container direction="row" spacing={2}>
        {filteredUnits
          .filter(
            (unit) =>
              unit.fields.availability === true &&
              unit.fields.level === String(level)
          )
          .sort((a, b) => a.fields.unit - b.fields.unit)
          .map((u, index) => (
            <Grid
              item
              xs={12}
              sm={6}
              md={3}
              key={`restore-${u.id}`}
              tabIndex="0"
              style={{ outlineColor: "#F7F1F0" }}
            >
              {/*               <LazyLoad
                height={400}
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
              > */}
              <Card className={classes.card}>
                <CardContent className={classes.cardContent}>
                  <Typography variant="body1">
                    BUILDING:{" "}
                    <strong>
                      {u.fields.building === "A" ? "123 Street" : "133 Street"}
                    </strong>
                  </Typography>
                  <Typography variant="body1">
                    UNIT: <strong>{u.fields.unit}</strong>
                  </Typography>
                  <Typography variant="body1">
                    SIZE: <strong>{u.fields.area}</strong>
                  </Typography>
                  <Typography variant="body1">
                    BEDROOM:{" "}
                    <strong>
                      {u.fields.room === undefined ? "1" : u.fields.room}{" "}
                      {u.fields.den > 0 && "+ den"}
                    </strong>
                  </Typography>
                  <Typography variant="body1">
                    FLOOR: <strong>{u.fields.level}</strong>
                  </Typography>
                </CardContent>
                <CardActions className={classes.cardActions}>
                  <Button
                    aria-label={`See more of unit ${u.fields.unit}`}
                    className={classes.more}
                    onClick={handleLocalStorage}
                    component={Link}
                    to={{
                      pathname: `/unit/${
                        u.fields.unit
                      }/${u.fields.building.toLowerCase()}`,
                      state: { level: u.fields.level },
                    }}
                    color="secondary"
                    variant="contained"
                  >
                    See more
                  </Button>
                </CardActions>

                <motion.figure layout style={{ margin: 0 }}>
                  <CardMedia
                    className={`${classes.media}`}
                    image={
                      u.fields.planpng &&
                      u.fields.planpng[0].thumbnails.large.url
                    }
                    component={"img"}
                    alt={`plan of ${u.fields.unit} unit`}
                    title={`plan of ${u.fields.unit} unit`}
                  />
                </motion.figure>
              </Card>
              {/*     </LazyLoad> */}
            </Grid>
          ))}
      </Grid>
    </motion.div>
  );
};

export default Units;
