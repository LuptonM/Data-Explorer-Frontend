import React, { Component } from "react";

import CheckBoxTemplate from "./checkBox.js";

const setInitialState = (settings, dataframe, namespace) => {
  const {
    itemHeight,
    amount,
    tolerance,
    minIndex,
    maxIndex,
    startIndex,
  } = settings;

  const totalHeight = dataframe.length * itemHeight;
  const viewportHeight =
    dataframe.length < amount ? totalHeight + itemHeight : amount * itemHeight;
  const toleranceHeight = tolerance * itemHeight;
  const bufferHeight = viewportHeight + 2 * toleranceHeight;
  const bufferedItems = dataframe.length < amount ? 0 : amount + 2 * tolerance;
  const itemsAbove =
    dataframe.length < amount ? 0 : startIndex - tolerance - minIndex;
  const topPaddingHeight =
    dataframe.length < amount ? 0 : itemsAbove * itemHeight;
  const bottomPaddingHeight =
    dataframe.length < amount ? 0 : totalHeight - topPaddingHeight;
  const initialPosition = topPaddingHeight + toleranceHeight;
  const amountScrolled = 0;
  const makeInitalData = (dataframe, minIndex, amount) => {
    let data = [];

    let dataLength = dataframe.length;

    let returnLength = amount > dataLength ? dataLength : amount;

    for (let i = minIndex; i < returnLength; i++) {
      data.push(dataframe[i]);
    }
    return data;
  };

  return {
    settings,
    viewportHeight,
    totalHeight,
    toleranceHeight,
    bufferHeight,
    bufferedItems,
    topPaddingHeight,
    bottomPaddingHeight,
    initialPosition,
    data: makeInitalData(dataframe, minIndex, amount),

    namespace,
  };
};

class Scroller extends Component {
  constructor(props) {
    super(props);
    this.state = setInitialState(props.settings, props.dataframe);
    this.viewportElement = React.createRef();
  }

  componentDidMount() {
    this.viewportElement.current.scrollTop = this.state.initialPosition;
    if (!this.state.initialPosition) {
      this.runScroller({ target: { scrollTop: 0 } });
    }
  }

  componentDidUpdate(prevProps) {
    // Typical usage (don't forget to compare props):
    if (this.props.dataframe !== prevProps.dataframe) {
      var elmnt = document.getElementById(
        this.props.namespace.concat("viewport")
      );
      var y = elmnt.scrollTop;
      if (y) {
        this.runScroller({ target: { scrollTop: y } });
      } else {
        this.setState(
          setInitialState(this.props.settings, this.props.dataframe)
        );
      }
    }
  }

  runScroller = ({ target: { scrollTop } }) => {
    const {
      totalHeight,
      toleranceHeight,
      bufferedItems,
      settings: { itemHeight, minIndex },
    } = this.state;

    const index =
      minIndex + Math.floor((scrollTop - toleranceHeight) / itemHeight);
    const data = this.props.get(this.props.dataframe, index, bufferedItems);
    const topPaddingHeight = Math.max((index - minIndex) * itemHeight, 0);
    const bottomPaddingHeight = Math.max(
      totalHeight - topPaddingHeight - data.length * itemHeight,
      0
    );

    this.setState({
      topPaddingHeight,
      bottomPaddingHeight,
      data,
    });
  };

  render() {
    const {
      viewportHeight,
      topPaddingHeight,
      bottomPaddingHeight,
      data,
      namespace,
    } = this.state;

    return (
      <div
        className="viewport"
        id={this.props.namespace.concat("viewport")}
        ref={this.viewportElement}
        onScroll={this.runScroller}
        style={{ height: viewportHeight }}
      >
        <div style={{ height: topPaddingHeight }} />
        {data.map((row, i) => {
          return (
            <CheckBoxTemplate
              item={row}
              handleSelect={this.props.handleSelect}
              column={this.props.column}
              key={i}
            />
          );
        })}
        <div style={{ height: bottomPaddingHeight }} />
      </div>
    );
  }
}

export default Scroller;
