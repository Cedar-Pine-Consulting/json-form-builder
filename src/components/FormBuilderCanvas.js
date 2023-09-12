import React, { useState } from "react";
import { Droppable, Draggable } from "react-beautiful-dnd";
import CanvasFormComponent from "./CanvasFormComponent";
import { generateFormComponentData, DuplicateIdError } from "./utils";
import JSONEditFormComponent from "./CanvasJSONEditFormComponent";
import SafeEditFormComponent from "./CanvasSafeEditFormComponent";


function FormBuilderCanvas({ jsonSchema, uiSchema, onJsonSchemaChange, onUiSchemaChange, formData, onFormDataChange }) {
  // TODO: edited ID state
  const [currentlyEditingID, setCurrentlyEditingID] = useState(null);
  const [editMode, setEditMode] = useState("safe");
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
    const { [id]: removedJsonReq, ...newJsonSchemaReq } = newJsonSchema.required;
    newJsonSchema.properties = newJsonSchemaProps;
    // remove from required
    newJsonSchema.required = newJsonSchema.required.filter(i => i !== id);
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
    onFormDataChange(newFormData);

    // this shouldn't happen with current app flow, but in case that changes
    if (currentlyEditingID === id) {
      setCurrentlyEditingID(null);
    }
  }

  function onStartSafeEdit(id) {
    setEditMode("safe");
    setCurrentlyEditingID(id);
  }

  function onStartJSONEdit(id) {
    setEditMode("json");
    setCurrentlyEditingID(id);
  }

  function onEditSave(oldComponent, newComponent) {
    // cloning current state forces re render on components
    const newJsonSchema = structuredClone(jsonSchema);
    const newUiSchema = structuredClone(uiSchema);

    // handle changing ID
    if (oldComponent.id !== newComponent.id) {
      // error if new id already exists on form
      if (newComponent.id in jsonSchema.properties) {
        throw new DuplicateIdError(`FormComponent ID ${newComponent.id} already exists on form, please choose a new unique ID`);
      }
      // remove old ID if ID changed
      delete newJsonSchema.properties[oldComponent.id];
      newJsonSchema.required = newJsonSchema.required.filter(i => i !== oldComponent.id);
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

    // handle changing required
    if (oldComponent.required !== newComponent.required) {
      if (newComponent.required) {
        // add id to required
        newJsonSchema.required.push(newComponent.id);
      } else {
        // remove id from required
        newJsonSchema.required = newJsonSchema.required.filter(i => i !== newComponent.id);
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
                     ((editMode === "safe") ?
                        <SafeEditFormComponent
                          formComponent={formComponent}
                          onSave={onEditSave}
                          onCancel={onEditCancel}
                        />
                        :
                        <JSONEditFormComponent
                          formComponent={formComponent}
                          onSave={onEditSave}
                          onCancel={onEditCancel}
                        />
                      )
                    :
                      <CanvasFormComponent
                        formComponent={formComponent}
                        onClickDelete={() => onDeleteID(formComponent.id)}
                        onClickSafeEdit={() => onStartSafeEdit(formComponent.id)}
                        onClickJSONEdit={() => onStartJSONEdit(formComponent.id)}
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
