import React, { useState, useEffect } from "react";

import YaxisCurrentPos from "../../../Functions/getYaxisPos.js";

export default function AxisLabel({ handleLabel, id, placeholder }) {
  const handleInput = (event) => {
    handleLabel(event.target.value);
  };

  const [xTransform, setXTransform]=useState(0);
   let width = YaxisCurrentPos();
  
    
   useEffect(() => {
   if(placeholder==="Yaxis"){
   let container = document.getElementById( "YaxisContainer");
 let containerRect = container.getBoundingClientRect();
 console.log(containerRect)

let label= document.getElementById("Yaxis-Label")
let labelRect = label.getBoundingClientRect();
let centerAdjustment= (containerRect.width - labelRect.width)/2
let leftDifference =containerRect.left - labelRect.left +centerAdjustment

let xCoord = xTransform + leftDifference

setXTransform(xCoord)
label.style.transform ="rotate(-90deg) translate(0px,".concat(xCoord).concat("px)")

let newPlacement=label.getBoundingClientRect()

console.log(newPlacement)

}
  },[width]);


  return (
    <input
      type="text"
      autoComplete="off"
      placeholder={placeholder}
      className={id}
      id={id}
      onChange={(event) => handleLabel(event)}
    />
  );
}
