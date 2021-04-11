import React from "react";
import PropTypes from "prop-types";

import { format } from "d3-format";
import { timeFormat } from "d3-time-format";

import { ChartCanvas, Chart } from "react-stockcharts";
import { PointAndFigureSeries } from "react-stockcharts/lib/series";
import { XAxis, YAxis } from "react-stockcharts/lib/axes";
import {
  CrossHairCursor,
  MouseCoordinateX,
  MouseCoordinateY,
} from "react-stockcharts/lib/coordinates";

import { discontinuousTimeScaleProvider } from "react-stockcharts/lib/scale";
import { OHLCTooltip } from "react-stockcharts/lib/tooltip";
import { pointAndFigure } from "react-stockcharts/lib/indicator";
import { fitWidth } from "react-stockcharts/lib/helper";
import { last } from "react-stockcharts/lib/utils";
import Indicators from "./Indicators";

class PointAndFigure extends React.Component {
  getChartCanvas() {
    return this.refs.chartCanvas;
  }
  render() {
    const pAndF = pointAndFigure();
    const {
      type,
      data: initialData,
      width,
      ratio,
      indicators,
      selectedStudy,
    } = this.props;
    const margin = { left: 80, right: 80, top: 30, bottom: 50 };
    const height = window.innerHeight - 100;
    const calculatedData = pAndF(initialData);
    const xScaleProvider = discontinuousTimeScaleProvider.inputDateAccessor(
      (d) => d.date
    );
    const { data, xScale, xAccessor, displayXAccessor } = xScaleProvider(
      calculatedData
    );

    const start = xAccessor(last(data));
    const end = xAccessor(data[Math.max(15, data.length - 50)]);
    const xExtents = [start, end];

    return (
      <ChartCanvas
        height={height}
        ratio={ratio}
        width={window.innerWidth - 260}
        margin={margin}
        type={type}
        seriesName="MSFT"
        data={data}
        xScale={xScale}
        xAccessor={xAccessor}
        displayXAccessor={displayXAccessor}
        xExtents={xExtents}
      >
        <Chart
          id={1}
          yExtents={[(d) => [d.high, d.low]]}
          padding={{ top: 45, bottom: 50 }}
        >
          <XAxis axisAt="bottom" orient="bottom" />
          <YAxis axisAt="right" orient="right" ticks={5} />
          <MouseCoordinateY
            at="left"
            orient="left"
            displayFormat={format(".4s")}
          />
          <MouseCoordinateY
            at="right"
            orient="right"
            displayFormat={format(".2f")}
          />
          <MouseCoordinateX
            at="bottom"
            orient="bottom"
            displayFormat={timeFormat("%Y-%m-%d")}
          />
          <Indicators data={data} indicators={indicators} />
          <PointAndFigureSeries />
          <OHLCTooltip origin={[-30, -15]} />
        </Chart>
        <CrossHairCursor />
      </ChartCanvas>
    );
  }
}
PointAndFigure.propTypes = {
  data: PropTypes.array.isRequired,
  width: PropTypes.number.isRequired,
  ratio: PropTypes.number.isRequired,
  type: PropTypes.oneOf(["svg", "hybrid"]).isRequired,
};

PointAndFigure.defaultProps = {
  type: "svg",
};
PointAndFigure = fitWidth(PointAndFigure);

export default PointAndFigure;
