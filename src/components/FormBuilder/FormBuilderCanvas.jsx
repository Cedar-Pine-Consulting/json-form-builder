import React, { useState } from "react";
import { Draggable } from "react-beautiful-dnd";
import { useDispatch, useSelector } from "react-redux";
import {
  Grid,
  Alert,
  ToggleButton,
  Paper,
  Stack,
  Button,
  Box,
  Typography,
} from "@mui/material";
import CodeMirror from "@uiw/react-codemirror";
import PropTypes from "prop-types";

import {
  toggleEditMode,
  setJSONSchema,
  setUISchema,
} from "../../store/slice";
import {
  selectEditMode,
  selectJSONSchema,
  selectUISchema,
  selectUIOrder,
} from "../../store/selectors";
import StrictModeDroppable from "./StrictModeDroppable";
import SafeEditFormComponent from "./CanvasSafeEditFormComponent";

function FormBuilderCanvas() {
  const dispatch = useDispatch();
  const editMode = useSelector(selectEditMode);
  const jsonSchema = useSelector(selectJSONSchema);
  const uiSchema = useSelector(selectUISchema);
  const orderedComponentIDs = useSelector(selectUIOrder);

  const [editorJSONSchema, setEditorJSONSchema] = useState(
    JSON.stringify(jsonSchema, null, 2)
  );
  const [editorUISchema, setEditorUISchema] = useState(
    JSON.stringify(uiSchema, null, 2)
  );

  const [jsonErrors, setJSONErrors] = useState({});

  const onFormJSONSchemaChange = (editor) => {
    // eslint-disable-next-line no-console
    console.log("onFormJSONSchemaChange", editor);
    setEditorJSONSchema(editor);
  };

  const onFormUISchemaChange = (editor) => {
    // eslint-disable-next-line no-console
    console.log("onFormUISchemaChange", editor);
    setEditorUISchema(editor);
  };

  const onEditSave = () => {
    const errors = {};
    try {
      // TODO: is it possible to get more specific errors?
      JSON.parse(editorJSONSchema);
    } catch (e) {
      errors.schema = `Invalid JSON schema: ${e.message}`;
    }
    try {
      // TODO: is it possible to get more specific errors?
      JSON.parse(editorUISchema);
    } catch (e) {
      errors.ui = `Invalid UI schema: ${e}`;
    }
    if (Object.keys(errors).length === 0) {
      setJSONErrors({});
      dispatch(setJSONSchema(JSON.parse(editorJSONSchema)));
      dispatch(setUISchema(JSON.parse(editorUISchema)));
      dispatch(toggleEditMode());
    } else {
      setJSONErrors(errors);
    }
  };

  const onEditCancel = () => {
    setJSONErrors({});
    dispatch(toggleEditMode());
  };

  const handleEditorViewToggle = () => {
    // load current form data into editor
    if (editMode === "safe") {
      setJSONErrors({});
      setEditorJSONSchema(JSON.stringify(jsonSchema, null, 2));
      setEditorUISchema(JSON.stringify(uiSchema, null, 2));
    }
    dispatch(toggleEditMode());
  };

  const editorOptions = {
    mode: "json",
    lineWrapping: true,
  };

  return (
    <Paper sx={{ p: 2, mb: 4, width: 1 }} variant="outlined">
      <Stack
        direction="row"
        justifyContent="space-between"
        alignItems="center"
        mb={2}
        maxWidth="md"
        mx="auto"
      >
        <Box>
          <Typography variant="h5">Form Editor</Typography>
          <Typography variant="caption">
            Drag &amp; Drop input options here
          </Typography>
        </Box>
        <ToggleButton
          color="primary"
          size="small"
          value="json-view"
          onClick={handleEditorViewToggle}
          disabled={orderedComponentIDs.length === 0}
          selected={editMode === "json"}
          // startIcon={<DataObjectIcon />}
        >
          &#123; &#125; JSON editor
        </ToggleButton>
      </Stack>
      {editMode === "json" ? (
        <Stack sx={{ width: 1 }}>
          <Grid container spacing={2} mb={2}>
            <Grid item xs={12} md={6}>
              <Stack direction="column" spacing={2}>
                JSON Schema:
                <CodeMirror
                  onChange={onFormJSONSchemaChange}
                  options={editorOptions}
                  value={editorJSONSchema}
                />
              </Stack>
            </Grid>
            <Grid item xs={12} md={6}>
              <Stack direction="column" spacing={2}>
                UI Schema:
                <CodeMirror
                  onChange={onFormUISchemaChange}
                  options={editorOptions}
                  value={editorUISchema}
                />
              </Stack>
            </Grid>
            <Grid item xs={6}>
              {jsonErrors.schema && (
                <Alert severity="error">{jsonErrors.schema}</Alert>
              )}
            </Grid>
            <Grid item xs={6}>
              {jsonErrors.ui && <Alert severity="error">{jsonErrors.ui}</Alert>}
            </Grid>
          </Grid>
          <Stack direction="row" justifyContent="flex-end">
            <Button
              variant="outlined"
              size="small"
              onClick={onEditCancel}
              sx={{ mr: 2 }}
            >
              Cancel
            </Button>
            <Button variant="contained" size="small" onClick={onEditSave}>
              Save
            </Button>
          </Stack>
        </Stack>
      ) : (
        <StrictModeDroppable droppableId="canvas">
          {(provided) => (
            <Stack
              spacing={2}
              ref={provided.innerRef}
              {...provided.droppableProps}
              sx={{
                border: "1px dashed lightgray",
                borderRadius: 1,
                width: 1,
                mt: 2,
                maxWidth: "md",
                mx: "auto",
              }}
            >
              {/* TODO: use UI order instead */}
              {orderedComponentIDs.map((ID, index) => (
                <Draggable
                  key={`canvas-${ID}`}
                  draggableId={`canvas-${ID}`}
                  index={index}
                >
                  {({ innerRef, draggableProps, dragHandleProps }) => (
                    <Box
                      ref={innerRef}
                      {...draggableProps}
                      {...dragHandleProps}
                    >
                      <SafeEditFormComponent componentID={ID} />
                    </Box>
                  )}
                </Draggable>
              ))}
              <Box p={4} textAlign="center">
                <Typography
                  variant="body1"
                  sx={{ fontWeight: "bold", color: "grey.500" }}
                >
                  Drag &amp; Drop here...
                </Typography>
                {provided.placeholder}
              </Box>
            </Stack>
          )}
        </StrictModeDroppable>
      )}
    </Paper>
  );
}

FormBuilderCanvas.propTypes = {
  isEditing: PropTypes.bool,
};

export default FormBuilderCanvas;
