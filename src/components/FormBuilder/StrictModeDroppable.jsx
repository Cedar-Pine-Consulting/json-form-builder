// Original post: https://github.com/atlassian/react-beautiful-dnd/issues/2399#issuecomment-1175638194
import { useEffect, useState } from "react";
import { Droppable } from "react-beautiful-dnd";
import PropTypes from "prop-types";

function StrictModeDroppable({ children, ...props }) {
  const [enabled, setEnabled] = useState(false);
  useEffect(() => {
    const animation = requestAnimationFrame(() => setEnabled(true));
    return () => {
      cancelAnimationFrame(animation);
      setEnabled(false);
    };
  }, []);
  if (!enabled) {
    return null;
  }
  return <Droppable {...props}>{children}</Droppable>;
}

StrictModeDroppable.propTypes = {
  children: PropTypes.any.isRequired,
};

export default StrictModeDroppable;
