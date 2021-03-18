import React from "react";
import PropTypes from "prop-types";

import { scaleTime } from "d3-scale";
import { curveMonotoneX } from "d3-shape";

import { format } from "d3-format";
import { timeFormat } from "d3-time-format";

import { ChartCanvas, Chart } from "react-stockcharts";
import { AreaSeries } from "react-stockcharts/lib/series";
import { XAxis, YAxis } from "react-stockcharts/lib/axes";
import { fitWidth } from "react-stockcharts/lib/helper";
import {
  createVerticalLinearGradient,
  hexToRGBA,
} from "react-stockcharts/lib/utils";
import {
  CrossHairCursor,
  MouseCoordinateX,
  MouseCoordinateY,
} from "react-stockcharts/lib/coordinates";
import { last } from "react-stockcharts/lib/utils";
import { OHLCTooltip } from "react-stockcharts/lib/tooltip";
import { ema, wma, sma, tma } from "react-stockcharts/lib/indicator";
import MovingAverageTooltip from "react-stockcharts/lib/tooltip/MovingAverageTooltip";
import CurrentCoordinate from "react-stockcharts/lib/coordinates/CurrentCoordinate";
import LineSeries from "react-stockcharts/lib/series/LineSeries";

const canvasGradient = createVerticalLinearGradient([
  { stop: 0, color: hexToRGBA("#b5d0ff", 0.2) },
  { stop: 0.7, color: hexToRGBA("#6fa4fc", 0.4) },
  { stop: 1, color: hexToRGBA("#4286f4", 0.8) },
]);

class AreaChart extends React.Component {
  render() {
    const { data, type, width, ratio, MA } = this.props;

    const xAccessor = (d) => d.date;
    const xExtents = [xAccessor(last(data)), xAccessor(data[data.length - 50])];
    const ema5 = ema()
      .options({
        windowSize: 5, // optional will default to 10
        sourcePath: "close", // optional will default to close as the source
      })
      .skipUndefined(true) // defaults to true
      .merge((d, c) => {
        d.EMA = c;
      }) // Required, if not provided, log a error
      .accessor((d) => d.EMA) // Required, if not provided, log an error during calculation
      .stroke("blue"); // Optional

    const sma5 = sma()
      .options({ windowSize: 5 })
      .merge((d, c) => {
        d.SMA = c;
      })
      .accessor((d) => d.SMA);
    return (
      <ChartCanvas
        height={window.innerHeight - 100}
        ratio={ratio}
        width={window.innerWidth - 260}
        margin={{ left: 50, right: 50, top: 10, bottom: 30 }}
        data={data}
        type={type}
        xAccessor={(d) => d.date}
        xScale={scaleTime()}
        xExtents={xExtents}
      >
        <Chart
          id={0}
          yExtents={[(d) => d.close, ema5.accessor(), sma5.accessor()]}
        >
          <defs>
            <linearGradient id="MyGradient" x1="0" y1="100%" x2="0" y2="0%">
              <stop offset="0%" stopColor="#b5d0ff" stopOpacity={0.2} />
              <stop offset="70%" stopColor="#6fa4fc" stopOpacity={0.4} />
              <stop offset="100%" stopColor="#4286f4" stopOpacity={0.8} />
            </linearGradient>
          </defs>
          <XAxis axisAt="bottom" orient="bottom" ticks={5} />
          <YAxis axisAt="right" orient="right" ticks={5} />
          <AreaSeries
            yAccessor={(d) => d.close}
            fill="url(#MyGradient)"
            strokeWidth={2}
            interpolation={curveMonotoneX}
            canvasGradient={canvasGradient}
          />
          {MA ? (
            <>
              <LineSeries yAccessor={ema5.accessor()} stroke={ema5.stroke()} />
              <CurrentCoordinate
                yAccessor={ema5.accessor()}
                fill={ema5.stroke()}
              />
              <LineSeries yAccessor={sma5.accessor()} stroke={sma5.stroke()} />
              <CurrentCoordinate
                yAccessor={sma5.accessor()}
                fill={sma5.stroke()}
              />
              <MovingAverageTooltip
                onClick={(e) => console.log(e)}
                origin={[10, 15]}
                options={[
                  {
                    yAccessor: ema5.accessor(),
                    type: "EMA",
                    stroke: ema5.stroke(),
                    windowSize: ema5.options().windowSize,
                    echo: "some echo here",
                  },
                  {
                    yAccessor: sma5.accessor(),
                    type: "SMA",
                    stroke: sma5.stroke(),
                    windowSize: sma5.options().windowSize,
                    echo: "some echo here",
                  },
                ]}
              />
            </>
          ) : (
            <></>
          )}
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
          <OHLCTooltip forChart={1} origin={[-40, 0]} />
        </Chart>
        <CrossHairCursor />
      </ChartCanvas>
    );
  }
}

AreaChart.propTypes = {
  data: PropTypes.array.isRequired,
  width: PropTypes.number.isRequired,
  ratio: PropTypes.number.isRequired,
  type: PropTypes.oneOf(["svg", "hybrid"]).isRequired,
};

AreaChart.defaultProps = {
  type: "svg",
};
AreaChart = fitWidth(AreaChart);

export default AreaChart;
