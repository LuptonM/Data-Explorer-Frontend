import React, { useState, useEffect } from "react";

import AxisColumnSelector from "./axisColumnSelector";

export default function DragArea({
  handleRemoveChild,
  handleDraggedItem,
  draggedItem,
  selectedColumn,
  handleColumn,
  modifications = false,
  namespace,
  handleModification,
  axisModification,
  axisLabel,
}) {
  const handleDragOver = (event) => {
    event.preventDefault();
    event.stopPropagation();
  };

  const handleDrop = (event) => {
    event.preventDefault();
    event.stopPropagation();
    var data = event.dataTransfer.getData("text");

    if (data) {
      handleColumn(data);

      event.dataTransfer.clearData();
    }
  };

  const handleDragLeave = (event) => {
    event.preventDefault();
    event.stopPropagation();
    let parentId = event.target.id;
    let childId = draggedItem;

    if (
      childId &&
      document.getElementById(childId) &&
      draggedItem.startsWith(namespace)
    ) {
      let childIdText = document.getElementById(childId).textContent;
      if (axisModification) {
        childIdText = childIdText.replace(axisModification, "");
        childIdText = childIdText.replace("(", "");
        childIdText = childIdText.replace(")", "");
      }
      if (childIdText === selectedColumn) {
        handleColumn();
      }
    }
  };

  return (
    <>
      <div className="axisLabel">{axisLabel}</div>
      <div
        id="columnDragArea"
        className="dragArea"
        onDragOver={(e) => handleDragOver(e)}
        onDrop={(e) => handleDrop(e)}
        onDragLeave={(e) => handleDragLeave(e)}
      >
        {selectedColumn ? (
          <AxisColumnSelector
            selectedColumn={selectedColumn}
            handleDraggedItem={handleDraggedItem}
            modifications={modifications}
            namespace={namespace}
            handleModification={handleModification}
            axisModification={axisModification}
          />
        ) : null}
      </div>
    </>
  );
}
