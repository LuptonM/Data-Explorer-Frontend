const groupBySum = (data, groupByArgs, modification, valueColumn) => {
  var helper = {};
  var result = data.reduce(function (r, o) {
    var key;
    for (let i = 0; i < groupByArgs.length; i++) {
      if (i === 0) {
        key = o[groupByArgs[i]];
      } else {
        key = key + "-" + o[groupByArgs[i]];
      }
    }

    if (!helper[key]) {
      helper[key] = Object.assign({}, o); // create a copy of o
      helper[key][modification] = 0;
      r.push(helper[key]);
    } else {
      helper[key][modification] += o[valueColumn];
    }

    return r;
  }, []);

  return result;
};

const groupByMean = (data, groupByArgs, modification, valueColumn) => {
  var helper = {};
  var result = data.reduce(function (r, o) {
    var key;
    for (let i = 0; i < groupByArgs.length; i++) {
      if (i === 0) {
        key = o[groupByArgs[i]];
      } else {
        key = key + "-" + o[groupByArgs[i]];
      }
    }

    if (!helper[key]) {
      helper[key] = Object.assign({}, o); // create a copy of o
      helper[key].count = 1;
      r.push(helper[key]);
    } else {
      helper[key][valueColumn] += o[valueColumn];
      helper[key].count++;
    }

    return r;
  }, []);

  result.map((row) => {
    row[modification] = row[valueColumn] / row.count;
  });

  return result;
};

const groupByCount = (data, groupByArgs, modification) => {
  var helper = {};
  var result = data.reduce(function (r, o) {
    var key;
    for (let i = 0; i < groupByArgs.length; i++) {
      if (i === 0) {
        key = o[groupByArgs[i]];
      } else {
        key = key + "-" + o[groupByArgs[i]];
      }
    }

    if (!helper[key]) {
      helper[key] = Object.assign({}, o); // create a copy of o
      helper[key][modification] = 1;
      r.push(helper[key]);
    } else {
      helper[key][modification]++;
    }

    return r;
  }, []);

  return result;
};

export default function GroupData(
  data,
  groupByArgs,
  modification,
  valueColumn
) {
  let groupedData = [];

  if (!modification || modification === "Sum") {
    groupedData = groupBySum(data, groupByArgs, modification, valueColumn);
  } else if (modification === "Mean") {
    groupedData = groupByMean(data, groupByArgs, modification, valueColumn);
  } else if (modification === "Count") {
    groupedData = groupByCount(data, groupByArgs, modification);
  }

  return groupedData;
}
