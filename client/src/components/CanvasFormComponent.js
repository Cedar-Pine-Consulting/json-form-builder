import React from "react";
import { Button, Box } from "@mui/material";

function CanvasFormComponent({ formComponent, onClickDelete, onClickEdit }) {

  return (
    <Box sx={{ p: 2, border: '1px dashed grey' }}>
      <div className="d-flex flex-column p-2">
        <div className="d-flex justify-content-between">
          <Button onClick={onClickDelete}>x</Button>
          <Button onClick={onClickEdit}>✏️</Button>
          <div><strong>{formComponent.id}</strong></div>
          <div>
            jsonSchema:{JSON.stringify(formComponent.jsonSchema)}
          </div>
          <div>
            uiSchema:{JSON.stringify(formComponent.uiSchema)}
          </div>
        </div>
      </div>
    </Box>
  );
}

export default CanvasFormComponent;
