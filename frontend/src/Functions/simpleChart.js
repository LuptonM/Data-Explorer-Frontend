import GroupBy from "./groupBy.js";
import UniqueValues from "./uniqueValues.js";
import PaletteMaker from "./coloursGenerator.js";

export default function SimpleChart(
  data,
  graphType,
  xaxis,
  yaxis,
  yaxisModification
) {
  yaxisModification = yaxisModification ? yaxisModification : "Sum";

  let graphData = [];
  let labels = [];
  let label = yaxisModification.concat(" of ").concat(yaxis);
  let backgroundColors = [];
  let borderColors = [];
  let borderWidth: 1;

  let groupByArgs = [xaxis];

  let groupedData = GroupBy(data, groupByArgs, yaxisModification, yaxis);
  let datasets = [];

  labels = UniqueValues(groupedData, xaxis);
  graphData = UniqueValues(groupedData, yaxisModification);
  backgroundColors = PaletteMaker(labels.length);
  borderColors = backgroundColors;

  if (graphType !== "line") {
    datasets = [
      {
        label: label,
        data: graphData,
        backgroundColor: backgroundColors,
        borderColor: borderColors,
        borderWidth: borderWidth,
      },
    ];
  } else {
    datasets = [
      {
        label: label,
        data: graphData,
        fill: false,
        borderColor: borderColors,
        borderWidth: borderWidth,
      },
    ];
  }

  return { labels: labels, datasets: datasets };
}
