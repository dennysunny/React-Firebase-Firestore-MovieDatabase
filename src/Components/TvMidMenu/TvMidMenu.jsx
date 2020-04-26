import React, { useContext } from "react";
import { Nav, Container } from "react-bootstrap";
import { Link } from "react-router-dom";
import "../MidMenu/MidMenu.scss";
import { MovieContext } from "../../Context";

const TvMidMenu = () => {
    const {
      clearVisible,
      now,
      getNow,
      coming,
      getComing,
      tv,
      getTv,
      top,
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
                  clearVisible();
                  // popularSelected();
                }}
              >
                POPULAR TV
              </Link>
            </Nav.Item>
    
            <Nav.Item>
              <Link
                to="/"
                className={
                  now.length > 0
                    ? "ml-5 mr-5 nav-link clicked"
                    : "ml-5 mr-5 nav-link"
                }
                onClick={() => {
                  getNow();
                  clearVisible();
                  // nowSelected();
                }}
              >
                NOW PLAYING TV
              </Link>
            </Nav.Item>
    
            <Nav.Item>
              <Link
                to="/"
                className={
                  coming.length > 0
                    ? "ml-5 mr-5 nav-link clicked"
                    : "ml-5 mr-5 nav-link"
                }
                onClick={() => {
                  getComing();
                  clearVisible();
                  // comingSelected();
                }}
              >
                COMING SOON TV
              </Link>
            </Nav.Item>
    
            <Nav.Item>
              <Link
                to="/"
                className={
                  top.length > 0 ? "ml-5 nav-link clicked" : "ml-5  nav-link"
                }
                onClick={() => {
                  getTop();
                  clearVisible();
                  // topSelected();
                }}
              >
                TOP RATED TV
              </Link>
            </Nav.Item>
    
            
            {/* <Nav.Item>
              <Link
                to="/"
                className={
                  tv.length > 0 ? "mr-5 nav-link clicked" : "ml-5  nav-link"
                }
                onClick={() => {
                  getTv();
                  clearVisible();
                  // TvShowsSelected();
                }}
              >
                TV SHOWS
              </Link>
            </Nav.Item> */}
    
          </Nav>
        </Container>
      );
    };
    
    export default TvMidMenu;