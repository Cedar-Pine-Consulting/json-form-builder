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

export const toolBoxFormComponents = [
  {
    id: "firstName",
    jsonSchema: {
      type: "string",
      title: "First Name",
      default: "John",
    },
    uiSchema: {
      "ui:autofocus": true,
      "ui:emptyValue": "",
      "ui:placeholder": "ui:emptyValue causes this field to always be valid despite being required",
      "ui:autocomplete": "family-name",
    },
  },
  {
    id: "lastName",
    jsonSchema: {
      type: "string",
      title: "Last Name",
      default: "Doe",
    },
    uiSchema: {
      "ui:autocomplete": "given-name",
    },
  },
  {
    id: "age",
    jsonSchema: {
      "type": "integer",
      "title": "Age",
    },
    uiSchema: {
      "ui:widget": "updown",
    },
  },
  {
    id: "bio",
    jsonSchema: {
      "type": "string",
      "title": "Bio",
    },
    uiSchema: {
      "ui:widget": "textarea",
    },
  },
];

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
