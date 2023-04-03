import React from "react";
// import React, { useState } from "react";
import { Button, Box } from "@mui/material";
// import { validate } from "ajv";

function CanvasFormComponent({ id, jsonSchema, uiSchema, onClickDelete, onClickEdit }) {
  // const [showModal, setShowModal] = useState(false);
  // const [name, setName] = useState(id);
  // const [newJsonSchema, setNewJsonSchema] = useState(JSON.stringify(jsonSchema, null, 2));
  // const [newUiSchema, setNewUiSchema] = useState(JSON.stringify(uiSchema, null, 2));
  // const [jsonSchemaError, setJsonSchemaError] = useState("");
  // const [uiSchemaError, setUiSchemaError] = useState("");

  // const handleNameChange = (e) => {
  //   setName(e.target.value);
  // };

  // const handleJsonSchemaChange = (e) => {
  //   setNewJsonSchema(e.target.value);
  // };

  // const handleUiSchemaChange = (e) => {
  //   setNewUiSchema(e.target.value);
  // };

  // const handleSave = () => {
  //   try {
  //     const parsedJsonSchema = JSON.parse(newJsonSchema);
  //     const parsedUiSchema = JSON.parse(newUiSchema);
  //     const validationResult = validate(parsedJsonSchema, {$ref: "https://json-schema.org/draft-07/schema#",
  //     });

  //     if (validationResult.errors.length > 0) {
  //       setJsonSchemaError(validationResult.errors[0].message);
  //       return;
  //     }

  //     onJsonSchemaChange(parsedJsonSchema, id);
  //     onUiSchemaChange(parsedUiSchema, id);
  //     setName(parsedJsonSchema.title || id);
  //     setShowModal(false);
  //   } catch (error) {
  //     console.error(error);
  //   }
  // };

  // const handleClose = () => {
  //   setShowModal(false);
  //   setNewJsonSchema(JSON.stringify(jsonSchema, null, 2));
  //   setNewUiSchema(JSON.stringify(uiSchema, null, 2));
  //   setJsonSchemaError("");
  //   setUiSchemaError("");
  // };
  // const handleShow = () => setShowModal(true);


  return (
    <Box sx={{ p: 2, border: '1px dashed grey' }}>
      <div className="d-flex flex-column p-2">
        <div className="d-flex justify-content-between">
          <Button onClick={onClickDelete}>x</Button>
          {/* TODO: edit button open edit mode */}
          <Button>✏️</Button>
          <div><strong>{id}</strong></div>
          <div>
            jsonSchema:{JSON.stringify(jsonSchema)}
          </div>
          <div>
            uiSchema:{JSON.stringify(uiSchema)}
          </div>
        </div>
      </div>
    </Box>
  );
}

export default CanvasFormComponent;
