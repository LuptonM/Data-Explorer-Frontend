import GroupBy from "./groupBy.js";
import UniqueValues from "./uniqueValues.js";
import PaletteMaker from "./coloursGenerator.js";
import PieChartData from "./makePieData.js";

import SimpleChart from "./simpleChart.js";
import ColourChart from "./colourChart.js";
import ScatterChart from "./scatterChart.js";
import BubbleChart from "./bubbleChart.js";

export default function GenerateGraphData(
  graphType,
  data,
  xaxis,
  yaxis,
  yaxisModification,
  colourColumn,
  sizeColumn
) {
  if (graphType === "pie" || graphType === "doughnut") {
    return PieChartData(
      data,

      yaxis,
      yaxisModification,
      colourColumn
    );
  } else if (
    (graphType === "stackedBar" && colourColumn && colourColumn !== xaxis) ||
    (graphType === "groupedBar" && colourColumn && colourColumn !== xaxis) ||
    (graphType === "line" && colourColumn && colourColumn !== xaxis)
  ) {
    return ColourChart(
      data,
      graphType,
      xaxis,
      yaxis,
      yaxisModification,
      colourColumn
    );
  } else if (
    graphType === "line" ||
    graphType === "stackedBar" ||
    graphType === "groupedBar"
  ) {
    return SimpleChart(data, graphType, xaxis, yaxis, yaxisModification);
  } else if (graphType === "scatter") {
    return ScatterChart(data, xaxis, yaxis, colourColumn);
  } else if (graphType === "bubble") {
    return BubbleChart(
      data,
      xaxis,
      yaxis,
      yaxisModification,
      colourColumn,
      sizeColumn
    );
  }
}
