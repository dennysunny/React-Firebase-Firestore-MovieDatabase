import React, { useContext } from "react";
import { Nav, Container } from "react-bootstrap";
import { Link } from "react-router-dom";
import "../MidMenu/MidMenu.scss";
import { MovieContext } from "../../Context";

const TvMidMenu = () => {
    const {
      clearVisible,
      tv,
      getTv,
      getTop
    } = useContext(MovieContext);


    return (
        <Container className="MidMenu">
          <Nav className="justify-content-center" activeKey="/home">
            <Nav.Item>
              <Link
                to="/"
                className={
                  tv.length > 0 ? "mr-5 nav-link clicked" : "mr-5 nav-link"
                }
                onClick={() => {
                  getTv();
                  getTop();
                  clearVisible();
                  // popularSelected();
                }}
              >
                POPULAR AND TOP RATED SHOWS
              </Link>
            </Nav.Item>
    
          </Nav>
        </Container>
      );
    };
    
    export default TvMidMenu;