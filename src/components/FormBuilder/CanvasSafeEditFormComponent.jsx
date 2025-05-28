import React, { useState } from "react";
import PropTypes from "prop-types";
import { useDispatch, useSelector } from "react-redux";
import humps from "humps";
import {
  Typography,
  Alert,
  Tooltip,
  IconButton,
  Checkbox,
  FormControlLabel,
  Paper,
  Stack,
} from "@mui/material";
import { grey, red } from "@mui/material/colors";
import DragIndicatorIcon from "@mui/icons-material/DragIndicator";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import Ajv from "ajv";

import {
  deleteFormComponentById,
  duplicateFormComponentById,
  editComponentID,
  toggleComponentRequired,
  setFormComponentTitle,
  setFormComponentJSONSchema,
  setFormComponentUISchema,
} from "../../store/slice";
import {
  selectFormComponentJSONById,
  selectFormComponentRequiredById,
  selectFormComponentUISchemaById,
} from "../../store/selectors";
import Input from "../Input/Input";
import FormInputSpecificFields from "./FormInputSpecificFields";

const ajv = new Ajv();

function SafeEditFormComponent({ componentID }) {
  const dispatch = useDispatch();

  const ID = componentID;
  // is reset when state updates
  const [IDfield, setIDField] = useState(ID);

  const required = useSelector((state) =>
    selectFormComponentRequiredById(state, ID)
  );
  const componentJsonSchema = useSelector((state) =>
    selectFormComponentJSONById(state, ID)
  );
  const { title } = componentJsonSchema;
  const componentUISchema = useSelector((state) =>
    selectFormComponentUISchemaById(state, ID)
  );

  const [errors, setErrors] = useState({});

  const onClickDelete = () => {
    dispatch(deleteFormComponentById(ID));
  };

  const onClickDuplicate = () => {
    dispatch(duplicateFormComponentById(ID));
  };

  const handleRequiredChange = () => {
    dispatch(toggleComponentRequired(ID));
  };

  // track field while editing
  const handleIDfieldChange = (event) => {
    // TODO: if input is valid, we should update state directly
    // TODO: if error, we should keep input state
    if (/[_-]/.test(event.target.value)) {
      return;
    }
    setIDField(event.target.value);
  };

  // since we convert title and validate, we only update ID when leaving the field
  const handleIDChange = (event) => {
    // IDs are camelCased by default when read back from DB, so we need to camelCase them here
    const safeID = humps.camelize(event.target.value);
    // Don't do anything if the ID hasn't changed
    if (safeID === ID) {
      return;
    }
    // console.log("changing ID", ID, safeID);
    dispatch(editComponentID({ oldID: ID, newID: safeID }));
  };

  const handleTitleChange = (event) => {
    dispatch(setFormComponentTitle({ id: ID, title: event.target.value }));
  };

  const cleanTitle = () => {
    // strip out trailing spaces on blur
    dispatch(setFormComponentTitle({ id: ID, title: title.trim() }));
  };

  const handleJsonSchemaChange = (componentJSONSchema) => {
    // Validate the JSON schema
    // console.log("handleJsonSchemaChange", componentJSONSchema);
    const valid = ajv.validateSchema(componentJSONSchema);
    if (!valid) {
      setErrors(ajv.errorsText());
    } else {
      setErrors({});
    }
    dispatch(
      setFormComponentJSONSchema({ id: ID, jsonSchema: componentJSONSchema })
    );
  };

  const handleUiSchemaChange = (schema) => {
    // // Validate the UI schema
    const valid = ajv.validateSchema(schema);
    if (!valid) {
      setErrors(ajv.errorsText());
    } else {
      setErrors({});
    }
    dispatch(setFormComponentUISchema({ id: ID, uiSchema: schema }));
  };

  return (
    <Paper
      sx={{
        p: 2,
        px: 1,
        display: "flex",
        gap: 1,
        alignItems: "center",
      }}
    >
      <DragIndicatorIcon sx={{ color: grey[600] }} />
      <Typography variant="body1" sx={{ width: 150 }}>
        {componentUISchema["ui:cardTitle"] || "---"}
      </Typography>
      <Stack spacing={2} width="1">
        <Stack direction="row" spacing={2}>
          <Input
            name="id"
            label="Field ID"
            value={IDfield}
            error={IDfield === "" ? "ID cannot be empty" : null}
            onChange={handleIDfieldChange}
            onBlur={handleIDChange}
            size="small"
            // temporarily always enable this one
            // disabled={!componentUISchema.isNew}
          />
          <Input
            sx={{ flex: 1 }}
            name="title"
            label="Field Title"
            value={title}
            error={title === "" ? "Title cannot be empty" : null}
            onChange={handleTitleChange}
            onBlur={cleanTitle}
            size="small"
          />
          {componentUISchema["ui:widget"] !== "CustomHeader" && (
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
          )}
        </Stack>
        {/* Form Specific Fields */}
        <FormInputSpecificFields
          jsonSchema={componentJsonSchema}
          uiSchema={componentUISchema}
          onJsonSchemaChange={handleJsonSchemaChange}
          onUISchemaChange={handleUiSchemaChange}
        />
        {Object.keys(errors).length > 0 && (
          <Alert severity="error" sx={{ mt: 2 }}>
            {errors}
          </Alert>
        )}
      </Stack>
      <Tooltip title="Delete field">
        <IconButton onClick={onClickDelete}>
          <DeleteOutlineIcon sx={{ color: red[400] }} />
        </IconButton>
      </Tooltip>
      <Tooltip title="Duplicate field">
        <IconButton onClick={onClickDuplicate}>
          <ContentCopyIcon sx={{ color: grey[600] }} />
        </IconButton>
      </Tooltip>
    </Paper>
  );
}

SafeEditFormComponent.propTypes = {
  componentID: PropTypes.string.isRequired,
};

export default SafeEditFormComponent;
