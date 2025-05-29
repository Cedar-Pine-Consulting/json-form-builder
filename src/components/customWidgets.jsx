import {
  Box,
  Divider,
  Typography,
  Radio,
  RadioGroup,
  FormControlLabel,
  FormControl,
  FormLabel,
  Select,
  MenuItem,
  TextField,
} from "@mui/material";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { TimePicker } from "@mui/x-date-pickers/TimePicker";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import dayjs from "dayjs";
import propTypes from "prop-types";

function CustomTextFieldComponent({
  label,
  value,
  onChange,
  disabled,
  readonly,
  required,
}) {
  return (
    <FormControl fullWidth required={required}>
      <FormLabel>{label}</FormLabel>
      <TextField
        value={value}
        placeholder="Enter text..."
        type="text"
        onChange={(e) => onChange(e.target.value)}
        disabled={disabled || readonly}
      />
    </FormControl>
  );
}

CustomTextFieldComponent.propTypes = {
  label: propTypes.string.isRequired,
  value: propTypes.string,
  onChange: propTypes.func.isRequired,
  disabled: propTypes.bool,
  readonly: propTypes.bool,
  required: propTypes.bool,
};

function CustomNumberFieldComponent({
  label,
  value,
  onChange,
  disabled,
  readonly,
  required,
}) {
  return (
    <FormControl fullWidth required={required}>
      <FormLabel>{label}</FormLabel>
      <TextField
        value={value}
        placeholder="Enter number..."
        type="number"
        onChange={(e) => onChange(e.target.value)}
        disabled={disabled || readonly}
      />
    </FormControl>
  );
}

