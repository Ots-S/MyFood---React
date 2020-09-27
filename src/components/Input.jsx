import React from "react";
import PropTypes from "prop-types";
import { TextField } from "@material-ui/core";

export default function Input({
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

Input.propTypes = {
  label: PropTypes.string,
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  onFocus: PropTypes.func.isRequired,
  error: PropTypes.bool.isRequired,
  helperText: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
  className: PropTypes.string,
};
