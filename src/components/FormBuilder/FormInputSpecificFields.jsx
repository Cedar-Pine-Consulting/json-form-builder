import React from "react";
import PropTypes from "prop-types";
import BooleanFields from "./BooleanFields";
import ArrayFields from "./ArrayFields";
import StringFields from "./StringFields";

function FormInputSpecificFields({
  jsonSchema,
  onJsonSchemaChange,
  uiSchema,
  onUISchemaChange,
}) {
  const dataType = jsonSchema.type;
  return (
    <>
      {/* TODO: show appropriate options for all input types */}
      {dataType === "string" && (
        <StringFields
          jsonSchema={jsonSchema}
          onJsonSchemaChange={onJsonSchemaChange}
          onUISchemaChange={onUISchemaChange}
          uiSchema={uiSchema}
        />
      )}
      {dataType === "boolean" && (
        <BooleanFields
          jsonSchema={jsonSchema}
          onJsonSchemaChange={onJsonSchemaChange}
        />
      )}
      {dataType === "array" && (
        <ArrayFields
          jsonSchema={jsonSchema}
          onJsonSchemaChange={onJsonSchemaChange}
          onUISchemaChange={onUISchemaChange}
          uiSchema={uiSchema}
        />
      )}
    </>
  );
}

FormInputSpecificFields.propTypes = {
  jsonSchema: PropTypes.object.isRequired,
  onJsonSchemaChange: PropTypes.func.isRequired,
  uiSchema: PropTypes.object.isRequired,
  onUISchemaChange: PropTypes.func.isRequired,
};

export default FormInputSpecificFields;
