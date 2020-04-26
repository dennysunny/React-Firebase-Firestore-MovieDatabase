import React, { useContext } from "react";
import { Nav, Container } from "react-bootstrap";
import { Link } from "react-router-dom";
import "./MidMenu.scss";
import { MovieContext } from "../../Context";

const MidMenu = () => {
  const {
    popular,
    getPopular,
    clearVisible,
    now,
    getNow,
    coming,
    getComing,
    top,
    getTop,
    // tv,
    // getTv
  } = useContext(MovieContext);

  return (
    <Container className="MidMenu">
      <Nav className="justify-content-center" activeKey="/home">
        <Nav.Item>
          <Link
            to="/"
            className={
              popular.length > 0 ? "mr-5 nav-link clicked" : "mr-5 nav-link"
            }
            onClick={() => {
              getPopular();
              clearVisible();
              // popularSelected();
            }}
          >
            POPULAR
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
            NOW PLAYING
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
            COMING SOON
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
            TOP RATED
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

export default MidMenu;
