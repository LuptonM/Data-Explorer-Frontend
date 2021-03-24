export default function UniqueValues(data, column) {
  var unique = [];
  var distinct = [];
  for (let i = 0; i < data.length; i++) {
    if (!unique[data[i][column]]) {
      distinct.push(data[i][column]);
      unique[data[i][column]] = 1;
    }
  }
  return distinct;
}
