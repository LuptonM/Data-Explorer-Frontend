import React, { useState, useEffect, useRef } from "react";
import UseOutsideAlerter from "../../../Functions/clickOutside.js";
import NumericInput from 'react-numeric-input';
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import ExpandLessIcon from "@material-ui/icons/ExpandLess";

export default function NumericFilter({
  column,
  handleDraggedItem,
  namespace,
  filter,
  handleNumericFilter,

  ...rest
}) {
  const [showFilters, setshowFilters] = useState(false);
  const [selectorClass, setSelectorClass] = useState("axisDraggableColumn");
  const [arrow, setArrow] = useState(<ExpandMoreIcon />);
  const [minValue, setMinValue] =useState(filter.minValue)
  const [maxValue, setMaxValue] =useState(filter.maxValue)
  const FilterDropDown = useRef(null);

  //handle value updates

 const  handleMax=(value)=> {
    setMaxValue(value)
	handleNumericFilter(column,value, "max")
  }

  const  handleMin=(value)=> {
    setMinValue(value)
	handleNumericFilter(column,value, "min")
  }

  ///show/hide filter drop down
  const handleShowFilters = (currentState) => {
    if (currentState) {
      setshowFilters(false);
      setArrow(<ExpandMoreIcon />);
      setSelectorClass("axisDraggableColumn");
    } else {
      setshowFilters(true);
      setArrow(<ExpandLessIcon />);
      setSelectorClass("axisDraggableColumn-active");

      //need to edit css position of drop down so it can overcome the overflow of its parent

      let buttonWrapper = document.getElementById(
        namespace.concat(column).concat("wrapper")
      );
      let parentWidth = buttonWrapper.offsetWidth - 2;
      let scrollPosition = document.getElementById("filterDropZoneInnerDiv")
        .scrollTop;
      let parentBottom =
        buttonWrapper.offsetTop + buttonWrapper.offsetHeight - scrollPosition;
      let dropDownChild = document.getElementById(
        namespace.concat(column).concat("dropDown")
      );

      dropDownChild.style.width = parentWidth.toString().concat("px");

      dropDownChild.style.top = parentBottom.toString().concat("px");
    }
  };

  ///so when you click outside of the drop down it closes
  UseOutsideAlerter(FilterDropDown, true, handleShowFilters);
  const handleDragStart = (event, column) => {
    handleDraggedItem(namespace.concat(column));
  };

  return (
    <div
      id={namespace.concat(column).concat("wrapper")}
      className="filterDraggableColumnWrapper"
      draggable="true"
      onDragStart={(event) => handleDragStart(event, column)}
    >
      <div className={selectorClass}>
        <div className="columnName">{column}</div>
        <div className="Arrow" onClick={() => handleShowFilters(showFilters)}>
          {arrow}
        </div>
      </div>

      <div
        id={namespace.concat(column).concat("dropDown")}
        className={showFilters ? "FilterDropDown" : "FilterDropDown-hidden"}
        ref={FilterDropDown}
      >
        <div className="numericWrapper">
         
          <NumericInput className="num" value={minValue} min={filter.minValue} max={filter.maxValue} onChange={(value)=>handleMin(value)} />
          <div className="toWrapper">to</div>
		  <NumericInput className="num" value={maxValue} min={filter.minValue} max={filter.maxValue} onChange={(value)=>handleMax(value)}  />
        </div>
      </div>
    </div>
  );
}
