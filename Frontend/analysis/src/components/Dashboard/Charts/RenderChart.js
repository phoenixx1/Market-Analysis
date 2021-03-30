import React from "react";
import { connect } from "react-redux";
import styled from "styled-components";
import {
  fetchPrices,
  setChartType,
  loadStudies,
  latestStudy,
} from "../../../actions";
import { TypeChooser, SaveChartAsImage } from "react-stockcharts/lib/helper";
import CandleStick from "./CandleStick";
import AreaChart from "./AreaChart";
import LineChart from "./LineChart";
import OHLCChart from "./OHLCChart";
import KagiChart from "./KagiChart";
import RenkoChart from "./RenkoChart";
import PointFigureChart from "./PointFigureChart";

import ReactDOM from "react-dom";
import { Spinner } from "react-bootstrap";

class RenderChart extends React.Component {
  constructor(props) {
    super(props);
    this.saveNode = this.saveNode.bind(this);
    this.saveChartAsImage = this.saveChartAsImage.bind(this);
  }
  saveNode(node) {
    this.chart = node;
  }
  saveChartAsImage() {
    var container = ReactDOM.findDOMNode(this.chart); // eslint-disable-line react/no-find-dom-node
    SaveChartAsImage.saveChartAsImage(container);
  }

  componentDidMount() {
    this.props.fetchPrices();
  }

