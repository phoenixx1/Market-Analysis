import React from "react";
import styled from "styled-components";
import Search from "./Search";

function Home() {
  return (
    <HeroContainer>
      <BackgroundVideo src="videos/background.mp4" autoPlay loop muted />
      <Search />
    </HeroContainer>
  );
}

export default Home;

const BackgroundVideo = styled.video`
  object-fit: cover;
  width: 100%;
  height: 100%;
  position: fixed;
  z-index: -1;
`;

const HeroContainer = styled.div`
  height: 100vh;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  object-fit: contain;

  > p {
    margin-top: 8px;
    color: #fff;
    font-size: 32px;
    font-family: "Trebuchet MS", "Lucida Sans Unicode", "Lucida Grande",
      "Lucida Sans", Arial, sans-serif;
  }
`;
