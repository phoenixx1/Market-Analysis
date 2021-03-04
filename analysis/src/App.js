import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Dashboard from "./components/Dashboard";
import Home from "./components/Home";
import Navbar from "./components/Home/Navbar";
import News from "./components/News";

function App() {
  return (
    <Router>
      <Navbar />
      <div>
        <Switch>
          <Route path="/dashboard">
            <Dashboard />
          </Route>
          <Route path="/news">
            <News />
          </Route>
          <Route path="/">
            <Home />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
