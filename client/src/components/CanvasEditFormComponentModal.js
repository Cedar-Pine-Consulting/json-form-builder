import { useState } from "react";
import Ajv from "ajv";

const ajv = new Ajv();

function EditFormComponentModal({ formComponent, onSave, onCancel }) {
  const [name, setName] = useState(formComponent.id);
  const [jsonSchema, setJsonSchema] = useState(formComponent.jsonSchema);
  const [uiSchema, setUiSchema] = useState(formComponent.uiSchema);
  const [errors, setErrors] = useState({});

  function handleNameChange(event) {
    setName(event.target.value);
  }

  function handleJsonSchemaChange(event) {
    const newJsonSchema = JSON.parse(event.target.value);
    setJsonSchema(newJsonSchema);

    // Validate the JSON schema
    const valid = ajv.validateSchema(newJsonSchema);
    if (!valid) {
      setErrors(ajv.errorsText());
    } else {
      setErrors({});
    }
  }

  function handleUiSchemaChange(event) {
    const newUiSchema = JSON.parse(event.target.value);
    setUiSchema(newUiSchema);

    // Validate the UI schema
    const valid = ajv.validateSchema(newUiSchema);
    if (!valid) {
      setErrors(ajv.errorsText());
    } else {
      setErrors({});
    }
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
      id: name,
      jsonSchema,
      uiSchema,
    };
    onSave(newFormComponent);
  }

  return (
    <div>
      <h2>Edit Form Component</h2>
      <label>
        Name:
        <input type="text" value={name} onChange={handleNameChange} />
      </label>
      <label>
        JSON Schema:
        <textarea value={JSON.stringify(jsonSchema)} onChange={handleJsonSchemaChange} />
      </label>
      <label>
        UI Schema:
        <textarea value={JSON.stringify(uiSchema)} onChange={handleUiSchemaChange} />
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

export default EditFormComponentModal;
