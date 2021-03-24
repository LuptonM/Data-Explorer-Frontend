import React, { useState, useEffect } from "react";
import { ReactComponent as SearchIcon } from "../icons/searchIcon.svg";

export default function SearchBar({ onChange }) {
  const handleSearchTerm = (event) => {
    onChange(event.target.value);
  };

  return (
    <div className="searchWrapper">
      <div className="searchInput">
        <input
          type="text"
          autoComplete="off"
          placeholder="search"
          id="search"
          onChange={(event) => handleSearchTerm(event)}
        />
      </div>
      <div className="searchIconWrapper">
        <SearchIcon />
      </div>
    </div>
  );
}
