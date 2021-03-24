import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import ExpandLessIcon from "@material-ui/icons/ExpandLess";

function useOutsideAlerter(ref, i, handleToggle) {
  useEffect(() => {
    /**
     * Alert if clicked on outside of element
     */
    function handleClickOutside(event) {
      if (ref.current && !ref.current.contains(event.target)) {
        handleToggle(i);
      }
    }

    // Bind the event listener
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      // Unbind the event listener on clean up
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [ref]);
}

export default function ColumnConfigItem({
  i,
  type,
  column,
  arrow,
  handleShowTypes,
  handleType,
  showTypes,
  lastItem,

  ...rest
}) {
  const dataTypes = [
    "object",
    "int64",
    "float64",
    "bool",
    "datetime64",
    "category",
  ];
  const handleClick = (i) => {
    handleShowTypes(i);
  };

  const handleSelect = (event, i) => {
    event.stopPropagation();
    let newType = event.currentTarget.textContent;

    handleType(i, newType, handleType);
  };

  const wrapperRef = useRef(null);
  useOutsideAlerter(wrapperRef, i, handleShowTypes);

  //removed drop down content for now

  //<span className="arrow" onClick={() => handleClick(i)}>
  //      {" "}
  //     {arrow}
  //   </span>
  //  </div>
  //{showTypes ? (
  // <div key={i} className="dropDown" ref={wrapperRef}>
  // {dataTypes.map((item, j) => {
  //  return (
  //   <div className="dropDownWrapper" key={j}>
  //    {" "}
  // <p key={item} onClick={(event) => handleSelect(event, i)}>
  // {item}
  // </p>
  // </div>
  // );
  // })}

  return (
    <>
      <th>
        <div className="headerContents">
          <span className="tableColumnLabel">
            {column} ({type})
          </span>
        </div>
      </th>
    </>
  );
}
