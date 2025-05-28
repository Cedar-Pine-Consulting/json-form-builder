import { useEffect, useRef, useState } from "react";
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
  FormControlLabel,
  Switch,
  Accordion,
  AccordionSummary,
  AccordionDetails,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import SaveIcon from "@mui/icons-material/Save";
import VisibilityIcon from "@mui/icons-material/Visibility";

import { useDispatch, useSelector } from "react-redux";
import FormBuilderComponent from "./FormBuilder/FormBuilderComponent";
import Dropdown from "./Dropdown/Dropdown";
import Input from "./Input/Input";
import RichTextInput from "./RichText/RichTextInput";
import FormWithWidgets from "../forms/FormWithWidgets";
import { locations } from "../utils/constants";
import {
  selectJSONSchema,
  selectUISchema,
  selectShowPreview,
  selectErrors,
  selectDepartmentId,
  selectSubmitAttempted,
} from "../store/selectors";

import {
  resetFormBuilderState,
  setFormTitle,
  setDepartmentId,
  setDescription,
  setJSONSchema,
  setUISchema,
  setShowPreview,
  setSubmitAttempted,
} from "../store/slice";
import "../styles/formBuilder.css";

function FormBuilderApp({ formTemplate, submitDataToServer, departments }) {
  const [isExpanded, setIsExpanded] = useState(
    formTemplate?.id ? false : "panel1"
  );
  const [allowSubmissionEdits, setAllowSubmissionEdits] = useState(
    formTemplate?.allowSubmissionEdits ?? false
  );
  const [isActive, setIsActive] = useState(formTemplate?.isActive ?? true);
  const [location, setLocation] = useState(
    formTemplate?.location
      ? locations.find((l) => l.value === formTemplate.location)
      : null
  );
  const dispatch = useDispatch();
  const container = useRef(null);

  useEffect(() => {
    if (formTemplate?.departmentId) {
      dispatch(setDepartmentId(parseInt(formTemplate?.departmentId, 10)));

      if (formTemplate?.id) {
        const { name, jsonSchema, uiSchema } = formTemplate;
        dispatch(setFormTitle(name));
        dispatch(setJSONSchema(jsonSchema));
        dispatch(setUISchema(uiSchema));
      }

      return;
    }

    dispatch(resetFormBuilderState());
  }, []);

  const jsonSchema = useSelector(selectJSONSchema);
  const uiSchema = useSelector(selectUISchema);
  const showPreview = useSelector(selectShowPreview);
  const errors = useSelector(selectErrors);
  const departmentID = useSelector(selectDepartmentId);
  const submitted = useSelector(selectSubmitAttempted);

  const getDepartmentById = (id) => departments.find((dep) => dep.id === id);
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

  const onCreateSubmit = (e) => {
    e.preventDefault();
    dispatch(setSubmitAttempted());
    if (!Object.keys(errors).length) {
      // Clean isNew flags from uiSchema before submitting
      const cleanUiSchema = { ...uiSchema };
      Object.keys(cleanUiSchema).forEach((key) => {
        if (cleanUiSchema[key]?.isNew) {
          const { isNew, ...rest } = cleanUiSchema[key];
          cleanUiSchema[key] = rest;
        }
      });

      submitDataToServer({
        name: jsonSchema.title,
        // TODO: maybe name and department selectors can be refactored as different selectors outside of the "form-builder" component
        departmentId: departmentID,
        location: location?.value ?? null,
        jsonSchema,
        uiSchema: cleanUiSchema,
        allowSubmissionEdits,
        isActive,
        ...(formTemplate && { id: formTemplate.id }), // include ID if this is an edit vs none on create
      });
    }
    if (!!errors.department || !!errors.title || !!errors.description) {
      setIsExpanded("panel1");
    }
  };

  const handlePreview = () => {
    dispatch(setShowPreview());
  };

  const onDepartmendIdChange = (e) => {
    dispatch(setDepartmentId(e.target.value?.id));
  };

  // if (window.innerWidth < 1200)
  //   return (
  //     <Paper variant="outlined" sx={{ p: 2, pb: 4, mb: 2 }}>
  //     </Paper>
  //   );

  const toggleAccordion = (panel) => (event, expanded) => {
    setIsExpanded(expanded ? panel : false);
  };

  const changeFormStatus = (e) => {
    const { checked } = e.target;
    setIsActive(checked);
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
                  <Stack direction="row" spacing={2} mx="auto">
                    <FormControlLabel
                      control={
                        <Switch
                          name="allowSubmissionEdits"
                          checked={allowSubmissionEdits}
                          onChange={() =>
                            setAllowSubmissionEdits(!allowSubmissionEdits)
                          }
                          color="primary"
                        />
                      }
                      label="Allow Submission Edits"
                    />
                    <FormControlLabel
                      control={
                        <Switch
                          name="isActive"
                          const
                          onChange={changeFormStatus}
                          checked={isActive}
                          color="primary"
                        />
                      }
                      label="Is Active"
                    />
                  </Stack>
                  <Dropdown
                    labelId="select-department-label"
                    label="Department ID*"
                    name="departmentId"
                    id="select-department"
                    value={
                      departmentID ? getDepartmentById(departmentID) : null
                    }
                    onChange={onDepartmendIdChange}
                    options={departments}
                    required
                    error={areErrorsShown() ? errors.department : null}
                    optionLabel="name"
                    optionValue="id"
                    disableClearable
                  />
                  <Dropdown
                    labelId="select-location-label"
                    label="Location"
                    name="location"
                    id="select-location"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    options={locations}
                    error={areErrorsShown() ? errors.location : null}
                    optionLabel="label"
                    optionValue="value"
                  />
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
            <Button
              variant="contained"
              onClick={onCreateSubmit}
              startIcon={<SaveIcon />}
            >
              Save Form Template
            </Button>
          </Toolbar>
        </AppBar>
      </Container>
    </div>
  );
}

FormBuilderApp.propTypes = {
  formTemplate: PropTypes.any,
  submitDataToServer: PropTypes.func,
  departments: PropTypes.array,
};

export default FormBuilderApp;
