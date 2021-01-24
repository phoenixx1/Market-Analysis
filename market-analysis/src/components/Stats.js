import React from "react";
import "./stats.css";

const Stats = () => {
  return (
    <div class="stats alert alert-primary d-flex justify-content-evenly">
      <div class="statistic">
        <div class="label">48,878.54</div>
        <div>SENSEX</div>
      </div>
      <div class="statistic">
        <div class="label">14,371.90</div>
        <div>NIFTY 50</div>
      </div>
      <div class="statistic">
        <div class="label">18,422.05</div>
        <div>SMALL CAP</div>
      </div>
      <div class="statistic">
        <div class="label">18,761.87</div>
        <div>MID CAP</div>
      </div>
    </div>
  );
};

export default Stats;
