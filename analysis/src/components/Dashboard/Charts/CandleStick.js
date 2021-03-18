import React from "react";
import PropTypes from "prop-types";

import { format } from "d3-format";
import { timeFormat } from "d3-time-format";

import { ChartCanvas, Chart } from "react-stockcharts";
import { CandlestickSeries, LineSeries } from "react-stockcharts/lib/series";
import { XAxis, YAxis } from "react-stockcharts/lib/axes";
import {
  CrossHairCursor,
  EdgeIndicator,
  CurrentCoordinate,
  MouseCoordinateX,
  MouseCoordinateY,
} from "react-stockcharts/lib/coordinates";

import {
  LabelAnnotation,
  Label,
  Annotate,
} from "react-stockcharts/lib/annotation";
import { discontinuousTimeScaleProvider } from "react-stockcharts/lib/scale";
import {
  OHLCTooltip,
  MovingAverageTooltip,
} from "react-stockcharts/lib/tooltip";
import { fitWidth } from "react-stockcharts/lib/helper";
import { last } from "react-stockcharts/lib/utils";
import { ema, wma, sma, tma } from "react-stockcharts/lib/indicator";

class CandleStickChartWithAnnotation extends React.Component {
  render() {
    const annotationProps = {
      fontFamily: "Glyphicons Halflings",
      fontSize: 20,
      fill: "#060F8F",
      opacity: 0.8,
      text: "\ue182",
      y: ({ yScale }) => yScale.range()[0],
      onClick: console.log.bind(console),
      tooltip: (d) => timeFormat("%B")(d.date),
      // onMouseOver: console.log.bind(console),
    };

    const margin = { left: 80, right: 80, top: 30, bottom: 50 };
    const height = 400;
    const { type, data: initialData, width, ratio, MA } = this.props;
    const [yAxisLabelX, yAxisLabelY] = [
      width - margin.left - 40,
      (height - margin.top - margin.bottom) / 2,
    ];
    // width = 266;
    const xScaleProvider = discontinuousTimeScaleProvider.inputDateAccessor(
      (d) => d.date
    );
    const { data, xScale, xAccessor, displayXAccessor } = xScaleProvider(
      initialData
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
          yExtents={[(d) => [d.high, d.low], ema5.accessor(), sma5.accessor()]}
          padding={{ top: 10, bottom: 20 }}
        >
          <XAxis axisAt="bottom" orient="bottom" />
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
          <MouseCoordinateY
            at="left"
            orient="left"
            displayFormat={format(".2f")}
          />

          <YAxis axisAt="right" orient="right" ticks={5} />
          <YAxis axisAt="left" orient="left" ticks={5} />

          <CandlestickSeries />
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

          <OHLCTooltip origin={[-30, -15]} />

          <Annotate
            with={LabelAnnotation}
            when={(d) => d.date.getDate() === 1 /* some condition */}
            usingProps={annotationProps}
          />
        </Chart>
        <CrossHairCursor strokeDasharray="LongDashDot" />
      </ChartCanvas>
    );
  }
}

CandleStickChartWithAnnotation.propTypes = {
  data: PropTypes.array.isRequired,
  width: PropTypes.number.isRequired,
  ratio: PropTypes.number.isRequired,
  type: PropTypes.oneOf(["svg", "hybrid"]).isRequired,
};

CandleStickChartWithAnnotation.defaultProps = {
  type: "svg",
};

CandleStickChartWithAnnotation = fitWidth(CandleStickChartWithAnnotation);

export default CandleStickChartWithAnnotation;
