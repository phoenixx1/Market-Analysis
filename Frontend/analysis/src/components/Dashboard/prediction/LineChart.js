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
import { MovingAverageTooltip } from "react-stockcharts/lib/tooltip";
import { sma } from "react-stockcharts/lib/indicator";
import { CurrentCoordinate } from "react-stockcharts/lib/coordinates";

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
    // VWAP
    const vwap = sma()
    .merge((d, c) => {
      d.VWAP = c;
    })
    .accessor((d) => d.VWAP)
    .stroke("red");

    // Forecast
    const forecast = sma()
      .merge((d, c) => {
        d.Forecast = c;
      })
      .accessor((d) => d.Forecast)
      .stroke("blue");

    return (
      <ChartCanvas
        height={height}
        ratio={ratio}
        width={window.innerWidth - window.innerWidth * 0.58}
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
          yExtents={[(d) => [d.VWAP, d.Forecast]]}
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
              <LineSeries
              yAccessor={vwap.accessor()}
              stroke={vwap.stroke()}
              highlightOnHover
            />
            <CurrentCoordinate
              yAccessor={vwap.accessor()}
              fill={vwap.stroke()}
            />
            <MovingAverageTooltip
              onClick={(e) => console.log(e)}
              origin={[0, 0]}
              options={[
                {
                  yAccessor: vwap.accessor(),
                  type: "VWAP",
                  windowSize: 0,
                  stroke: vwap.stroke(),
                },
              ]}
            />

         <LineSeries
              yAccessor={forecast.accessor()}
              stroke={forecast.stroke()}
              highlightOnHover
            />
            <CurrentCoordinate
              yAccessor={forecast.accessor()}
              fill={forecast.stroke()}
            />
            <MovingAverageTooltip
              onClick={(e) => console.log(e)}
              origin={[60, 0]}
              options={[
                {
                  yAccessor: forecast.accessor(),
                  type: "Forecast",
                  windowSize: 0,
                  stroke: forecast.stroke(),
                },
              ]}
            />
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
