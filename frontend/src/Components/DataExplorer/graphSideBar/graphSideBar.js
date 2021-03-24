import React from "react";
import { ReactComponent as StackedBarIcon } from "../graphs/graphIcons/stackedBar.svg";
import { ReactComponent as GroupedBarIcon } from "../graphs/graphIcons/groupedBar.svg";
import { ReactComponent as LineGraphIcon } from "../graphs/graphIcons/lineChart.svg";
import { ReactComponent as ScatterIcon } from "../graphs/graphIcons/scatter.svg";
import { ReactComponent as HistogramIcon } from "../graphs/graphIcons/histogram.svg";
import { ReactComponent as PieIcon } from "../graphs/graphIcons/pieChart.svg";
import { ReactComponent as DoughnutIcon } from "../graphs/graphIcons/dougnutChart.svg";
import { ReactComponent as BubbleIcon } from "../graphs/graphIcons/bubble.svg";

import MovableComponent from "./movable.js";

//the item that is mapped later to create a clickable area for each picture of a graph
const GraphIcon = ({ icon, onClick, index, type, ...rest }) => {
  const handleClickIcon = () => {
    onClick(type);
  };

  return (
    <div
      className={"Graph".concat(index + 1).concat(" Graphs")}
      onClick={handleClickIcon}
    >
      <div className="graphIconWrapper">{icon ? icon : null}</div>
    </div>
  );
};

const GraphSideBar = ({ handleGraphType }) => {
  const moveRef = React.useRef(null);
  const [style, setStyle] = React.useState("");

  const graphChoices = [
    { type: "stackedBar", icon: <StackedBarIcon /> },
    { type: "groupedBar", icon: <GroupedBarIcon /> },
    { type: "line", icon: <LineGraphIcon /> },
    { type: "scatter", icon: <ScatterIcon /> },
    { type: "bar", icon: <HistogramIcon /> },
    { type: "pie", icon: <PieIcon /> },
    { type: "doughnut", icon: <DoughnutIcon /> },
    { type: "bubble", icon: <BubbleIcon /> },
  ];

  return (
    <>
      <div
        className="draggableSidebar-container"
        ref={moveRef}
        style={{
          transform: style,
        }}
      >
        <div className="DragHandler">Graphs</div>
        <div className="graphType-container">
          {graphChoices.map((graphItem, index, icon, type) => (
            <GraphIcon
              key={index}
              index={index}
              icon={icon}
              type={type}
              onClick={handleGraphType}
              {...graphItem}
            />
          ))}
        </div>
      </div>
      <MovableComponent moveRef={moveRef} setStyle={setStyle} />
    </>
  );
};

export default GraphSideBar;
