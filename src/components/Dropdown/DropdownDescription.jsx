import { useEffect, useRef, useState } from "react";
import { PropTypes } from "prop-types";
import { Tooltip } from "@mui/material";
import InfoIcon from "@mui/icons-material/Info";

export default function DropdownDescription({ description }) {
  const [isTextOverflowing, setIsTextOverflowing] = useState(false);
  const containerRef = useRef(null);

  useEffect(() => {
    const isOverflowing =
      containerRef.current.scrollWidth > containerRef.current.clientWidth;
    setIsTextOverflowing(isOverflowing);
  }, []);

  return (
    <div ref={containerRef} overflow="hidden" style={{ maxWidth: "100%" }}>
      &nbsp;
      {isTextOverflowing ? (
        <Tooltip title={description} arrow>
          <InfoIcon />
        </Tooltip>
      ) : (
        <>
          -&nbsp;
          {description}
        </>
      )}
    </div>
  );
}

DropdownDescription.propTypes = {
  description: PropTypes.string,
};
