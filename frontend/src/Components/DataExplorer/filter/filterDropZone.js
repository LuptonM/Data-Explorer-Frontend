import React, { useState, useEffect } from "react";
import { ReactComponent as FilterIcon } from "../icons/filter.svg";
import DistinctValueSelector from "./distinctFilter.js";
import NumericFilter from "./numericFilter.js";

export default function FilterDropZone({
  filters,
  draggedItem,
  removeFilter,
  handleDraggedItem,
  namespace,
  handleAddFilter,
  handleFilterSelectAll,
  handleSelect,
  handleNumericFilter,
}) {
  const handleDragOver = (event) => {
    event.preventDefault();
    event.stopPropagation();
  };

  const handleDrop = (event) => {
    event.preventDefault();
    event.stopPropagation();
    var columnName = event.dataTransfer.getData("text");

    if (columnName) {
      handleAddFilter(columnName);

      event.dataTransfer.clearData();
    }
  };

  const handleDragLeave = (event) => {
    event.preventDefault();
    event.stopPropagation();
    let parentId = event.target.id;

    if (draggedItem.startsWith(namespace)) {
      let childColumnName = draggedItem.replace(namespace, "");

      if (
        filters.some(function (o) {
          return o["column"] === childColumnName;
        })
      ) {
        removeFilter(childColumnName);
      }
    }
  };

  const renderFilters = () => {
    return filters.map((filterItem, index, column, type, filter) => {
      if (filterItem.type === "distinct") {
        return (
          <div style={{ paddingBottom: "4px" }}>
            <DistinctValueSelector
              key={index}
              column={column}
              namespace={namespace}
              filter={filter}
              handleFilterSelectAll={handleFilterSelectAll}
              handleSelect={handleSelect}
              handleDraggedItem={handleDraggedItem}
              {...filterItem}
            />
          </div>
        );
      } else if (filterItem.type === "numeric") {
        return (
          <div style={{ paddingBottom: "4px" }}>
            <NumericFilter
              key={index}
              column={column}
              namespace={namespace}
              filter={filter}
              handleDraggedItem={handleDraggedItem}
			  handleNumericFilter={handleNumericFilter}
              {...filterItem}
            />
          </div>
        );
      }
    });
  };

  return (
    <div className="filterDropZone">
      <div className="filterIconWrapper">
        <FilterIcon className="filterIcon" />
      </div>
      <div
        id="filterDropZoneInnerDiv"
        className="filterDropZoneInnerDiv"
        onDragOver={(e) => handleDragOver(e)}
        onDrop={(e) => handleDrop(e)}
        onDragLeave={(e) => handleDragLeave(e)}
      >
        <ul>{renderFilters()}</ul>
      </div>
    </div>
  );
}
