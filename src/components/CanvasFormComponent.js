import React from "react";
import { Button, Box } from "@mui/material";
import Form from '@rjsf/mui';
import validator from '@rjsf/validator-ajv8';
import { generateSchemasFromComponent } from "./utils";

function CanvasFormComponent({ formComponent, onClickDelete, onClickSafeEdit, onClickJSONEdit }) {
  const { jsonSchema, uiSchema } = generateSchemasFromComponent(formComponent);

  return (
    <Box sx={{ p: 2, border: '1px dashed grey' }}>
      <div className="d-flex flex-column p-2">
        <div className="d-flex justify-content-between">
          <Button onClick={onClickSafeEdit}>✏️</Button>
          <Button onClick={onClickJSONEdit}>🪛</Button>
          <Button onClick={onClickDelete}>❌️</Button>
          <div><strong>{formComponent.id}</strong></div>
          <Form
            schema={jsonSchema}
            uiSchema={uiSchema}
            validator={validator}
            children={true} // gets rid of submit button
            readonly
          />
        </div>
      </div>
    </Box>
  );
}

export default CanvasFormComponent;
