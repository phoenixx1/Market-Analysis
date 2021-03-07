import React from "react";
import styled from "styled-components";
import WatchList from "./WatchList";
import RenderChart from "./Charts/RenderChart";
import Sidebar from "./Sidebar";
import Search from "./Search";

class Dashboard extends React.Component {
  render() {
    return (
      <DashboardContainer>
        <Sidebar />

        <MainContent>
          <SideContainer>
            <Search />
            <WatchList />
          </SideContainer>

          <RenderChart />
        </MainContent>
      </DashboardContainer>
    );
  }
}

export default Dashboard;

const DashboardContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  object-fit: contain;
`;

const MainContent = styled.div`
  display: flex;
  width: 100%;
`;

const SideContainer = styled.div`
  background-color: #cfd5e3;
  color: black;
  /* flex: 0.3; */
  height: 560px;
  width: 250px;
  align-items: center;
  display: flex;
  flex-direction: column;
`;
