import React from "react";
import Navbar from "./Navbar";
import Stats from "./Stats";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import HeroSection from "./HeroSection";

const App = () => {
  return (
    <div>
      <Router>
        {/* <Stats /> */}
        <Navbar />
        <HeroSection />
      </Router>
    </div>
  );
};

export default App;
