import React from "react";
import Stats from "./Stats";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Home from "./Home";
import Dashboard from "./Dashboard";
import News from "./News";

const App = () => {
  return (
    <div>
      <Router>
        {/* <Stats /> */}
        <Route path="/" exact component={Home} />
        <Route path="/dashboard" exact component={Dashboard} />
        <Route path="/news" exact component={News} />
      </Router>
    </div>
  );
};

export default App;
