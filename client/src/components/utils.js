export const emptyFormSchema = {
  title: "test",
  type: "object",
  description: "test",
  required: [],
  properties: {},
};

export const emptyUISchema = {
  "ui:order": [],
};

export function generateFormComponentData(jsonSchema, uiSchema) {
  const formData = [];
  // Iterate through each property in the JSON schema
  for (const propName in jsonSchema.properties) {
    // Create a new form component data object
    const formComponentData = {
      id: propName,
      jsonSchema: jsonSchema.properties[propName],
      uiSchema: uiSchema[propName] || {},
    };
    formData.push(formComponentData);
  }
  return formData;
}

export function generateSchemasFromComponent(component) {
  const jsonSchema = {};
  jsonSchema.properties = { ...jsonSchema.properties, [component.id] : component.jsonSchema }
  const uiSchema = { ...component.uiSchema, "ui:ordering": [component.id] }
  return {
    uiSchema: uiSchema,
    jsonSchema: jsonSchema
  }
}

export const toolBoxFormComponents = [
  {
    id: "string",
    jsonSchema: {
      type: "string",
      title: "Example String",
      default: "A string",
    },
    uiSchema: {
      "ui:emptyValue": "",
      "ui:placeholder": "ui:emptyValue causes this field to always be valid despite being required",
    },
  },
  {
    id: "int",
    jsonSchema: {
      "type": "integer",
      "title": "example int",
    },
    uiSchema: {
      "ui:widget": "updown",
    },
  },
  {
    id: "textarea",
    jsonSchema: {
      "type": "string",
      "title": "example text area",
    },
    uiSchema: {
      "ui:widget": "textarea",
    },
  },
  {
    id: "bool",
    jsonSchema: {
      "type": "boolean",
      "oneOf": [
        { "const": true, "title": "Custom label for true" },
        { "const": false, "title": "Custom label for false" }
      ]
    },
    uiSchema: {
      "ui:widget": "radio"
    },
  }
];