  render() {
    let data = [];

    this.props.prices.map((curr) => {
      curr.map((c) => {
        var dt = c.Date.toString();
        let tempDate = new Date(
          dt.substring(0, 4),
          dt.substring(4, 6) - 1,
          dt.substring(6, 8)
        );
        var bb = { top: c.BBANDS0, middle: c.BBANDS1, bottom: c.BBANDS2 };

        var macd = { macd: c.MACD0, signal: c.MACD1, divergence: c.MACD2 };

        var macdext = {
          macd: c.MACDEXT0,
          signal: c.MACDEXT1,
          divergence: c.MACDEXT2,
        };
        var macdfix = {
          macd: c.MACDFIX0,
          signal: c.MACDFIX1,
          divergence: c.MACDFIX2,
        };
        var stoch = { K: c.STOCH0, D: c.STOCH1 };

        var stochf = { K: c.STOCHF0, D: c.STOCHF1 };

        var stochrsi = { K: c.STOCHRSI0, D: c.STOCHRSI1 };

        data.push({
          date: tempDate,
          open: +c.Open,
          high: +c.High,
          low: +c.Low,
          close: +c.Close,
          volume: c.Volume,

          // Overlap Studies
          BB: bb, //
          DEMA: +c.DEMA, //
          EMA: +c.EMA, //
          HT_TRENDLINE: +c.HT_TRENDLINE, //
          KAMA: +c.KAMA, //
          MAMA: +c.MAMA0, //
          FAMA: +c.MAMA1, //
          MIDPOINT: +c.MIDPOINT, //
          MIDPRICE: +c.MIDPRICE, //
          SAR: +c.SAR, //
          SAREXT: +c.SAREXT, //
          SMA: +c.SMA, //
          T3: +c.T3, //
          TEMA: +c.TEMA, //
          TRIMA: +c.TRIMA, //
          WMA: +c.WMA, //

          // MomentumIndicators
          ADX: c.ADX, //
          ADXR: c.ADXR,
          APO: c.APO,
          AROON0: c.AROON0,
          AROON1: c.AROON1,
          AROONOSC: c.AROONOSC,
          BOP: c.BOP,
          CCI: c.CCI,
          CMO: c.CMO,
          DX: c.DX,
          MACD: macd,
          MACDEXT: macdext,
          MACDFIX: macdfix,
          MFI: c.MFI,
          MINUS_DI: c.MINUS_DI,
          MINUS_DM: c.MINUS_DM,
          MOM: c.MOM,
          PLUS_DI: c.PLUS_DI,
          PLUS_DM: c.PLUS_DM,
          PPO: c.PPO,
          ROC: c.ROC,
          ROCP: c.ROCP,
          ROCR: c.ROCR,
          ROCR100: c.ROCR100,
          RSI: c.RSI,
          STOCH: stoch,
          STOCHF: stochf,
          STOCHRSI: stochrsi,
          TRIX: c.TRIX,
          ULTOSC: c.ULTOSC,
          WILLR: c.WILLR,

          // Volume Incdicators
          AD: c.AD,
          ADOSC: c.ADOSC,
          OBV: c.OBV,

          // Volatility Indicators
          ATR: c.ATR,
          NATR: c.NATR,
          TRANGE: c.TRANGE,

          // Price Transform
          AVGPRICE: c.AVGPRICE,
          MEDPRICE: c.MEDPRICE,
          TYPPRICE: c.TYPPRICE,
          WCLPRICE: c.WCLPRICE,

          // Cycle Indicators
          HT_DCPERIOD: c.HT_DCPERIOD,
          HT_DCPHASE: c.HT_DCPHASE,
          HT_PHASOR0: c.HT_PHASOR0,
          HT_PHASOR1: c.HT_PHASOR1,
          HT_SINE0: c.HT_SINE0,
          HT_SINE1: c.HT_SINE1,
          HT_TRENDMODE: c.HT_TRENDMODE,
        });
      });
    });

    // console.log(data);
    if (data.length === 0) {
      return (
        <div
          style={{
            alignItems: "center",
            justifyContent: "center",
            width: "100vw",
            display: "flex",
            height: window.innerHeight - 100,
          }}
        >
          <Spinner animation="border" role="status" />
        </div>
      );
    }
    let indicators = {};
    this.props.studies.map((study) => {
      indicators[study] = !indicators[study];
    });
    switch (this.props.currentType) {
      case "CandleStick":
        return (
          <ChartContainer>
            {/* <TypeChooser>
              {(type) => (
                <CandleStick
                  ref={this.saveNode}
                  type={type}
                  data={data}
                  indicators={indicators}
                />
              )}
            </TypeChooser> */}

            <CandleStick
              type={"canvas + svg"}
              data={data}
              indicators={indicators}
              selectedStudy={this.props.selectedStudy}
            />
          </ChartContainer>
        );
        break;
      case "Area":
        return (
          <ChartContainer>
            <AreaChart
              type={"canvas + svg"}
              data={data}
              indicators={indicators}
              selectedStudy={this.props.selectedStudy}
            />
          </ChartContainer>
        );
        break;
      case "Line":
        return (
          <ChartContainer>
            <LineChart
              type={"canvas + svg"}
              data={data}
              indicators={indicators}
              selectedStudy={this.props.selectedStudy}
            />
          </ChartContainer>
        );
        break;
      case "OHLC":
        return (
          <ChartContainer>
            <OHLCChart
              type={"canvas + svg"}
              data={data}
              indicators={indicators}
              selectedStudy={this.props.selectedStudy}
            />
          </ChartContainer>
        );
        break;
      case "Kagi":
        return (
          <ChartContainer>
            <KagiChart
              type={"canvas + svg"}
              data={data}
              indicators={indicators}
              selectedStudy={this.props.selectedStudy}
            />
          </ChartContainer>
        );
        break;
      case "Renko":
        return (
          <ChartContainer>
            <RenkoChart
              type={"canvas + svg"}
              data={data}
              indicators={indicators}
              selectedStudy={this.props.selectedStudy}
            />
          </ChartContainer>
        );
        break;
      case "Point & Figure":
        return (
          <ChartContainer>
            <PointFigureChart
              type={"canvas + svg"}
              data={data}
              indicators={indicators}
              selectedStudy={this.props.selectedStudy}
            />
          </ChartContainer>
        );
        break;
      default:
        break;
    }
  }
}
const mapStateToProps = (state) => {
  return {
    prices: state.prices,
    currentType: state.currentChartType,
    studies: state.loadStudies,
    selectedStudy: state.selectedStudy,
  };
};

export default connect(mapStateToProps, {
  fetchPrices,
  setChartType,
  loadStudies,
  latestStudy,
})(RenderChart);

const ChartContainer = styled.div`
  justify-content: center;
  flex: 0.7;
  /* height: 560px; */
  /* overflow-y: scroll; */
`;
