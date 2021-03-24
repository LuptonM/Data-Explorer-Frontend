import React, { useState, useEffect } from "react";
import axios from "axios";
import "./pagination.scss";

function range(start, count) {
  return Array.apply(0, Array(count)).map((element, index) => index + start);
}

function getNeighbours(currentPage, pageNeighboursSize, totalPages) {
  
 
  //determine start page
  let startPage;
  //for changing neighbours
  for (
    var i = currentPage;
    i >= currentPage - pageNeighboursSize && i > 0;
    i--
  ) {
    startPage = i;
  }

 
  //determine end page
  let endPage;
  //for changing neighbours
  for (
    var i = currentPage;
    i <= currentPage + pageNeighboursSize && i <= totalPages;
    i++
  ) {
    endPage = i;
  }
  
  let pageNos = range(startPage, endPage - startPage + 1);

  return pageNos;
}

export default function Pagination({
  totalRecords,
  pageSize,
  pageNeighboursSize,
  handlePagination,
}) {
  const [totalPages, setTotalPages] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageOptions, setPageOptions] = useState([1]);


    useEffect(() => {
	if(pageSize){
	
	let newTotalPages=Math.ceil(totalRecords / pageSize)
     setTotalPages(newTotalPages)
	 
	 }
	
  }, []);

  
  // listens to number of records and page size to determine total number of pages
  useEffect(() => {
    if (totalRecords & pageSize) {
	let newTotalPages=Math.ceil(totalRecords / pageSize)
      setTotalPages(newTotalPages);
   }
  }, [totalRecords, pageSize]);

  //listens to the current page and pageSize to determine page Neightbours
  useEffect(() => {
    setPageOptions(getNeighbours(currentPage, pageNeighboursSize, totalPages));

    //call to parent component to change data displayed
    handlePagination(currentPage, pageSize);
  }, [currentPage, pageSize]);

  const handleSelectPage = (event) => {
    event.stopPropagation();
    let pageNo = event.currentTarget.textContent;

    let newPageNo = currentPage;
    if (pageNo === "<<") {
      setCurrentPage(1);
    } else if (pageNo === "<") {
      newPageNo = newPageNo > 1 ? newPageNo - 1 : 1;

      setCurrentPage(newPageNo);
    } else if (pageNo === ">") {
      newPageNo = newPageNo < totalPages ? newPageNo + 1 : totalPages;

      setCurrentPage(newPageNo);
    } else if (pageNo === ">>") {
      setCurrentPage(totalPages);
    } else {
      setCurrentPage(parseInt(pageNo));
    }
  };

  return (
    <>
      <div className="pagination">
        <a
          className="pagination-item"
          onClick={(event) => handleSelectPage(event)}
        >
          &lt;&lt;
        </a>
        <a
          className="pagination-item"
          onClick={(event) => handleSelectPage(event)}
        >
          &lt;
        </a>
        {pageOptions.map((item) => {
          return (
            <a
              className={
                item === currentPage
                  ? "pagination-item active"
                  : "pagination-item"
              }
              key={item}
              onClick={(event) => handleSelectPage(event)}
            >
              {item}
            </a>
          );
        })}
        <a
          className="pagination-item"
          onClick={(event) => handleSelectPage(event)}
        >
          &gt;
        </a>
        <a
          className="pagination-item"
          onClick={(event) => handleSelectPage(event)}
        >
          &gt;&gt;
        </a>
      </div>
    </>
  );
}
