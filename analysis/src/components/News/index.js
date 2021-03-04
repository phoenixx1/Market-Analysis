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
        <BackgroundVideo src="videos/news.mp4" autoPlay loop muted />
        <NewsCards>{this.renderList()}</NewsCards>
      </NewsContainer>
    );
  }
}

const mapStateToProps = (state) => {
  return { news: state.news };
};

export default connect(mapStateToProps, { fetchNews })(News);

const BackgroundVideo = styled.video`
  object-fit: cover;
  width: 100%;
  height: 100%;
  position: fixed;
  z-index: -1;
`;

const NewsContainer = styled.div`
  height: 100vh;
  width: 100%;
  display: flex;
  flex-direction: column;

  justify-content: center;
  align-items: center;
  object-fit: contain;
`;

const NewsCards = styled.div`
  z-index: 1;
  height: 60vh;
  place-items: center;
  display: flex;
  flex-direction: column;
`;
