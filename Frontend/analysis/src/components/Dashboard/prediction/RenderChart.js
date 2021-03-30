import React from "react";
import { connect } from "react-redux";
import styled from "styled-components";
import LineChart from "./LineChart";
import { fetchPrices } from "../../../actions";
import { Spinner } from "react-bootstrap";

class RenderChart extends React.Component {
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

        data.push({
          date: tempDate,
          open: +c.Open,
          high: +c.High,
          low: +c.Low,
          close: +c.Close,
          volume: c.Volume,
        });
      });
    });

    if (data.length === 0) {
      return (
        <div
          style={{
            alignItems: "center",
            justifyContent: "center",
            width: window.innerWidth - window.innerWidth * 0.42,
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
    prices: state.prices,
  };
};

export default connect(mapStateToProps, {
  fetchPrices,
})(RenderChart);

const ChartContainer = styled.div`
  justify-content: center;
  /* flex: 0.7; */
  /* height: 560px; */
  /* overflow-y: scroll; */
`;
