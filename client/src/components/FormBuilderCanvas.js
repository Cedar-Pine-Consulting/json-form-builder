import { useState } from "react";
import { Droppable, Draggable, Stack } from "react-beautiful-dnd";
import ToolBoxComponent from "./ToolBoxComponent";
import CanvasFormComponent from "./CanvasFormComponent";
import { generateFormComponentData } from "./utils";
// import CanvasEditFormComponentModal from "./CanvasEditFormComponentModal";
//

function FormBuilderCanvas({ jsonSchema, uiSchema, onJsonSchemaChange, onUiSchemaChange }) {
  const formComponents = generateFormComponentData(jsonSchema, uiSchema);

  function onChangeTitle(e) {
    // console.log("FormBuilderCanvas onchangetitle", e);
    const newSchema = {
      ...jsonSchema,
      title: e.target.value,
    };
    onJsonSchemaChange(newSchema);
  }
  function onChangeDescription(e) {
    // console.log("FormBuilderCanvas onChangeDescription");
    const newSchema = {
      ...jsonSchema,
      description: e.target.value,
    };
    onJsonSchemaChange(newSchema);
  }

  function onDeleteID(id) {
    // TODO: refactor into two util functions
    // update jsonchema
    const newJsonSchema = { ...jsonSchema };
    const { [id]: removedJsonProp, ...newJsonSchemaProps } = newJsonSchema.properties;
    newJsonSchema.properties = newJsonSchemaProps;
    onJsonSchemaChange(newJsonSchema);
    // update uiSchema
    // remove prop
    const { [id]: removedUiProp, ...newUiSchema } = uiSchema;
    // remove from ordering
    const oldOrder = newUiSchema["ui:order"];
    console.log("oldOrder", oldOrder);
    newUiSchema["ui:order"] = oldOrder.filter((v) => v !== id);
    onUiSchemaChange(newUiSchema);
  }

  return (
    <div>
      <h2>Form Builder Canvas</h2>
      <input type="text" onChange={onChangeTitle} value={jsonSchema.title}></input>
      <input type="text" onChange={onChangeDescription} value={jsonSchema.description}></input>
      <Droppable droppableId="canvas">
        {(provided) => (
          <div
            ref={provided.innerRef}
            {...provided.droppableProps}
            style={{ minHeight: '200px', minWidth: '200px' }}
          >
            {formComponents.map((formComponent, index) => (
              <Draggable
                key={formComponent.id}
                draggableId={formComponent.id}
                index={index}
              >
                {(provided) => (
                  <div
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                  >
                    <CanvasFormComponent
                      id={formComponent.id}
                      jsonSchema={formComponent.jsonSchema}
                      uiSchema={formComponent.uiSchema}
                      onDelete={onDeleteID}
                    />
                  </div>
                )}
              </Draggable>
            ))}
            {provided.placeholder}

          </div>
        )}
      </Droppable>
    </div>
  );
}

export default FormBuilderCanvas;