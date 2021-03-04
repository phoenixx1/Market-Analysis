import React from "react";
import { connect } from "react-redux";
import styled from "styled-components";
import { fetchPrices } from "../../../actions";
import { TypeChooser } from "react-stockcharts/lib/helper";
import ShowChart from "./ShowChart";
// import { timeFormat } from "d3-time-format";

class RenderChart extends React.Component {
  componentDidMount() {
    this.props.fetchPrices();
  }

  render() {
    let data = [];
    // const parseDate = timeFormat("%d-%B-%Y");
    this.props.prices.map((curr) => {
      curr.map((c) => {
        let tempDate = new Date(c.Date);
        console.log(tempDate);
        data.push({
          date: tempDate,
          open: +c.Open,
          high: +c.High,
          low: +c.Low,
          close: +c.Close,
          future: +c.ITC,
        });
      });
    });
    // console.log(data);
    if (data.length === 0) {
      return <div>Loading....</div>;
    }

    return (
      <ChartContainer>
        <TypeChooser>
          {(type) => <ShowChart type={type} data={data} />}
        </TypeChooser>
      </ChartContainer>
    );
  }
}
const mapStateToProps = (state) => {
  return { prices: state.prices };
};

export default connect(mapStateToProps, { fetchPrices })(RenderChart);

const ChartContainer = styled.div`
  width: 100%;
  justify-content: center;
  flex: 0.7;
`;
