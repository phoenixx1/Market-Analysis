import React from "react";
import NewsCard from "./NewsCard";
import styled from "styled-components";
import { connect } from "react-redux";
import { fetchNews } from "../../actions";

class News extends React.Component {
  componentDidMount() {
    this.props.fetchNews();
  }

  renderList() {
    return this.props.news.map((head) => {
      return head.map((n) => {
        return (
          <NewsCard
            url={n.url}
            image={n.urlToImage}
            title={n.title}
            source={n.source.name}
            desc={n.description}
            time={n.publishedAt}
          />
        );
      });
    });
  }

  render() {
    return (
      <NewsContainer>
        <NewsCards>{this.renderList()}</NewsCards>
      </NewsContainer>
    );
  }
}

const mapStateToProps = (state) => {
  return { news: state.news };
};

export default connect(mapStateToProps, { fetchNews })(News);

const NewsContainer = styled.div`
  background: #e3e3e3;
  height: 5000px;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const NewsCards = styled.div`
  z-index: 1;
  height: 60vh;
  place-items: center;
  display: flex;
  flex-direction: column;
`;
