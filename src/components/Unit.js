import React, { useEffect } from "react";
import { motion } from "framer-motion";

import { Link, useParams, useLocation } from "react-router-dom";
import ContactForm from "./ContactForm";
import { makeStyles } from "@material-ui/core/styles";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
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
  Icon,
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
    [theme.breakpoints.down("sm")]: { paddingBottom: "1rem" },

    [theme.breakpoints.down("md")]: { maxHeight: "50vh" },
  },

  contact: {
    [theme.breakpoints.down("sm")]: { paddingBottom: "12rem" },
  },
}));

const Unit = ({ data }) => {
  const classes = useStyles();
  const location = useLocation();
  const restoreId = location.state ? location.state.level : 1;

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const { unitNumber, buildingId } = useParams();
  console.log(useParams());

  const unitData = data.filter(
    (unit) =>
      unit.fields &&
      unit.fields.unit === unitNumber &&
      unit.fields.building.toLowerCase() === buildingId
  );

  const { unit, area, building, planpng, keyplan, Planpdf } = unitData[0]
    ? unitData[0].fields
    : "";

  return (
    <motion.div exit={{ opacity: 0 }} initial="initial" animate="animate">
      <Container className={classes.root}>
        <Box mt={3}>
          <Typography
            variant="h1"
            style={{ fontFamily: "'Montserrat', sans-serif" }}
          >
            Unit {unit} {building}
          </Typography>
        </Box>
        <Box mt={1} mb={2}>
          <Button
            style={{
              padding: 0,
              minHeight: 0,
              minWidth: 0,
            }}
            startIcon={<ArrowBackIcon />}
            className={classes.back}
            size="medium"
            to={{
              pathname: "/",
              state: { level: restoreId },
            }}
            component={Link}
            color="secondary"
          >
            back
          </Button>
        </Box>

        <Grid container spacing={2} mt={2}>
          <Grid item container xs={12} md={7}>
            <Grid item sm={12} md={7}>
              <Grid component="figure" className={classes.figure}>
                <motion.img
                  initial={{ x: 20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ duration: 0.6 }}
                  className={classes.media}
                  src={planpng && planpng[0].url}
                  title={`unit ${unit} in building ${building}`}
                  alt={`unit ${unit} in building ${building}`}
                />
              </Grid>
            </Grid>

            <Grid
              component="figure"
              item
              sm={12}
              md={5}
              style={{ alignSelf: "flex-end" }}
            >
              <motion.img
                initial={{ x: 20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                src={keyplan && keyplan[0].thumbnails.large.url}
                width="100"
                title={`keyplan of unit ${unit} in building ${building}`}
                alt={`keyplan of unit ${unit} in building ${building}`}
              />
            </Grid>
          </Grid>

          <Grid item sm={12} md={5}>
            <Box>
              <motion.div
                initial={{ y: 0, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.4, delay: 0.2 }}
              >
                <Button
                  target="_blank"
                  rel="noopener"
                  href={Planpdf && Planpdf[0].url}
                  color="primary"
                  variant="contained"
                >
                  Download pdf
                </Button>

                <motion.Box mt={4} className={classes.contact}>
                  <ContactForm />
                </motion.Box>
              </motion.div>
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
    </motion.div>
  );
};

export default Unit;
