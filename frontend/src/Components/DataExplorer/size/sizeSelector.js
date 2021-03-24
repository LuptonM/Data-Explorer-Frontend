import React, { useState, useEffect } from "react";

export default function SizeColumnSelector({
  selectedColumn,
  handleDraggedItem,
  namespace,
}) {
  const handleDragStart = (event, selectedColumn) => {
    event.dataTransfer.setData("text", selectedColumn);
    handleDraggedItem(event.target.id);
  };

  return (
    <>
      <div
        id={namespace.concat("selectedColumnWrapper")}
        draggable="true"
        className="AxisColumnSelectorWrapper"
        onDragStart={(event) => handleDragStart(event, selectedColumn)}
      >
        <div id="selectedColourColumn" className="draggableColumn">
          {selectedColumn}
        </div>
      </div>
    </>
  );
}