CustomNumberFieldComponent.propTypes = {
  label: propTypes.string.isRequired,
  value: propTypes.oneOfType([propTypes.string, propTypes.number]),
  onChange: propTypes.func.isRequired,
  disabled: propTypes.bool,
  readonly: propTypes.bool,
  required: propTypes.bool,
};
function CustomMultiSelectComponent({
  options,
  label,
  value,
  onChange,
  disabled,
  readonly,
  required,
}) {
  return (
    <FormControl fullWidth required={required}>
      <FormLabel>{label}</FormLabel>
      <Select
        multiple
        value={value}
        onChange={(e) => {
          onChange(e.target.value);
        }}
        disabled={disabled || readonly}
      >
        {options.enumOptions.map((option) => (
          <MenuItem key={option.label + option.value} value={option.value}>
            {option.label}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
}

CustomMultiSelectComponent.propTypes = {
  options: propTypes.array.isRequired,
  label: propTypes.string.isRequired,
  value: propTypes.array.isRequired,
  onChange: propTypes.func.isRequired,
  disabled: propTypes.bool,
  readonly: propTypes.bool,
  required: propTypes.bool,
};

function CustomTextAreaComponent({
  label,
  value,
  onChange,
  disabled,
  readonly,
  required,
}) {
  return (
    <FormControl fullWidth required={required}>
      <FormLabel>{label}</FormLabel>
      <TextField
        value={value}
        placeholder="Enter text..."
        multiline
        rows={4}
        onChange={(e) => onChange(e.target.value)}
        disabled={disabled || readonly}
      />
    </FormControl>
  );
}

CustomTextAreaComponent.propTypes = {
  label: propTypes.string.isRequired,
  value: propTypes.string,
  onChange: propTypes.func.isRequired,
  disabled: propTypes.bool,
  readonly: propTypes.bool,
  required: propTypes.bool,
};

function CustomPasswordFieldComponent({
  label,
  value,
  onChange,
  disabled,
  readonly,
  required,
}) {
  return (
    <FormControl fullWidth required={required}>
      <FormLabel>{label}</FormLabel>
      <TextField
        value={value}
        placeholder="Enter password..."
        type="password"
        onChange={(e) => onChange(e.target.value)}
        disabled={disabled || readonly}
      />
    </FormControl>
  );
}

CustomPasswordFieldComponent.propTypes = {
  label: propTypes.string.isRequired,
  value: propTypes.string,
  onChange: propTypes.func.isRequired,
  disabled: propTypes.bool,
  readonly: propTypes.bool,
  required: propTypes.bool,
};

function CustomDateFieldComponent({
  label,
  value,
  onChange,
  disabled,
  readonly,
  required,
}) {
  return (
    <FormControl fullWidth required={required}>
      <FormLabel>{label}</FormLabel>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DatePicker
          value={value ? dayjs(value) : null}
          onChange={(v) => onChange(dayjs(v).format("YYYY-MM-DD"))}
          disabled={disabled || readonly}
          placeholder="Select date..."
        />
      </LocalizationProvider>
    </FormControl>
  );
}

CustomDateFieldComponent.propTypes = {
  label: propTypes.string.isRequired,
  value: propTypes.string,
  onChange: propTypes.func.isRequired,
  disabled: propTypes.bool,
  readonly: propTypes.bool,
  required: propTypes.bool,
};

function CustomTimeFieldComponent({
  label,
  value,
  onChange,
  disabled,
  readonly,
  required,
}) {
  const today = dayjs().format("YYYY-MM-DD");
  return (
    <FormControl fullWidth required={required}>
      <FormLabel>{label}</FormLabel>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <TimePicker
          value={value ? dayjs(today + value) : null}
          onChange={(v) => onChange(dayjs(v).format("HH:mm:ss"))}
          disabled={disabled || readonly}
        />
      </LocalizationProvider>
    </FormControl>
  );
}

CustomTimeFieldComponent.propTypes = {
  label: propTypes.string.isRequired,
  value: propTypes.string,
  onChange: propTypes.func.isRequired,
  disabled: propTypes.bool,
  readonly: propTypes.bool,
  required: propTypes.bool,
};

function CustomRadioComponent({
  options,
  label,
  value,
  onChange,
  disabled,
  readonly,
  required,
  schema,
}) {
  return (
    <FormControl disabled={disabled || readonly} required={required}>
      <FormLabel id="demo-radio-buttons-group-label">{label}</FormLabel>
      <RadioGroup
        aria-labelledby="demo-radio-buttons-group-label"
        name={label}
        value={value}
        onChange={(e) => {
          // this component is used for boolean and radio
          if (schema.type === "boolean") {
            onChange(e.target.value === "true");
          } else {
            onChange(e.target.value);
          }
        }}
      >
        {options.enumOptions.map((option) => (
          <FormControlLabel
            key={option.value}
            value={option.value}
            control={<Radio />}
            label={option.label}
          />
        ))}
      </RadioGroup>
    </FormControl>
  );
}

CustomRadioComponent.propTypes = {
  options: propTypes.object.isRequired,
  label: propTypes.string.isRequired,
  value: propTypes.string,
  onChange: propTypes.func.isRequired,
  disabled: propTypes.bool,
  readonly: propTypes.bool,
  required: propTypes.bool,
  schema: propTypes.shape({
    type: propTypes.string,
  }).isRequired,
};

function CustomHeaderComponent({ label }) {
  return (
    <Box>
      <Typography variant="h6" sx={{ fontWeight: "regular" }} component="h1">
        {label}
      </Typography>
      <Divider />
    </Box>
  );
}

CustomHeaderComponent.propTypes = {
  label: propTypes.string.isRequired,
};

function CustomSelectComponent({
  options,
  label,
  value,
  onChange,
  disabled,
  readonly,
  required,
}) {
  return (
    <FormControl fullWidth required={required}>
      <FormLabel>{label}</FormLabel>
      <Select
        multiple={false}
        value={value}
        onChange={(e) => {
          onChange(e.target.value);
        }}
        disabled={disabled || readonly}
      >
        {options.enumOptions.map((option) => (
          <MenuItem key={option.label + option.value} value={option.value}>
            {option.label}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
}

CustomSelectComponent.propTypes = {
  options: propTypes.array.isRequired,
  label: propTypes.string.isRequired,
  value: propTypes.string,
  onChange: propTypes.func.isRequired,
  disabled: propTypes.bool,
  readonly: propTypes.bool,
  required: propTypes.bool,
};

function PrintableText({ value, onChange, disabled, readonly, required }) {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        breakBefore: "avoid",
        breakInside: "avoid",
        breakAfter: "avoid",
        marginBottom: "1rem",
      }}
    >
      <input
        style={{ height: "48px" }}
        value={value}
        type="text"
        onChange={(e) => onChange(e.target.value)}
        disabled={disabled || readonly}
        required={required}
      />
    </div>
  );
}

PrintableText.propTypes = {
  value: propTypes.string.isRequired,
  onChange: propTypes.func.isRequired,
  disabled: propTypes.bool,
  readonly: propTypes.bool,
  required: propTypes.bool,
};

function PrintableTextArea({ value, onChange, disabled, readonly, required }) {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        breakBefore: "avoid",
        breakInside: "avoid",
        breakAfter: "avoid",
        marginBottom: "1rem",
      }}
    >
      <input
        style={{ height: "48px" }}
        value={value}
        type="text"
        onChange={(e) => onChange(e.target.value)}
        disabled={disabled || readonly}
        required={required}
        rows={10}
      />
    </div>
  );
}

PrintableTextArea.propTypes = {
  value: propTypes.string.isRequired,
  onChange: propTypes.func.isRequired,
  disabled: propTypes.bool,
  readonly: propTypes.bool,
  required: propTypes.bool,
};
function PrintableSelectComponent({ options, value, label }) {
  return (
    <div
      style={{
        breakBefore: "avoid",
        breakInside: "avoid",
        breakAfter: "avoid",
        marginBottom: "1rem",
      }}
    >
      <div
        style={{
          breakBefore: "avoid",
          breakInside: "avoid",
          breakAfter: "avoid",
          display: "flex",
          flexWrap: "wrap",
          gap: "0.75rem",
        }}
      >
        {options.enumOptions.map((option) => (
          <div
            key={option.value}
            style={{
              display: "flex",
              gap: "0.25rem",
            }}
          >
            <input
              type="radio"
              checked={value === option.value}
              id={option.value}
              name={label}
              readOnly
            />
            <label htmlFor={option.value}>{option.label}</label>
          </div>
        ))}
      </div>
    </div>
  );
}

PrintableSelectComponent.propTypes = {
  options: propTypes.array.isRequired,
  label: propTypes.string.isRequired,
  value: propTypes.string.isRequired,
};

function PrintableMultiSelectComponent({ options, value }) {
  return (
    <div
      style={{
        breakBefore: "avoid",
        breakInside: "avoid",
        breakAfter: "avoid",
        marginBottom: "1rem",
      }}
    >
      <div
        style={{
          breakBefore: "avoid",
          breakInside: "avoid",
          breakAfter: "avoid",
          display: "flex",
          flexWrap: "wrap",
          gap: "0.75rem",
        }}
      >
        {options.enumOptions.map((option) => (
          <div
            style={{
              display: "flex",
              gap: "0.25rem",
            }}
          >
            <input
              type="checkbox"
              checked={value && value.includes(option?.value)}
              id={option?.value}
            />
            <label htmlFor={option?.value}>{option?.label}</label>
          </div>
        ))}
      </div>
    </div>
  );
}

PrintableMultiSelectComponent.propTypes = {
  options: propTypes.array.isRequired,
  value: propTypes.array.isRequired,
};

export {
  CustomTextFieldComponent,
  CustomNumberFieldComponent,
  CustomRadioComponent,
  CustomHeaderComponent,
  CustomSelectComponent,
  CustomMultiSelectComponent,
  CustomTextAreaComponent,
  CustomPasswordFieldComponent,
  CustomDateFieldComponent,
  CustomTimeFieldComponent,
  PrintableText,
  PrintableTextArea,
  PrintableSelectComponent,
  PrintableMultiSelectComponent,
};
