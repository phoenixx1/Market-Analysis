import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { fetchNews } from "../actions";
import Navbar from "./Navbar";

class News extends React.Component {
  componentDidMount() {
    this.props.fetchNews();
  }
  renderList() {
    // console.log(this.props.news);
    return this.props.news.map((ns) => {
      console.log(ns.articles);
      return ns.articles.map((n) => {
        return (
          <div className="item" style={{ padding: "30px" }}>
            <div className="content">
              <div className="description">
                {/* <Link path={n.url}> */}
                <a
                  href={n.url}
                  style={{ textDecoration: "none", color: "inherit" }}
                >
                  <h2>{n.title}</h2>
                </a>
                {/* </Link> */}
                <p>{n.description}</p>
              </div>
            </div>
          </div>
        );
      });
      // use name for search options
      //   return ns.map((n) => {
      //     return (
      //       <div>
      //         <h2>{n.COMPANY}</h2>
      //         <p>{n.SYMBOL}</p>
      //       </div>
      //     );
      //   });
    });
  }
  render() {
    return (
      // <SelectSearch options={options} search placeholder="Select your country" />
      <div>
        <Navbar />
        <h1 className="ui center aligned header">News Headlines</h1>
        <div className="ui relaxed divided list">{this.renderList()}</div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  // console.log(state.company);
  return { news: state.news };
};
export default connect(mapStateToProps, { fetchNews })(News);
