import React from "react";
import PropTypes from "prop-types";

import { format } from "d3-format";
import { timeFormat } from "d3-time-format";

import { ChartCanvas, Chart } from "react-stockcharts";
import { RenkoSeries } from "react-stockcharts/lib/series";
import { XAxis, YAxis } from "react-stockcharts/lib/axes";
import {
  CrossHairCursor,
  MouseCoordinateX,
  MouseCoordinateY,
} from "react-stockcharts/lib/coordinates";

import { discontinuousTimeScaleProvider } from "react-stockcharts/lib/scale";
import { OHLCTooltip } from "react-stockcharts/lib/tooltip";
import { renko } from "react-stockcharts/lib/indicator";
import { fitWidth } from "react-stockcharts/lib/helper";
import { last } from "react-stockcharts/lib/utils";
import BarSeries from "react-stockcharts/lib/series/BarSeries";
import Indicators from "./Indicators";
import { Studies } from "../studiesList";
import sma from "react-stockcharts/lib/indicator/sma";
import LineSeries from "react-stockcharts/lib/series/LineSeries";

import PriceCoordinate from "react-stockcharts/lib/coordinates/PriceCoordinate";
import macd from "react-stockcharts/lib/indicator/macd";
import MACDSeries from "react-stockcharts/lib/series/MACDSeries";
import MACDTooltip from "react-stockcharts/lib/tooltip/MACDTooltip";
import SingleValueTooltip from "react-stockcharts/lib/tooltip/SingleValueTooltip";
import rsi from "react-stockcharts/lib/indicator/rsi";
import RSISeries from "react-stockcharts/lib/series/RSISeries";
import RSITooltip from "react-stockcharts/lib/tooltip/RSITooltip";
import stochasticOscillator from "react-stockcharts/lib/indicator/stochasticOscillator";
import StochasticSeries from "react-stockcharts/lib/series/StochasticSeries";
import StochasticTooltip from "react-stockcharts/lib/tooltip/StochasticTooltip";

