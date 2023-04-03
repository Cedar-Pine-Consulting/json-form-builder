import React, { useState } from "react";
import { Droppable, Draggable } from "react-beautiful-dnd";
import CanvasFormComponent from "./CanvasFormComponent";
import { generateFormComponentData } from "./utils";
import CanvasEditFormComponent from "./CanvasEditFormComponent";
//

function FormBuilderCanvas({ jsonSchema, uiSchema, onJsonSchemaChange, onUiSchemaChange }) {
  // TODO: edited ID state
  const [currentlyEditingID, setCurrentlyEditingID] = useState(null);
  const formComponents = generateFormComponentData(jsonSchema, uiSchema);

  function onChangeFormTitle(e) {
    // console.log("FormBuilderCanvas onchangetitle", e);
    const newSchema = {
      ...jsonSchema,
      title: e.target.value,
    };
    onJsonSchemaChange(newSchema);
  }
  function onChangeFormDescription(e) {
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
    // this shouldn't happen with current app flow, but in case that changes
    if (currentlyEditingID === id) {
      setCurrentlyEditingID(null);
    }
  }

  function onStartEdit(id) {
    console.log("onEdit")
    setCurrentlyEditingID(id);
  }

  function onEditSave(oldComponent, newComponent) {
    console.log("oldComponent, newComponent", oldComponent, newComponent);
    const newJsonSchema = { ...jsonSchema };
    const newUiSchema = { ...uiSchema };
    // remove old ID if ID changed
    if (oldComponent.id !== newComponent.id) {
      delete newJsonSchema.properties[oldComponent.id];
      delete newUiSchema[oldComponent.id];
      // change name in ordering
      const oldOrder = newUiSchema["ui:order"]
      newUiSchema["ui:order"] = oldOrder.map((v) => {
        if (v === oldComponent.id) {
          return newComponent.id;
        }
        return v;
      });
    }
    // update id in props
    newJsonSchema.properties[newComponent.id] = newComponent.jsonSchema;
    newUiSchema[newComponent.id] = newComponent.uiSchema;
    onJsonSchemaChange(newJsonSchema);
    onUiSchemaChange(newUiSchema);
    setCurrentlyEditingID(null);
  }

  function onEditCancel(component) {
    setCurrentlyEditingID(null);
  }
  return (
    <div>
      <h2>Form Builder Canvas</h2>
      <input type="text" onChange={onChangeFormTitle} value={jsonSchema.title}></input>
      <input type="text" onChange={onChangeFormDescription} value={jsonSchema.description}></input>
      <Droppable droppableId="canvas">
        {(provided) => (
          <div
            ref={provided.innerRef}
            {...provided.droppableProps}
            style={{ minHeight: '200px', minWidth: '200px' }}
          >
            {formComponents.map((formComponent, index) => (
              <Draggable
                key={`canvas-${formComponent.id}`}
                draggableId={`canvas-${formComponent.id}`}
                index={index}
              >
                {(provided) => (
                  <div
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                  >
                    {/* TODO: swap between display and edit components */}
                    {(currentlyEditingID === formComponent.id) ?
                      <CanvasEditFormComponent
                        formComponent={formComponent}
                        onSave={onEditSave}
                        onCancel={onEditCancel}
                      />
                      :
                      <CanvasFormComponent
                        formComponent={formComponent}
                        onClickDelete={() => onDeleteID(formComponent.id)}
                        onClickEdit={() => onStartEdit(formComponent.id)}
                      />
                    }
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
