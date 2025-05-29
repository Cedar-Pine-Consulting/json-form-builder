import React from "react";
import PropTypes from "prop-types";
import { Paper, Button, Stack, Typography } from "@mui/material";
import Form from "@rjsf/mui";
import validator from "@rjsf/validator-ajv8";
import { generateSchemasFromComponent } from "./utils";

function CanvasFormComponent({
  formComponent,
  onClickDelete,
  onClickSafeEdit,
  onClickJSONEdit,
}) {
  const { jsonSchema, uiSchema } = generateSchemasFromComponent(formComponent);

  return (
    <Paper sx={{ p: 2 }}>
      <Stack direction="row" spacing={2}>
        <Typography variant="h6" sx={{ flexGrow: 1 }}>
          {formComponent.jsonSchema.title}
        </Typography>
        <Stack direction="row" spacing={1}>
          <Button size="small" onClick={onClickSafeEdit}>
            ✏️
          </Button>
          <Button size="small" onClick={onClickJSONEdit}>
            🪛
          </Button>
          {/* TODO: add confirmation before allowing a deletion!! */}
          <Button size="small" onClick={onClickDelete}>
            ❌️
          </Button>
        </Stack>
      </Stack>
      <Form
        schema={jsonSchema}
        uiSchema={uiSchema}
        validator={validator}
        // eslint-disable-next-line react/no-children-prop
        children // gets rid of submit button
        readonly
      />
    </Paper>
  );
}

CanvasFormComponent.propTypes = {
  formComponent: PropTypes.object.isRequired,
  onClickDelete: PropTypes.func.isRequired,
  onClickSafeEdit: PropTypes.func.isRequired,
  onClickJSONEdit: PropTypes.func.isRequired,
};

export default CanvasFormComponent;
