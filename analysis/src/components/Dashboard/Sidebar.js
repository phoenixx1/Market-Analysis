import React, { useState } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import * as FaIcons from "react-icons/fa";
import * as AiIcons from "react-icons/ai";
import { IconContext } from "react-icons/lib";
import Card from "./Card";
import { connect } from "react-redux";
import AnalysisSidebar from "./AnalysisSidebar";

function Sidebar({ currentCompanyName }) {
  const [sidebar, setSidebar] = useState(false);

  const showSidebar = () => setSidebar(!sidebar);

  return (
    <>
      <IconContext.Provider value={{ color: "#fff" }}>
        {/* global value for all icons */}
        <Nav>
          <NavIcon to="#">
            <FaIcons.FaBars onClick={showSidebar} />
          </NavIcon>
          <CompanyName>{currentCompanyName}</CompanyName>
          <Card title={"Display"} items={["Candle", "Bar", "Line"]} />
          <Card
            title={"Studies"}
            items={["Bollinger Bands", "Moving Average", "Standard Deviation"]}
          />
        </Nav>
        <SidebarNav sidebar={sidebar}>
          <SidebarWrap>
            <NavIcon to="#">
              <AiIcons.AiOutlineClose onClick={showSidebar} />
            </NavIcon>
            <AnalysisSidebar />
          </SidebarWrap>
        </SidebarNav>
      </IconContext.Provider>
    </>
  );
}
const mapStateToProps = (state) => ({
  currentCompanyName: state.currentCompany,
});

export default connect(mapStateToProps)(Sidebar);

const CompanyName = styled.h4`
  margin-left: 220px;
  margin-top: 0.5rem;
  font-size: 1.5rem;
  height: 40px;
  display: flex;
  justify-content: flex-start;
  align-items: center;
`;

const Nav = styled.div`
  background: #a5aab5;
  height: 40px;
  display: flex;
  justify-content: flex-start;
  align-items: center;
`;

const NavIcon = styled(Link)`
  margin-left: 1rem;
  font-size: 1.5rem;
  height: 40px;
  display: flex;
  justify-content: flex-start;
  align-items: center;
`;

const SidebarNav = styled.nav`
  background: #a5aab5;
  width: 250px;
  display: flex;
  justify-content: center;
  margin-top: 60px;
  height: 100vh;
  position: fixed;
  top: 0;
  left: ${({ sidebar }) => (sidebar ? "0" : "-100%")};
  transition: 350ms;
  z-index: 10;
`;

const SidebarWrap = styled.div`
  width: 100%;
`;
