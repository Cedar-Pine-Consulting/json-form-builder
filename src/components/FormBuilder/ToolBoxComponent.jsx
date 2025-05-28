import React from "react";
import PropTypes from "prop-types";
import { Draggable } from "react-beautiful-dnd";
import { Portal, Box, Card, Typography } from "@mui/material";
import AbcIcon from "@mui/icons-material/Abc";
import ThirtyFpsIcon from "@mui/icons-material/ThirtyFps";
import PlusOneOutlinedIcon from "@mui/icons-material/PlusOneOutlined";
import NotesIcon from "@mui/icons-material/Notes";
import FlakyIcon from "@mui/icons-material/Flaky";
import ChecklistIcon from "@mui/icons-material/Checklist";
import QuestionMarkOutlinedIcon from "@mui/icons-material/QuestionMarkOutlined";
import PasswordIcon from "@mui/icons-material/Password";
import DateRangeOutlinedIcon from "@mui/icons-material/DateRangeOutlined";
import AccessTimeOutlinedIcon from "@mui/icons-material/AccessTimeOutlined";
import LocationOnOutlinedIcon from "@mui/icons-material/LocationOnOutlined";
import LabelOutlinedIcon from "@mui/icons-material/LabelOutlined";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import StrictModeDroppable from "./StrictModeDroppable";

const componentIconIndex = {
  headerElement: {
    icon: <LabelOutlinedIcon sx={{ mr: 2 }} />,
    label: "Header",
  },
  stringInput: { icon: <AbcIcon sx={{ mr: 2 }} />, label: "Text" },
  intInput: {
    icon: <PlusOneOutlinedIcon sx={{ mr: 2 }} />,
    label: "Integer",
  },
  numberInput: { icon: <ThirtyFpsIcon sx={{ mr: 2 }} />, label: "Number" },
  textareaInput: { icon: <NotesIcon sx={{ mr: 2 }} />, label: "Text Area" },
  boolInput: { icon: <FlakyIcon sx={{ mr: 2 }} />, label: "Yes/No" },
  singleSelectInput: {
    icon: <ExpandMoreIcon sx={{ mr: 2 }} />,
    label: "Select",
  },
  multiSelectInput: {
    icon: <ChecklistIcon sx={{ mr: 2 }} />,
    label: "Multi-select",
  },
  listOfObjects: {
    icon: <QuestionMarkOutlinedIcon sx={{ mr: 2 }} />,
    label: "List Of Objects",
  },
  secret: { icon: <PasswordIcon sx={{ mr: 2 }} />, label: "Password" },
  date: { icon: <DateRangeOutlinedIcon sx={{ mr: 2 }} />, label: "Date" },
  time: { icon: <AccessTimeOutlinedIcon sx={{ mr: 2 }} />, label: "Time" },
  address: {
    icon: <LocationOnOutlinedIcon sx={{ mr: 2 }} />,
    label: "Address",
  },
};

function ToolBoxFormComponent({ formComponent }) {
  return (
    <Card sx={{ p: 1, mb: 1, display: "flex", alignItems: "center" }}>
      {componentIconIndex[formComponent.id].icon}{" "}
      {componentIconIndex[formComponent.id].label} Input
    </Card>
  );
}

ToolBoxFormComponent.propTypes = {
  formComponent: PropTypes.object.isRequired,
};

function ToolBoxComponent({ formComponents, toolsRef }) {
  return (
    <Portal container={() => toolsRef.current}>
      <Typography variant="h5">Input Options</Typography>
      <Typography variant="caption">Form fields available</Typography>
      <StrictModeDroppable droppableId="toolbox" isDropDisabled>
        {(provided) => (
          <Box {...provided.droppableProps} ref={provided.innerRef} mt={2}>
            {formComponents.map((formComponent, index) => (
              <Draggable
                key={`toolbox-${formComponent.id}`}
                draggableId={`toolbox-${formComponent.id}`}
                index={index}
              >
                {({ innerRef, draggableProps, dragHandleProps }) => (
                  <div ref={innerRef} {...draggableProps} {...dragHandleProps}>
                    <ToolBoxFormComponent formComponent={formComponent} />
                  </div>
                )}
              </Draggable>
            ))}
            {provided.placeholder}
          </Box>
        )}
      </StrictModeDroppable>
    </Portal>
  );
}

ToolBoxComponent.propTypes = {
  formComponents: PropTypes.array.isRequired,
  toolsRef: PropTypes.shape({ current: PropTypes.instanceOf(Element) }),
};

export default ToolBoxComponent;
