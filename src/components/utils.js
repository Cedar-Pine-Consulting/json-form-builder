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

export function generateFormComponentData(jsonSchema, uiSchema) {
  const formData = [];
  // use ui ordering if it exists, default to jsonSchem.properties keys
  const componentOrder = uiSchema["ui:order"].length ? uiSchema["ui:order"] : Object.keys(jsonSchema.properties);
  for (const id of componentOrder) {
    const formComponentData = {
      id: id,
      required: jsonSchema.required.includes(id),
      jsonSchema: jsonSchema.properties[id],
      uiSchema: uiSchema[id] || {},
    };
    formData.push(formComponentData);
  }
  return formData;
}

export function generateSchemasFromComponent(component) {
  const jsonSchema = {};
  jsonSchema.properties = { ...jsonSchema.properties, [component.id]: component.jsonSchema }
  const uiSchema = { ...component.uiSchema, "ui:ordering": [component.id] }
  return {
    uiSchema: uiSchema,
    jsonSchema: jsonSchema
  }
}

export const toolBoxFormComponents = [
  {
    id: "string-input",
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
    id: "int-input",
    jsonSchema: {
      "type": "integer",
      "title": "example int",
    },
    uiSchema: {
      "ui:widget": "updown",
    },
  },
  {
    id: "number-input",
    jsonSchema: {
      "type": "number",
      "title": "example number",
    },
    uiSchema: {
      "ui:widget": "updown",
    },
  },
  {
    id: "textarea-input",
    jsonSchema: {
      "type": "string",
      "title": "example text area",
    },
    uiSchema: {
      "ui:widget": "textarea",
    },
  },
  {
    id: "bool-input",
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
  },
  {
    id: "multiple-choice",
    jsonSchema: {
      "type": "array",
      "title": "Options",
      "uniqueItems": true,
      "items": {
        "type": "string",
        "title": "Option",
        "enum": [
          "option 1",
          "option 2",
          "option 3",
          "option 4"
        ]
      }
    },
    uiSchema: {
       "ui:widget": "CheckboxesWidget"
    }
  },
  {
    id: "list-of-objects",
    jsonSchema: {
      type: "array",
      title: "Children",
      items: {
        type: "object",
        title: "Child",
        properties: {
          nick: {
            type: "string",
            title: "Nickname",
            required: true
          },
          gender: {
            type: "string",
            title: "Gender",
            enum: [ "male", "female", "other" ]
          },
          age: {
            type: "integer",
            title: "Age"
          }
        }
      }
    },
  },
  {
    id: "secret",
    jsonSchema: {
      "title": "Password",
      "type": "string",
      "minLength": 3
    },
    uiSchema: {
      "ui:widget": "password"
    }
  },
  {
    id: "date",
    jsonSchema: {
      "type": "string",
      "format": "date"
    },
  },
  { id: "time",
    jsonSchema: {
      "type": "string",
      "format": "time"
    }
  },
  {
    id: "address",
    jsonSchema: {
      title: 'Address',
      type: 'object',
      required: ['street1', 'city', 'state', 'zipCode'],
      properties: {
        street1: {
          type: 'string',
        },
        street2: {
          type: 'string',
        },
        city: {
          type: 'string',
        },
        state: {
          type: 'string',
        },
        zipCode: {
          type: 'number',
        },
      },
    },
  }
];

export const UIWidgetTypes = [
  "text",
  "textarea",
  "email",
  "date",
  "time",
  "radio",
  "select",
  "checkbox",
  "color",
  "password",
  "updown",
  "uri",
  null
]


export class DuplicateIdError extends Error {
  constructor(message) {
    super(message); // (1)
    this.name = "DuplicateIdError"; // (2)
  }
}
