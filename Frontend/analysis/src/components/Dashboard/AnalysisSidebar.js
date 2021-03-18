import React from "react";
import styled from "styled-components";

function AnalysisSidebar() {
  return <SidebarContainer>Analysis</SidebarContainer>;
}

export default AnalysisSidebar;

const SidebarContainer = styled.div`
  background-color: #cfd5e3;
  color: black;
  flex: 0.3;
  max-width: 260px;
  /* align-items: center; */
  justify-content: center;
  display: flex;

  /* > hr {
    margin-top: 10px;
    margin-bottom: 10px;
    border: 1px solid #49274b;
  } */
`;
