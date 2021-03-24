import UploadButton from "./UploadButton";
import "./uploadButton.css";
import React, { useState, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";

export default function UploadDataPage({ filename, handleFileChange }) {
  const history = useHistory();

  const changeFile = (newValue) => {
    console.log(newValue);
    handleFileChange(newValue);
  };

  const handlePressDemoData = () => {
    changeFile("iris.csv");
    history.push("/data");
  };

  return (
    <>
      <div className="flexColumnWrapper">
        <UploadButton
          filename={filename}
          onChange={changeFile}
          style={{ flex: 1 }}
        />

        <div className="flexTextWrapper">
          <p style={{ fontSize: "30px" }}>OR</p>
        </div>

        <div className="flexTextWrapper" style={{ alignItems: "flex-start" }}>
          <div className="button" onClick={handlePressDemoData}>
            Load Iris Data
          </div>
        </div>
      </div>
    </>
  );
}
