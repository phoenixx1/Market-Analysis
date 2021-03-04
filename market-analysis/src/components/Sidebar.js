import React from "react";

class Sidebar extends React.Component {
  render() {
    return (
      <div class="ui middle aligned divided selection animated list">
        <div class="item" draggable="true">
          <div class="right floated content">
            <div class="ui small black label">1462.85</div>
          </div>
          <div class="content">HDFC</div>
        </div>
        <div class="item" draggable="true">
          <div class="right floated content">
            <div class="ui small black label">1325.10</div>
          </div>
          <div class="content">INFY</div>
        </div>
        <div class="item" draggable="true">
          <div class="right floated content">
            <div class="ui small black label">91.60</div>
          </div>
          <div class="content">ONGC</div>
        </div>
        <div class="item" draggable="true">
          <div class="right floated content">
            <div class="ui small black label">2399.60</div>
          </div>
          <div class="content">HINDUNILVR</div>
        </div>
        <div class="item" draggable="true">
          <div class="right floated content">
            <div class="ui small black label">3291.85</div>
          </div>
          <div class="content">TCS</div>
        </div>
        <div class="item" draggable="true">
          <div class="right floated content">
            <div class="ui small black label">849.15</div>
          </div>
          <div class="content">INDUSINDBK</div>
        </div>
      </div>
    );
  }
}

export default Sidebar;
