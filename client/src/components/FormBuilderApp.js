import React, { useState } from "react";
import Form from '@rjsf/mui';
import validator from '@rjsf/validator-ajv8';
import CssBaseline from '@mui/material/CssBaseline';
import { DragDropContext } from "react-beautiful-dnd";

import {
  Box,
  Container,
  Grid,
  Stack,
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

  function handleDragEnd(result) {
    // TODO: refactor this giant fn
    if (!result.destination) {
      // The item was dropped outside the drop zone
      console.log("component dragged to no destination");
      return;
    }
    const { source, destination } = result;

    // creates an array of components that represent each property in the formSchema/uiSchema
    const canvasFormComponents = generateFormComponentData(
      formSchema,
      uiSchema
    );

    // Update the form components order based on the drag and drop
    const newCanvasFormComponents = Array.from(canvasFormComponents);
    const draggedCanvasFormComponentData =
      source.droppableId === "toolbox"
        ? { ...toolBoxFormComponents[source.index] } // new component if from toolbox
        : newCanvasFormComponents.splice(source.index, 1)[0]; // pop existing component if from canvas

    // if ID already exists in form, add _ to id
    // TODO: think of better solution
    while (newCanvasFormComponents.map((formComponent) => formComponent.id).includes(draggedCanvasFormComponentData.id)) {
      console.log("found dupe");
      draggedCanvasFormComponentData.id = draggedCanvasFormComponentData.id + "_";
    }
    // put component in order
    newCanvasFormComponents.splice(
      destination.index,
      0,
      draggedCanvasFormComponentData
    );
    // Update the uiSchema ordering based on the new form component order
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

  function handleFormSchemaChange(jsonSchema) {
    console.log("handleFormSchemaChange", jsonSchema);
    const newData = { ...jsonSchema };
    setFormSchema(newData);
  }

  function handleUiSchemaChange(uiSchema) {
    console.log("handleUiSchemaChange", uiSchema);
    const newData = { ...uiSchema };
    setUiSchema(newData);
  }

  function handleOnFormDataChange(data) {
    console.log('handleOnFormChange', data);
    setData(data.formData);
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
                  onJsonSchemaChange={handleFormSchemaChange}
                  onUiSchemaChange={handleUiSchemaChange}
                  formData={data}
                  onFormDataChange={handleOnFormDataChange}
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
            <Box>
              <h3>App State</h3>
              <div>Form Schema</div>
              <pre>
                <code>{JSON.stringify(formSchema, null, 2)}</code>
              </pre>
              <div>UI Schema</div>
              <pre>
                <code>{JSON.stringify(uiSchema, null, 2)}</code>
              </pre>
              <div>Form Data</div>
              <pre>
                <code>{JSON.stringify(data, null, 2)}</code>
              </pre>
            </Box>
          </Stack>
        </Container>
      </div>
    </>
  );
}

export default FormBuilderApp;
