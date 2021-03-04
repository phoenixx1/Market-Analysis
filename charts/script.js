const url =
  "https://raw.githubusercontent.com/phoenixx1/Robert-Lafore/master/itc.json";
chartIt();
async function chartIt() {
  const data = await getData();
  // const container = document.getElementById('chart').getContext('2d');
  const chart = new CanvasJS.Chart("contain", {
    zoomEnabled: true,
    title: {
      text: "NIFTY 50 2018",
    },
    axisX: {
      interval: 1,
      valueFormatString: "MMM",
    },
    axisY: {
      prefix: "₹",
      title: "Price",
    },
    data: [
      {
        type: "candlestick",
        yValueFormatString: "₹##0.00",
        dataPoints: data,
      },
    ],
  });
  chart.render();
}
async function getData() {
  const response = await fetch(url);
  const data = await response.json();
  const values = [];
  for (let i = 0; i < data.length; i++) {
    values.push({
      x: new Date(data[i].Date),
      y: [
        Number(data[i].Open),
        Number(data[i].High),
        Number(data[i].Low),
        Number(data[i].Close),
      ],
    });
    //dataPoints2.push({ x: new Date(data[i].date), y: Number(data[i].close) });
  }
  console.log(values);
  return values;
  // console.log(data[0].Date);
}
