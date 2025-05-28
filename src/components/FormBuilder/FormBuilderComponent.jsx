import React from "react";
import { DragDropContext } from "react-beautiful-dnd";
import { useDispatch } from "react-redux";
import { Stack } from "@mui/material";
import PropTypes from "prop-types";
import {
  addNewFormComponent,
  moveFormComponent,
} from "../../store/slice";
import { toolBoxFormComponents } from "./utils";
import FormBuilderCanvas from "./FormBuilderCanvas";
import ToolBoxComponent from "./ToolBoxComponent";

// Component holds toolbox and canvas drag/drop areas
function FormBuilderComponent({ toolsRef }) {
  const dispatch = useDispatch();

  const handleDragEnd = (result) => {
    // no op if dropped outside the app
    if (!result.destination) {
      // The item was dropped outside the drop zone
      // eslint-disable-next-line no-console
      console.log("component dragged to no destination");
      return;
    }
    const { source, destination } = result;
    const id = result.draggableId;

    // If moving within the canvas, reorder the form components
    if (source.droppableId === "canvas") {
      // eslint-disable-next-line no-console
      console.log(`moving ${id} to ${destination.index}`);
      dispatch(
        moveFormComponent({
          oldIndex: source.index,
          newIndex: destination.index,
        })
      );
    }

    // If moving from toolbox to canvas, add a new form component
    if (source.droppableId === "toolbox") {
      const newFormComponentData = { ...toolBoxFormComponents[source.index] };
      // console.log("newFormComponentData", newFormComponentData);
      dispatch(
        addNewFormComponent({
          droppedIndex: destination.index,
          data: newFormComponentData,
        })
      );
    }
  };

  return (
    <Stack direction="row" spacing={2} sx={{ mb: 8 }}>
      <DragDropContext onDragEnd={handleDragEnd}>
        {/* TODO: maybe just import toolboxFormComponents in TooboxComponent */}
        <ToolBoxComponent
          formComponents={toolBoxFormComponents}
          toolsRef={toolsRef}
        />
        <FormBuilderCanvas />
      </DragDropContext>
    </Stack>
  );
}

FormBuilderComponent.propTypes = {
  toolsRef: PropTypes.object.isRequired,
};

export default FormBuilderComponent;
