import React, { useState, useEffect, useRef } from "react";
import UseOutsideAlerter from "../../../Functions/clickOutside.js";

import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import ExpandLessIcon from "@material-ui/icons/ExpandLess";

//this is the virtualised component. drop down will break if too many html items are added to the DOM so only those that the user can see are added
import VirtualScroller from "./VirtualScroller";

export default function DistinctValueSelector({
  column,
  handleDraggedItem,
  namespace,
  filter,
  handleFilterSelectAll,
  handleSelect,
  ...rest
}) {
  const [showFilters, setshowFilters] = useState(false);
  const [selectorClass, setSelectorClass] = useState("axisDraggableColumn");
  const [arrow, setArrow] = useState(<ExpandMoreIcon />);

  const [selectAll, setSelectAll] = useState(true);

  const FilterDropDown = useRef(null);

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

  //selects or deselects all objects depending on whether the select all check box is clicked
  const handleSelectAll = (event) => {
    setSelectAll(event.target.checked);

    handleFilterSelectAll(column, event.target.checked);
  };

  //settings for virtualised component
  const SETTINGS = {
    itemHeight: 20,
    amount: 8,
    tolerance: 5,
    minIndex: 0,
    maxIndex: filter.length - 1,
    startIndex: 1,
  };

  // getData function for virtualised list
  const getData = (dataframe, offset, limit) => {
    const data = [];
    const start = Math.max(SETTINGS.minIndex, offset);
    const end = Math.min(offset + limit - 1, SETTINGS.maxIndex);

    if (start <= end) {
      for (let i = start; i <= end; i++) {
        data.push({
          index: dataframe[i].index,
          value: dataframe[i].value,
          selected: dataframe[i].selected,
        });
      }
    }
    return data;
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
        <div className="checkBoxWrapper">
          <label>
            <input
              key={"selectAll".concat(column)}
              type="checkbox"
              checked={selectAll}
              onChange={(event) => handleSelectAll(event)}
            />
            <span></span>
            select all
          </label>
        </div>
        <VirtualScroller
          className="viewport"
          get={getData}
          dataframe={filter}
          settings={SETTINGS}
          namespace={column.concat(namespace)}
          handleSelect={handleSelect}
          column={column}
        />
      </div>
    </div>
  );
}
