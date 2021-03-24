import GroupBy from "./groupBy.js";
import UniqueValues from "./uniqueValues.js";
import PaletteMaker from "./coloursGenerator.js";

export default function PieChartData(
  data,
  yaxis,
  yaxisModification,
  colourColumn
) {
  yaxisModification = yaxisModification ? yaxisModification : "Sum";

  let graphData = [];
  let labels = [];
  let label = yaxisModification.concat(" of ").concat(yaxis);
  let backgroundColors = [];
  let borderColors = [];
  let borderWidth: 1;

  let groupByArgs = [colourColumn];

  let groupedData = GroupBy(data, groupByArgs, yaxisModification, yaxis);

  labels = UniqueValues(groupedData, colourColumn);
  graphData = UniqueValues(groupedData, yaxisModification);
  backgroundColors = PaletteMaker(labels.length);
  borderColors = backgroundColors;

  let datasets = [
    {
      label: label,
      data: graphData,
      backgroundColor: backgroundColors,
      borderColor: borderColors,
      borderWidth: borderWidth,
    },
  ];

  return { labels: labels, datasets: datasets };
}
