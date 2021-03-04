import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { useAuthState } from "react-firebase-hooks/auth";
import { Avatar } from "@material-ui/core";
import { auth, provider } from "../../Firebase";

function Navbar() {
  const signIn = (e) => {
    e.preventDefault();
    auth.signInWithPopup(provider).catch((error) => alert(error.message));
  };

  const [user] = useAuthState(auth);

  return (
    <Nav>
      <NavbarContainer>
        <NavbarLogo to="/">Reactive</NavbarLogo>

        <NavMenu>
          <NavItem>
            <NavLinks to="/">Home</NavLinks>
          </NavItem>
          <NavItem>
            <NavLinks to="/dashboard">Dashboard</NavLinks>
          </NavItem>
          <NavItem>
            <NavLinks to="/news">News</NavLinks>
          </NavItem>
        </NavMenu>

        {!user ? (
          <NavBtn>
            <NavBtnLink onClick={signIn}>Sign In</NavBtnLink>
          </NavBtn>
        ) : (
          <HeaderAvatar
            onClick={() => auth.signOut()}
            alt={user?.displayName}
            src={user?.photoURL}
          />
        )}
      </NavbarContainer>
    </Nav>
  );
}

export default Navbar;

const HeaderAvatar = styled(Avatar)`
  cursor: pointer;

  :hover {
    opacity: 0.8;
  }
`;

const Nav = styled.nav`
  background: rgba(0, 0, 0, 0.5);
  height: 80px;
  margin-top: -80px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 1rem;

  position: sticky;
  top: 0;
  z-index: 10;
`;

const NavbarContainer = styled.div`
  display: flex;
  justify-content: space-between;
  height: 80px;
  align-items: center;
  z-index: 1;
  width: 100%;
  padding: 0 24px;
  max-width: 1100px;
`;

const NavbarLogo = styled(Link)`
  color: #fff;
  justify-self: flex-start;
  cursor: pointer;
  font-size: 1.5rem;
  display: flex;
  align-items: center;
  margin-left: 24px;
  font-weight: bold;
  text-decoration: none;
`;

const NavMenu = styled.ul`
  display: flex;
  align-items: center;
  list-style: none;
  text-align: center;
  margin-right: -22px;
`;

const NavItem = styled.li`
  height: 80px;
`;

const NavLinks = styled(Link)`
  color: #fff;
  display: flex;
  align-items: center;
  text-decoration: none;
  padding: 0 1rem;
  height: 100%;
  cursor: pointer;

  &.active {
    border-bottom: 3px solid #01bf71;
  }
`;

const NavBtn = styled.nav`
  display: flex;
  align-items: center;
  font-size: 16px;

  @media screen and (max-width: 768px) {
    display: none;
  }
`;

const NavBtnLink = styled.button`
  border-radius: 50px;
  white-space: nowrap;
  background: #01bf71;
  padding: 10px 22px;
  color: #010606;
  outline: none;
  border: none;
  cursor: pointer;
  transition: all 0.2s ease-in-out;
  text-decoration: none;

  &:hover {
    transition: all 0.2s ease-in-out;
    background: #fff;
    color: #010606;
  }
`;
