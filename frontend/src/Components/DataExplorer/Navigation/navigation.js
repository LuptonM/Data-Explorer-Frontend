import React, { useState, useEffect, useRef } from "react";

export default function Tabs() {
  const handleTab = (tab) => {
    if (tab === "graph") {
      var dataContent = document.getElementById("dataTabWrapper");
      dataContent.style.display = "none";

      var graphContent = document.getElementById("graphTabWrapper");
      graphContent.style.display = "grid";

      var navContainer = document.getElementById("navigation-container");
      navContainer.style.gridTemplateAreas =
        '"Navigation Navigation" "graphTabWrapper graphTabWrapper"';

      document.getElementById("DataTab").className = "DataTabInactive";
      document.getElementById("GraphTab").className = "GraphTab";
    } else {
      var dataContent = document.getElementById("dataTabWrapper");
      dataContent.style.display = "grid";

      var graphContent = document.getElementById("graphTabWrapper");
      graphContent.style.display = "none";

      var navContainer = document.getElementById("navigation-container");
      navContainer.style.gridTemplateAreas =
        '"Navigation Navigation" "dataTabWrapper dataTabWrapper"';
      document.getElementById("DataTab").className = "DataTab";
      document.getElementById("GraphTab").className = "GraphTabInactive";
    }
  };

  return (
    <div className="tab-container">
      <div
        className="DataTab"
        id="DataTab"
        onClick={() => handleTab("dataTabWrapper")}
      >
        Data
      </div>
      <div
        className="GraphTabInactive"
        id="GraphTab"
        onClick={() => handleTab("graph")}
      >
        Options
      </div>
    </div>
  );
}
