import React, { useState, useEffect } from "react";
import axios from "axios";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import ExpandLessIcon from "@material-ui/icons/ExpandLess";
import ColumnConfigItem from "./columnConfigItem.js";
import TableBody from "./tableBody.js";
import "./table.css";

import HelpIcon from "@material-ui/icons/Help";
import Pagination from "../Pagination/pagination.js";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

function TableHeader(dataTypes) {
  const [columnConfig, setConfig] = useState();

  useEffect(() => {
    let newTypes = [];

    dataTypes.dataTypes.map((item) => {
      newTypes.push({
        column: item.column,
        type: item.type,
        arrow: <ExpandMoreIcon />,
        showTypes: false,
      });
    });

    setConfig(newTypes);
  }, [dataTypes]);

  const handleShowTypes = (id) => {
    let newConfig = [];
    let newColumnConfig = columnConfig;

    newColumnConfig.map((column, i) => {
      if (i === id) {
        if (column.showTypes) {
          column.showTypes = false;
          column.arrow = <ExpandMoreIcon />;
        } else {
          column.showTypes = true;
          column.arrow = <ExpandLessIcon />;
        }
      }
      newConfig.push(column);
    });

    setConfig(newConfig);
  };

  const handleType = (id, newType) => {
    let newConfig = [];
    let newColumnConfig = columnConfig;

    newColumnConfig.map((column, i) => {
      if (i === id) {
        column.showTypes = false;
        column.arrow = <ExpandMoreIcon />;
        column.type = newType;
      }
      newConfig.push(column);
    });

    setConfig(newConfig);
  };

  return (
    <>
      <tr className="table-headers">
        {columnConfig
          ? columnConfig.map(
              (columnItem, i, column, type, arrow, showTypes) => (
                <ColumnConfigItem
                  key={i}
                  i={i}
                  type={type}
                  column={column}
                  arrow={arrow}
                  handleShowTypes={handleShowTypes}
                  handleType={handleType}
                  showTypes={showTypes}
                  lastItem={columnConfig.length - 1}
                  {...columnItem}
                />
              )
            )
          : null}
      </tr>
    </>
  );
}

export default function DataTable({ filename, dataTypes, data }) {
  const [pageSize, setPageSize] = useState(5);
  
  const [startingIndex, setStartingIndex] = useState(0);

  const handlePagination = (selectedPage, pageSize) => {
    let startIndex = pageSize * (selectedPage - 1);

    setStartingIndex(startIndex);
  };

  

  return (
    <>
      {data.length > 0 ? (
        <>
          <div className="customTable">
            <br />
            <p style={{ paddingLeft: "10px" }}>Data Preview</p>

            <div className="tableWrapper">
              <table className="styled-table">
                <tbody className="tableBody">
                  <TableHeader dataTypes={dataTypes} />
                  <TableBody
                    data={data.slice(startingIndex, startingIndex + pageSize)}
                  />
                </tbody>
              </table>
            </div>
            <Pagination
              totalRecords={data.length}
              pageSize={5}
              pageNeighboursSize={1}
              handlePagination={handlePagination}
            />
          </div>
        </>
      ) : (
        <>
          <div className="flexColumnWrapper">
            <div className="flexTextWrapper">
              <div className="button" style={{ display: "inline-block" }}>
                <Link style={{ textDecoration: "none", color: "white" }} to="/">
                  Please upload data first
                </Link>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
}
