import React from "react";
import styled from "styled-components";
import Search from "./Search";

function Home() {
  return (
    <HeroContainer>
      <Search />
    </HeroContainer>
  );
}

export default Home;

const HeroContainer = styled.div`
  background: rgb(228, 227, 236);
  background: linear-gradient(
    90deg,
    rgba(228, 227, 236, 1) 0%,
    rgba(207, 207, 217, 1) 42%,
    rgba(174, 180, 227, 1) 100%
  );
  height: 100vh;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  > p {
    margin-top: 8px;
    color: #fff;
    font-size: 32px;
    font-family: "Trebuchet MS", "Lucida Sans Unicode", "Lucida Grande",
      "Lucida Sans", Arial, sans-serif;
  }
`;
