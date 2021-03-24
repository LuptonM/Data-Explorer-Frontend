import React, { useState, useEffect } from "react";

import DragableColumn from "./dragableColumn.js";

const searchTermInArray = ({ searchTerm, string }) => {
  if (searchTerm) {
    if (string.includes(searchTerm)) {
      return true;
    } else {
      return false;
    }
  } else {
    return true;
  }
};

export default function DraggableColumnList({
  columns,
  handleDraggedItem,
  searchTerm,
}) {
  const [filteredColumns, setFilteredColumns] = useState(columns);

  useEffect(() => {
    if (searchTerm) {
      let matchingColumns = [];
      columns.map((column) => {
        if (column.toLowerCase().includes(searchTerm.toLowerCase())) {
          matchingColumns.push(column);
        }
      });

      setFilteredColumns(matchingColumns);
    } else {
      setFilteredColumns(columns);
    }
  }, [columns, searchTerm]);

  return (
    <>
      <ul>
        {filteredColumns
          ? filteredColumns.map((column) => {
              return (
                <DragableColumn
                  key={column}
                  id={"draggable".concat(column)}
                  column={column}
                  handleDraggedItem={handleDraggedItem}
                />
              );
            })
          : null}
      </ul>
    </>
  );
}
