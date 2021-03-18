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
import { ema, wma, sma, tma } from "react-stockcharts/lib/indicator";
import MovingAverageTooltip from "react-stockcharts/lib/tooltip/MovingAverageTooltip";
import CurrentCoordinate from "react-stockcharts/lib/coordinates/CurrentCoordinate";

class LineChart extends React.Component {
  render() {
    const { data: initialData, type, width, ratio, MA } = this.props;
    const xScaleProvider = discontinuousTimeScaleProvider.inputDateAccessor(
      (d) => d.date
    );
    const { data, xScale, xAccessor, displayXAccessor } = xScaleProvider(
      initialData
    );
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
        margin={{ left: 70, right: 70, top: 20, bottom: 30 }}
        type={type}
        pointsPerPxThreshold={1}
        data={data}
        xAccessor={xAccessor}
        displayXAccessor={displayXAccessor}
        xScale={xScale}
        xExtents={xExtents}
      >
        <Chart id={1} yExtents={(d) => [d.high, d.low]}>
          <XAxis axisAt="bottom" orient="bottom" />
          <YAxis
            axisAt="right"
            orient="right"
            // tickInterval={5}
            // tickValues={[40, 60]}
            ticks={5}
          />
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
          <OHLCTooltip forChart={1} origin={[-40, 0]} />
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
