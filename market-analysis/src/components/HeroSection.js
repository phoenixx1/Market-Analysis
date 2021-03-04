import React from "react";
import { Button } from "./Button";
import { connect } from "react-redux";
import { fetchNames } from "../actions";
import SelectSearch from "react-select-search";
// import "../App.css";
import "./HeroSection.css";
import Search from "./Search";

class HeroSection extends React.Component {
  componentDidMount() {
    this.props.fetchNames();
  }

  renderList() {
    // return (
    //   <div>
    //     <SelectSearch
    //       className="select-search select-search--multiple"
    //       options={companies}
    //       search
    //       placeholder="Search for Company"
    //     />
    //   </div>
    // );
    return this.props.names.map((name) => {
      return name.map((n) => {
        return (
          <div>{/* <h2>{n.COMPANY}</h2>
            <p>{n.SYMBOL}</p> */}</div>
        );
      });
    });
  }

  render() {
    return (
      <div className="hero-container">
        <video src="videos/background1.mp4" autoPlay loop muted />
        <h1>Search</h1>
        {/* <p>Do analysis</p> */}
        {this.renderList()}
        <Search />
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  // console.log(state.company);
  return { names: state.company };
};
export default connect(mapStateToProps, { fetchNames })(HeroSection);
