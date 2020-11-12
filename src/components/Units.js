import { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import LazyLoad from "react-lazyload";
import { Link, useParams, useLocation } from "react-router-dom";

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
} from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    height: 140,
    width: 100,
  },
  media: {
    height: 0,
    paddingTop: "100%",
  },
  control: {
    padding: theme.spacing(2),
  },
}));

const Units = ({ filteredUnits, level }) => {
  const classes = useStyles();
  const location = useLocation();

  console.log(location.state);

  /*  useEffect(() => {
    const item = document.querySelector(".restore-" + location.state.id);
    console.log(item);
    if (item) {
      item.scrollIntoView();
    }
  }, [location]); */

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

  return (
    <>
      {filteredUnits.some((unit) => unit.fields.level === String(level)) && (
        <Typography gutterBottom variant="h2">
          {level}
          {levelLabels()} floor
        </Typography>
      )}
      <Grid container direction="row" alignItems="center" spacing={1}>
        {filteredUnits
          .filter((unit) => unit.fields.level === String(level))
          .map((u, index) => (
            <Grid item xs>
              <Card
                style={{
                  marginBottom: "20px",
                  width: "367px",
                  backgroundColor: "transparent",
                }}
              >
                <CardContent
                  style={{
                    marginBottom: "10px",
                  }}
                >
                  <Typography gutterBottom variant="body1">
                    BUILDING:<strong>{u.fields.building}</strong>
                  </Typography>
                  <Typography gutterBottom variant="body1">
                    UNIT: {u.fields.unit}
                  </Typography>
                  <Typography gutterBottom variant="body1">
                    SIZE: {u.fields.area}
                  </Typography>
                  <Typography gutterBottom variant="body1">
                    BEDROOM: {u.fields.room}
                  </Typography>
                  <Typography gutterBottom variant="body1">
                    FLOOR: {u.fields.level}
                  </Typography>
                </CardContent>
                <CardActions>
                  <Button
                    component={Link}
                    to={{
                      pathname: `/unit/${u.fields.unit}`,
                      state: { id: u.fields.unit },
                    }}
                    color="secondary"
                    variant="contained"
                  >
                    See more
                  </Button>
                </CardActions>

                <LazyLoad height={400} once>
                  <CardMedia
                    component={Link}
                    to={{
                      pathname: `/unit/${u.fields.unit}`,
                      state: { id: u.fields.unit },
                    }}
                    className={`${classes.media}`}
                    image={
                      u.fields.planpng &&
                      u.fields.planpng[0].thumbnails.large.url
                    }
                    title={`plan of ${u.fields.unit} unit`}
                  />
                </LazyLoad>
              </Card>
            </Grid>
          ))}
      </Grid>
    </>
  );
};

export default Units;
