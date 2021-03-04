import React from "react";
import styled from "styled-components";

function NewsCard({ url, image, title, source, desc, time }) {
  return (
    <NewsCardContainer onClick={() => window.open(url, "_blank")}>
      <NewsImage>
        <img src={image} alt={source} />
      </NewsImage>

      <NewsDetails>
        <h4>{title}</h4>
        <span>
          <strong>Source: {source}</strong>
        </span>
        <p>{desc}</p>
        <br />
        <span>
          <strong>Published at: {time}</strong>
        </span>
      </NewsDetails>
    </NewsCardContainer>
  );
}

export default NewsCard;

const NewsCardContainer = styled.div`
  display: flex;
  cursor: pointer;
  width: 1000px;
  background: rgba(54, 62, 74, 0.5);
  padding: 10px;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.7), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
  align-items: center;
  justify-content: center;
  margin: 10px;

  @media screen and (max-width: 1000px) {
    width: 800px;
  }
  @media screen and (max-width: 800px) {
    width: 600px;
  }

  :hover {
    background: rgba(134, 140, 152, 0.6);
    transform: scale(1.01);
  }
`;
const NewsImage = styled.div`
  flex: 0.3;
  > img {
    object-fit: fill;
    width: 256px;
    height: 148px;
  }
`;

const NewsDetails = styled.div`
  flex: 0.7;
  margin-left: 14px;

  > span {
    color: #51545a;
  }
`;
