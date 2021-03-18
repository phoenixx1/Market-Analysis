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
  background: #2b2a2a;
  height: 60px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 1.2rem;
  position: sticky;
  top: 0;
  z-index: 999;
`;

const NavbarContainer = styled.div`
  display: flex;
  justify-content: center;
  height: 60px;
  max-width: 1500px;
`;

const NavbarLogo = styled(Link)`
  color: #fff;
  justify-self: start;
  margin-left: 20px;
  cursor: pointer;
  text-decoration: none;
  font-size: 2rem;
  display: flex;
  align-items: center;
`;

const NavMenu = styled.ul`
  display: grid;
  grid-template-columns: repeat(4, auto);
  grid-gap: 10px;
  list-style: none;
  text-align: center;
  width: 60vw;
  justify-content: end;
  margin-right: 2rem;
`;

const NavItem = styled.li`
  height: 60px;
`;

const NavLinks = styled(Link)`
  color: #fff;
  display: flex;
  align-items: center;
  text-decoration: none;
  padding: 0.5rem 1rem;
  height: 100%;

  :hover {
    border-bottom: 4px solid #fff;
    transition: all 0.2s ease-out;
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

  :hover {
    transition: all 0.2s ease-in-out;
    background: #fff;
    color: #010606;
  }
`;
