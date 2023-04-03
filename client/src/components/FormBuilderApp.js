import React, { useState } from "react";
import Form from '@rjsf/mui';
import validator from '@rjsf/validator-ajv8';
import CssBaseline from '@mui/material/CssBaseline';
import { DragDropContext } from "react-beautiful-dnd";
import {
  Box,
  Button,
  Container,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Stack,
  Select,
} from "@mui/material";
import FormBuilderCanvas from "./FormBuilderCanvas";
import ToolBoxComponent from "./ToolBoxComponent";

import {
  generateFormComponentData,
  toolBoxFormComponents,
  emptyFormSchema,
  emptyUISchema,
} from "./utils";


function FormBuilderApp() {
  const [formSchema, setFormSchema] = useState(emptyFormSchema);
  const [uiSchema, setUiSchema] = useState(emptyUISchema);
  const [data, setData] = useState({});
  const [selectedProgramId, setSelectedProgramId] = useState(1);
  // const [canvasFormComponents, setCanvasFormComponents] = useState([]);
  // const [componentIdCounter, setComponentIdCounter] = useState(0);
  const onProgramIdChange = (e) => { setSelectedProgramId(e.target.value) };
  const onCreateSubmit = (e) => {
    console.log("form create submitted");
    e.preventDefault();
  };

  function handleDragEnd(result) {
    console.log("FormbuilderCanvas handleDragend");
    if (!result.destination) {
      // The item was dropped outside the drop zone
      console.log("component dragged to no destination");
      return;
    }
    const { source, destination } = result;
    console.log("drop source, dest", source, destination);

    // creates an array of components that represent each property in the formSchema/uiSchema
    const canvasFormComponents = generateFormComponentData(
      formSchema,
      uiSchema
    );

    // Update the form components order based on the drag and drop
    const newCanvasFormComponents = Array.from(canvasFormComponents);
    const draggedCanvasFormComponentData =
      source.droppableId === "toolbox"
        ? toolBoxFormComponents[source.index] // new component if from toolbox
        : newCanvasFormComponents.splice(source.index, 1)[0]; // pop existing component if from canvas
    // put component in order
    newCanvasFormComponents.splice(
      destination.index,
      0,
      draggedCanvasFormComponentData
    );
    // Update the uiSchema ordering based on the new form component order
    console.log("newCanvasFormComponents", newCanvasFormComponents);
    const newUiSchemaProps = newCanvasFormComponents.reduce((acc, formComponent) => {
      const transformedProp = { [formComponent.id]: formComponent.uiSchema };
      return {
        ...acc,
        ...transformedProp,
      };
    },
      {}
    );
    // convert array of components back to form schemas
    const newUiSchemaOrdering = newCanvasFormComponents.map((formComponent) => formComponent.id);
    // set ordering
    const newUiSchema = {
      ...uiSchema,
      ...newUiSchemaProps,
      "ui:order": newUiSchemaOrdering,
    };

    const newJsonSchemaProperties = newCanvasFormComponents.reduce((acc, formComponent) => {
      const transformedProp = { [formComponent.id]: formComponent.jsonSchema };
      console.log("transformedProp", transformedProp);
      return {
        ...acc,
        ...transformedProp
      };
    },
      {}
    );
    console.log("newJsonSchemaProperties", newJsonSchemaProperties);
    const newJsonSchema = {
      ...formSchema,
      properties: newJsonSchemaProperties,
    };
    console.log("oldJsonSchema", formSchema);
    console.log("newJsonSchema", newJsonSchema);

    // TODO: maybe handle these as one fn?
    setUiSchema(newUiSchema);
    setFormSchema(newJsonSchema);
  }

  function handleOnFormDataChange(event) {
    console.log('handleOnFormChange', event);
    setData(event.formData);
  }

  return (
    <>
      <CssBaseline />
      <div className="App">
        <Grid container spacing={2}>
          <DragDropContext onDragEnd={handleDragEnd}>
            <Grid item md={3}>
              <Box sx={{ p: 2, border: '1px dashed grey' }}>
                <ToolBoxComponent formComponents={toolBoxFormComponents} />
              </Box>
            </Grid>
            <Grid item md={9}>
              <Box sx={{ p: 2, border: '1px dashed grey' }}>
                <FormBuilderCanvas
                  jsonSchema={formSchema}
                  uiSchema={uiSchema}
                  onJsonSchemaChange={setFormSchema}
                  onUiSchemaChange={setUiSchema}
                />
              </Box>
            </Grid>
          </DragDropContext>
        </Grid>
        <Container>
          <Stack spacing={2}>
            <Box sx={{ p: 2, border: '1px dashed grey' }}>
              <Form
                schema={formSchema}
                uiSchema={uiSchema}
                formData={data}
                validator={validator}
                onChange={handleOnFormDataChange}
              />
            </Box>
            <form onSubmit={onCreateSubmit}>
              <FormControl>
                <InputLabel id="select-program-label">Program ID</InputLabel>
                <Select
                  labelId="select-program-label"
                  id="select-program"
                  value={selectedProgramId}
                  onChange={onProgramIdChange}
                >
                  <MenuItem value={1}>1</MenuItem>
                  <MenuItem value={2}>2</MenuItem>
                  <MenuItem value={3}>3</MenuItem>
                </Select>
                <Button variant="contained" type="submit">create form template</Button>
              </FormControl>
            </form>
            <Box>
              <h3>App State</h3>
              <div>Selected Program: {selectedProgramId}</div>
              <div>Form Schema</div>
              <code>{JSON.stringify(formSchema)}</code>
              <div>UI Schema</div>
              <code>{JSON.stringify(uiSchema)}</code>
              <div>Form Data</div>
              <code>{JSON.stringify(data)}</code>
            </Box>
          </Stack>
        </Container>
      </div>
    </>
  );
}

export default FormBuilderApp;
