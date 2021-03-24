import React, { useState, useEffect, useRef } from "react";
import Chart from "chart.js";
import axios from "axios";
export default function BarChart({
  xaxis,
  yaxis,
  xaxisModification,
  yaxisModification,
  filename,
}) {
  const chartRef = useRef();
  const graphType = "Bar Graph";

  const myChart = useRef();

  useEffect(() => {
    myChart.current = new Chart(chartRef.current, {
      type: "bar",
      data: {
        labels: ["Red", "Blue", "Yellow", "Green", "Purple", "Orange"],
        datasets: [
          {
            label: "# of Votes",
            data: [12, 19, 3, 5, 2, 3],
            backgroundColor: [
              "rgba(255, 99, 132, 0.2)",
              "rgba(54, 162, 235, 0.2)",
              "rgba(255, 206, 86, 0.2)",
              "rgba(75, 192, 192, 0.2)",
              "rgba(153, 102, 255, 0.2)",
              "rgba(255, 159, 64, 0.2)",
            ],
            borderColor: [
              "rgba(255, 99, 132, 1)",
              "rgba(54, 162, 235, 1)",
              "rgba(255, 206, 86, 1)",
              "rgba(75, 192, 192, 1)",
              "rgba(153, 102, 255, 1)",
              "rgba(255, 159, 64, 1)",
            ],
            borderWidth: 1,
          },
        ],
      },
      options: {
        scales: {
          yAxes: [
            {
              ticks: {
                beginAtZero: true,
              },
            },
          ],
        },
      },
    });
  }, []);

  useEffect(() => {
    if (xaxis && yaxis) {
      const chart_response = axios
        .post("http://127.0.0.1:5000/graph", {
          filename: filename,
          x_axis: xaxis,
          y_axis: yaxis,
          graphType: graphType,
          x_axisModification: xaxisModification,
          y_axisModification: yaxisModification,
        })
        .then((response) => {
          myChart.current.data.labels = response.data.data_labels;
          myChart.current.data.datasets[0].data = response.data.chart_data;
          myChart.current.update();
        });
    }
  }, [xaxis, yaxis, xaxisModification, yaxisModification]);

  return <canvas ref={chartRef} />;
}
