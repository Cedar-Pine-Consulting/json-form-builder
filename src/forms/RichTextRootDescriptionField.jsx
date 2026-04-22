import { Box } from "@mui/material";
import DefaultDescriptionField from "@rjsf/mui/lib/DescriptionField/DescriptionField.js";
import PropTypes from "prop-types";
import RichTextView from "../components/RichText/RichTextView.jsx";
import {
  isEffectivelyEmptyRichText,
  sanitizeRichTextHtml,
} from "../utils/sanitizeRichTextHtml.js";

/** RJSF default for root is idPrefix "root" and descriptionId → `root__description`. */
export const ROOT_FORM_DESCRIPTION_ID = "root__description";

function RichTextRootDescriptionField({ id, description, schema, uiSchema, registry }) {
  if (
    id === ROOT_FORM_DESCRIPTION_ID &&
    typeof description === "string" &&
    description
  ) {
    const clean = sanitizeRichTextHtml(description);
    if (isEffectivelyEmptyRichText(clean)) {
      return null;
    }
    return (
      <Box
        id={id}
        className="form-description-rich-text"
        sx={{
          marginTop: "5px",
          "& .ProseMirror": {
            outline: "none",
          },
        }}
      >
        <RichTextView value={`aaa ${clean}`} />
      </Box>
    );
  }
  return (
    <DefaultDescriptionField
      id={id}
      description={description}
      schema={schema}
      uiSchema={uiSchema}
      registry={registry}
    />
  );
}

RichTextRootDescriptionField.propTypes = {
  id: PropTypes.string.isRequired,
  description: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
  schema: PropTypes.object.isRequired,
  uiSchema: PropTypes.object,
  registry: PropTypes.object.isRequired,
};

export default RichTextRootDescriptionField;
