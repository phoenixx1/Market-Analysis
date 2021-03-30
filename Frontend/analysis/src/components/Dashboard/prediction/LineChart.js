import React from "react";
import PropTypes from "prop-types";

import { format } from "d3-format";
import { timeFormat } from "d3-time-format";

import { ChartCanvas, Chart } from "react-stockcharts";
import { LineSeries } from "react-stockcharts/lib/series";
import { XAxis, YAxis } from "react-stockcharts/lib/axes";
import {
  CrossHairCursor,
  MouseCoordinateX,
  MouseCoordinateY,
} from "react-stockcharts/lib/coordinates";

import { discontinuousTimeScaleProvider } from "react-stockcharts/lib/scale";
import { OHLCTooltip } from "react-stockcharts/lib/tooltip";
import { fitWidth } from "react-stockcharts/lib/helper";
import { last } from "react-stockcharts/lib/utils";

class LineChart extends React.Component {
  render() {
    const { data: initialData, type, width, ratio } = this.props;
    const xScaleProvider = discontinuousTimeScaleProvider.inputDateAccessor(
      (d) => d.date
    );
    const { data, xScale, xAccessor, displayXAccessor } = xScaleProvider(
      initialData
    );
    const height = window.innerHeight - window.innerHeight * 0.5;
    const margin = { left: 40, right: 80, top: 20, bottom: 30 };
    const xExtents = [xAccessor(last(data)), xAccessor(data[data.length - 50])];

    return (
      <ChartCanvas
        height={height}
        ratio={ratio}
        width={window.innerWidth - window.innerWidth * 0.42}
        margin={margin}
        type={type}
        pointsPerPxThreshold={1}
        data={data}
        xAccessor={xAccessor}
        displayXAccessor={displayXAccessor}
        xScale={xScale}
        xExtents={xExtents}
      >
        <Chart
          id={1}
          yExtents={[(d) => [d.high, d.low]]}
          padding={{ top: 45, bottom: 50 }}
        >
          <XAxis axisAt="bottom" orient="bottom" />
          <YAxis axisAt="right" orient="right" ticks={5} />
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
          <LineSeries yAccessor={(d) => d.close} />

          <OHLCTooltip origin={[-30, -15]} />
        </Chart>

        <CrossHairCursor />
      </ChartCanvas>
    );
  }
}

LineChart.propTypes = {
  data: PropTypes.array.isRequired,
  width: PropTypes.number.isRequired,
  ratio: PropTypes.number.isRequired,
  type: PropTypes.oneOf(["svg", "hybrid"]).isRequired,
};

LineChart.defaultProps = {
  type: "svg",
};
LineChart = fitWidth(LineChart);

export default LineChart;
