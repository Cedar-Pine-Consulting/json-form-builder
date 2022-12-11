-- create table
CREATE TABLE "forms" (
    "id" SERIAL,
    "name" TEXT,
    "form_schema" JSON
);

CREATE TABLE "form_submissions" (
    "form_data" JSON,
    "id" SERIAL,
    "form_id" INT
    -- CONSTRAINT fk_form FOREIGN KEY(id) REFERENCES forms
);

-- test form --
-- from https://jsonforms.io/examples/basic --
INSERT INTO forms(name, form_schema) VALUES(
    'Test Form',
    '{
        "type": "object",
        "properties": {
            "name": {
                "type": "string",
                "minLength": 3,
                "description": "Please enter your name"
            },
            "vegetarian": {
                "type": "boolean"
            },
            "birthDate": {
                "type": "string",
                "format": "date"
            },
            "nationality": {
                "type": "string",
                "enum": [
                    "DE",
                    "IT",
                    "JP",
                    "US",
                    "RU",
                    "Other"
                ]
            },
            "personalData": {
                "type": "object",
                "properties": {
                    "age": {
                        "type": "integer",
                        "description": "Please enter your age."
                    },
                    "height": {
                        "type": "number"
                    },
                    "drivingSkill": {
                        "type": "number",
                        "maximum": 10,
                        "minimum": 1,
                        "default": 7
                    }
                },
                "required": [
                    "age",
                    "height"
                ]
            },
            "occupation": {
                "type": "string"
            },
            "postalCode": {
                "type": "string",
                "maxLength": 5
            }
        },
        "required": [
            "occupation",
            "nationality"
        ]
    }'
);
