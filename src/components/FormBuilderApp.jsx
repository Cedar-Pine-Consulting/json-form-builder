import { useRef, useState } from "react";
import { PropTypes } from "prop-types";
import validator from "@rjsf/validator-ajv8";
import {
  Alert,
  Box,
  Paper,
  Button,
  Container,
  Stack,
  AppBar,
  Toolbar,
  Typography,
  Dialog,
  DialogTitle,
  DialogContent,
  Accordion,
  AccordionSummary,
  AccordionDetails,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import VisibilityIcon from "@mui/icons-material/Visibility";

import { useDispatch, useSelector } from "react-redux";
import FormBuilderComponent from "./FormBuilder/FormBuilderComponent";
import Input from "./Input/Input";
import RichTextInput from "./RichText/RichTextInput";
import FormWithWidgets from "../forms/FormWithWidgets";
import {
  selectJSONSchema,
  selectUISchema,
  selectShowPreview,
  selectErrors,
  selectSubmitAttempted,
} from "../store/selectors";

import {
  setFormTitle,
  setDescription,
  setJSONSchema,
  setUISchema,
  setShowPreview,
} from "../store/slice";
import "../styles/formBuilder.css";

function FormBuilderApp({ formTemplate }) {
  const [isExpanded, setIsExpanded] = useState(
    formTemplate?.id ? false : "panel1"
  );
  const dispatch = useDispatch();
  const container = useRef(null);


  const jsonSchema = useSelector(selectJSONSchema);
  const uiSchema = useSelector(selectUISchema);
  const showPreview = useSelector(selectShowPreview);
  const errors = useSelector(selectErrors);
  const submitted = useSelector(selectSubmitAttempted);

  const onChangeFormTitle = (e) => {
    dispatch(setFormTitle(e.target.value));
  };
  const onChangeFormDescription = (e) => {
    dispatch(setDescription(e.target.value));
  };
  const onChangeJSONSchema = (formJSON) => {
    dispatch(setJSONSchema(formJSON));
  };
  const onChangeUISchema = (uiJSON) => {
    dispatch(setUISchema(uiJSON));
  };

  const areErrorsShown = () => submitted && Object.keys(errors).length > 0;

  const handlePreview = () => {
    dispatch(setShowPreview());
  };

  const toggleAccordion = (panel) => (event, expanded) => {
    setIsExpanded(expanded ? panel : false);
  };

  return (
    <div className="App">
      <Container
        sx={{ display: { xs: "block", lg: "none" } }}
        maxWidth={false}
        disableGutters
      >
        <Alert severity="info">
          This feature is only available on larger screens.
        </Alert>
      </Container>
      <Container
        sx={{ display: { xs: "none", lg: "block" } }}
        maxWidth={false}
        disableGutters
      >
        <Stack direction="row-reverse" gap={2}>
          <Paper
            variant="outlined"
            sx={{ p: 2, pb: 4, mb: 2, width: 1 / 4 }}
            ref={container}
          />
          <Box sx={{ overflow: "scroll", maxHeight: "85vh", width: 1 }}>
            <Accordion
              variant="outlined"
              sx={{ mb: 2, px: 2 }}
              expanded={isExpanded === "panel1"}
              onChange={toggleAccordion("panel1")}
            >
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel1-content"
                id="panel1-header"
                sx={{ maxWidth: "md", mx: "auto", p: 0 }}
              >
                <Stack>
                  <Typography variant="h5">Form Details</Typography>
                  <Typography variant="caption">
                    Define here the details of your form
                  </Typography>
                </Stack>
              </AccordionSummary>
              <AccordionDetails sx={{ px: 0 }}>
                <Stack spacing={2} maxWidth="md" mx="auto">
                  <Input
                    sx={{ width: 1 }}
                    name="formTitle"
                    onChange={onChangeFormTitle}
                    type="string"
                    error={areErrorsShown() ? errors.title : null}
                    label="Form Title*"
                    required
                    value={jsonSchema.title || ""}
                  />
                  <RichTextInput
                    name="formDescription"
                    error={areErrorsShown() ? errors.description : null}
                    onChange={onChangeFormDescription}
                    required
                    label="Form Description"
                    value={jsonSchema.description || ""}
                  />
                </Stack>
              </AccordionDetails>
            </Accordion>
            {areErrorsShown() && errors.jsonSchema && (
              <Alert severity="error" sx={{ mb: 2 }}>
                {errors.jsonSchema}
              </Alert>
            )}
            <FormBuilderComponent
              jsonSchema={jsonSchema}
              uiSchema={uiSchema}
              onJSONSchemaChange={onChangeJSONSchema}
              onUISchemaChange={onChangeUISchema}
              toolsRef={container}
            />
          </Box>
        </Stack>
        <Dialog
          fullWidth
          maxWidth="sm"
          open={showPreview}
          onClose={handlePreview}
        >
          <DialogTitle>Form Preview</DialogTitle>
          <DialogContent>
            <FormWithWidgets
              schema={jsonSchema}
              uiSchema={uiSchema}
              validator={validator}
              liveValidate
            />
          </DialogContent>
        </Dialog>
        <AppBar
          position="fixed"
          sx={{ top: "auto", bottom: 0, backgroundColor: "white" }}
        >
          <Toolbar>
            <Button
              variant="outlined"
              onClick={handlePreview}
              sx={{ ml: "auto", mr: 2 }}
              startIcon={<VisibilityIcon />}
              disabled={
                Object.keys(jsonSchema.properties).length === 0 || showPreview
              }
            >
              Preview
            </Button>
          </Toolbar>
        </AppBar>
      </Container>
    </div>
  );
}

FormBuilderApp.propTypes = {
  formTemplate: PropTypes.any, // TOOD: Define a more specific type
};

export default FormBuilderApp;
