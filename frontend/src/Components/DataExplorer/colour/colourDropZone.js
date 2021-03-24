import React, { useState, useEffect } from "react";
import { ReactComponent as ColourIcon } from "../icons/colourIcon.svg";
import ColourColumnSelector from "./colourColumnSelector.js";

export default function ColourDropZone({
  draggedItem,
  handleColourColumn,
  selectedColumn,
  handleDraggedItem,
  namespace,
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
      handleColourColumn(data);

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

      if (childIdText === selectedColumn) {
        handleColourColumn();
      }
    }
  };

  return (
    <div className="borderWrapper">
      <div className="dataBorder">
        <div className="colourDropZone">
          <div className="colourIconWrapper">
            <ColourIcon />
          </div>
          <div
            className="colourDropZoneInnerDiv"
            onDragOver={(e) => handleDragOver(e)}
            onDrop={(e) => handleDrop(e)}
            onDragLeave={(e) => handleDragLeave(e)}
          >
            {selectedColumn ? (
              <ColourColumnSelector
                selectedColumn={selectedColumn}
                handleDraggedItem={handleDraggedItem}
                namespace={namespace}
              />
            ) : null}
          </div>
        </div>
      </div>
    </div>
  );
}
