import React, { useState } from "react";
import Ajv from "ajv";

const ajv = new Ajv();

function EditFormComponent({ formComponent, onSave, onCancel }) {
  const [name, setName] = useState(formComponent.id);
  const [jsonSchemaString, setJsonSchemaString] = useState(JSON.stringify(formComponent.jsonSchema));
  const [uiSchemaString, setUiSchemaString] = useState(JSON.stringify(formComponent.uiSchema));
  const [errors, setErrors] = useState({});

  function handleNameChange(event) {
    setName(event.target.value);
  }

  function handleJsonSchemaChange(event) {
    const newJsonSchemaString = event.target.value;
    setJsonSchemaString(newJsonSchemaString);

    // Validate the JSON schema
    // const valid = ajv.validateSchema(newJsonSchema);
    // if (!valid) {
    //   setErrors(ajv.errorsText());
    // } else {
    //   setErrors({});
    // }
  }

  function handleUiSchemaChange(event) {
    const newUiSchemaString = event.target.value;
    setUiSchemaString(newUiSchemaString);

    // // Validate the UI schema
    // const valid = ajv.validateSchema(newUiSchema);
    // if (!valid) {
    //   setErrors(ajv.errorsText());
    // } else {
    //   setErrors({});
    // }
  }

  function handleSave() {
    // Validate the JSON schema and UI schema
    const jsonSchema = JSON.parse(jsonSchemaString);
    const uiSchema = JSON.parse(uiSchemaString);
    const validJsonSchema = ajv.validateSchema(jsonSchema);
    const validUiSchema = ajv.validateSchema(uiSchema);
    if (!validJsonSchema || !validUiSchema) {
      setErrors(ajv.errorsText());
      return;
    }

    // Update the form component with the new properties
    const newFormComponent = {
      ...formComponent,
      id: name,
      jsonSchema,
      uiSchema,
    };
    onSave(formComponent, newFormComponent);
  }

  return (
    <div>
      <label>
        Name:
        <input type="text" value={name} onChange={handleNameChange} />
      </label>
      <label>
        JSON Schema:
        <textarea value={jsonSchemaString} onChange={handleJsonSchemaChange} />
      </label>
      <label>
        UI Schema:
        <textarea value={uiSchemaString} onChange={handleUiSchemaChange} />
      </label>
      {Object.keys(errors).length > 0 && (
        <div>
          <p>Errors:</p>
          <pre>{errors}</pre>
        </div>
      )}
      <button onClick={handleSave}>Save</button>
      <button onClick={onCancel}>Cancel</button>
    </div>
  );
}

export default EditFormComponent;
