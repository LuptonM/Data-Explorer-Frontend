import React, { useState, useEffect } from "react";
import { ReactComponent as SizeIcon } from "../icons/sizeIcon.svg";
import SizeColumnSelector from "./sizeSelector.js";

export default function SizeDropZone({
  draggedItem,
  handleSizeColumn,
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
      handleSizeColumn(data);

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
        handleSizeColumn();
      }
    }
  };

  return (
    <div className="borderWrapper">
      <div className="sizeBorder">
        <div className="sizeDropZone">
          <div className="sizeIconWrapper">
            <SizeIcon />
          </div>
          <div
            className="sizeDropZoneInnerDiv"
            onDragOver={(e) => handleDragOver(e)}
            onDrop={(e) => handleDrop(e)}
            onDragLeave={(e) => handleDragLeave(e)}
          >
            {selectedColumn ? (
              <SizeColumnSelector
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
