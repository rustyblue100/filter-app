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
      className="contact-form"
      autoComplete="on"
      action="https://formspree.io/f/{form_id}"
      method="post"
    >
      <Input
        className="contact-form"
        required
        placeholder="First Name"
        inputProps={{ "aria-label": "First Name" }}
      />
      <Input
        className="contact-form"
        placeholder="Last Name"
        inputProps={{ "aria-label": "Last Name" }}
      />
      <br />
      <Input
        className="contact-form"
        required
        fullWidth
        placeholder="Email"
        inputProps={{ "aria-label": "Email" }}
      />

      <Input
        className="contact-form"
        fullWidth
        placeholder="Phone"
        inputProps={{ "aria-label": "Phone" }}
      />

      <TextField
        className="contact-form"
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
