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

INSERT INTO forms(name, form_schema) VALUES(
    'Test Form',
    '{
        "name": "string",
        "age": "int",
        "role": "string",
        "skills": "array",
        "address": "object"
    }'
);
