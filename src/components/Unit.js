import { Box, Button, Container, Grid, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import { motion } from "framer-motion";
import React, { useEffect } from "react";
import { Link, useLocation, useParams } from "react-router-dom";
import ContactForm from "./ContactForm";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    [theme.breakpoints.up("lg")]: { padding: "0 14px" },
    [theme.breakpoints.down("lg")]: { padding: "0 28px" },
    [theme.breakpoints.down("md")]: { padding: "0 40px" },
  },
  back: {},
  figure: {
    padding: "0 80px",
    [theme.breakpoints.down("sm")]: { padding: "0" },
    margin: 0,
    backgroundColor: theme.palette.background.default,
  },
  media: {
    maxWidth: "100%",
    height: "auto",

    paddingRight: "2rem",
    objectFit: "contain",
    [theme.breakpoints.down("sm")]: { paddingBottom: "1rem" },

    /*   [theme.breakpoints.down("md")]: { maxHeight: "50vh" }, */
  },
  pdf_button: {
    "&:hover": {
      backgroundColor: theme.palette.secondary.main,
    },
  },
  contact: {
    [theme.breakpoints.down("sm")]: { marginBottom: "12rem" },
  },

  keyplan_mobile: {
    [theme.breakpoints.up("md")]: { display: "none" },
  },
  keyplan: {
    [theme.breakpoints.down("sm")]: { display: "none" },
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

  const { unit, building, planpng, keyplan, Planpdf } = unitData[0]
    ? unitData[0].fields
    : "";

  return (
    <motion.div exit={{ opacity: 0 }} initial="initial" animate="animate">
      <Container className={classes.root} style={{ height: "130vh" }}>
        <Box mt={3}>
          <Typography
            variant="h1"
            style={{
              fontFamily: "'Montserrat', sans-serif",
              display: "flex",
              alignItems: "center",
            }}
          >
            Unit {unit}
            <span style={{ paddingLeft: "1rem", fontSize: "1.2rem" }}>
              ({building === "A" ? "123 Street Rd" : "133 Street Rd"})
            </span>
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

        <Grid container mt={2}>
          <Grid item xs={12} md={6}>
            <Grid item xs={12}>
              <Grid component="figure" className={classes.figure}>
                <motion.img
                  initial={{ x: 20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ duration: 0.8 }}
                  className={classes.media}
                  src={planpng && planpng[0].url}
                  title={unit && `unit ${unit} in building ${building}`}
                  alt={unit && `unit ${unit} in building ${building}`}
                />
              </Grid>
            </Grid>
            <Grid component="figure" item className={classes.keyplan_mobile}>
              <Box py={5}>
                <motion.img
                  initial={{ x: -10, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ duration: 0.8, delay: 0.2 }}
                  src={keyplan && keyplan[0].thumbnails.large.url}
                  width="100"
                  title={
                    unit && `keyplan of unit ${unit} in building ${building}`
                  }
                  alt={
                    unit && `keyplan of unit ${unit} in building ${building}`
                  }
                />
              </Box>
            </Grid>
            *
          </Grid>

          <Grid item md={6}>
            <Box>
              <motion.div
                initial={{ y: 0, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.4, delay: 0.2 }}
              >
                <Button
                  className={classes.pdf_button}
                  target="_blank"
                  rel="noopener"
                  href={Planpdf && Planpdf[0].url}
                  color="primary"
                  variant="contained"
                >
                  Download pdf
                </Button>

                <motion.Box mt={0} className={classes.contact}>
                  <ContactForm />
                </motion.Box>
              </motion.div>
            </Box>
          </Grid>
        </Grid>
      </Container>
    </motion.div>
  );
};

export default Unit;
