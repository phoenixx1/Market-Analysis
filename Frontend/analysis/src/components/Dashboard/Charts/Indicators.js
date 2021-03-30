import React from "react";
import { LineSeries } from "react-stockcharts/lib/series";
import { CurrentCoordinate } from "react-stockcharts/lib/coordinates";

import { MovingAverageTooltip } from "react-stockcharts/lib/tooltip";
import { ema, wma, sma } from "react-stockcharts/lib/indicator";
import SARSeries from "react-stockcharts/lib/series/SARSeries";
import SingleValueTooltip from "react-stockcharts/lib/tooltip/SingleValueTooltip";
import bollingerBand from "react-stockcharts/lib/indicator/bollingerBand";
import BollingerSeries from "react-stockcharts/lib/series/BollingerSeries";
import BollingerBandTooltip from "react-stockcharts/lib/tooltip/BollingerBandTooltip";

const bbStroke = {
  top: "#964B00",
  middle: "#000000",
  bottom: "#964B00",
};

const bbFill = "#4682B4";

class Indicators extends React.Component {
  render() {
    const { data: initialData, indicators } = this.props;
    // EMA
    const ema50 = ema()
      .options({ windowSize: 50 })
      .merge((d, c) => {
        d.EMA = c;
      })
      .accessor((d) => d.EMA)
      .stroke("blue");

    // SMA
    const sma50 = sma()
      .options({ windowSize: 50 })
      .merge((d, c) => {
        d.SMA = c;
      })
      .accessor((d) => d.SMA)
      .stroke("red");

    // DEMA
    const dema50 = sma()
      .options({ windowSize: 50 })
      .merge((d, c) => {
        d.DEMA = c;
      })
      .accessor((d) => d.DEMA)
      .stroke("green");

    // KAMA
    const kama50 = sma()
      .options({ windowSize: 50 })
      .merge((d, c) => {
        d.KAMA = c;
      })
      .accessor((d) => d.KAMA)
      .stroke("yellow");

    // HT_TRENDLINE
    const htline50 = sma()
      .options({ windowSize: 50 })
      .merge((d, c) => {
        d.HT_TRENDLINE = c;
      })
      .accessor((d) => d.HT_TRENDLINE)
      .stroke("black");

    // T3
    const t350 = sma()
      .options({ windowSize: 50 })
      .merge((d, c) => {
        d.T3 = c;
      })
      .accessor((d) => d.T3)
      .stroke("brown");

    // TEMA
    const tema50 = sma()
      .options({ windowSize: 50 })
      .merge((d, c) => {
        d.TEMA = c;
      })
      .accessor((d) => d.TEMA)
      .stroke("#78c4d4");

    // TRIMA
    const trima50 = sma()
      .options({ windowSize: 50 })
      .merge((d, c) => {
        d.TRIMA = c;
      })
      .accessor((d) => d.TRIMA)
      .stroke("orange");

    // WMA
    const wma50 = wma()
      .options({ windowSize: 50 })
      .merge((d, c) => {
        d.WMA = c;
      })
      .accessor((d) => d.WMA)
      .stroke("purple");

    // MAMA
    const mama50 = sma()
      .options({ windowSize: 50 })
      .merge((d, c) => {
        d.MAMA = c;
      })
      .accessor((d) => d.MAMA)
      .stroke("grey");

    // FAMA
    const fama50 = sma()
      .options({ windowSize: 50 })
      .merge((d, c) => {
        d.FAMA = c;
      })
      .accessor((d) => d.FAMA)
      .stroke("violet");

    // SAR
    const accelerationFactor = 0.02;
    const maxAccelerationFactor = 0.2;

    // BBANDS
    const bb = bollingerBand()
      .merge((d, c) => {
        d.BB = c;
      })
      .accessor((d) => d.BB);

    return (
      <>
        {indicators["SMA"] ? (
          <>
            <LineSeries
              yAccessor={sma50.accessor()}
              stroke={sma50.stroke()}
              highlightOnHover
            />
            <CurrentCoordinate
              yAccessor={sma50.accessor()}
              fill={sma50.stroke()}
            />
            <MovingAverageTooltip
              onClick={(e) => console.log(e)}
              origin={[0, 0]}
              options={[
                {
                  yAccessor: sma50.accessor(),
                  type: "SMA",
                  stroke: sma50.stroke(),
                  windowSize: sma50.options().windowSize,
                  echo: "some echo here",
                },
              ]}
            />
          </>
        ) : (
          <></>
        )}
        {indicators["EMA"] ? (
          <>
            <LineSeries
              yAccessor={ema50.accessor()}
              stroke={ema50.stroke()}
              highlightOnHover
            />
            <CurrentCoordinate
              yAccessor={ema50.accessor()}
              fill={ema50.stroke()}
            />
            <MovingAverageTooltip
              onClick={(e) => console.log(e)}
              origin={[60, 0]}
              options={[
                {
                  yAccessor: ema50.accessor(),
                  type: "EMA",
                  stroke: ema50.stroke(),
                  windowSize: ema50.options().windowSize,
                  echo: "some echo here",
                },
              ]}
            />
          </>
        ) : (
          <></>
        )}
        {indicators["DEMA"] ? (
          <>
            <LineSeries
              yAccessor={dema50.accessor()}
              stroke={dema50.stroke()}
              highlightOnHover
            />
            <CurrentCoordinate
              yAccessor={dema50.accessor()}
              fill={dema50.stroke()}
            />
            <MovingAverageTooltip
              onClick={(e) => console.log(e)}
              origin={[120, 0]}
              options={[
                {
                  yAccessor: dema50.accessor(),
                  type: "DEMA",
                  stroke: dema50.stroke(),
                  windowSize: dema50.options().windowSize,
                  echo: "some echo here",
                },
              ]}
            />
          </>
        ) : (
          <></>
        )}
        {indicators["KAMA"] ? (
          <>
            <LineSeries
              yAccessor={kama50.accessor()}
              stroke={kama50.stroke()}
              highlightOnHover
            />
            <CurrentCoordinate
              yAccessor={kama50.accessor()}
              fill={kama50.stroke()}
            />
            <MovingAverageTooltip
              onClick={(e) => console.log(e)}
              origin={[185, 0]}
              options={[
                {
                  yAccessor: kama50.accessor(),
                  type: "KAMA",
                  stroke: kama50.stroke(),
                  windowSize: kama50.options().windowSize,
                  echo: "some echo here",
                },
              ]}
            />
          </>
        ) : (
          <></>
        )}
        {indicators["HT_TRENDLINE"] ? (
          <>
            <LineSeries
              yAccessor={htline50.accessor()}
              stroke={htline50.stroke()}
              highlightOnHover
            />
            <CurrentCoordinate
              yAccessor={htline50.accessor()}
              fill={htline50.stroke()}
            />
            <MovingAverageTooltip
              onClick={(e) => console.log(e)}
              origin={[250, 0]}
              options={[
                {
                  yAccessor: htline50.accessor(),
                  type: "HT_TRENDLINE",
                  stroke: htline50.stroke(),
                  windowSize: htline50.options().windowSize,
                  echo: "some echo here",
                },
              ]}
            />
          </>
        ) : (
          <></>
        )}
        {indicators["T3"] ? (
          <>
            <LineSeries
              yAccessor={t350.accessor()}
              stroke={t350.stroke()}
              highlightOnHover
            />
            <CurrentCoordinate
              yAccessor={t350.accessor()}
              fill={t350.stroke()}
            />
            <MovingAverageTooltip
              onClick={(e) => console.log(e)}
              origin={[365, 0]}
              options={[
                {
                  yAccessor: t350.accessor(),
                  type: "T3",
                  stroke: t350.stroke(),
                  windowSize: t350.options().windowSize,
                  echo: "some echo here",
                },
              ]}
            />
          </>
        ) : (
          <></>
        )}
        {indicators["TEMA"] ? (
          <>
            <LineSeries
              yAccessor={tema50.accessor()}
              stroke={tema50.stroke()}
              highlightOnHover
            />
            <CurrentCoordinate
              yAccessor={tema50.accessor()}
              fill={tema50.stroke()}
            />
            <MovingAverageTooltip
              onClick={(e) => console.log(e)}
              origin={[415, 0]}
              options={[
                {
                  yAccessor: tema50.accessor(),
                  type: "TEMA",
                  stroke: tema50.stroke(),
                  windowSize: tema50.options().windowSize,
                  echo: "some echo here",
                },
              ]}
            />
          </>
        ) : (
          <></>
        )}
        {indicators["TRIMA"] ? (
          <>
            <LineSeries
              yAccessor={trima50.accessor()}
              stroke={trima50.stroke()}
              highlightOnHover
            />
            <CurrentCoordinate
              yAccessor={trima50.accessor()}
              fill={trima50.stroke()}
            />
            <MovingAverageTooltip
              onClick={(e) => console.log(e)}
              origin={[480, 0]}
              options={[
                {
                  yAccessor: trima50.accessor(),
                  type: "TRIMA",
                  stroke: trima50.stroke(),
                  windowSize: trima50.options().windowSize,
                  echo: "some echo here",
                },
              ]}
            />
          </>
        ) : (
          <></>
        )}
        {indicators["WMA"] ? (
          <>
            <LineSeries
              yAccessor={wma50.accessor()}
              stroke={wma50.stroke()}
              highlightOnHover
            />
            <CurrentCoordinate
              yAccessor={wma50.accessor()}
              fill={wma50.stroke()}
            />
            <MovingAverageTooltip
              onClick={(e) => console.log(e)}
              origin={[545, 0]}
              options={[
                {
                  yAccessor: wma50.accessor(),
                  type: "WMA",
                  stroke: wma50.stroke(),
                  windowSize: wma50.options().windowSize,
                  echo: "some echo here",
                },
              ]}
            />
          </>
        ) : (
          <></>
        )}
        {indicators["MAMA"] ? (
          <>
            <LineSeries
              yAccessor={mama50.accessor()}
              stroke={mama50.stroke()}
              highlightOnHover
            />
            <LineSeries
              yAccessor={fama50.accessor()}
              stroke={fama50.stroke()}
              highlightOnHover
            />
            <CurrentCoordinate
              yAccessor={mama50.accessor()}
              fill={mama50.stroke()}
            />
            <CurrentCoordinate
              yAccessor={fama50.accessor()}
              fill={fama50.stroke()}
            />
            <MovingAverageTooltip
              onClick={(e) => console.log(e)}
              origin={[605, 0]}
              options={[
                {
                  yAccessor: mama50.accessor(),
                  type: "MAMA",
                  stroke: mama50.stroke(),
                  windowSize: mama50.options().windowSize,
                  echo: "some echo here",
                },
              ]}
            />
            <MovingAverageTooltip
              onClick={(e) => console.log(e)}
              origin={[670, 0]}
              options={[
                {
                  yAccessor: fama50.accessor(),
                  type: "FAMA",
                  stroke: fama50.stroke(),
                  windowSize: fama50.options().windowSize,
                  echo: "some echo here",
                },
              ]}
            />
          </>
        ) : (
          <></>
        )}
        {indicators["SAR"] ? (
          <>
            <SARSeries yAccessor={(d) => d.SAR} />
            <SingleValueTooltip
              yLabel={`SAR (${accelerationFactor}, ${maxAccelerationFactor})`}
              yAccessor={(d) => d.SAR}
              origin={[0, 40]}
            />
          </>
        ) : (
          <></>
        )}
        {indicators["SAREXT"] ? (
          <>
            <SARSeries yAccessor={(d) => d.SAREXT} />
            <SingleValueTooltip
              yLabel={`SAREXT (${accelerationFactor}, ${maxAccelerationFactor})`}
              yAccessor={(d) => d.SAREXT}
              origin={[0, 55]}
            />
          </>
        ) : (
          <></>
        )}
        {indicators["BBANDS"] ? (
          <>
            <BollingerSeries
              yAccessor={(d) => d.BB}
              stroke={bbStroke}
              fill={bbFill}
            />
            <BollingerBandTooltip
              origin={[130, 40]}
              yAccessor={(d) => d.BB}
              options={bb.options()}
            />
          </>
        ) : (
          <></>
        )}
        BBANDS
      </>
    );
  }
}

export default Indicators;
