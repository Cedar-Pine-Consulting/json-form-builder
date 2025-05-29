import PropTypes from "prop-types";
import { useState } from "react";
import {
  Button,
  Typography,
  Checkbox,
  Tooltip,
  FormControlLabel,
  IconButton,
  Box,
  Stack,
} from "@mui/material";
import ClearIcon from "@mui/icons-material/Clear";
import Input from "../Input/Input";

function StringFields({
  jsonSchema,
  onJsonSchemaChange,
  onUISchemaChange,
  uiSchema,
}) {
  const [error, setError] = useState(null);

  const handleOptionChange = (index, event) => {
    setError(null);
    const newOptions = jsonSchema.enum.map((option, i) => {
      if (i === index) {
        return event.target.value;
      }
      return option;
    });
    const newJsonSchema = {
      ...jsonSchema,
      enum: newOptions,
    };
    onJsonSchemaChange(newJsonSchema);
  };

  const handleOptionCreate = () => {
    if (jsonSchema.enum.some((el) => el === "")) {
      setError(jsonSchema.enum.length - 1);
      return;
    }
    const newOptions = jsonSchema.enum.concat([""]);
    const newJsonSchema = {
      ...jsonSchema,
      enum: newOptions,
    };
    onJsonSchemaChange(newJsonSchema);
  };

  const handleOptionDelete = (index) => {
    if (jsonSchema.enum.length === 1) return;
    const newOptions = jsonSchema.enum.filter((option, i) => i !== index);
    const newJsonSchema = {
      ...jsonSchema,
      enum: newOptions,
    };
    onJsonSchemaChange(newJsonSchema);
  };

  // Change the widget type for the select field
  const toggleWidgetType = () => {
    // default to single select dropdown
    let newWidget = "CustomSelect";
    // toggle single select dropdown for radio buttons
    if (uiSchema["ui:widget"] === "CustomSelect") {
      newWidget = "CustomRadio";
    }
    const newUISchema = {
      ...uiSchema,
      "ui:widget": newWidget,
    };
    onUISchemaChange(newUISchema);
  };

  const defaultCheckedShowAsDropdown = uiSchema["ui:widget"] === "CustomSelect";

  if (jsonSchema.enum === undefined) {
    return null;
  }
  return (
    <Stack gap={2}>
      <Box>
        <Typography variant="body1" fontWeight="bold">
          Configuration
        </Typography>
        <FormControlLabel
          control={<Checkbox />}
          label="show as dropdown"
          onChange={toggleWidgetType}
          checked={defaultCheckedShowAsDropdown}
        />
      </Box>
      <Box>
        <Typography variant="body1" mb={2} fontWeight="bold">
          Values
        </Typography>
        {jsonSchema.enum.map((option, index) => (
          // eslint-disable-next-line
          <Stack direction="row" key={index} mb={2} gap={1}>
            <Input
              sx={{ width: "85%" }}
              error={error && error === index ? "cannot be empty" : null}
              variant="outlined"
              name={String(index)}
              label={`option ${index + 1}`}
              value={option}
              onChange={(e) => handleOptionChange(index, e)}
              size="small"
            />
            <Tooltip title={`Delete option ${index + 1}`}>
              <IconButton onClick={() => handleOptionDelete(index)}>
                <ClearIcon />
              </IconButton>
            </Tooltip>
          </Stack>
        ))}
        <Box>
          <Tooltip title="Add new option">
            <Button variant="text" onClick={handleOptionCreate} size="small">
              Add option +
            </Button>
          </Tooltip>
        </Box>
      </Box>
    </Stack>
  );
}

StringFields.propTypes = {
  jsonSchema: PropTypes.object.isRequired,
  onJsonSchemaChange: PropTypes.func.isRequired,
  onUISchemaChange: PropTypes.func.isRequired,
  uiSchema: PropTypes.object.isRequired,
};

export default StringFields;
