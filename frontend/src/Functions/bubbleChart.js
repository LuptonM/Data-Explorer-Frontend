import GroupBy from "./groupBy.js";
import UniqueValues from "./uniqueValues.js";
import PaletteMaker from "./coloursGenerator.js";

const simpleBubble = (
  data,

  xaxis,
  yaxis,
  sizeColumn,
  meanSize
) => {
  let graphData = [];

  data.map((row) => {
    let bubbleSize = sizeColumn ? (row[sizeColumn] * 10) / meanSize : 10;

    graphData.push({ x: row[xaxis], y: row[yaxis], r: bubbleSize });
  });

  return graphData;
};

const colourBubble = (
  data,

  xaxis,
  yaxis,
  colourColumn,
  sizeColumn,
  meanSize
) => {
  let graphData = [];
  let colourValues = UniqueValues(data, colourColumn);
  let backgroundColors = PaletteMaker(colourValues.length);

  colourValues.map((colour, i) => {
    //mapping data
    let colourData = [];
    data.map((row) => {
      if (row[colourColumn] === colour) {
        let bubbleSize = sizeColumn ? (row[sizeColumn] * 10) / meanSize : 10;

        colourData.push({ x: row[xaxis], y: row[yaxis], r: bubbleSize });
      }
    });
    //end of map data

    graphData.push({
      label: colour,
      data: colourData,
      backgroundColor: backgroundColors[i],
      hoverBackgroundColor: backgroundColors[i],
    });
  });
  return graphData;
};

const meanColumnAdjustment = (data, column) => {
  let sum = 0;

  data.map((row, i) => {
    if (row[column]) {
      sum += row[column];
    }
  });

  return sum / data.length;
};

export default function BubbleChart(
  data,
  xaxis,
  yaxis,
  yaxisModification,
  colourColumn,
  sizeColumn
) {
  const meanValue = sizeColumn ? meanColumnAdjustment(data, sizeColumn) : null;
  let graphData = [];
  let datasets = [];

  if (!colourColumn) {
    graphData = simpleBubble(data, xaxis, yaxis, sizeColumn, meanValue);

    datasets = [
      {
        label: xaxis,
        data: graphData,
        backgroundColor: "#ff6384",
        hoverBackgroundColor: "#ff6384",
      },
    ];
  } else {
    graphData = colourBubble(
      data,
      xaxis,
      yaxis,
      colourColumn,
      sizeColumn,
      meanValue
    );

    datasets = graphData;

    
  }

  return { datasets: datasets };
}
