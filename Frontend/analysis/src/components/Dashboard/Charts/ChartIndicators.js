import React from "react";
import { format } from "d3-format";
import { LineSeries } from "react-stockcharts/lib/series";
import { sma } from "react-stockcharts/lib/indicator";
import Chart from "react-stockcharts/lib/Chart";
import XAxis from "react-stockcharts/lib/axes/XAxis";
import YAxis from "react-stockcharts/lib/axes/YAxis";
import MouseCoordinateY from "react-stockcharts/lib/coordinates/MouseCoordinateY";
import { Studies } from "../studiesList";
import MouseCoordinateX from "react-stockcharts/lib/coordinates/MouseCoordinateX";
import { timeFormat } from "d3-time-format";

class ChartIndicators extends React.Component {
  render() {
    const {
      data: initialData,
      indicators,
      updateIndicators,
      height,
      selectedStudy,
    } = this.props;

    // MIDPRICE
    const midpr50 = sma()
      .options({ windowSize: 50 })
      .merge((d, c) => {
        d.MIDPRICE = c;
      })
      .accessor((d) => d.MIDPRICE)
      .stroke("blue");

    // MIDPOINT
    const midpt50 = sma()
      .options({ windowSize: 50 })
      .merge((d, c) => {
        d.MIDPOINT = c;
      })
      .accessor((d) => d.MIDPOINT)
      .stroke("red");

    // ADX
    const adx50 = sma()
      .options({ windowSize: 50 })
      .merge((d, c) => {
        d.ADX = c;
      })
      .accessor((d) => d.ADX)
      .stroke("blue");
    const midpriceChart = () => {
      console.log("call made");
      switch (selectedStudy) {
        case "MIDPRICE":
          return (
            <Chart
              yExtents={[(d) => [d.MIDPRICE]]}
              // yExtents={yExtents}
              height={height * 0.25}
              origin={(w, h) => [0, height * 0.65]}
            >
              <MouseCoordinateX
                at="bottom"
                orient="bottom"
                displayFormat={timeFormat("%Y-%m-%d")}
              />
              <MouseCoordinateY
                at="right"
                orient="right"
                displayFormat={format(".2f")}
              />
              <XAxis axisAt="bottom" orient="bottom" />

              <YAxis axisAt="right" orient="right" ticks={3} />
              <LineSeries
                yAccessor={midpr50.accessor()}
                stroke={midpr50.stroke()}
              />
            </Chart>
          );
        case "ADX":
          return (
            <Chart
              yExtents={[(d) => [d.ADX]]}
              height={height * 0.25}
              origin={(w, h) => [0, height * 0.65]}
            >
              <MouseCoordinateX
                at="bottom"
                orient="bottom"
                displayFormat={timeFormat("%Y-%m-%d")}
              />
              <MouseCoordinateY
                at="right"
                orient="right"
                displayFormat={format(".2f")}
              />
              <XAxis axisAt="bottom" orient="bottom" />

              <YAxis axisAt="right" orient="right" ticks={3} />
              <LineSeries
                yAccessor={adx50.accessor()}
                stroke={adx50.stroke()}
              />
            </Chart>
          );
        default:
          return <></>;
      }
    };
    return <>{midpriceChart}</>;
  }
}

export default ChartIndicators;
