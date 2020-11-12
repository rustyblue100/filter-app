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
} from "@material-ui/core";

import MaskedInput from "react-text-mask";

const MaterialUiForm = () => {
  return (
    <form autoComplete="on">
      <Input
        placeholder="First Name"
        inputProps={{ "aria-label": "First Name" }}
      />
      <Input
        placeholder="Last Name"
        inputProps={{ "aria-label": "Last Name" }}
      />
      <br />
      <Input
        fullWidth
        placeholder="Email"
        inputProps={{ "aria-label": "Email" }}
      />

      <Input
        fullWidth
        placeholder="Phone"
        inputProps={{ "aria-label": "Phone" }}
      />

      <TextField
        id="standard-multiline-static"
        fullWidth
        placeholder="Message"
        inputProps={{ "aria-label": "Message" }}
        multiline
        rows={4}
      />
      <Button fullWidth click="submit">
        Submit
      </Button>
    </form>
  );
};

export default MaterialUiForm;
