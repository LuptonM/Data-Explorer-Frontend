import React, { useState, useEffect } from "react";
import axios from "axios";

function TableRow({ data, ...rest }) {
  return (
    <>
      <tr>
        {data
          ? Object.values(data).map((value, i) => {
              return <td key={i}>{value}</td>;
            })
          : null}
      </tr>
    </>
  );
}

export default function TableBody({ data }) {
  return (
    <>
      {data
        ? data.map((dataRow, i) => (
            <TableRow data={dataRow} key={i} {...dataRow} />
          ))
        : null}
    </>
  );
}
