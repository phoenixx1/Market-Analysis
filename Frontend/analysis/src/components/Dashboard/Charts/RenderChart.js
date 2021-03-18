import React from "react";
import { connect } from "react-redux";
import styled from "styled-components";
import {
  fetchPrices,
  setChartType,
  loadStudies,
  fetchStudies,
} from "../../../actions";
// import { TypeChooser } from "react-stockcharts/lib/helper";
import CandleStick from "./CandleStick";
import AreaChart from "./AreaChart";
import LineChart from "./LineChart";
import OHLCChart from "./OHLCChart";
import KagiChart from "./KagiChart";
import RenkoChart from "./RenkoChart";
import PointFigureChart from "./PointFigureChart";
// import { timeFormat } from "d3-time-format";

class RenderChart extends React.Component {
  componentDidMount() {
    this.props.fetchPrices();
    this.props.fetchStudies();
  }

  render() {
    let data = [];
    let i = 0;
    this.props.prices.map((curr) => {
      curr.map((c) => {
        let tempDate = new Date(c.Date);
        // console.log(tempDate);

        data.push({
          date: tempDate,
          open: +c.Open,
          high: +c.High,
          low: +c.Low,
          close: +c.Close,
          SMA: this.props.studies[0][i++],
          // SMA: +c.SMA,
          // EMA: +c.EMA,
        });
      });
    });

    console.log(data);
    if (data.length === 0) {
      return <div>Loading....</div>;
    }
    let MA = true;
    // this.props.studies.map((study) => {
    //   if (study === "MA") MA = true;
    // });

    switch (this.props.currentType) {
      case "CandleStick":
        return (
          <ChartContainer>
            {/* <TypeChooser>
          {(type) => <ShowChart type={type} data={data} />}
        </TypeChooser> */}

            <CandleStick type={"canvas + svg"} data={data} MA={MA} />
          </ChartContainer>
        );
        break;
      case "Area":
        return (
          <ChartContainer>
            <AreaChart type={"canvas + svg"} data={data} MA={MA} />
          </ChartContainer>
        );
        break;
      case "Line":
        return (
          <ChartContainer>
            <LineChart type={"canvas + svg"} data={data} MA={MA} />
          </ChartContainer>
        );
        break;
      case "OHLC":
        return (
          <ChartContainer>
            <OHLCChart type={"canvas + svg"} data={data} MA={MA} />
          </ChartContainer>
        );
        break;
      case "Kagi":
        return (
          <ChartContainer>
            <KagiChart type={"canvas + svg"} data={data} />
          </ChartContainer>
        );
        break;
      case "Renko":
        return (
          <ChartContainer>
            <RenkoChart type={"canvas + svg"} data={data} />
          </ChartContainer>
        );
        break;
      case "Point & Figure":
        return (
          <ChartContainer>
            <PointFigureChart type={"canvas + svg"} data={data} />
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
  };
};

export default connect(mapStateToProps, {
  fetchPrices,
  setChartType,
  loadStudies,
  fetchStudies,
})(RenderChart);

const ChartContainer = styled.div`
  justify-content: center;
  flex: 0.7;
  /* height: 560px; */
  /* overflow-y: scroll; */
`;
