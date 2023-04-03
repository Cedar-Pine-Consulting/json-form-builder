import { useState } from "react";
import { Droppable, Draggable } from "react-beautiful-dnd";

// TODO: props validation

function ToolBoxFormComponent({ formComponent }) {
  return <div>{formComponent.id}</div>;
}

function ToolBoxComponent({ formComponents, onDragEnd }) {
  return (
    <>
      <h2>Form Builder Toolbox</h2>
      <Droppable droppableId="toolbox" isDropDisabled={true}>
        {(provided) => (
          <div {...provided.droppableProps} ref={provided.innerRef}>
            {formComponents.map((formComponent, index) => (
              <Draggable
                key={formComponent.id}
                draggableId={formComponent.id}
                index={index}>
                {(provided, snapshot) => (
                  <div
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                  >
                    <ToolBoxFormComponent formComponent={formComponent} />
                  </div>
                )}
              </Draggable>
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </>
  );
}

export default ToolBoxComponent;
