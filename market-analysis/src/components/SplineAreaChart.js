import React, { Component } from "react";
import CanvasJSReact from "../canvasjs/canvasjs.stock.react";

var CanvasJS = CanvasJSReact.CanvasJS;
var CanvasJSStockChart = CanvasJSReact.CanvasJSStockChart;

class SplineAreaChart extends Component {
  constructor(props) {
    super(props);
    this.state = { dataPoints: [], isLoaded: false };
  }

  componentDidMount() {
    fetch(
      `https://raw.githubusercontent.com/phoenixx1/Robert-Lafore/master/${this.props.name}.json`
    )
      .then((res) => res.json())
      .then((data) => {
        var dps = [];
        for (var i = 0; i < data.length; i++) {
          dps.push({
            x: new Date(data[i].Date),
            y: Number(data[i].Close),
          });
        }
        this.setState({
          isLoaded: true,
          dataPoints: dps,
        });
      });
  }

  render() {
    const options = {
      theme: "light2",
      charts: [
        {
          axisX: {
            crosshair: {
              enabled: true,
              snapToDataPoint: true,
              valueFormatString: "MMM DD YYYY",
            },
          },
          axisY: {
            title: `${this.props.label} Price`,
            prefix: "₹",
            crosshair: {
              enabled: true,
              snapToDataPoint: true,
              valueFormatString: "$#,###.##",
            },
          },
          toolTip: {
            shared: true,
          },
          data: [
            {
              name: "Price",
              type: this.props.type,
              color: "#3576a8",
              yValueFormatString: "₹#,###.##",
              xValueFormatString: "MMM DD YYYY",
              dataPoints: this.state.dataPoints,
            },
          ],
        },
      ],
      navigator: {
        slider: {
          minimum: new Date("2017-05-01"),
          maximum: new Date("2018-05-01"),
        },
      },
    };
    const containerProps = {
      width: "100%",
      height: "450px",
      margin: "auto",
    };
    return (
      <div>
        <div>
          {this.state.isLoaded && (
            <CanvasJSStockChart
              containerProps={containerProps}
              options={options}
            />
          )}
        </div>
      </div>
    );
  }
}

export default SplineAreaChart;
