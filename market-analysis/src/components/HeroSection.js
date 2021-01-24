import React from "react";
import { Button } from "./Button";
// import "../App.css";
import "./HeroSection.css";
import Search from "./Search";

const HeroSection = () => {
  return (
    <div className="hero-container">
      <video src="videos/background1.mp4" autoPlay loop muted />
      <h1>Search</h1>
      <p>Do analysis</p>
      <Search />
    </div>
  );
};

export default HeroSection;
