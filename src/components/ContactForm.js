import React from "react";

import {
  Input,
  TextField,
  Checkbox,
  FormControlLabel,
  FormControl,
  Select,
  InputLabel,
  FormHelperText,
  Radio,
  RadioGroup,
  Button,
  Box,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },

  formOutlines: {
    "& .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline": {
      borderColor: theme.palette.secondary.main,
      borderTop: "0px",
      borderLeft: 0,
      borderRight: 0,
    },

    "&:hover .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline": {
      color: theme.palette.secondary.main,
    },
    "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline": {
      color: theme.palette.secondary.main,
      borderTop: "0px",
      borderLeft: 0,
      borderRight: 0,
    },
    "& .MuiOutlinedInput-input": {
      color: theme.palette.secondary.main,
      borderTop: "0px",
      borderLeft: 0,
      borderRight: 0,
      textTransform: "uppercase",
    },
    "&:hover .MuiOutlinedInput-input": {
      color: theme.palette.primary.main,
    },
    "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-input": {
      color: theme.palette.primary.main,
      textTransform: "unset",
    },
    "& .MuiInputLabel-outlined": {
      color: theme.palette.secondary.main,
      borderTop: "0px",
      borderLeft: 0,
      borderRight: 0,
    },
    "&:hover .MuiInputLabel-outlined": {
      color: theme.palette.primary.main,
    },
    "& .MuiInputLabel-outlined.Mui-focused": {
      color: theme.palette.primary.main,
    },

    "& .MuiButton-label": {
      justifyContent: "flex-start",
      paddingLeft: "16px ",
    },
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
    [theme.breakpoints.down("md")]: { maxHeight: "50vh" },
  },
  header_form: {
    backgroundColor: theme.palette.secondary.dark,
    borderTop: `1px solid ${theme.palette.secondary.main}`,
    borderBottom: `1px solid ${theme.palette.secondary.main}`,
    color: theme.palette.secondary.primary,
    marginTop: "40px",
    textTransform: "uppercase",
    padding: "11px 23px",
    fontWeight: 400,
    fontFamily: theme.typography.fontFamily2,
    fontSize: "24px",
  },

  submit: {
    backgroundColor: theme.palette.secondary.dark,
    borderBottom: `1px solid ${theme.palette.secondary.main}`,
    color: theme.palette.secondary.primary,
    textTransform: "uppercase",
    justifyContent: "flex-start",
    paddingLeft: "16px ",
    fontWeight: 400,
    fontFamily: theme.typography.fontFamily2,
    fontSize: "24px",
  },
}));

const MaterialUiForm = () => {
  const classes = useStyles();
  return (
    <div>
      <h3 className={classes.header_form}>Find out more</h3>
      <Box mt={-2}>
        <form
          autoComplete="on"
          action="https://formsubmit.io/send/818dba04-fccd-44f4-a99c-50326fb1d489"
          method="post"
        >
          <Box display="flex">
            <TextField
              className={classes.formOutlines}
              fullWidth
              variant="outlined"
              required
              placeholder="First Name"
              inputProps={{ "aria-label": "First Name" }}
            />
            <TextField
              className={classes.formOutlines}
              fullWidth
              variant="outlined"
              placeholder="Last Name"
              inputProps={{ "aria-label": "Last Name" }}
              style={{ borderLeft: "1px solid #cc8963" }}
            />
          </Box>

          <TextField
            className={classes.formOutlines}
            variant="outlined"
            required
            fullWidth
            placeholder="Email"
            inputProps={{ "aria-label": "Email" }}
          />

          <TextField
            className={classes.formOutlines}
            variant="outlined"
            fullWidth
            placeholder="Phone"
            inputProps={{ "aria-label": "Phone" }}
          />

          <TextField
            className={classes.formOutlines}
            variant="outlined"
            required
            id="standard-multiline-static"
            fullWidth
            placeholder="Message"
            inputProps={{ "aria-label": "Message" }}
            multiline
            rows={6}
          />
          <Button type="submit" fullWidth className={classes.submit}>
            Submit
          </Button>
        </form>
      </Box>
    </div>
  );
};

export default MaterialUiForm;
