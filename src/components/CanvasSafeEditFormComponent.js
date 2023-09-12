import React, { useState } from "react";
import { Box, Button, ButtonGroup, Grid, Checkbox, TextField, Select, MenuItem, InputLabel } from "@mui/material";
import Ajv from "ajv";
import locale from 'react-json-editor-ajrm/locale/en';
import { UIWidgetTypes } from './utils';


const ajv = new Ajv();

function SafeEditFormComponent({ formComponent, onSave, onCancel }) {
  const [ID, setID] = useState(formComponent.id);
  const [title, setTitle] = useState(formComponent.jsonSchema.title);
  const [widget, setWidget] = useState(formComponent.uiSchema["ui:widget"]);
  const [required, setRequired] = useState(formComponent.required);
  const [jsonSchema, setJsonSchema] = useState(formComponent.jsonSchema);
  const [uiSchema, setUiSchema] = useState(formComponent.uiSchema);
  const [errors, setErrors] = useState({});

  function handleRequiredChange(event) {
    setRequired(!required);
  }

  function handleIDChange(event) {
    setID(event.target.value);
  }

  function handleTitleChange(event) {
    setTitle(event.target.value);
    const newJsonSchema = {...jsonSchema, title: event.target.value};
    setJsonSchema(newJsonSchema);
  }

  function handleWidgetChange(event) {
    setWidget(event.target.value);
    console.log("new widget: ", event.target.value);
    const newUISchema = {...uiSchema, "ui:widget": event.target.value};
    console.log("setting newUISchema ", newUISchema);
    setUiSchema(newUISchema);
  }


  function handleSave() {
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
      required: required,
      jsonSchema,
      uiSchema,
    };
    try {
      onSave(formComponent, newFormComponent);
      // TODO: figure out a better UI for errors than window alerts
    } catch (DuplicateIdError) {
      window.alert(DuplicateIdError);
    }
  }

  return (
    <div>
      <Box sx={{ p: 2, border: '1px dashed grey' }}>
        <InputLabel>ID</InputLabel>
        <TextField label="ID" value={ID} onChange={handleIDChange} />
        <InputLabel>Title</InputLabel>
        <TextField label="Title" value={title} onChange={handleTitleChange} />
        <InputLabel>UI Widget</InputLabel>
        <Select label="UI Widget" value={widget} onChange={handleWidgetChange}>
          {UIWidgetTypes.map((widgetType) => (
              <MenuItem value={widgetType} key={widgetType}>{widgetType}</MenuItem>
          ))}
        </Select>
        <InputLabel>Required</InputLabel>
        <Checkbox label="required" checked={required} onChange={handleRequiredChange} />
        <br />
        <ButtonGroup>
          <Button variant="outlined" color="error" onClick={onCancel}>Cancel</Button>
          <Button variant="contained" onClick={handleSave}>Save</Button>
        </ButtonGroup>
        {Object.keys(errors).length > 0 && (
          <div>
            <p>Errors:</p>
            <pre>{errors}</pre>
          </div>
        )}
      </Box>

    </div>
  );
}

export default SafeEditFormComponent;
