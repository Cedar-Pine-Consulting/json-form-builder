import { TextField } from "@mui/material";
import { PropTypes } from "prop-types";

export default function Input({
  name,
  label,
  value,
  error,
  onChange,
  sx,
  rows,
  size,
  onBlur,
  type,
  disabled = false,
}) {
  return (
    <TextField
      sx={sx}
      name={name}
      label={label}
      variant="outlined"
      value={value ?? ""}
      error={!!error}
      helperText={error}
      onChange={onChange}
      onBlur={onBlur}
      rows={rows || 1}
      multiline={!!rows}
      size={size}
      type={type}
      placeholder="Enter..."
      disabled={disabled}
    />
  );
}

Input.propTypes = {
  name: PropTypes.string.isRequired,
  label: PropTypes.string,
  value: PropTypes.string,
  error: PropTypes.string,
  onChange: PropTypes.func.isRequired,
  sx: PropTypes.object,
  rows: PropTypes.number,
  size: PropTypes.string,
  onBlur: PropTypes.func,
  type: PropTypes.string,
  disabled: PropTypes.bool,
};
