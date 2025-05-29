export const emptyFormSchema = {
  title: "",
  type: "object",
  description: "",
  required: [],
  properties: {},
};

export const emptyUISchema = {
  "ui:order": [],
};

export function generateSchemasFromComponent(component) {
  const jsonSchema = {};
  jsonSchema.properties = {
    ...jsonSchema.properties,
    [component.id]: component.jsonSchema,
  };
  const uiSchema = { ...component.uiSchema, "ui:ordering": [component.id] };
  return {
    uiSchema,
    jsonSchema,
  };
}

export const toolBoxFormComponents = [
  {
    id: "headerElement",
    jsonSchema: {
      type: "string",
    },
    uiSchema: {
      "ui:cardTitle": "Header",
      "ui:widget": "CustomHeader",
    },
  },
  {
    id: "stringInput",
    jsonSchema: {
      type: "string",
    },
    uiSchema: {
      "ui:cardTitle": "Text",
      "ui:emptyValue": "",
      "ui:widget": "TextWidget",
    },
  },
  {
    id: "numberInput",
    jsonSchema: {
      type: "number",
    },
    uiSchema: {
      "ui:cardTitle": "Number",
      "ui:widget": "UpDownWidget",
    },
  },
  {
    id: "textareaInput",
    jsonSchema: {
      type: "string",
    },
    uiSchema: {
      "ui:cardTitle": "Text area",
      "ui:widget": "TextareaWidget",
    },
  },
  {
    id: "boolInput",
    jsonSchema: {
      type: "boolean",
      oneOf: [
        { const: true, title: "Yes" },
        { const: false, title: "No" },
      ],
    },
    uiSchema: {
      "ui:cardTitle": "Yes/No",
      "ui:widget": "CustomRadio",
    },
  },
  {
    id: "singleSelectInput",
    jsonSchema: {
      type: "string",
      uniqueItems: true,
      enum: ["option 1", "option 2"],
    },
    uiSchema: {
      "ui:cardTitle": "Select",
      "ui:widget": "CustomSelect",
    },
  },
  {
    id: "multiSelectInput",
    jsonSchema: {
      type: "array",
      uniqueItems: true,
      maxItems: 99,
      items: {
        type: "string",
        title: "Option",
        enum: ["option 1", "option 2"],
      },
    },
    uiSchema: {
      "ui:cardTitle": "Multi select",
      "ui:widget": "CustomMultiSelect",
    },
  },
  // TODO - uncomment when we have a way to handle nested objects
  // {
  //   id: "listOfObjects",
  //   jsonSchema: {
  //     type: "array",
  //     title: "Children",
  //     items: {
  //       type: "object",
  //       title: "Child",
  //       // example of a required field in custom component
  //       // required: [
  //       //   "nick"
  //       // ],
  //       properties: {
  //         nick: {
  //           type: "string",
  //           title: "Nickname",
  //         },
  //         gender: {
  //           type: "string",
  //           title: "Gender",
  //           enum: ["male", "female", "other"],
  //         },
  //         age: {
  //           type: "integer",
  //           title: "Age",
  //         },
  //       },
  //     },
  //   },
  // },
  {
    id: "secret",
    jsonSchema: {
      type: "string",
      minLength: 3,
    },
    uiSchema: {
      "ui:cardTitle": "Password",
      "ui:widget": "PasswordWidget",
    },
  },
  {
    id: "date",
    jsonSchema: {
      type: "string",
      format: "date",
    },
    uiSchema: {
      "ui:cardTitle": "Date",
    },
  },
  {
    id: "time",
    jsonSchema: {
      type: "string",
      format: "time",
    },
    uiSchema: {
      "ui:cardTitle": "Time",
    },
  },
  {
    id: "address",
    jsonSchema: {
      type: "object",
      required: ["street1", "city", "state", "zipCode"],
      properties: {
        street1: {
          type: "string",
        },
        street2: {
          type: "string",
        },
        city: {
          type: "string",
        },
        state: {
          type: "string",
        },
        zipCode: {
          type: "number",
        },
      },
    },
    uiSchema: {
      "ui:cardTitle": "Address",
    },
  },
];

// re: https://rjsf-team.github.io/react-jsonschema-form/docs/usage/widgets/
export const UIWidgetTypes = {
  all: [
    { type: "text" },
    { type: "textarea" },
    { type: "email" },
    { type: "date" },
    { type: "time" },
    { type: "radio" },
    { type: "select" },
    { type: "checkbox" },
    { type: "color" },
    { type: "password" },
    { type: "updown" },
    { type: "uri" },
  ],
  boolean: [{ type: "radio" }, { type: "select" }, { type: "checkbox" }],
  string: [
    { type: "text" },
    { type: "textarea" },
    { type: "password" },
    { type: "color" },
    { type: "email" },
    { type: "uri" },
    { type: "data-url" },
    { type: "date" },
    { type: "date-time" },
    { type: "time" },
  ],
  integer: [{ type: "updown" }, { type: "range" }],
  number: [
    { type: "updown" },
    { type: "range" },
    { type: "radio" },
    { type: "number" },
  ],
  array: [],
  object: [],
};

export class DuplicateIdError extends Error {
  constructor(message) {
    super(message); // (1)
    this.name = "DuplicateIdError"; // (2)
  }
}

export function removeIdFromFormSchema(id, formSchema) {
  const newFormSchema = { ...formSchema };
  // remove from properties
  const { [id]: removedJsonProp, ...newFormSchemaProps } =
    newFormSchema.properties;
  newFormSchema.properties = newFormSchemaProps;
  // remove from required
  newFormSchema.required = newFormSchema.required
    ? newFormSchema.required.filter((i) => i !== id)
    : [];
  return newFormSchema;
}

export function removeIdFromUiSchema(id, uiSchema) {
  // remove from map
  const { [id]: removedUiProp, ...newUiSchema } = uiSchema;
  // remove from ordering
  const oldOrder = [...uiSchema["ui:order"]];
  newUiSchema["ui:order"] = oldOrder.length
    ? oldOrder.filter((v) => v !== id)
    : [];
  return newUiSchema;
}

export function removeIdFromFormData(id, formData) {
  const { [id]: removedDataProp, ...newFormData } = formData;
  return newFormData;
}
