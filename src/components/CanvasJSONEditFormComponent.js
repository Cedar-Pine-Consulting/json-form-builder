import React, { useState } from "react";
import { Box, Grid, Checkbox } from "@mui/material";
import Ajv from "ajv";
import JSONInput from 'react-json-editor-ajrm';
import locale from 'react-json-editor-ajrm/locale/en';


const ajv = new Ajv();

function JSONEditFormComponent({ formComponent, onSave, onCancel }) {
  const [ID, setID] = useState(formComponent.id);
  const [required, setRequired] = useState(formComponent.required);
  const [jsonSchema, setJsonSchema] = useState(formComponent.jsonSchema);
  const [uiSchema, setUiSchema] = useState(formComponent.uiSchema);
  const [errors, setErrors] = useState({});

  function handleRequiredChange(event) {
    console.log("required state", required);
    console.log("handleRequiredChange: ", event.target.value);

    setRequired(!required);
  }


  function handleIDChange(event) {
    setID(event.target.value);
  }

  function handleTitleChange(event) {

  }

  function handleWidgetChange(event) {

  }

  function handleJsonSchemaChange(event) {
    const newJsonSchema = event.jsObject;
    // Validate the JSON schema
    // const valid = ajv.validateSchema(newJsonSchema);
    // if (!valid) {
    //   setErrors(ajv.errorsText());
    // } else {
    //   setErrors({});
    // }
    setJsonSchema(newJsonSchema);
  }

  function handleUiSchemaChange(event) {
    const newUiSchema = event.jsObject;
    // // Validate the UI schema
    // const valid = ajv.validateSchema(newUiSchema);
    // if (!valid) {
    //   setErrors(ajv.errorsText());
    // } else {
    //   setErrors({});
    // }
    setUiSchema(newUiSchema);
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
        <div>
          <label>
            ID:
            <input type="text" value={ID} onChange={handleIDChange} />
          </label>
          <label>Required?
            <Checkbox checked={required} onChange={handleRequiredChange} />
          </label>
        </div>
        <Grid container>
          <Grid xs={6}>
            <label>
              JSON Schema:
              <JSONInput
                id="${ID}-jsonSchema"
                placeholder={jsonSchema}
                locale={locale}
                height="auto"
                theme="light_mitsuketa_tribute"
                onChange={handleJsonSchemaChange}
              />
            </label>
          </Grid>
          <Grid xs={6}>
            <label>
              UI Schema:
              <JSONInput
                id="${ID}-uiSchema"
                placeholder={uiSchema}
                locale={locale}
                height="auto"
                theme="light_mitsuketa_tribute"
                onChange={handleUiSchemaChange}
              />
            </label>
          </Grid>
        </Grid>
        {Object.keys(errors).length > 0 && (
          <div>
            <p>Errors:</p>
            <pre>{errors}</pre>
          </div>
        )}
        <button onClick={handleSave}>Save</button>
        <button onClick={onCancel}>Cancel</button>
      </Box>
    </div>
  );
}

export default JSONEditFormComponent;
