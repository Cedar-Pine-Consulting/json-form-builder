import {
  Typography,
  FormControl,
  MenuItem,
  FormHelperText,
  TextField,
  Autocomplete,
  ListItemIcon,
  Tooltip,
  ListItemText,
} from "@mui/material";
import { PropTypes } from "prop-types";
import { v4 as uuidv4 } from "uuid";
import HelpOutlineIcon from "@mui/icons-material/HelpOutline";

export default function Dropdown({
  name,
  label,
  value,
  error,
  info,
  onChange,
  options,
  disabled = false,
  optionLabel = "label",
  optionValue = "value",
  optionInfo,
  size,
  disableClearable = false,
  getOptionDisabled,
}) {
  return (
    <FormControl fullWidth error={!!error}>
      <Autocomplete
        size={size}
        disableClearable={disableClearable}
        options={options}
        getOptionLabel={(option) => {
          if (!option) return "";
          return String(option[optionLabel]);
        }}
        disabled={disabled}
        getOptionDisabled={getOptionDisabled}
        value={value}
        onChange={(e, v) => onChange({ target: { name, value: v } })}
        name={name}
        isOptionEqualToValue={(option, v) =>
          optionValue ? option[optionValue] === v[optionValue] : option === v
        }
        renderInput={(params) => (
          <TextField
            {...params}
            variant="outlined"
            label={label}
            name={name}
            placeholder="Select..."
            error={!!error}
          />
        )}
        renderOption={(props, option) => (
          <MenuItem
            {...props}
            key={option[optionValue] || uuidv4()}
            value={optionValue ? option[optionValue] : option}
            style={{ textTransform: "capitalize" }}
          >
            <ListItemText>{option[optionLabel]}</ListItemText>
            {optionInfo && (
              <ListItemIcon>
                <Tooltip
                  sx={{ fontSize: "1.5rem" }}
                  title={
                    <Typography variant="body1">
                      {option[optionInfo] || "n/a"}
                    </Typography>
                  }
                  arrow
                  placement="top"
                >
                  <HelpOutlineIcon sx={{ color: "grey.400" }} />
                </Tooltip>
              </ListItemIcon>
            )}
          </MenuItem>
        )}
      />
      {error && <FormHelperText>{error}</FormHelperText>}
      {info && <FormHelperText>{info}</FormHelperText>}
    </FormControl>
  );
}

Dropdown.propTypes = {
  name: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  value: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
    PropTypes.object,
  ]),
  onChange: PropTypes.func.isRequired,
  options: PropTypes.array.isRequired,
  optionValue: PropTypes.string,
  optionLabel: PropTypes.string,
  optionInfo: PropTypes.string,
  descriptionLabel: PropTypes.string,
  disabled: PropTypes.bool,
  size: PropTypes.string,
  error: PropTypes.string,
  info: PropTypes.string,
  disableClearable: PropTypes.bool,
  getOptionDisabled: PropTypes.func,
};
