import React, { useContext } from "react";
import { Navbar, Nav, Image, Container } from "react-bootstrap";
import "./Nav.scss";
import { Link } from "react-router-dom";
import Search from "../Search/Search";
import { MovieContext } from "../../Context";
import { auth } from "../Firebase/firebase.utils.js";

const NavTop = () => {
  const {
    clearVisible,
    getPopular,
    getTv,
    getTop_rated,
    refreshPage,
    clearSearch,
    currentUser,
  } = useContext(MovieContext);

  return (
    <div className="NavTop">
      <Navbar expand="lg">
        <Link
          to="/"
          className="navbar-brand"
          onClick={() => {
            clearVisible();
            getPopular();
            refreshPage();
            clearSearch();
          }}
        >
          <Image
            src={require("../../logo.png")}
            alt="firebasetmr  logo"
          ></Image>
        </Link>

        <Navbar.Toggle aria-controls="basic-navbar-nav" className="mb-2"
         > 
          {/* <span>MENU</span> */}          
          <i class="fas fa-bars"></i>
        </Navbar.Toggle>
        <Navbar.Collapse id="basic-navbar-nav" className="">
          <Container>
            <Search />
          </Container>
          
          <Nav className="flex-row d-flex">
            <Link
              to="/"
              className="pl-4 pr-5 nav-link"
              onClick={() => {
                clearVisible();
                getPopular();
                refreshPage();
              }}
            >
              Home
            </Link>

            <Link
              to="/tv"
              className="pl-4 pr-5 nav-link"
              onClick={() => {
                clearVisible();
                getTv();
                //getPopular();
                getTop_rated();
                refreshPage();
              }}
            >
              TV SHOWS
            </Link>

            <Link to="/signin" className="pl-4 pr-5 nav-link">
              {/* if currentUser has a user, it will return true. If its null(initial state) it will return false(null is falsy value) */}
              {currentUser ? (
                <div className="userSign">
                  <div onClick={() => auth.signOut()} className="signOut">
                    Sign Out
                  </div>
                  <div>
                    <Link to="/user">
                    <i class="fas fa-chalkboard-teacher"></i>
                    </Link>
                  </div>
                </div>
              ) : (
                <div className="userSign">Sign in</div>
              )}
            </Link>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    </div>
  );
};

export default NavTop;
