import { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import LazyLoad from "react-lazyload";
import { Link, useParams, useLocation } from "react-router-dom";
import { motion } from "framer-motion";

import {
  Container,
  Grid,
  Card,
  CardContent,
  CardMedia,
  Typography,
  Button,
  Paper,
  CardActions,
  Box,
} from "@material-ui/core";

const easing = [0.6, -0.05, 0.01, 0.99];

const fadeInUp = {
  initial: {
    opacity: 0,
  },
  animate: {
    opacity: 1,
    transition: { duration: 0.6, ease: easing },
  },
};

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
  control: {
    /*     padding: theme.spacing(2), */
  },
}));

const Units = ({ filteredUnits, level, rooms, buildings, sqFt }) => {
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
    if (rooms && rooms.length > 0) {
      sessionStorage.setItem("rooms", JSON.stringify(rooms));
    }

    if (buildings && buildings.length > 0) {
      sessionStorage.setItem("buildings", JSON.stringify(buildings));
    }

    if (sqFt && sqFt.length > 0) {
      sessionStorage.setItem("sqFt", JSON.stringify(sqFt));
    }
  }

  return (
    <motion.div
      style={{ paddingTop: "40px" }}
      exit={{ opacity: 0 }}
      initial="initial"
      animate="animate"
    >
      {filteredUnits.some((unit) => unit.fields.level === String(level)) && (
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
            <Grid item xs={12} sm={6} md={3} key={`restore-${u.id}`}>
              <LazyLoad height={400} once={true} offset={100}>
                <Card className={classes.card}>
                  <CardContent className={classes.cardContent}>
                    <Typography variant="body1">
                      BUILDING: <strong>{u.fields.building}</strong>
                    </Typography>
                    <Typography variant="body1">
                      UNIT: <strong>{u.fields.unit}</strong>
                    </Typography>
                    <Typography variant="body1">
                      SIZE: <strong>{u.fields.area}</strong>
                    </Typography>
                    <Typography variant="body1">
                      BEDROOM:<strong> {u.fields.room}</strong>
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
                </Card>
              </LazyLoad>
            </Grid>
          ))}
      </Grid>
    </motion.div>
  );
};

export default Units;
