import React, { useState, useEffect } from "react";
import UploadDataPage from "./Components/UploadData/uploadDataPage.js";
import SideBar from "./Components/Sidebar/sidebar.js";

import AppCurrentWidth from "./Functions/getWidth.js";
import items from "./menuItems.js";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import axios from "axios";
import DataTable from "./Components/DataTable/customTable.js";
import GraphSideBar from "./Components/DataExplorer/graphSideBar/graphSideBar.js";

import DataExplorer from "./Components/DataExplorer/dataExplorer.js";
import { Provider } from "react-redux";

export default function App() {
  let width = AppCurrentWidth();
  const mobileWidth = 1000;
  const [containerClass, setContainerClass] = useState("app-container");
  const [sidebarClass, setSidebarClass] = useState("sidebar-toggle-open");
  const [mobile, setMobile] = useState(false);
  const [filename, setFile] = useState();
  const [columns, setColumns] = useState();
  const [dataTypes, setTypes] = useState([]);
  const [data, setData] = useState([]);

  const handleFileChange = (newValue) => {
    setFile(newValue);
  };

  const handleGridWidth = () => {
    if (containerClass == "app-container-hidden") {
      setContainerClass("app-container");
      setSidebarClass("sidebar-toggle-open");
    } else {
      setContainerClass("app-container-hidden");
      setSidebarClass("sidebar-toggle-closed");
    }
  };

  useEffect(() => {
    width < mobileWidth ? setMobile(true) : setMobile(false);
  }, [width]);

  useEffect(() => {
   
    axios.get(`https://datavizualisaton.herokuapp.com/`)
      .then(res => {
        console.log(res.data);
      })
  }, []);

  useEffect(() => {
    if (filename) {
      const data_response = axios
        .post("https://datavizualisaton.herokuapp.com/data", {
          filename: filename,
        })
        .then((response) => {
          console.log(response.data);
          setData(response.data.data);

          let newTypes = response.data.types;
          let arrayTypes = [];
          Object.entries(newTypes).map(([key, value]) => {
            arrayTypes.push({ column: key, type: value });
          });

          setTypes(arrayTypes);
        });
    }
  }, [filename]);

  return (
    //<Provider store={store}>
    <div className={containerClass}>
      <SideBar
        items={items}
        handleGridWidth={handleGridWidth}
        isMobile={mobile}
        sidebarClass={sidebarClass}
      />

      <div className="content">
        <Switch>
          <Route exact path="/">
            <UploadDataPage
              filename={filename}
              handleFileChange={handleFileChange}
            />
          </Route>
          <Route exact path="/data">
            <DataTable dataTypes={dataTypes} filename={filename} data={data} />
          </Route>

          <Route exact path="/data_explorer">
            <DataExplorer
              data={data}
              filename={filename}
              dataTypes={dataTypes}
            />
          </Route>
        </Switch>
      </div>
    </div>

    // </Provider>
  );
}
