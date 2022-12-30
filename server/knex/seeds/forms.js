exports.seed = async function(knex) {
  // Deletes ALL existing entries if needed
  await knex('formschema').del();
  // insert seed entries
  await knex('formschema').insert([
    {
      id: 1,
      name: "TestForm",
      schema: {
        "type": "object",
        "properties": {
            "name": {
            "type": "string"
            },
            "vegetarian": {
            "type": "boolean"
            },
            "birthDate": {
            "type": "string"
            },
            "personalData": {
            "type": "object",
            "properties": {
                "age": {
                "type": "integer"
                }
            },
            "additionalProperties": true,
            "required": [
                "age"
            ]
            },
            "postalCode": {
            "type": "string"
            }
        },
        "additionalProperties": true,
        "required": [
            "name",
            "vegetarian",
            "birthDate",
            "personalData",
            "postalCode"
        ]},
        "uischema": {
            "type": "VerticalLayout",
            "elements": [
                {
                "type": "Control",
                "scope": "#/properties/name"
                },
                {
                "type": "Control",
                "scope": "#/properties/vegetarian"
                },
                {
                "type": "Control",
                "scope": "#/properties/birthDate"
                },
                {
                "type": "Control",
                "scope": "#/properties/personalData"
                },
                {
                "type": "Control",
                "scope": "#/properties/postalCode"
                }
            ]
        }
    }]);
};
