import React from "react";
import Moveable from "react-moveable";

//use of the movable library so we can drag and move the graph side bar around
const Movable = ({ moveRef, setStyle }) => {
  const [renderMovable, settRenderMovable] = React.useState(false);

  React.useEffect(() => {
    settRenderMovable(true);
  }, []);

  const handleDrag = (e) => {
    setStyle(e.transform);
  };

  if (!renderMovable) return null;

  return (
    <Moveable
      target={moveRef.current}
      draggable={true}
      throttleDrag={0}
      onDrag={handleDrag}
    />
  );
};

export default Movable;
