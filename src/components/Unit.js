import React, { useEffect } from "react";

import LazyLoad from "react-lazyload";
import { Link, useParams, useLocation } from "react-router-dom";
import ContactForm from "./ContactForm";

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

const Unit = ({ data }) => {
  console.log(useLocation());
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

  console.log(Planpdf);

  return (
    <Container maxWidth="xl">
      <Link
        to={{
          pathname: "/",
          state: {},
        }}
      >
        <Button>back</Button>
      </Link>

      <Grid
        container
        direction="row"
        justify="space-between"
        alignItems="flex-end"
        spacing={3}
      >
        <Grid item>
          <img src={planpng && planpng[0].url} alt={unit} width="500" />

          {/*   <Divider style={{ margin: "20px 0" }} fullWidth /> */}
        </Grid>

        <Grid item>
          <Button href={Planpdf && Planpdf[0].url} variant="outlined">
            Download pdf
          </Button>
          <ContactForm />
        </Grid>
      </Grid>

      <Grid
        container
        direction="row"
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
