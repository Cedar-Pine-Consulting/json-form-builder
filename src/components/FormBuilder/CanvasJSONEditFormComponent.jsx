import React, { useState } from "react";
import PropTypes from "prop-types";
import {
  FormControlLabel,
  Paper,
  Box,
  Stack,
  Checkbox,
  Button,
} from "@mui/material";
import Ajv from "ajv";
import CodeMirror from "@uiw/react-codemirror";
import humps from "humps";

import Input from "../Input/Input";

const ajv = new Ajv();

const editorOptions = {
  mode: "json",
  lineWrapping: true,
};

function JSONEditFormComponent({ formComponent, onSave, onCancel }) {
  const [ID, setID] = useState(formComponent.id || "");
  const [required, setRequired] = useState(formComponent.required);
  const [jsonSchema, setJsonSchema] = useState(formComponent.jsonSchema);
  const [uiSchema, setUiSchema] = useState(formComponent.uiSchema);
  const [errors, setErrors] = useState({});

  const handleRequiredChange = () => {
    setRequired(!required);
  };

  const handleIDChange = (event) => {
    const safeID = humps.camelize(event.target.value);
    setID(safeID);
  };

  const handleJsonSchemaChange = (event) => {
    const newJsonSchema = JSON.parse(event);
    // Validate the JSON schema
    const valid = ajv.validateSchema(newJsonSchema);
    if (!valid) {
      setErrors(ajv.errorsText());
    } else {
      setErrors({});
    }
    setJsonSchema(newJsonSchema);
  };

  const handleUiSchemaChange = (event) => {
    const newUiSchema = JSON.parse(event);
    // // Validate the UI schema
    const valid = ajv.validateSchema(newUiSchema);
    if (!valid) {
      setErrors(ajv.errorsText());
    } else {
      setErrors({});
    }
    setUiSchema(newUiSchema);
  };

  const handleSave = () => {
    // Validate the JSON schema and UI schema
    const validJsonSchema = ajv.validateSchema(jsonSchema);
    const validUiSchema = ajv.validateSchema(uiSchema);
    if (!validJsonSchema || !validUiSchema) {
      setErrors(ajv.errorsText());
      return;
    }

    // Update the form component with the new properties
    const newFormComponent = {
      ...formComponent,
      id: ID,
      required,
      jsonSchema,
      uiSchema,
    };
    try {
      onSave(formComponent, newFormComponent);
      // TODO: figure out a better UI for errors than window alerts
    } catch (DuplicateIdError) {
      // TODO: use regular error handling
      // eslint-disable-next-line no-console
      console.log(DuplicateIdError);
      // window.alert(DuplicateIdError);
    }
  };

  return (
    <Paper sx={{ p: 2 }}>
      <Stack direction="row" spacing={2} alignItems="center">
        <Stack
          direction="row"
          spacing={2}
          alignItems="center"
          sx={{ width: 1 }}
        >
          <Input
            sx={{ mr: 2 }}
            name="title"
            label="Field Title"
            value={ID}
            onChange={handleIDChange}
            size="small"
          />
          <FormControlLabel
            control={
              <Checkbox
                label="required"
                checked={required}
                onChange={handleRequiredChange}
              />
            }
            label="Required"
          />
        </Stack>
        <Button size="small" variant="outlined" onClick={onCancel}>
          Cancel
        </Button>
        <Button size="small" variant="contained" onClick={handleSave}>
          Save
        </Button>
      </Stack>
      {/* TODO figure out how to control the width of the json editor better */}
      <Stack sx={{ pt: 2, maxWidth: "940px" }}>
        <Box>
          JSON Schema:
          <CodeMirror
            onChange={handleJsonSchemaChange}
            options={editorOptions}
            value={JSON.stringify(jsonSchema, null, 2)}
          />
        </Box>
        <Box>
          UI Schema:
          <CodeMirror
            onChange={handleUiSchemaChange}
            options={editorOptions}
            value={JSON.stringify(uiSchema, null, 2)}
          />
        </Box>
      </Stack>
      {Object.keys(errors).length > 0 && (
        <div>
          <p>Errors:</p>
          <pre>{errors}</pre>
        </div>
      )}
    </Paper>
  );
}

JSONEditFormComponent.propTypes = {
  formComponent: PropTypes.object.isRequired,
  onSave: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired,
};

export default JSONEditFormComponent;
