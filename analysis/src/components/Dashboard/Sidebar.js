import React, { useState } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import * as FaIcons from "react-icons/fa";
import * as AiIcons from "react-icons/ai";
// import { SidebarData } from "./SidebarData";
// import SubMenu from "./SubMenu";
import Search from "./Search";
import { IconContext } from "react-icons/lib";
import WatchList from "./WatchList";

function Sidebar() {
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
          <CompanyName>ITC</CompanyName>
        </Nav>
        <SidebarNav sidebar={sidebar}>
          <SidebarWrap>
            <NavIcon to="#">
              <AiIcons.AiOutlineClose onClick={showSidebar} />
            </NavIcon>
            <Search />
            <WatchList />
          </SidebarWrap>
        </SidebarNav>
      </IconContext.Provider>
    </>
  );
}

export default Sidebar;

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
  margin-top: 80px;
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
