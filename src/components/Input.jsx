import React from "react";
import PropTypes from "prop-types";
import { TextField } from "@material-ui/core";

function Input({
  label,
  value,
  onChange,
  onFocus,
  error,
  helperText,
  className,
}) {
  return (
    <TextField
      fullWidth
      required
      label={label}
      value={value}
      onChange={onChange}
      onFocus={onFocus}
      error={error}
      helperText={helperText}
      className={className}
    />
  );
}

Input.propTypes = {};

export default Input;
