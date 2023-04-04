import React, { useState } from "react";
import { Droppable, Draggable } from "react-beautiful-dnd";
import CanvasFormComponent from "./CanvasFormComponent";
import { generateFormComponentData } from "./utils";
import CanvasEditFormComponent from "./CanvasEditFormComponent";
//

function FormBuilderCanvas({ jsonSchema, uiSchema, onJsonSchemaChange, onUiSchemaChange, formData, onFormDataChange }) {
  // TODO: edited ID state
  const [currentlyEditingID, setCurrentlyEditingID] = useState(null);
  // spread components to avoid stale refs
  const formComponents = generateFormComponentData({ ...jsonSchema }, { ...uiSchema });

  function onChangeFormTitle(e) {
    const newSchema = {
      ...jsonSchema,
      title: e.target.value,
    };
    onJsonSchemaChange(newSchema);
  }

  function onChangeFormDescription(e) {
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
    newUiSchema["ui:order"] = oldOrder.filter((v) => v !== id);
    onUiSchemaChange(newUiSchema);

    // remove refs in formdata
    const { [id]: removedDataProp, ...newFormData } = formData;
    onFormDataChange(formData);


    // this shouldn't happen with current app flow, but in case that changes
    if (currentlyEditingID === id) {
      setCurrentlyEditingID(null);
    }
  }

  function onStartEdit(id) {
    setCurrentlyEditingID(id);
  }

  function onEditSave(oldComponent, newComponent) {
    // cloning current state forces re render on components
    const newJsonSchema = structuredClone(jsonSchema);
    const newUiSchema = structuredClone(uiSchema);
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
      // update form data
      if (oldComponent.id in formData) {
        const { [oldComponent.id]: oldStateProp, ...rest } = formData;
        const newData = { ...rest, [newComponent.id]: oldStateProp };
        // only update form data if ID changed
        onFormDataChange(newData);
      }
    }
    // update id in props
    newJsonSchema.properties[newComponent.id] = newComponent.jsonSchema;
    newUiSchema[newComponent.id] = newComponent.uiSchema;
    console.log("onEditSave: json, ui", newJsonSchema, newUiSchema);
    setCurrentlyEditingID(null);
    onJsonSchemaChange(newJsonSchema);
    onUiSchemaChange(newUiSchema);
  }

  function onEditCancel(component) {
    setCurrentlyEditingID(null);
  }

  return (
    <div>
      <h2>Form Builder Canvas</h2>
      <div>
        <input
          type="text"
          onChange={onChangeFormTitle}
          placeholder="Form Title"
          value={jsonSchema.title}></input>
      </div>
      <div>
        <input
          type="text"
          onChange={onChangeFormDescription}
          value={jsonSchema.description}
          placeholder="Form Description"
        ></input>
      </div>
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
