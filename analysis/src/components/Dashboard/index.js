import React from "react";
import styled from "styled-components";
import AnalysisSidebar from "./AnalysisSidebar";
import RenderChart from "./Charts/RenderChart";
import Sidebar from "./Sidebar";

class Dashboard extends React.Component {
  render() {
    return (
      <DashboardContainer>
        <Sidebar />

        <MainContent>
          <AnalysisSidebar />
          <RenderChart />
        </MainContent>
      </DashboardContainer>
    );
  }
}

export default Dashboard;

const DashboardContainer = styled.div`
  /* height: 100vh; */
  height: 544px;
  width: 100%;
  display: flex;
  flex-direction: column;
  margin-top: 80px;
  object-fit: contain;

  /* justify-content: center; */
  /* align-items: center; */
`;

const MainContent = styled.div`
  display: flex;
  /* height: 100vh; */
  height: 544px;
  width: 100%;
`;
