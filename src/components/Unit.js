import React, { useEffect } from "react";

import { Link, useParams, useLocation } from "react-router-dom";
import ContactForm from "./ContactForm";
import { makeStyles } from "@material-ui/core/styles";

import {
  Container,
  Grid,
  Card,
  CardMedia,
  Typography,
  Input,
  Button,
  Divider,
} from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  card: {
    padding: 0,
    backgroundColor: theme.palette.background.default,
  },
  media: {
    width: 460,
    height: "auto",
    objectFit: "contain",
    backgroundColor: theme.palette.background.default,
  },
}));

const Unit = ({ data }) => {
  console.log(useLocation());
  const classes = useStyles();
  /*   const restoreId = useLocation().state.id;
  const roomsState = useLocation().state.rooms;
 */
  const { unitNumber } = useParams();

  const unitData = data.filter(
    (unit) => unit.fields && unit.fields.unit === unitNumber
  );

  const { unit, area, building, planpng, keyplan, Planpdf } = unitData[0]
    ? unitData[0].fields
    : "";

  return (
    <Container>
      <Link
        to={{
          pathname: "/",
          state: {},
        }}
      >
        <Button>back</Button>
      </Link>

      <Grid container alignItems="flex-start">
        <Grid item md={8}>
          <Card>
            <CardMedia
              className={classes.media}
              src={planpng && planpng[0].url}
              title={unit}
              component={"img"}
            ></CardMedia>
          </Card>

          {/*   <Divider style={{ margin: "20px 0" }} fullWidth /> */}
        </Grid>

        <Grid item md={4}>
          <Button href={Planpdf && Planpdf[0].url} variant="outlined">
            Download pdf
          </Button>
          <ContactForm />
        </Grid>
      </Grid>

      <Grid
        container
        justify="flex-start"
        spacing={2}
        style={{ marginTop: "40px" }}
      >
        <Grid item>
          <img
            src={keyplan && keyplan[0].thumbnails.large.url}
            alt={unit}
            width="100"
          />
        </Grid>
        <Grid item>
          <span>{unit}</span> <span>{building}</span>
        </Grid>
      </Grid>
    </Container>
  );
};

export default Unit;
