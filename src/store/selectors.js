import { createSelector } from "@reduxjs/toolkit";

export const selectJSONSchema = (state) => state.formBuilder.jsonSchema;
export const selectUISchema = (state) => state.formBuilder.uiSchema;
export const selectData = (state) => state.formBuilder.data;
export const selectShowPreview = (state) => state.formBuilder.showPreview;
export const selectEditMode = (state) => state.formBuilder.editMode;
export const selectUIOrder = (state) => state.formBuilder.uiSchema["ui:order"];

export const selectIDsByUIOrder = (state) =>
  state.formBuilder.uiSchema["ui:order"];
export const selectFormComponentJSONById = (state, id) =>
  state.formBuilder.jsonSchema.properties[id];
export const selectFormComponentUISchemaById = (state, id) =>
  state.formBuilder.uiSchema[id];
export const selectFormComponentRequiredById = (state, id) =>
  state.formBuilder.jsonSchema.required.includes(id);
export const selectFormComponentOrderIndexById = (state, id) =>
  state.formBuilder.uiSchema["ui:order"].indexOf(id);
export const selectSubmitAttempted = (state) =>
  state.formBuilder.submitAttempted;
export const selectShowSchemaPreview = (state) =>
  state.formBuilder.showSchemaPreview;

export const selectErrors = createSelector(
  [selectJSONSchema, selectUISchema],
  (jsonSchema) => {
    // wipe out errors each time
    const errorObj = {};
    if (!jsonSchema?.description || jsonSchema?.description === "") {
      errorObj.description = "Description Required!";
    }
    // TODO: validate JSONschema, generate errors
    if (
      !jsonSchema?.properties ||
      Object.keys(jsonSchema?.properties).length === 0
    ) {
      errorObj.jsonSchema = "At least one form component is required!";
    }
    // find array properties and remove empty fields
    Object.keys(jsonSchema.properties).forEach((key) => {
      if (jsonSchema.properties[key].type === "array") {
        const options = jsonSchema.properties[key].items.enum;
        if (options[options.length - 1] === "") {
          errorObj.jsonSchema = "Cannot have empty options!";
        }
        if (options.length < 2) {
          errorObj.jsonSchema = "Cannot have lest than 2 options!";
        }
      }
    });
    if (!jsonSchema?.title || jsonSchema?.title === "") {
      errorObj.title = "Title Required!";
    }
    return errorObj;
  }
);
