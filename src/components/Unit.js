import React, { useEffect } from "react";

import { Link, useParams, useLocation } from "react-router-dom";
import ContactForm from "./ContactForm";
import { makeStyles } from "@material-ui/core/styles";

import {
  Container,
  Box,
  Card,
  CardMedia,
  Typography,
  Input,
  Button,
  Divider,
  Grid,
} from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  back: {},
  figure: {
    padding: 0,
    margin: 0,
    backgroundColor: theme.palette.background.default,
  },
  media: {
    maxWidth: "100%",
    height: "auto",
    maxHeight: "58vh",
    objectFit: "contain",
  },
}));

const Unit = ({ data }) => {
  const classes = useStyles();
  const restoreId = useLocation().state.level;

  const { unitNumber } = useParams();

  const unitData = data.filter(
    (unit) => unit.fields && unit.fields.unit === unitNumber
  );

  const { unit, area, building, planpng, keyplan, Planpdf } = unitData[0]
    ? unitData[0].fields
    : "";

  return (
    <Container className={classes.root}>
      <Box>
        <Typography
          variant="h1"
          style={{ fontFamily: "'Montserrat', sans-serif" }}
        >
          Unit {unit}
        </Typography>
      </Box>
      <Box mt={1} mb={2}>
        <Button
          className={classes.back}
          size="small"
          to={{
            pathname: "/",
            state: { level: restoreId },
          }}
          component={Link}
          variant="outlined"
          color="secondary"
        >
          back
        </Button>
      </Box>

      <Grid container spacing={2} mt={2}>
        <Grid item container xs={12} md={6}>
          <Grid item sm={12} md={8}>
            <Grid component="figure" className={classes.figure}>
              <img
                className={classes.media}
                src={planpng && planpng[0].url}
                title={`unit ${unit}`}
                alt={`unit ${unit}`}
              />
            </Grid>
          </Grid>

          <Grid item sm={12} md={4} style={{ alignSelf: "end" }}>
            <img
              src={keyplan && keyplan[0].thumbnails.large.url}
              alt={unit}
              width="100"
            />
          </Grid>
        </Grid>

        <Grid item sm={12} md={6}>
          <Button
            href={Planpdf && Planpdf[0].url}
            color="primary"
            variant="contained"
          >
            Download pdf
          </Button>

          <Box mt={8}>
            <ContactForm />
          </Box>
        </Grid>
      </Grid>

      {/*       <Box
        container
        justify="flex-start"
        spacing={2}
        style={{ marginTop: "40px" }}
      >
        <Box item>
          <img
            src={keyplan && keyplan[0].thumbnails.large.url}
            alt={unit}
            width="100"
          />
        </Box>
        <Box item>
          <span>{unit}</span> <span>{building}</span>
        </Box>
      </Box> */}
    </Container>
  );
};

export default Unit;
