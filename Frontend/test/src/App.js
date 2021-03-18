import "./App.css";
import Sidebar from "./components/Sidebar";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Overview from "./pages/Overview";
// import { timeParse } from "d3-time-format";
// import { csv } from "d3-request";
// import { event } from "d3-selection";
// import { ChartCanvas, Chart } from "react-stockcharts";

function App() {
  return (
    <Router>
      <Sidebar />
      <Switch>
        <Route path="/overview" exact component={Overview} />
      </Switch>
    </Router>
  );
}

export default App;
