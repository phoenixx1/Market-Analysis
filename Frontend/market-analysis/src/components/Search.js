import React from "react";
import { connect } from "react-redux";
import { fetchNames } from "../actions";
// import SelectSearch from "react-select-search";
// import Select from "react-dropdown-select";

class Search extends React.Component {
  componentDidMount() {
    this.props.fetchNames();
  }
  renderList() {
    return this.props.names.map((name) => {
      // use name for search options
      return name.map((n) => {
        return (
          <div>
            <h2>{n.COMPANY}</h2>
            <p>{n.SYMBOL}</p>
          </div>
        );
      });
    });
  }
  render() {
    return (
      // <SelectSearch options={options} search placeholder="Select your country" />
      <div class="ui huge icon input focus">
        <input
          style={{ width: "100vh", borderRadius: "25px" }}
          type="text"
          placeholder="Search..."
        />
        <i class="search icon"></i>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  // console.log(state.company);
  return { names: state.company };
};
export default connect(mapStateToProps, { fetchNames })(Search);
