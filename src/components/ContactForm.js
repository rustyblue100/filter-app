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
    <form
      autoComplete="on"
      action="https://formspree.io/f/{form_id}"
      method="post"
    >
      <Input
        required
        placeholder="First Name"
        inputProps={{ "aria-label": "First Name" }}
      />
      <Input
        placeholder="Last Name"
        inputProps={{ "aria-label": "Last Name" }}
      />
      <br />
      <Input
        required
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
        required
        id="standard-multiline-static"
        fullWidth
        placeholder="Message"
        inputProps={{ "aria-label": "Message" }}
        multiline
        rows={4}
      />
      <Button type="submit" fullWidth>
        Submit
      </Button>
    </form>
  );
};

export default MaterialUiForm;
