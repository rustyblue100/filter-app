import { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import LazyLoad from "react-lazyload";
import { Link } from "react-router-dom";

import {
  Container,
  Grid,
  Card,
  CardMedia,
  Typography,
  Button,
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
    paddingTop: "56.25%", // 16:9
  },
  control: {
    padding: theme.spacing(2),
  },
}));

const Units = ({ filteredUnits, level }) => {
  const [spacing, setSpacing] = useState(2);
  const classes = useStyles();

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
        <h2>
          {level}
          {levelLabels()} floor
        </h2>
      )}

      <Grid
        container
        direction="row"
        justify="space-between"
        alignItems="center"
        spacing={3}
      >
        {filteredUnits
          .filter((unit) => unit.fields.level === String(level))
          .map((u, index) => (
            <LazyLoad height={400} once>
              <Grid item>
                <Card
                  style={{
                    marginBottom: "20px",
                    width: "300px",
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

                  <Link to={`/unit/${u.fields.unit}`}>
                    <Button variant="contained">See more</Button>
                  </Link>

                  <Link to={`/unit/${u.fields.unit}`}>
                    <CardMedia
                      className={classes.media}
                      image={
                        u.fields.planpng &&
                        u.fields.planpng[0].thumbnails.large.url
                      }
                      title="Paella dish"
                    />
                  </Link>
                </Card>
              </Grid>
            </LazyLoad>
          ))}
      </Grid>
    </>
  );
};

export default Units;