class Renko extends React.Component {
  render() {
    const renkoCalculator = renko();
    const margin = { left: 80, right: 80, top: 30, bottom: 50 };
    const height = window.innerHeight - 100;
    const {
      type,
      data: initialData,
      width,
      ratio,
      indicators,
      selectedStudy,
    } = this.props;

    const calculatedData = renkoCalculator(initialData);
    const xScaleProvider = discontinuousTimeScaleProvider.inputDateAccessor(
      (d) => d.date
    );
    const { data, xScale, xAccessor, displayXAccessor } = xScaleProvider(
      calculatedData
    );
    let flag = true;
    for (let i = 0; i < Studies.length; i++) {
      if (indicators[Studies[i]]) {
        flag = false;
        break;
      } else flag = true;
    }

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

    // ADXR
    const adxr50 = sma()
      .options({ windowSize: 50 })
      .merge((d, c) => {
        d.ADXR = c;
      })
      .accessor((d) => d.ADXR)
      .stroke("red");

    // APO
    const apo50 = sma()
      .options({ windowSize: 50 })
      .merge((d, c) => {
        d.APO = c;
      })
      .accessor((d) => d.APO)
      .stroke("red");

    // AROON0
    const aroon050 = sma()
      .options({ windowSize: 50 })
      .merge((d, c) => {
        d.AROON0 = c;
      })
      .accessor((d) => d.AROON0)
      .stroke("red");
    // AROON1
    const aroon150 = sma()
      .options({ windowSize: 50 })
      .merge((d, c) => {
        d.AROON1 = c;
      })
      .accessor((d) => d.AROON1)
      .stroke("blue");

    // AROONOSC
    const aroonosc50 = sma()
      .options({ windowSize: 50 })
      .merge((d, c) => {
        d.AROONOSC = c;
      })
      .accessor((d) => d.AROONOSC)
      .stroke("blue");

    // BOP
    const bop50 = sma()
      .options({ windowSize: 50 })
      .merge((d, c) => {
        d.BOP = c;
      })
      .accessor((d) => d.BOP)
      .stroke("red");

    // CCI
    const cci50 = sma()
      .options({ windowSize: 50 })
      .merge((d, c) => {
        d.CCI = c;
      })
      .accessor((d) => d.CCI)
      .stroke("red");

    // CMO
    const cmo50 = sma()
      .options({ windowSize: 50 })
      .merge((d, c) => {
        d.CMO = c;
      })
      .accessor((d) => d.CMO)
      .stroke("blue");

    // DX
    const dx50 = sma()
      .options({ windowSize: 50 })
      .merge((d, c) => {
        d.DX = c;
      })
      .accessor((d) => d.DX)
      .stroke("blue");

    //MACD
    const macdAppearance = {
      stroke: {
        macd: "#FF0000",
        signal: "#00F300",
      },
      fill: {
        divergence: "#4682B4",
      },
    };
    const macdCalculator = macd()
      .options({
        fast: 12,
        slow: 26,
        signal: 9,
      })
      .merge((d, c) => {
        d.MACD = c;
      })
      .accessor((d) => d.MACD);
    const macdextCalculator = macd()
      .options({
        fast: 12,
        slow: 26,
        signal: 9,
      })
      .merge((d, c) => {
        d.MACDEXT = c;
      })
      .accessor((d) => d.MACDEXT);
    const macdfixCalculator = macd()
      .options({
        fast: 12,
        slow: 26,
        signal: 9,
      })
      .merge((d, c) => {
        d.MACDFIX = c;
      })
      .accessor((d) => d.MACDFIX);

    // MFI
    const mfi50 = sma()
      .options({ windowSize: 50 })
      .merge((d, c) => {
        d.MFI = c;
      })
      .accessor((d) => d.MFI)
      .stroke("blue");

    // MINUS_DI
    const minusdi50 = sma()
      .options({ windowSize: 50 })
      .merge((d, c) => {
        d.MINUS_DI = c;
      })
      .accessor((d) => d.MINUS_DI)
      .stroke("red");

    // MINUS_DM
    const minusdm50 = sma()
      .options({ windowSize: 50 })
      .merge((d, c) => {
        d.MINUS_DM = c;
      })
      .accessor((d) => d.MINUS_DM)
      .stroke("blue");

    // MOM
    const mom50 = sma()
      .options({ windowSize: 50 })
      .merge((d, c) => {
        d.MOM = c;
      })
      .accessor((d) => d.MOM)
      .stroke("red");

    // PLUS_DI
    const plusdi50 = sma()
      .options({ windowSize: 50 })
      .merge((d, c) => {
        d.PLUS_DI = c;
      })
      .accessor((d) => d.PLUS_DI)
      .stroke("blue");

    // PLUS_DM
    const plusdm50 = sma()
      .options({ windowSize: 50 })
      .merge((d, c) => {
        d.PLUS_DM = c;
      })
      .accessor((d) => d.PLUS_DM)
      .stroke("red");

    // PPO
    const ppo50 = sma()
      .options({ windowSize: 50 })
      .merge((d, c) => {
        d.PPO = c;
      })
      .accessor((d) => d.PPO)
      .stroke("blue");

    // ROC
    const roc50 = sma()
      .options({ windowSize: 50 })
      .merge((d, c) => {
        d.ROC = c;
      })
      .accessor((d) => d.ROC)
      .stroke("blue");

    // ROCP
    const rocp50 = sma()
      .options({ windowSize: 50 })
      .merge((d, c) => {
        d.ROCP = c;
      })
      .accessor((d) => d.ROCP)
      .stroke("green");

    // ROCR
    const rocr50 = sma()
      .options({ windowSize: 50 })
      .merge((d, c) => {
        d.ROCR = c;
      })
      .accessor((d) => d.ROCR)
      .stroke("red");

    // ROCR100
    const rocr100 = sma()
      .options({ windowSize: 100 })
      .merge((d, c) => {
        d.ROCR100 = c;
      })
      .accessor((d) => d.ROCR100)
      .stroke("blue");

    // RSI
    const rsiCalculator = rsi()
      .options({ windowSize: 14 })
      .merge((d, c) => {
        d.RSI = c;
      })
      .accessor((d) => d.RSI);

    // STOCH
    const stoAppearance = {
      stroke: Object.assign({}, StochasticSeries.defaultProps.stroke),
    };

    const stoch = stochasticOscillator()
      .options({ windowSize: 14, kWindowSize: 3 })
      .merge((d, c) => {
        d.STOCH = c;
      })
      .accessor((d) => d.STOCH);
    const stochf = stochasticOscillator()
      .options({ windowSize: 14, kWindowSize: 3 })
      .merge((d, c) => {
        d.STOCHF = c;
      })
      .accessor((d) => d.STOCHF);
    const stochrsi = stochasticOscillator()
      .options({ windowSize: 14, kWindowSize: 3 })
      .merge((d, c) => {
        d.STOCHRSI = c;
      })
      .accessor((d) => d.STOCHRSI);

    // TRIX
    const trix50 = sma()
      .options({ windowSize: 50 })
      .merge((d, c) => {
        d.TRIX = c;
      })
      .accessor((d) => d.TRIX)
      .stroke("blue");

    // ULTOSC
    const ultosc50 = sma()
      .options({ windowSize: 50 })
      .merge((d, c) => {
        d.ULTOSC = c;
      })
      .accessor((d) => d.ULTOSC)
      .stroke("blue");

    // WILLR
    const willr50 = sma()
      .options({ windowSize: 50 })
      .merge((d, c) => {
        d.WILLR = c;
      })
      .accessor((d) => d.WILLR)
      .stroke("red");

    // AD
    const ad50 = sma()
      .options({ windowSize: 50 })
      .merge((d, c) => {
        d.AD = c;
      })
      .accessor((d) => d.AD)
      .stroke("red");

    // ADOSC
    const adsoc50 = sma()
      .options({ windowSize: 50 })
      .merge((d, c) => {
        d.ADOSC = c;
      })
      .accessor((d) => d.ADOSC)
      .stroke("red");

    // OBV
    const obv50 = sma()
      .options({ windowSize: 50 })
      .merge((d, c) => {
        d.OBV = c;
      })
      .accessor((d) => d.OBV)
      .stroke("red");

    // ATR
    const atr50 = sma()
      .options({ windowSize: 50 })
      .merge((d, c) => {
        d.ATR = c;
      })
      .accessor((d) => d.ATR)
      .stroke("red");

    // NATR
    const natr50 = sma()
      .options({ windowSize: 50 })
      .merge((d, c) => {
        d.NATR = c;
      })
      .accessor((d) => d.NATR)
      .stroke("blue");

    // TRANGE
    const trange50 = sma()
      .options({ windowSize: 50 })
      .merge((d, c) => {
        d.TRANGE = c;
      })
      .accessor((d) => d.TRANGE)
      .stroke("red");

    // AVGPRICE
    const avg50 = sma()
      .options({ windowSize: 50 })
      .merge((d, c) => {
        d.AVGPRICE = c;
      })
      .accessor((d) => d.AVGPRICE)
      .stroke("black");

    // MEDPRICE
    const med50 = sma()
      .options({ windowSize: 50 })
      .merge((d, c) => {
        d.MEDPRICE = c;
      })
      .accessor((d) => d.MEDPRICE)
      .stroke("black");

    // TYPPRICE
    const typ50 = sma()
      .options({ windowSize: 50 })
      .merge((d, c) => {
        d.TYPPRICE = c;
      })
      .accessor((d) => d.TYPPRICE)
      .stroke("black");

    // WCLPRICE
    const wcl50 = sma()
      .options({ windowSize: 50 })
      .merge((d, c) => {
        d.WCLPRICE = c;
      })
      .accessor((d) => d.WCLPRICE)
      .stroke("black");

    // HT_DCPERIOD
    const htdcpr50 = sma()
      .options({ windowSize: 50 })
      .merge((d, c) => {
        d.HT_DCPERIOD = c;
      })
      .accessor((d) => d.HT_DCPERIOD)
      .stroke("grey");

    // HT_DCPHASE
    const htdcph50 = sma()
      .options({ windowSize: 50 })
      .merge((d, c) => {
        d.HT_DCPHASE = c;
      })
      .accessor((d) => d.HT_DCPHASE)
      .stroke("grey");

    // HT_PHASOR0
    const htdcphsr050 = sma()
      .options({ windowSize: 50 })
      .merge((d, c) => {
        d.HT_PHASOR0 = c;
      })
      .accessor((d) => d.HT_PHASOR0)
      .stroke("blue");

    // HT_PHASOR1
    const htdcphsr150 = sma()
      .options({ windowSize: 50 })
      .merge((d, c) => {
        d.HT_PHASOR1 = c;
      })
      .accessor((d) => d.HT_PHASOR1)
      .stroke("green");

    // HT_SINE0
    const htsine050 = sma()
      .options({ windowSize: 50 })
      .merge((d, c) => {
        d.HT_SINE0 = c;
      })
      .accessor((d) => d.HT_SINE0)
      .stroke("blue");

    // HT_SINE1
    const htsine150 = sma()
      .options({ windowSize: 50 })
      .merge((d, c) => {
        d.HT_SINE1 = c;
      })
      .accessor((d) => d.HT_SINE1)
      .stroke("green");

    // HT_TRENDMODE
    const httrend50 = sma()
      .options({ windowSize: 50 })
      .merge((d, c) => {
        d.HT_TRENDMODE = c;
      })
      .accessor((d) => d.HT_TRENDMODE)
      .stroke("grey");

    const priceChart = () => {
      switch (selectedStudy) {
        case "MIDPRICE":
          return (
            <Chart
              yExtents={[(d) => [d.MIDPRICE]]}
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
              <SingleValueTooltip
                yAccessor={midpr50.accessor()}
                yLabel={`MIDPRICE (${midpr50.options().windowSize})`}
                yDisplayFormat={format(".2f")}
                origin={[-30, 0]}
              />
              <LineSeries
                yAccessor={midpr50.accessor()}
                stroke={midpr50.stroke()}
              />
            </Chart>
          );
        case "MIDPOINT":
          return (
            <Chart
              yExtents={[(d) => [d.MIDPOINT]]}
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
              <SingleValueTooltip
                yAccessor={midpt50.accessor()}
                yLabel={`MIDPOINT (${midpt50.options().windowSize})`}
                yDisplayFormat={format(".2f")}
                origin={[-30, 0]}
              />
              <YAxis axisAt="right" orient="right" ticks={3} />
              <LineSeries
                yAccessor={midpt50.accessor()}
                stroke={midpt50.stroke()}
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
              <SingleValueTooltip
                yAccessor={adx50.accessor()}
                yLabel={`ADX (${adx50.options().windowSize})`}
                yDisplayFormat={format(".2f")}
                origin={[-30, 0]}
              />
              <YAxis axisAt="right" orient="right" ticks={3} />
              <LineSeries
                yAccessor={adx50.accessor()}
                stroke={adx50.stroke()}
              />
            </Chart>
          );
        case "ADXR":
          return (
            <Chart
              yExtents={[(d) => [d.ADXR]]}
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
              <SingleValueTooltip
                yAccessor={adxr50.accessor()}
                yLabel={`ADXR (${adxr50.options().windowSize})`}
                yDisplayFormat={format(".2f")}
                origin={[-30, 0]}
              />
              <YAxis axisAt="right" orient="right" ticks={3} />
              <LineSeries
                yAccessor={adxr50.accessor()}
                stroke={adxr50.stroke()}
              />
            </Chart>
          );
        case "APO":
          return (
            <Chart
              yExtents={[(d) => [d.APO]]}
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
              <PriceCoordinate
                at="left"
                orient="left"
                price={0}
                displayFormat={format(".2f")}
              />
              <XAxis axisAt="bottom" orient="bottom" />
              <SingleValueTooltip
                yAccessor={apo50.accessor()}
                yLabel={`APO (${apo50.options().windowSize})`}
                yDisplayFormat={format(".2f")}
                origin={[-30, 0]}
              />
              <YAxis axisAt="right" orient="right" ticks={3} />
              <LineSeries
                yAccessor={apo50.accessor()}
                stroke={apo50.stroke()}
              />
            </Chart>
          );
        case "AROON":
          return (
            <Chart
              yExtents={[(d) => [d.AROON0, d.AROON1]]}
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
              <SingleValueTooltip
                yAccessor={aroon050.accessor()}
                yLabel={`AROON0 (${aroon050.options().windowSize})`}
                yDisplayFormat={format(".2f")}
                origin={[-30, 0]}
              />
              <SingleValueTooltip
                yAccessor={aroon150.accessor()}
                yLabel={`AROON1 (${aroon150.options().windowSize})`}
                yDisplayFormat={format(".2f")}
                origin={[80, 0]}
              />
              <LineSeries
                yAccessor={aroon050.accessor()}
                stroke={aroon050.stroke()}
              />
              <LineSeries
                yAccessor={aroon150.accessor()}
                stroke={aroon150.stroke()}
              />
            </Chart>
          );
        case "AROONOSC":
          return (
            <Chart
              yExtents={[(d) => [d.AROONOSC]]}
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

              <SingleValueTooltip
                yAccessor={aroonosc50.accessor()}
                yLabel={`AROONOSC (${aroonosc50.options().windowSize})`}
                yDisplayFormat={format(".2f")}
                origin={[-30, 0]}
              />

              <YAxis axisAt="right" orient="right" ticks={3} />
              <LineSeries
                yAccessor={aroonosc50.accessor()}
                stroke={aroonosc50.stroke()}
              />
            </Chart>
          );
        case "BOP":
          return (
            <Chart
              yExtents={[(d) => [d.BOP]]}
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
              <PriceCoordinate
                at="left"
                orient="left"
                price={0}
                displayFormat={format(".2f")}
              />
              <XAxis axisAt="bottom" orient="bottom" />
              <SingleValueTooltip
                yAccessor={bop50.accessor()}
                yLabel={`BOP (${bop50.options().windowSize})`}
                yDisplayFormat={format(".2f")}
                origin={[-30, 0]}
              />
              <YAxis axisAt="right" orient="right" ticks={3} />
              <LineSeries
                yAccessor={bop50.accessor()}
                stroke={bop50.stroke()}
              />
            </Chart>
          );
        case "CCI":
          return (
            <Chart
              yExtents={[(d) => [d.CCI]]}
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
              <PriceCoordinate
                at="left"
                orient="left"
                price={0}
                displayFormat={format(".2f")}
              />
              <SingleValueTooltip
                yAccessor={cci50.accessor()}
                yLabel={`CCI (${cci50.options().windowSize})`}
                yDisplayFormat={format(".2f")}
                origin={[-30, 0]}
              />
              <XAxis axisAt="bottom" orient="bottom" />

              <YAxis axisAt="right" orient="right" ticks={3} />
              <LineSeries
                yAccessor={cci50.accessor()}
                stroke={cci50.stroke()}
              />
            </Chart>
          );
        case "CMO":
          return (
            <Chart
              yExtents={[(d) => [d.CMO]]}
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
              <PriceCoordinate
                at="left"
                orient="left"
                price={0}
                displayFormat={format(".2f")}
              />
              <XAxis axisAt="bottom" orient="bottom" />
              <SingleValueTooltip
                yAccessor={cmo50.accessor()}
                yLabel={`CMO (${cmo50.options().windowSize})`}
                yDisplayFormat={format(".2f")}
                origin={[-30, 0]}
              />
              <YAxis axisAt="right" orient="right" ticks={3} />
              <LineSeries
                yAccessor={cmo50.accessor()}
                stroke={cmo50.stroke()}
              />
            </Chart>
          );
        case "DX":
          return (
            <Chart
              yExtents={[(d) => [d.DX]]}
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
              <PriceCoordinate
                at="left"
                orient="left"
                price={0}
                displayFormat={format(".2f")}
              />
              <XAxis axisAt="bottom" orient="bottom" />
              <SingleValueTooltip
                yAccessor={dx50.accessor()}
                yLabel={`DX (${dx50.options().windowSize})`}
                yDisplayFormat={format(".2f")}
                origin={[-30, 0]}
              />
              <YAxis axisAt="right" orient="right" ticks={3} />
              <LineSeries yAccessor={dx50.accessor()} stroke={dx50.stroke()} />
            </Chart>
          );
        case "MACD":
          return (
            <Chart
              yExtents={macdCalculator.accessor()}
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
              <PriceCoordinate
                at="left"
                orient="left"
                price={0}
                displayFormat={format(".2f")}
              />
              <XAxis axisAt="bottom" orient="bottom" />

              <YAxis axisAt="right" orient="right" ticks={3} />

              <MACDSeries yAccessor={(d) => d.MACD} {...macdAppearance} />
              <MACDTooltip
                origin={[-38, 15]}
                yAccessor={(d) => d.MACD}
                options={macdCalculator.options()}
                appearance={macdAppearance}
              />
            </Chart>
          );
        case "MACDEXT":
          return (
            <Chart
              yExtents={macdextCalculator.accessor()}
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
              <PriceCoordinate
                at="left"
                orient="left"
                price={0}
                displayFormat={format(".2f")}
              />
              <XAxis axisAt="bottom" orient="bottom" />

              <YAxis axisAt="right" orient="right" ticks={3} />

              <MACDSeries yAccessor={(d) => d.MACDEXT} {...macdAppearance} />
              <MACDTooltip
                origin={[-38, 15]}
                yAccessor={(d) => d.MACDEXT}
                options={macdextCalculator.options()}
                appearance={macdAppearance}
              />
            </Chart>
          );
        case "MACDFIX":
          return (
            <Chart
              yExtents={macdfixCalculator.accessor()}
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
              <PriceCoordinate
                at="left"
                orient="left"
                price={0}
                displayFormat={format(".2f")}
              />
              <XAxis axisAt="bottom" orient="bottom" />

              <YAxis axisAt="right" orient="right" ticks={3} />

              <MACDSeries yAccessor={(d) => d.MACDFIX} {...macdAppearance} />
              <MACDTooltip
                origin={[-38, 15]}
                yAccessor={(d) => d.MACDFIX}
                options={macdfixCalculator.options()}
                appearance={macdAppearance}
              />
            </Chart>
          );
        case "MFI":
          return (
            <Chart
              yExtents={[(d) => [d.MFI]]}
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
              <PriceCoordinate
                at="left"
                orient="left"
                price={0}
                displayFormat={format(".2f")}
              />
              <XAxis axisAt="bottom" orient="bottom" />
              <SingleValueTooltip
                yAccessor={mfi50.accessor()}
                yLabel={`MFI (${mfi50.options().windowSize})`}
                yDisplayFormat={format(".2f")}
                origin={[-30, 0]}
              />
              <YAxis axisAt="right" orient="right" ticks={3} />
              <LineSeries
                yAccessor={mfi50.accessor()}
                stroke={mfi50.stroke()}
              />
            </Chart>
          );
        case "MINUS_DI":
          return (
            <Chart
              yExtents={[(d) => [d.MINUS_DI]]}
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
              <PriceCoordinate
                at="left"
                orient="left"
                price={0}
                displayFormat={format(".2f")}
              />
              <XAxis axisAt="bottom" orient="bottom" />
              <SingleValueTooltip
                yAccessor={minusdi50.accessor()}
                yLabel={`MINUS_DI (${minusdi50.options().windowSize})`}
                yDisplayFormat={format(".2f")}
                origin={[-30, 0]}
              />
              <YAxis axisAt="right" orient="right" ticks={3} />
              <LineSeries
                yAccessor={minusdi50.accessor()}
                stroke={minusdi50.stroke()}
              />
            </Chart>
          );
        case "MINUS_DM":
          return (
            <Chart
              yExtents={[(d) => [d.MINUS_DM]]}
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
              <PriceCoordinate
                at="left"
                orient="left"
                price={0}
                displayFormat={format(".2f")}
              />
              <XAxis axisAt="bottom" orient="bottom" />
              <SingleValueTooltip
                yAccessor={minusdm50.accessor()}
                yLabel={`MINUS_DM (${minusdm50.options().windowSize})`}
                yDisplayFormat={format(".2f")}
                origin={[-30, 0]}
              />
              <YAxis axisAt="right" orient="right" ticks={3} />
              <LineSeries
                yAccessor={minusdm50.accessor()}
                stroke={minusdm50.stroke()}
              />
            </Chart>
          );
        case "MOM":
          return (
            <Chart
              yExtents={[(d) => [d.MOM]]}
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
              <PriceCoordinate
                at="left"
                orient="left"
                price={0}
                displayFormat={format(".2f")}
              />
              <XAxis axisAt="bottom" orient="bottom" />
              <SingleValueTooltip
                yAccessor={mom50.accessor()}
                yLabel={`MOM (${mom50.options().windowSize})`}
                yDisplayFormat={format(".2f")}
                origin={[-30, 0]}
              />
              <YAxis axisAt="right" orient="right" ticks={3} />
              <LineSeries
                yAccessor={mom50.accessor()}
                stroke={mom50.stroke()}
              />
            </Chart>
          );
        case "PLUS_DI":
          return (
            <Chart
              yExtents={[(d) => [d.PLUS_DI]]}
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
              <PriceCoordinate
                at="left"
                orient="left"
                price={0}
                displayFormat={format(".2f")}
              />
              <XAxis axisAt="bottom" orient="bottom" />
              <SingleValueTooltip
                yAccessor={plusdi50.accessor()}
                yLabel={`PLUS_DI (${plusdi50.options().windowSize})`}
                yDisplayFormat={format(".2f")}
                origin={[-30, 0]}
              />
              <YAxis axisAt="right" orient="right" ticks={3} />

              <LineSeries
                yAccessor={plusdi50.accessor()}
                stroke={plusdi50.stroke()}
              />
            </Chart>
          );
        case "PLUS_DM":
          return (
            <Chart
              yExtents={[(d) => [d.PLUS_DM]]}
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
              <PriceCoordinate
                at="left"
                orient="left"
                price={0}
                displayFormat={format(".2f")}
              />
              <XAxis axisAt="bottom" orient="bottom" />

              <SingleValueTooltip
                yAccessor={plusdm50.accessor()}
                yLabel={`PLUS_DM (${plusdm50.options().windowSize})`}
                yDisplayFormat={format(".2f")}
                origin={[-30, 0]}
              />

              <YAxis axisAt="right" orient="right" ticks={3} />
              <LineSeries
                yAccessor={plusdm50.accessor()}
                stroke={plusdm50.stroke()}
              />
            </Chart>
          );
        case "PPO":
          return (
            <Chart
              yExtents={[(d) => [d.PPO]]}
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
              <PriceCoordinate
                at="left"
                orient="left"
                price={0}
                displayFormat={format(".2f")}
              />
              <XAxis axisAt="bottom" orient="bottom" />

              <SingleValueTooltip
                yAccessor={ppo50.accessor()}
                yLabel={`PPO (${ppo50.options().windowSize})`}
                yDisplayFormat={format(".2f")}
                origin={[-30, 0]}
              />

              <YAxis axisAt="right" orient="right" ticks={3} />
              <LineSeries
                yAccessor={ppo50.accessor()}
                stroke={ppo50.stroke()}
              />
            </Chart>
          );
        case "ROC":
          return (
            <Chart
              yExtents={[(d) => [d.ROC]]}
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
              <PriceCoordinate
                at="left"
                orient="left"
                price={0}
                displayFormat={format(".2f")}
              />
              <XAxis axisAt="bottom" orient="bottom" />

              <SingleValueTooltip
                yAccessor={roc50.accessor()}
                yLabel={`ROC (${roc50.options().windowSize})`}
                yDisplayFormat={format(".2f")}
                origin={[-30, 0]}
              />

              <YAxis axisAt="right" orient="right" ticks={3} />
              <LineSeries
                yAccessor={roc50.accessor()}
                stroke={roc50.stroke()}
              />
            </Chart>
          );
        case "ROCP":
          return (
            <Chart
              yExtents={[(d) => [d.ROCP]]}
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
              <PriceCoordinate
                at="left"
                orient="left"
                price={0}
                displayFormat={format(".2f")}
              />
              <XAxis axisAt="bottom" orient="bottom" />

              <SingleValueTooltip
                yAccessor={rocp50.accessor()}
                yLabel={`ROCP (${rocp50.options().windowSize})`}
                yDisplayFormat={format(".2f")}
                origin={[-30, 0]}
              />

              <YAxis axisAt="right" orient="right" ticks={3} />
              <LineSeries
                yAccessor={rocp50.accessor()}
                stroke={rocp50.stroke()}
              />
            </Chart>
          );
        case "ROCR":
          return (
            <Chart
              yExtents={[(d) => [d.ROCR]]}
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
              <PriceCoordinate
                at="left"
                orient="left"
                price={0}
                displayFormat={format(".2f")}
              />
              <XAxis axisAt="bottom" orient="bottom" />

              <SingleValueTooltip
                yAccessor={rocr50.accessor()}
                yLabel={`ROCR (${rocr50.options().windowSize})`}
                yDisplayFormat={format(".2f")}
                origin={[-30, 0]}
              />

              <YAxis axisAt="right" orient="right" ticks={3} />
              <LineSeries
                yAccessor={rocr50.accessor()}
                stroke={rocr50.stroke()}
              />
            </Chart>
          );
        case "ROCR100":
          return (
            <Chart
              yExtents={[(d) => [d.ROCR100]]}
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
              <PriceCoordinate
                at="left"
                orient="left"
                price={0}
                displayFormat={format(".2f")}
              />
              <XAxis axisAt="bottom" orient="bottom" />

              <SingleValueTooltip
                yAccessor={rocr100.accessor()}
                yLabel={`ROCR (${rocr100.options().windowSize})`}
                yDisplayFormat={format(".2f")}
                origin={[-30, 0]}
              />

              <YAxis axisAt="right" orient="right" ticks={3} />
              <LineSeries
                yAccessor={rocr100.accessor()}
                stroke={rocr100.stroke()}
              />
            </Chart>
          );
        case "RSI":
          return (
            <Chart
              yExtents={[(d) => [d.RSI]]}
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
              <PriceCoordinate
                at="left"
                orient="left"
                price={0}
                displayFormat={format(".2f")}
              />
              <XAxis axisAt="bottom" orient="bottom" />

              <RSISeries yAccessor={(d) => d.RSI} />

              <RSITooltip
                origin={[-30, 0]}
                yAccessor={(d) => d.RSI}
                options={rsiCalculator.options()}
              />

              <YAxis axisAt="right" orient="right" ticks={3} />
            </Chart>
          );
        case "STOCH":
          return (
            <Chart
              yExtents={[0, 100]}
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
              <PriceCoordinate
                at="left"
                orient="left"
                price={0}
                displayFormat={format(".2f")}
              />
              <XAxis axisAt="bottom" orient="bottom" />

              <StochasticSeries yAccessor={(d) => d.STOCH} {...stoAppearance} />

              <StochasticTooltip
                origin={[-30, 0]}
                yAccessor={(d) => d.STOCH}
                options={stoch.options()}
                appearance={stoAppearance}
                label="STOCH"
              />

              <YAxis axisAt="right" orient="right" ticks={3} />
            </Chart>
          );
        case "STOCHF":
          return (
            <Chart
              yExtents={[0, 100]}
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
              <PriceCoordinate
                at="left"
                orient="left"
                price={0}
                displayFormat={format(".2f")}
              />
              <XAxis axisAt="bottom" orient="bottom" />

              <StochasticSeries
                yAccessor={(d) => d.STOCHF}
                {...stoAppearance}
              />

              <StochasticTooltip
                origin={[-30, 0]}
                yAccessor={(d) => d.STOCHF}
                options={stochf.options()}
                appearance={stoAppearance}
                label="STOCHF"
              />

              <YAxis axisAt="right" orient="right" ticks={3} />
            </Chart>
          );
        case "STOCHRSI":
          return (
            <Chart
              yExtents={[0, 100]}
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
              <PriceCoordinate
                at="left"
                orient="left"
                price={0}
                displayFormat={format(".2f")}
              />
              <XAxis axisAt="bottom" orient="bottom" />

              <StochasticSeries
                yAccessor={(d) => d.STOCHRSI}
                {...stoAppearance}
              />

              <StochasticTooltip
                origin={[-30, 0]}
                yAccessor={(d) => d.STOCHRSI}
                options={stochrsi.options()}
                appearance={stoAppearance}
                label="STOCHRSI"
              />

              <YAxis axisAt="right" orient="right" ticks={3} />
            </Chart>
          );
        case "TRIX":
          return (
            <Chart
              yExtents={[(d) => [d.TRIX]]}
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
              <PriceCoordinate
                at="left"
                orient="left"
                price={0}
                displayFormat={format(".2f")}
              />
              <XAxis axisAt="bottom" orient="bottom" />

              <SingleValueTooltip
                yAccessor={trix50.accessor()}
                yLabel={`TRIX (${trix50.options().windowSize})`}
                yDisplayFormat={format(".2f")}
                origin={[-30, 0]}
              />

              <YAxis axisAt="right" orient="right" ticks={3} />
              <LineSeries
                yAccessor={trix50.accessor()}
                stroke={trix50.stroke()}
              />
            </Chart>
          );
        case "ULTOSC":
          return (
            <Chart
              yExtents={[(d) => [d.ULTOSC]]}
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
              <PriceCoordinate
                at="left"
                orient="left"
                price={0}
                displayFormat={format(".2f")}
              />
              <XAxis axisAt="bottom" orient="bottom" />

              <SingleValueTooltip
                yAccessor={ultosc50.accessor()}
                yLabel={`ULTOSC (${ultosc50.options().windowSize})`}
                yDisplayFormat={format(".2f")}
                origin={[-30, 0]}
              />

              <YAxis axisAt="right" orient="right" ticks={3} />
              <LineSeries
                yAccessor={ultosc50.accessor()}
                stroke={ultosc50.stroke()}
              />
            </Chart>
          );
        case "WILLR":
          return (
            <Chart
              yExtents={[(d) => [d.WILLR]]}
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
              <PriceCoordinate
                at="left"
                orient="left"
                price={0}
                displayFormat={format(".2f")}
              />
              <XAxis axisAt="bottom" orient="bottom" />

              <SingleValueTooltip
                yAccessor={willr50.accessor()}
                yLabel={`WILLR (${willr50.options().windowSize})`}
                yDisplayFormat={format(".2f")}
                origin={[-30, 0]}
              />

              <YAxis axisAt="right" orient="right" ticks={3} />
              <LineSeries
                yAccessor={willr50.accessor()}
                stroke={willr50.stroke()}
              />
            </Chart>
          );
        case "AD":
          return (
            <Chart
              yExtents={[(d) => [d.AD]]}
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
              <PriceCoordinate
                at="left"
                orient="left"
                price={0}
                displayFormat={format(".2f")}
              />
              <XAxis axisAt="bottom" orient="bottom" />

              <SingleValueTooltip
                yAccessor={ad50.accessor()}
                yLabel={`AD (${ad50.options().windowSize})`}
                yDisplayFormat={format(".2f")}
                origin={[-30, 0]}
              />

              <YAxis axisAt="right" orient="right" ticks={3} />
              <LineSeries yAccessor={ad50.accessor()} stroke={ad50.stroke()} />
            </Chart>
          );
        case "ADOSC":
          return (
            <Chart
              yExtents={[(d) => [d.ADOSC]]}
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
              <PriceCoordinate
                at="left"
                orient="left"
                price={0}
                displayFormat={format(".2f")}
              />
              <XAxis axisAt="bottom" orient="bottom" />

              <SingleValueTooltip
                yAccessor={adsoc50.accessor()}
                yLabel={`ADOSC (${adsoc50.options().windowSize})`}
                yDisplayFormat={format(".2f")}
                origin={[-30, 0]}
              />

              <YAxis axisAt="right" orient="right" ticks={3} />
              <LineSeries
                yAccessor={adsoc50.accessor()}
                stroke={adsoc50.stroke()}
              />
            </Chart>
          );
        case "OBV":
          return (
            <Chart
              yExtents={[(d) => [d.OBV]]}
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
              <PriceCoordinate
                at="left"
                orient="left"
                price={0}
                displayFormat={format(".2f")}
              />
              <XAxis axisAt="bottom" orient="bottom" />

              <SingleValueTooltip
                yAccessor={obv50.accessor()}
                yLabel={`OBV (${obv50.options().windowSize})`}
                yDisplayFormat={format(".2f")}
                origin={[-30, 0]}
              />

              <YAxis axisAt="right" orient="right" ticks={3} />
              <LineSeries
                yAccessor={obv50.accessor()}
                stroke={obv50.stroke()}
              />
            </Chart>
          );
        case "ATR":
          return (
            <Chart
              yExtents={[(d) => [d.ATR]]}
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
              <PriceCoordinate
                at="left"
                orient="left"
                price={0}
                displayFormat={format(".2f")}
              />
              <XAxis axisAt="bottom" orient="bottom" />

              <SingleValueTooltip
                yAccessor={atr50.accessor()}
                yLabel={`ATR (${atr50.options().windowSize})`}
                yDisplayFormat={format(".2f")}
                origin={[-30, 0]}
              />

              <YAxis axisAt="right" orient="right" ticks={3} />
              <LineSeries
                yAccessor={atr50.accessor()}
                stroke={atr50.stroke()}
              />
            </Chart>
          );
        case "NATR":
          return (
            <Chart
              yExtents={[(d) => [d.NATR]]}
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
              <PriceCoordinate
                at="left"
                orient="left"
                price={0}
                displayFormat={format(".2f")}
              />
              <XAxis axisAt="bottom" orient="bottom" />

              <SingleValueTooltip
                yAccessor={natr50.accessor()}
                yLabel={`NATR (${natr50.options().windowSize})`}
                yDisplayFormat={format(".2f")}
                origin={[-30, 0]}
              />

              <YAxis axisAt="right" orient="right" ticks={3} />
              <LineSeries
                yAccessor={natr50.accessor()}
                stroke={natr50.stroke()}
              />
            </Chart>
          );
        case "TRANGE":
          return (
            <Chart
              yExtents={[(d) => [d.TRANGE]]}
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
              <PriceCoordinate
                at="left"
                orient="left"
                price={0}
                displayFormat={format(".2f")}
              />
              <XAxis axisAt="bottom" orient="bottom" />

              <SingleValueTooltip
                yAccessor={trange50.accessor()}
                yLabel={`TRANGE (${trange50.options().windowSize})`}
                yDisplayFormat={format(".2f")}
                origin={[-30, 0]}
              />

              <YAxis axisAt="right" orient="right" ticks={3} />
              <LineSeries
                yAccessor={trange50.accessor()}
                stroke={trange50.stroke()}
              />
            </Chart>
          );
        case "AVGPRICE":
          return (
            <Chart
              yExtents={[(d) => [d.AVGPRICE]]}
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
              <PriceCoordinate
                at="left"
                orient="left"
                price={0}
                displayFormat={format(".2f")}
              />
              <XAxis axisAt="bottom" orient="bottom" />

              <SingleValueTooltip
                yAccessor={avg50.accessor()}
                yLabel={`AVGPRICE (${avg50.options().windowSize})`}
                yDisplayFormat={format(".2f")}
                origin={[-30, 0]}
              />

              <YAxis axisAt="right" orient="right" ticks={3} />
              <LineSeries
                yAccessor={avg50.accessor()}
                stroke={avg50.stroke()}
              />
            </Chart>
          );
        case "MEDPRICE":
          return (
            <Chart
              yExtents={[(d) => [d.MEDPRICE]]}
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
              <PriceCoordinate
                at="left"
                orient="left"
                price={0}
                displayFormat={format(".2f")}
              />
              <XAxis axisAt="bottom" orient="bottom" />

              <SingleValueTooltip
                yAccessor={med50.accessor()}
                yLabel={`MEDPRICE (${med50.options().windowSize})`}
                yDisplayFormat={format(".2f")}
                origin={[-30, 0]}
              />

              <YAxis axisAt="right" orient="right" ticks={3} />
              <LineSeries
                yAccessor={med50.accessor()}
                stroke={med50.stroke()}
              />
            </Chart>
          );
        case "TYPPRICE":
          return (
            <Chart
              yExtents={[(d) => [d.TYPPRICE]]}
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
              <PriceCoordinate
                at="left"
                orient="left"
                price={0}
                displayFormat={format(".2f")}
              />
              <XAxis axisAt="bottom" orient="bottom" />

              <SingleValueTooltip
                yAccessor={typ50.accessor()}
                yLabel={`TYPPRICE (${typ50.options().windowSize})`}
                yDisplayFormat={format(".2f")}
                origin={[-30, 0]}
              />

              <YAxis axisAt="right" orient="right" ticks={3} />
              <LineSeries
                yAccessor={typ50.accessor()}
                stroke={typ50.stroke()}
              />
            </Chart>
          );
        case "WCLPRICE":
          return (
            <Chart
              yExtents={[(d) => [d.WCLPRICE]]}
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
              <PriceCoordinate
                at="left"
                orient="left"
                price={0}
                displayFormat={format(".2f")}
              />
              <XAxis axisAt="bottom" orient="bottom" />

              <SingleValueTooltip
                yAccessor={wcl50.accessor()}
                yLabel={`WCLPRICE (${wcl50.options().windowSize})`}
                yDisplayFormat={format(".2f")}
                origin={[-30, 0]}
              />

              <YAxis axisAt="right" orient="right" ticks={3} />
              <LineSeries
                yAccessor={wcl50.accessor()}
                stroke={wcl50.stroke()}
              />
            </Chart>
          );
        case "HT_DCPERIOD":
          return (
            <Chart
              yExtents={[(d) => [d.HT_DCPERIOD]]}
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
              <PriceCoordinate
                at="left"
                orient="left"
                price={0}
                displayFormat={format(".2f")}
              />
              <XAxis axisAt="bottom" orient="bottom" />

              <SingleValueTooltip
                yAccessor={htdcpr50.accessor()}
                yLabel={`HT_DCPERIOD (${htdcpr50.options().windowSize})`}
                yDisplayFormat={format(".2f")}
                origin={[-30, 0]}
              />

              <YAxis axisAt="right" orient="right" ticks={3} />
              <LineSeries
                yAccessor={htdcpr50.accessor()}
                stroke={htdcpr50.stroke()}
              />
            </Chart>
          );
        case "HT_DCPHASE":
          return (
            <Chart
              yExtents={[(d) => [d.HT_DCPHASE]]}
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
              <PriceCoordinate
                at="left"
                orient="left"
                price={0}
                displayFormat={format(".2f")}
              />
              <XAxis axisAt="bottom" orient="bottom" />

              <SingleValueTooltip
                yAccessor={htdcph50.accessor()}
                yLabel={`HT_DCPHASE (${htdcph50.options().windowSize})`}
                yDisplayFormat={format(".2f")}
                origin={[-30, 0]}
              />

              <YAxis axisAt="right" orient="right" ticks={3} />
              <LineSeries
                yAccessor={htdcph50.accessor()}
                stroke={htdcph50.stroke()}
              />
            </Chart>
          );
        case "HT_PHASOR":
          return (
            <Chart
              yExtents={[(d) => [d.HT_PHASOR0, d.HT_PHASOR1]]}
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
              <PriceCoordinate
                at="left"
                orient="left"
                price={0}
                displayFormat={format(".2f")}
              />
              <YAxis axisAt="right" orient="right" ticks={3} />
              <SingleValueTooltip
                yAccessor={htdcphsr050.accessor()}
                yLabel={`HT_PHASOR0 (${htdcphsr050.options().windowSize})`}
                yDisplayFormat={format(".2f")}
                origin={[-30, 0]}
              />
              <SingleValueTooltip
                yAccessor={htdcphsr150.accessor()}
                yLabel={`HT_PHASOR1 (${htdcphsr150.options().windowSize})`}
                yDisplayFormat={format(".2f")}
                origin={[120, 0]}
              />
              <LineSeries
                yAccessor={htdcphsr050.accessor()}
                stroke={htdcphsr050.stroke()}
              />
              <LineSeries
                yAccessor={htdcphsr150.accessor()}
                stroke={htdcphsr150.stroke()}
              />
            </Chart>
          );
        case "HT_SINE":
          return (
            <Chart
              yExtents={[(d) => [d.HT_SINE0, d.HT_SINE1]]}
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
              <PriceCoordinate
                at="left"
                orient="left"
                price={0}
                displayFormat={format(".2f")}
              />
              <YAxis axisAt="right" orient="right" ticks={3} />
              <SingleValueTooltip
                yAccessor={htsine050.accessor()}
                yLabel={`HT_SINE0 (${htsine050.options().windowSize})`}
                yDisplayFormat={format(".2f")}
                origin={[-30, 0]}
              />
              <SingleValueTooltip
                yAccessor={htsine150.accessor()}
                yLabel={`HT_SINE1 (${htsine150.options().windowSize})`}
                yDisplayFormat={format(".2f")}
                origin={[80, 0]}
              />
              <LineSeries
                yAccessor={htsine050.accessor()}
                stroke={htsine050.stroke()}
              />
              <LineSeries
                yAccessor={htsine150.accessor()}
                stroke={htsine150.stroke()}
              />
            </Chart>
          );
        case "HT_TRENDMODE":
          return (
            <Chart
              yExtents={[(d) => [d.HT_TRENDMODE]]}
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
              <PriceCoordinate
                at="left"
                orient="left"
                price={0}
                displayFormat={format(".2f")}
              />
              <XAxis axisAt="bottom" orient="bottom" />

              <SingleValueTooltip
                yAccessor={httrend50.accessor()}
                yLabel={`HT_TRENDMODE (${httrend50.options().windowSize})`}
                yDisplayFormat={format(".2f")}
                origin={[-30, 0]}
              />

              <YAxis axisAt="right" orient="right" ticks={3} />
              <LineSeries
                yAccessor={httrend50.accessor()}
                stroke={httrend50.stroke()}
              />
            </Chart>
          );
        default:
          flag = true;
      }
    };
    const start = xAccessor(last(data));
    const end = xAccessor(data[Math.max(0, data.length - 50)]);
    const xExtents = [start, end];

    return (
      <>
        {flag ? (
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
                at="right"
                orient="right"
                displayFormat={format(".2f")}
              />

              <Indicators data={data} indicators={indicators} />
              <MouseCoordinateX
                at="bottom"
                orient="bottom"
                displayFormat={timeFormat("%Y-%m-%d")}
              />
              <RenkoSeries />
              <OHLCTooltip origin={[-30, -15]} />
            </Chart>
            <Chart
              id={2}
              yExtents={(d) => d.volume}
              height={150}
              origin={(w, h) => [0, h - 150]}
            >
              <YAxis
                axisAt="left"
                orient="left"
                ticks={5}
                tickFormat={format(".2s")}
              />

              <MouseCoordinateX
                at="bottom"
                orient="bottom"
                displayFormat={timeFormat("%Y-%m-%d")}
              />
              <MouseCoordinateY
                at="left"
                orient="left"
                displayFormat={format(".4s")}
              />

              <BarSeries
                yAccessor={(d) => d.volume}
                fill={(d) => (d.close > d.open ? "#a0c5af" : "#ff6666")}
              />
            </Chart>
            <CrossHairCursor strokeDasharray="LongDashDot" />
          </ChartCanvas>
        ) : (
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
              height={height * 0.6}
              yExtents={[(d) => [d.high, d.low]]}
              padding={{ top: 45, bottom: 50 }}
            >
              <XAxis
                axisAt="bottom"
                orient="bottom"
                showTicks={false}
                outerTickSize={0}
              />
              <YAxis axisAt="right" orient="right" ticks={5} />
              <MouseCoordinateY
                at="right"
                orient="right"
                displayFormat={format(".2f")}
              />

              <Indicators data={data} indicators={indicators} />
              <RenkoSeries />
              <OHLCTooltip origin={[-30, -15]} />
            </Chart>
            <Chart
              id={2}
              yExtents={(d) => d.volume}
              height={height * 0.2}
              origin={(w, h) => [0, height * 0.4]}
            >
              <YAxis
                axisAt="left"
                orient="left"
                ticks={5}
                tickFormat={format(".2s")}
              />

              <MouseCoordinateY
                at="left"
                orient="left"
                displayFormat={format(".4s")}
              />

              <BarSeries
                yAccessor={(d) => d.volume}
                fill={(d) => (d.close > d.open ? "#a0c5af" : "#ff6666")}
              />
            </Chart>
            {priceChart()}
            <CrossHairCursor strokeDasharray="LongDashDot" />
          </ChartCanvas>
        )}
      </>
    );
  }
}

Renko.propTypes = {
  data: PropTypes.array.isRequired,
  width: PropTypes.number.isRequired,
  ratio: PropTypes.number.isRequired,
  type: PropTypes.oneOf(["svg", "hybrid"]).isRequired,
};

Renko.defaultProps = {
  type: "svg",
};
Renko = fitWidth(Renko);

export default Renko;
