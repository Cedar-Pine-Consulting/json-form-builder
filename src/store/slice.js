// formsSlice.js
import { createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";

import {
  emptyFormSchema,
  emptyUISchema,
} from "../components/FormBuilder/utils";

const initialState = {
  jsonSchema: emptyFormSchema,
  uiSchema: emptyUISchema,
  editMode: "safe",
  showPreview: false,
  submitAttempted: false,
  isLoading: false,
};

const formsSlice = createSlice({
  name: "forms",
  initialState,
  reducers: {
    // TODO: is there a better way to reset to initial state? Setting state = initialState doesn't work
    resetFormBuilderState: (state) => {
      // console.log("resetFormBuilderState");
      state.jsonSchema = emptyFormSchema;
      state.uiSchema = emptyUISchema;
      state.editMode = "safe";
      state.showPreview = false;
      state.submitAttempted = false;
      state.isLoading = false;
    },
    editComponentID: (state, action) => {
      // console.log("editComponentID", action.payload);
      const { oldID, newID } = action.payload;
      // check if id is empty
      if (newID === "") {
        toast.error("new ID cannot be empty");
        // TODO: add error to state
        return;
      }
      // check if id already exists
      if (state.jsonSchema.properties[newID]) {
        toast.error("ID already exists");
        // TODO: add error to state
        return;
      }
      const { properties, required } = state.jsonSchema;
      const { uiSchema } = state;
      const newProperties = {};
      const newUiSchema = {};
      // change ID in properties and uiSchema
      const propertiesAsArray = Object.entries(properties);
      for (let i = 0; i < propertiesAsArray.length; i += 1) {
        const [key, value] = propertiesAsArray[i];
        if (key === oldID) {
          newProperties[newID] = value;
        } else {
          newProperties[key] = value;
        }
      }
      const uiSchemaAsArray = Object.entries(uiSchema);
      for (let i = 0; i < uiSchemaAsArray.length; i += 1) {
        const [key, value] = uiSchemaAsArray[i];
        if (key === oldID) {
          newUiSchema[newID] = value;
        } else {
          newUiSchema[key] = value;
        }
      }
      state.jsonSchema.properties = newProperties;
      // change ID in required
      state.jsonSchema.required = required.map((i) =>
        i === oldID ? newID : i
      );
      state.uiSchema = newUiSchema;
      // change ID in uiSchema ordering
      state.uiSchema["ui:order"] = state.uiSchema["ui:order"].map((i) =>
        i === oldID ? newID : i
      );
    },
    setFormTitle: (state, action) => {
      state.jsonSchema.title = action.payload;
    },
    setDescription: (state, action) => {
      // TODO: any description validation?
      state.jsonSchema.description = action.payload;
    },
    setJSONSchema: (state, action) => {
      state.jsonSchema = action.payload;
      // TODO: validate JSONschema, generate errors
    },
    setUISchema: (state, action) => {
      state.uiSchema = action.payload;
      // TODO: validate Uischema, generate errors
    },
    setShowPreview: (state) => {
      state.showPreview = !state.showPreview;
    },
    setSubmitAttempted: (state) => {
      state.submitAttempted = true;
    },
    toggleEditMode: (state) => {
      state.editMode = state.editMode === "safe" ? "json" : "safe";
    },
    addNewFormComponent: (state, action) => {
      // check if id already exists
      let { id } = action.payload.data;
      let count = 1;
      while (state.jsonSchema.properties[id]) {
        // add a number to the end of the id if already exists
        id = `${id.split("(")[0]}(${count++})`;
      }
      const { jsonSchema, uiSchema } = action.payload.data;
      state.jsonSchema.properties[id] = jsonSchema;
      state.uiSchema[id] = uiSchema;
      state.uiSchema[id] = { ...state.uiSchema[id], isNew: true };
      state.uiSchema["ui:order"].splice(action.payload.droppedIndex, 0, id);
    },
    moveFormComponent: (state, action) => {
      const { oldIndex, newIndex } = action.payload;
      const uiOrder = state.uiSchema["ui:order"];
      const [removed] = uiOrder.splice(oldIndex, 1);
      uiOrder.splice(newIndex, 0, removed);
    },
    toggleComponentRequired: (state, action) => {
      const id = action.payload;
      const required = state.jsonSchema.required || [];
      if (required.includes(id)) {
        state.jsonSchema.required = required.filter((i) => i !== id);
      } else {
        state.jsonSchema.required = [...required, id];
      }
    },
    setFormComponentTitle: (state, action) => {
      const { id, title } = action.payload;
      state.jsonSchema.properties[id].title = title;
    },
    deleteFormComponentById: (state, action) => {
      const id = action.payload;
      delete state.jsonSchema.properties[id];
      state.jsonSchema.required = state.jsonSchema.required.filter(
        (i) => i !== id
      );
      delete state.uiSchema[id];
      state.uiSchema["ui:order"] = state.uiSchema["ui:order"].filter(
        (i) => i !== id
      );
    },
    duplicateFormComponentById: (state, action) => {
      const id = action.payload;
      let oldId = `${action.payload.split("(")[0]}(1)`;
      let count = 1;
      while (state.jsonSchema.properties[oldId]) {
        oldId = `${oldId.split("(")[0]}(${count++})`;
      }
      state.jsonSchema.properties[oldId] = state.jsonSchema.properties[id];
      state.uiSchema[oldId] = { ...state.uiSchema[id], isNew: true };
      state.uiSchema["ui:order"].splice(
        state.uiSchema["ui:order"].indexOf(id) + 1,
        0,
        oldId
      );
    },

    // TODO: replace these with specific field setters
    setFormComponentJSONSchema: (state, action) => {
      const { id, jsonSchema } = action.payload;
      state.jsonSchema.properties[id] = jsonSchema;
    },
    setFormComponentUISchema: (state, action) => {
      const { id, uiSchema } = action.payload;
      state.uiSchema[id] = uiSchema;
    },
  },
});

export const {
  addNewFormComponent,
  deleteFormComponentById,
  duplicateFormComponentById,
  editComponentID,
  moveFormComponent,
  setFormTitle,
  setFormStatus,
  setDescription,
  setFormComponentTitle,
  setFormComponentJSONSchema,
  setFormComponentUISchema,
  setJSONSchema,
  setUISchema,
  setShowPreview,
  resetFormBuilderState,
  toggleComponentRequired,
  toggleEditMode,
} = formsSlice.actions;

export default formsSlice.reducer;
