import React from "react";
import PropTypes from "prop-types";
import { Stack } from "@mui/material";
import Input from "../Input/Input";

function BooleanFields({ jsonSchema, onJsonSchemaChange }) {
  const trueIndex = jsonSchema.oneOf.findIndex((item) => item.const === true);
  const falseIndex = jsonSchema.oneOf.findIndex((item) => item.const === false);
  const trueTitle = jsonSchema.oneOf[trueIndex].title;
  const falseTitle = jsonSchema.oneOf[falseIndex].title;

  // console.log("BoolenFields jsonSchema", jsonSchema);

  const handleTrueTitleChange = (event) => {
    const newOneOfArray = jsonSchema.oneOf.map((item) =>
      item.const === true ? { ...item, title: event.target.value } : item
    );
    const newJsonSchema = {
      ...jsonSchema,
      oneOf: newOneOfArray,
    };
    onJsonSchemaChange(newJsonSchema);
  };

  const handleFalseTitleChange = (event) => {
    const newOneOfArray = jsonSchema.oneOf.map((item) =>
      item.const === false ? { ...item, title: event.target.value } : item
    );
    const newJsonSchema = {
      ...jsonSchema,
      oneOf: newOneOfArray,
    };
    onJsonSchemaChange(newJsonSchema);
  };

  return (
    <Stack direction="row" gap={2}>
      <Input
        variant="outlined"
        name="True Title"
        label="True Title"
        value={trueTitle}
        onChange={handleTrueTitleChange}
        size="small"
      />
      <Input
        variant="outlined"
        name="False Title"
        label="False Title"
        value={falseTitle}
        onChange={handleFalseTitleChange}
        size="small"
      />
    </Stack>
  );
}

BooleanFields.propTypes = {
  jsonSchema: PropTypes.object.isRequired,
  onJsonSchemaChange: PropTypes.func.isRequired,
};

export default BooleanFields;
