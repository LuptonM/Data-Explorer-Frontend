// JavaScript source code
import React, { useState, useEffect } from "react";
import "./dataExplorer.css";
import AxisDropZone from "./axisDraggableArea.js";
import FilterDropZone from "./filter/filterDropZone.js";
import DraggableColumnList from "./ColumnList/draggableColumnList.js";
import SearchBar from "./search/search.js";
import ColourDropZone from "./colour/colourDropZone.js";
import SizeDropZone from "./size/size.js";
import Tabs from "./Navigation/navigation.js";
import GraphTitle from "./Title/title.js";
import AxisLabel from "./AxisLabels/axisLabel.js";
import GraphSideBar from "./graphSideBar/graphSideBar.js";
import GraphMaker from "./graphs/graphMaker.js";

const minMaxValues = (data, column) => {
  let min;
  let max;

  data.map((row, i) => {
    if (i === 0) {
      min = row[column];
      max = row[column];
    } else {
      min = row[column] < min ? row[column] : min;
      max = row[column] > max ? row[column] : max;
    }
  });

  return { minValue: min, maxValue: max, minSelected: min, maxSelected: max };
};

const changeMinMax=(filter, value, boundary)=>{

let newFilter=filter;

if(boundary==="min"){

newFilter.minSelected=value;

return(newFilter)


}else if(boundary==="max"){

newFilter.maxSelected=value;

return(newFilter)

}else{

return filter
}

}


const determineFilterSettings = (type, data, column) => {
  if (type === "distinct") {
    return uniqueFilter(data, column);
  } else if (type === "numeric") {
    return minMaxValues(data, column);
  }
};

const determineFilterType = (dataTypes, column) => {
  let type;

  dataTypes.map((row) => {
    if (row.column === column) {
      type = row.type;
    }
  });

  if (type === "float64" || type === "int64") {
    return "numeric";
  } else if (type === "datetime64") {
    return "datetime";
  } else {
    return "distinct";
  }
};

//function that removes an item from an array
const removeItemFromArray = (item, array) => {
  var index = array.indexOf(item);
  if (index !== -1) {
    array.splice(index, 1);
  }
  return array;
};

//function that handles making all items selected or not in an array
const selectAllFilter = (filterArray, selectAllBoll) => {
  let newFilterArray = [];

  filterArray.map((row) => {
    newFilterArray.push({
      index: row.index,
      value: row.value,
      selected: selectAllBoll,
    });
  });

  return newFilterArray;
};
//creates a list of distinct filters
const uniqueFilter = (data, column) => {
  var unique = [];
  var distinctFilter = [];
  for (let i = 0; i < data.length; i++) {
    if (!unique[data[i][column]]) {
      distinctFilter.push({ index: i, value: data[i][column], selected: true });
      unique[data[i][column]] = 1;
    }
  }
  return distinctFilter;
};
//mutates a filter array at a certain value to make it selected or not
const changeItemSelection = (filterArray, value, selectBool) => {
  let newFilterArray = [];

  filterArray.map((row) => {
    if (row.value !== value) {
      newFilterArray.push({
        index: row.index,
        value: row.value,
        selected: row.selected,
      });
    } else {
      newFilterArray.push({
        index: row.index,
        value: row.value,
        selected: selectBool,
      });
    }
  });
  return newFilterArray;
};
//filters the data for one filter
const filterData = (data, filter) => {
  let filteredData = [];

  if (filter.type === "distinct") {
    let validValues = [];

    filter.filter.map((row) => {
      if (row.selected) {
        validValues.push(row.value);
      }
    });
    if (validValues.length) {
      let column = filter.column;

      data.map((row) => {
        if (validValues.includes(row[column])) {
          filteredData.push(row);
        }
      });
    } 
  } else if (filter.type === "numeric") {
    filteredData = data
      .filter((data) => data[filter.column] >= filter.filter.minSelected)
      .filter((data) => data[filter.column] <= filter.filter.maxSelected);
  }

  return filteredData;
};
//itterates through the filters and filters the data
const createFilteredData = (data, filters) => {
  let filteredData = [];

  filters.map((filter, i) => {
    if (i < 1) {
      filteredData = filterData(data, filter);
    } else {
      filteredData = filterData(filteredData, filter);
    }
  });

  return filteredData;
};



