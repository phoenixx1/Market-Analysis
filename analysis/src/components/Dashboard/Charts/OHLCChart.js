import React from "react";
import PropTypes from "prop-types";

import { format } from "d3-format";
import { timeFormat } from "d3-time-format";

import { ChartCanvas, Chart } from "react-stockcharts";
import { OHLCSeries } from "react-stockcharts/lib/series";
import { XAxis, YAxis } from "react-stockcharts/lib/axes";
import {
  CrossHairCursor,
  EdgeIndicator,
  MouseCoordinateX,
  MouseCoordinateY,
} from "react-stockcharts/lib/coordinates";

import { discontinuousTimeScaleProvider } from "react-stockcharts/lib/scale";
import { OHLCTooltip } from "react-stockcharts/lib/tooltip";
import { change, elderRay } from "react-stockcharts/lib/indicator";
import { fitWidth } from "react-stockcharts/lib/helper";
import { last } from "react-stockcharts/lib/utils";
import { ema, wma, sma, tma } from "react-stockcharts/lib/indicator";
import MovingAverageTooltip from "react-stockcharts/lib/tooltip/MovingAverageTooltip";
import CurrentCoordinate from "react-stockcharts/lib/coordinates/CurrentCoordinate";
import LineSeries from "react-stockcharts/lib/series/LineSeries";

class OHLCChartWithElderRayIndicator extends React.Component {
  render() {
    const elder = elderRay();
    const changeCalculator = change();

    const { type, data: initialData, width, ratio, MA } = this.props;

    const calculatedData = changeCalculator(elder(initialData));
    const xScaleProvider = discontinuousTimeScaleProvider.inputDateAccessor(
      (d) => d.date
    );
    const { data, xScale, xAccessor, displayXAccessor } = xScaleProvider(
      calculatedData
    );

    const start = xAccessor(last(data));
    const end = xAccessor(data[Math.max(0, data.length - 50)]);
    const xExtents = [start, end];
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
        data={data}
        xScale={xScale}
        xAccessor={xAccessor}
        displayXAccessor={displayXAccessor}
        xExtents={xExtents}
      >
        <Chart
          id={1}
          yExtents={(d) => [d.high, d.low]}
          padding={{ top: 10, right: 0, bottom: 20, left: 0 }}
        >
          <YAxis axisAt="right" orient="right" ticks={5} />
          <XAxis axisAt="bottom" orient="bottom" />

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

          <OHLCSeries />
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
          <EdgeIndicator
            itemType="last"
            orient="right"
            edgeAt="right"
            yAccessor={(d) => d.close}
            fill={(d) => (d.close > d.open ? "#6BA583" : "#FF0000")}
          />
          <EdgeIndicator
            itemType="last"
            orient="right"
            edgeAt="right"
            yAccessor={(d) => d.close}
            fill={(d) => (d.close > d.open ? "#6BA583" : "#FF0000")}
          />

          <OHLCTooltip origin={[-40, -10]} />
        </Chart>

        <CrossHairCursor />
      </ChartCanvas>
    );
  }
}

OHLCChartWithElderRayIndicator.propTypes = {
  data: PropTypes.array.isRequired,
  width: PropTypes.number.isRequired,
  ratio: PropTypes.number.isRequired,
  type: PropTypes.oneOf(["svg", "hybrid"]).isRequired,
};

OHLCChartWithElderRayIndicator.defaultProps = {
  type: "svg",
};
OHLCChartWithElderRayIndicator = fitWidth(OHLCChartWithElderRayIndicator);

export default OHLCChartWithElderRayIndicator;
