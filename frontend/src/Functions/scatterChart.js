import PaletteMaker from "./coloursGenerator.js";
import UniqueValues from "./uniqueValues.js";
const simpleScatter = (
  data,

  xaxis,
  yaxis
) => {
  let graphData = [];

  data.map((row) => {
    graphData.push({ x: row[xaxis], y: row[yaxis] });
  });

  return graphData;
};

const colourScatter = (
  data,

  xaxis,
  yaxis,
  colourColumn
) => {
  let graphData = [];
  let colourValues = UniqueValues(data, colourColumn);
  let backgroundColors = PaletteMaker(colourValues.length);

  colourValues.map((colour, i) => {
    //mapping data
    let colourData = [];
    data.map((row) => {
      if (row[colourColumn] === colour) {
        colourData.push({ x: row[xaxis], y: row[yaxis] });
      }
    });
    //end of map data

    graphData.push({
      label: colour,
      data: colourData,
      backgroundColor: backgroundColors[i],
    });
  });
  return graphData;
};

export default function ScatterChart(
  data,

  xaxis,
  yaxis,
  colourColumn
) {
  let labels = "";
  let datasets = [];
  if (!colourColumn) {
    datasets = [
      {
        label: labels,
        data: simpleScatter(data, xaxis, yaxis),
        backgroundColor: "#567de8",
      },
    ];
  } else {
    datasets = colourScatter(
      data,

      xaxis,
      yaxis,
      colourColumn
    );
  }

  return { datasets: datasets };
}
