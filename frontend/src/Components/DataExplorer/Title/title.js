import React, { useState, useEffect } from "react";

export default function GraphTitle({ handleGraphTitle }) {
  const handleTitle = (event) => {
    handleGraphTitle(event.target.value);
  };

  return (
    <input
      type="text"
      autoComplete="off"
      placeholder="Title"
      className="graphTitle"
      id="graphTitle"
      onChange={(event) => handleTitle(event)}
    />
  );
}