export default function DataExplorer({ data, filename, dataTypes }) {
  const [columns, setColumns] = useState([]);
  const [childToRemove, setChildToRemove] = useState();
  const [draggedItem, setDraggedItem] = useState();
  const [xaxisColumn, setXaxisColumn] = useState();
  const [yaxisColumn, setYaxisColumn] = useState();
  const [xaxisModification, setXaxisModification] = useState("");
  const [yaxisModification, setYaxisModification] = useState("Sum");
  const [searchTerm, setSearchTerm] = useState();
  const [colourColumn, setColourColumn] = useState();
  const [sizeColumn, setSizeColumn] = useState();
  const [filters, setFilters] = useState([]);
  const [title, setTitle] = useState();
  const [xaxisLabel, setXaxisLabel] = useState();
  const [yaxisLabel, setYaxisLabel] = useState();
  const [graphType, setGraphType] = useState();
  const [filteredData, setFilteredData] = useState(data);
  useEffect(() => {
    if (data) {
      if (data.length > 0) {
        setColumns(Object.keys(data[0]));
      }
    }
  }, [data]);

  const handleGraphTitle = (newTitle) => {
    setTitle(newTitle);
  };

  const handleXaxisLabel = (newLabel) => {
    setXaxisLabel(newLabel);
  };

  const handleYaxisLabel = (newLabel) => {
    setYaxisLabel(newLabel);
  };

  const handleDraggedItem = (childId) => {
    setDraggedItem(childId);
  };

  const handleXaxisColumn = (newColumn) => {
    setXaxisColumn(newColumn);
  };
  const handleYaxisColumn = (newColumn) => {
    setYaxisColumn(newColumn);
  };

  const handleColourColumn = (newColumn) => {
    setColourColumn(newColumn);
  };

  const handleSizeColumn = (newColumn) => {
    setSizeColumn(newColumn);
  };

  const handleYaxisModification = (newModification) => {
    if (newModification === "None") {
      setYaxisModification();
    } else {
      setYaxisModification(newModification);
    }
  };
  const handleXaxisModification = (newModification) => {
    setXaxisModification(newModification);
  };

  const handleSearchChange = (newTerm) => {
    setSearchTerm(newTerm);
  };

  const handleRemoveFilter = (columnToRemove) => {
    if (columnToRemove) {
      let newFilters = [];

      filters.map((filter) => {
        if (filter.column !== columnToRemove) {
          newFilters.push(filter);
        }
      });

      setFilters(newFilters);
    }
  };

  const handleAddFilter = (columnName) => {
    let newFilters = [];

    filters.map((filter) => newFilters.push(filter));
    if (
      !newFilters.some(function (o) {
        return o["column"] === columnName;
      })
    ) {
      let filterType = determineFilterType(dataTypes, columnName);

      let newFilter = {
        column: columnName,
        type: filterType,
        filter: determineFilterSettings(filterType, data, columnName),
      };

      newFilters.push(newFilter);

      setFilters(newFilters);
    }
  };

  const handleGraphType = (type) => {
    setGraphType(type);
  };

  const handleFilterSelectAll = (columnName, selectAllBool) => {
    let filterCopy = [];

    filters.map((filter, i) => {
      if (filter.column !== columnName) {
        filterCopy.push(filter);
      } else if (filter.column === columnName) {
        filterCopy.push({
          column: filter.column,
          type: filter.type,
          filter: selectAllFilter(filter.filter, selectAllBool),
        });
      }
    });

    setFilters(filterCopy);
  };
  //handles the selecting of one item in a filter
  const handleSelect = (columnName, index, value, selectBool) => {
    let filterCopy = [];

    filters.map((filter, i) => {
      if (filter.column !== columnName) {
        filterCopy.push(filter);
      } else if (filter.column === columnName) {
        filterCopy.push({
          column: filter.column,
          type: filter.type,
          filter: changeItemSelection(filter.filter, value, selectBool),
        });
      }
    });

    setFilters(filterCopy);
  };

  //reacts to changes in min/max of numeric filters
  const handleNumericFilter=(columnName, value,boundary )=>{
   let filterCopy = [];

    filters.map((filter, i) => {
      if (filter.column !== columnName) {
        filterCopy.push(filter);
      } else if (filter.column === columnName) {
	  
        filterCopy.push({
          column: filter.column,
          type: filter.type,
          filter: changeMinMax(filter.filter, value, boundary),
        });
		
      }
    });
	console.log(filterCopy)
    setFilters(filterCopy);



  }

  //makes the filtered data - listens to the filter state
  useEffect(() => {
    if (filters.length) {
      setFilteredData(createFilteredData(data, filters));
    } else {
      setFilteredData(data);
    }
  }, [filters]);

  return (
    <div className="data-explorer-container">
      <div className="Data">
        <div className="navigation-container" id="navigation-container">
          <div className="Navigation">
            <Tabs />
          </div>
          <div className="dataTabWrapper" id="dataTabWrapper">
            <div className="Search-Filter">
              <SearchBar onChange={handleSearchChange} />
            </div>
            <div className="Draggable-Columns">
              <DraggableColumnList
                columns={columns}
                handleDraggedItem={handleDraggedItem}
                searchTerm={searchTerm}
              />
            </div>
            <div className="Colours">
              <ColourDropZone
                draggedItem={draggedItem}
                handleColourColumn={handleColourColumn}
                selectedColumn={colourColumn}
                handleDraggedItem={handleDraggedItem}
                namespace="colour"
              />
            </div>
            <div className="Size">
              <SizeDropZone
                draggedItem={draggedItem}
                handleSizeColumn={handleSizeColumn}
                selectedColumn={sizeColumn}
                handleDraggedItem={handleDraggedItem}
                namespace="size"
              />
            </div>
            <div className="Shapes"></div>
          </div>
          <div className="graphTabWrapper" id="graphTabWrapper">
            <div className="GraphSelect"></div>
            <div className="AdditionalGraphOptions">
              Placeholder for additional options such as axis ticks etc...
            </div>
          </div>
        </div>
      </div>
      <div className="Graph-Area">
        <div className="Axis-graph-wrapper">
          <div className="Axis-areas">
            <div className="axis-filter-wrapper">
              <div className="FilterZone">
                <FilterDropZone
                  filters={filters}
                  draggedItem={draggedItem}
                  handleAddFilter={handleAddFilter}
                  removeFilter={handleRemoveFilter}
                  handleDraggedItem={handleDraggedItem}
                  namespace="filter"
                  handleFilterSelectAll={handleFilterSelectAll}
                  handleSelect={handleSelect}
				  handleNumericFilter={handleNumericFilter}
                />
              </div>
              <div className="AxisZone">
                <div className="axis-wrapper">
                  <div className="XaxisZone">
                    <AxisDropZone
                      handleDraggedItem={handleDraggedItem}
                      draggedItem={draggedItem}
                      selectedColumn={xaxisColumn}
                      handleColumn={handleXaxisColumn}
                      modifications={false}
                      namespace="xaxis"
                      handleModification={handleXaxisModification}
                      axisModification={xaxisModification}
                      axisLabel="x-axis"
                    />
                  </div>
                  <div className="YaxisZone">
                    <AxisDropZone
                      handleDraggedItem={handleDraggedItem}
                      draggedItem={draggedItem}
                      selectedColumn={yaxisColumn}
                      handleColumn={handleYaxisColumn}
                      modifications={true}
                      namespace="yaxis"
                      handleModification={handleYaxisModification}
                      axisModification={yaxisModification}
                      axisLabel="y-axis"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="Graphing-area">
            <div className="graph-container">
			<div id="YaxisContainer" className="YaxisContainer">
			<div className="Yaxis-Label" id="Yaxis-Label">
                <AxisLabel
                  id="yaxisLabel"
                  placeholder="Yaxis"
                  handleLabel={handleYaxisLabel}
                />
              </div>
			  </div>
              <div className="Graph-Title">
                <GraphTitle handleGraphTitle={handleGraphTitle} />
              </div>
              <div className="Xaxis-Label">
                <AxisLabel
                  id="xaxisLabel"
                  placeholder="Xaxis"
                  handleLabel={handleXaxisLabel}
                />
              </div>
              <div className="Graph">
                <GraphMaker
                  graphType={graphType}
                  data={filters.length ? filteredData : data}
                  xaxis={xaxisColumn}
                  yaxis={yaxisColumn}
                  yaxisModification={yaxisModification}
                  colourColumn={colourColumn}
                  sizeColumn={sizeColumn}
                />
              </div>
            </div>
          </div>
          <GraphSideBar handleGraphType={handleGraphType} />
        </div>
      </div>
    </div>
  );
}
