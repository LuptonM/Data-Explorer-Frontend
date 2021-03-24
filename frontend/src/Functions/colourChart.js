import GroupBy from "./groupBy.js";
import UniqueValues from "./uniqueValues.js";
import PaletteMaker from "./coloursGenerator.js";

const datasetRowData = (groupedData, value, column, valueColumn) => {
  let rowData = [];

  groupedData.map((row) => {
    if (row[column] === value) {
      rowData.push(row[valueColumn]);
    }
  });

  return rowData;
};

export default function ColuredChart(
  data,
  graphType,
  xaxis,
  yaxis,
  yaxisModification,
  colourColumn
) {
  yaxisModification = yaxisModification ? yaxisModification : "Sum";

  let labels = [];
  let label = [];
  let backgroundColors = [];
  let borderColors = [];
  let borderWidth: 1;
  let groupByArgs;

  groupByArgs = [xaxis, colourColumn];

  let groupedData = GroupBy(data, groupByArgs, yaxisModification, yaxis);

  labels = UniqueValues(groupedData, xaxis);
  label = UniqueValues(groupedData, colourColumn);
  backgroundColors = PaletteMaker(label.length);
  borderColors = backgroundColors;

  let datasets = [];

  label.map((groupedColumn, i) => {
    if (graphType !== "line") {
      datasets.push({
        label: label[i],
        backgroundColor: backgroundColors[i],
        borderColor: backgroundColors[i],
        borderWidth: 1,
        data: datasetRowData(
          groupedData,
          label[i],
          colourColumn,
          yaxisModification
        ),
      });
    } else {
      datasets.push({
        label: label[i],
        borderColor: backgroundColors[i],
        borderWidth: 1,
        fill: false,
        data: datasetRowData(
          groupedData,
          label[i],
          colourColumn,
          yaxisModification
        ),
      });
    }
  });

  
  return { labels: labels, datasets: datasets };
}
