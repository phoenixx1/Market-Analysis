import React from "react";
import { connect } from "react-redux";
import styled from "styled-components";
import LineChart from "./LineChart";
import { fetchArima,setName } from "../../../actions";
import { Spinner } from "react-bootstrap";

class RenderChart extends React.Component {
  componentDidMount() {
    // this.props.fetchArima(this.props.currentCompany);
  }

  render() {
    this.props.fetchArima(this.props.currentCompany);
    let data = [];

    this.props.arima.map((curr) => {
      curr.map((c) => {
        var dt = new Date(c.Date);
 
        data.push({
          date: dt,
          VWAP: c.VWAP,
          Forecast: c.Forecast_ARIMA,
        });
      });
    });

    if (data.length === 0) {
      return (
        <div
          style={{
            alignItems: "center",
            justifyContent: "center",
            width: window.innerWidth - window.innerWidth * 0.6,
            display: "flex",
            height: window.innerHeight - window.innerHeight * 0.5,
          }}
        >
          <Spinner animation="border" role="status" />
        </div>
      );
    }
    return (
      <ChartContainer>
        <LineChart type={"canvas + svg"} data={data} />
      </ChartContainer>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    arima: state.arima,currentCompany:state.currentCompany,
  };
};

export default connect(mapStateToProps, {
  fetchArima,setName
})(RenderChart);

const ChartContainer = styled.div`
  justify-content: center;
  /* flex: 0.7; */
  /* height: 560px; */
  /* overflow-y: scroll; */
`;
