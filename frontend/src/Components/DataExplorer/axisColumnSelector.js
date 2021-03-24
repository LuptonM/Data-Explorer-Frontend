import React, { useState, useEffect, useRef } from "react";

import UseOutsideAlerter from "../../Functions/clickOutside.js";

import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import ExpandLessIcon from "@material-ui/icons/ExpandLess";

export default function AxisColumnSelector({
  namespace,
  selectedColumn,
  handleDraggedItem,
  modifications,
  handleModification,
  axisModification,
}) {
  const [showModifications, setShowModifications] = useState(false);
  const [selectorClass, setSelectorClass] = useState("axisDraggableColumn");
  const [arrow, setArrow] = useState(<ExpandMoreIcon />);
  const availableModifications = ["Sum", "Mean", "Count"];

  const handleDragStart = (event, selectedColumn) => {
    event.dataTransfer.setData("text", selectedColumn);
    handleDraggedItem(event.target.id);
  };

  const handleShowModifications = (currentState) => {
    if (currentState) {
      setShowModifications(false);
      setArrow(<ExpandMoreIcon />);
      setSelectorClass("axisDraggableColumn");
    } else {
      setShowModifications(true);
      setArrow(<ExpandLessIcon />);
      setSelectorClass("axisDraggableColumn-active");
    }
  };

  const handleSelectingModification = (modification) => {
    if (modification === "None") {
      handleModification("");
    } else {
      handleModification(modification);
    }
    handleShowModifications(showModifications);
  };

  useEffect(() => {
    handleModification("");
  }, [selectedColumn]);

  useEffect(() => {}, [showModifications]);

  const AxisDropDown = useRef(null);
  UseOutsideAlerter(AxisDropDown, true, handleShowModifications);

  return (
    <div
      id={namespace.concat("-selectedColumnWrapper")}
      draggable="true"
      className="axisDraggableColumnWrapper"
      onDragStart={(event) => handleDragStart(event, selectedColumn)}
    >
      <div className={selectorClass}>
        <div className="columnName">
          {axisModification ? (
            <>
              {axisModification}({selectedColumn})
            </>
          ) : (
            selectedColumn
          )}
        </div>
        <div
          className="Arrow"
          onClick={
            modifications
              ? () => handleShowModifications(showModifications)
              : null
          }
        >
          {modifications ? arrow : null}
        </div>
      </div>

      {showModifications ? (
        <div className="AxisDropDown" ref={AxisDropDown}>
          {availableModifications.map((item) => {
            return (
              <a
                key={item}
                onClick={() => handleSelectingModification(item)}
                className="axisModification"
              >
                {item}
              </a>
            );
          })}
        </div>
      ) : null}
    </div>
  );
}
