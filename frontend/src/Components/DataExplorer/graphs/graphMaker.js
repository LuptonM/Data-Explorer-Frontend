import React, { useEffect, useState } from "react";
import Chart from "chart.js";

import GenerateGraphData from "../../../Functions/generateGraphData.js";

const stackedBarOptions = {
  tooltips: {
    displayColors: true,
    callbacks: {
      mode: "x",
    },
  },
  scales: {
    xAxes: [
      {
        stacked: true,
        gridLines: {
          display: false,
        },
      },
    ],
    yAxes: [
      {
        stacked: true,
        ticks: {
          beginAtZero: true,
        },
        type: "linear",
      },
    ],
  },
  responsive: true,
  maintainAspectRatio: false,
  legend: { position: "top" },
};

const groupedBarOptions = {
  responsive: true,
  legend: {
    position: "top",
  },
  title: {
    display: true,
    text: "Chart.js Bar Chart",
  },
  scales: {
    yAxes: [
      {
        ticks: {
          beginAtZero: true,
        },
      },
    ],
  },
};
const determineGraphType = (graphType) => {
  let type;
  if (graphType === "stackedBar" || graphType === "groupedBar") {
    type = "bar";
  } else {
    type = graphType;
  }
  return type;
};

const generateOptions = (graphType, colourColumn) => {
  let options = {};

  if (graphType === "stackedBar" && colourColumn) {
    options = stackedBarOptions;
  } else if (graphType === "stackedBar" && colourColumn) {
    options = groupedBarOptions;
  }
  return options;
};

export default function GraphMaker({
  graphType,
  data,
  xaxis,
  yaxis,
  yaxisModification,
  colourColumn,
  sizeColumn,
}) {
  const [graphData, setGraphData] = useState([]);
  const [graphLabels, setGraphLabels] = useState([]);
  const [graphOptions, setGraphOptions] = useState();

  useEffect(() => {
    setGraphData(
      GenerateGraphData(
        graphType,
        data,
        xaxis,
        yaxis,
        yaxisModification,
        colourColumn,
        sizeColumn
      )
    );
  }, [
    graphType,
    data,
    xaxis,
    yaxis,
    yaxisModification,
    colourColumn,
    sizeColumn,
  ]);

  useEffect(() => {
    const ctx = document.getElementById("myChart");

    if (graphType) {
      var myChart = new Chart(ctx, {
        type: determineGraphType(graphType),
        data: graphData,
        options: generateOptions(graphType, colourColumn, sizeColumn),
      });

      return () => myChart.destroy();
    }
  }, [graphType, graphData]);

  return (
    <div className="chartContainer">
      <canvas id="myChart" />
    </div>
  );
}
