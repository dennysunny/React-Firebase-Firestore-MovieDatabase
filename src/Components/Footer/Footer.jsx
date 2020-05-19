import React, { useContext } from "react";
import { Container, Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";
import { MovieContext } from "../../Context";

import "./Footer.scss";
//import Privacy from "../Privacy/Privacy";

const Footer = () => {
  const { clearVisible, getPopular, refreshPage, pageRefreshed } = useContext(
    MovieContext
  );

  return (
    <div className="Footer">
      <Container>
        <Row>
          <Col className="mt-5 p-0 col-xs-12 col-md-6">
              <a href="https://www.themoviedb.org/">
              <img
                src={require("../../Assets/tmdb.svg")}
                style={{ width: "8em", marginTop: "4.5em" }}
                className="float-right"
                alt=""
              />
            </a>
          </Col>

          <Col className="pl-5 d-block d-lg-none">
            <Link to="/">
              <img
                src={require("../../logo_transparent.png")}
                className="float-left mr-3 footerBrand"
                alt=""
                onClick={() => {
                  clearVisible();
                  getPopular();
                  refreshPage();
                }}
              />
            </Link>
          </Col>
          <Col className="pr-0 d-none d-lg-block">
            <img
              src={
                pageRefreshed
                  ? require("../../Assets/morganFreeman.png")
                  : require("../../Assets/guyPearce.png")
              }
              alt=""
              className={pageRefreshed ? "morganFreeman" : "guyPearce"}
            />
            {pageRefreshed ? (
              <h1 className="footerText">
                <em>
                  "You know, this place makes me wonder, which would be worse .. to live as a monster? Or to die as a good man? - Shutter Island"
                </em>
              </h1>
            ) : (
              <h1 className="footerText">
                <em>"No good movie is too long and no bad movie is short enough.<br></br> ― Roger Ebert"</em>
              </h1>
            )}
          </Col>
          <Col className=" pl-5 d-block d-lg-none">
            {/* <a href="https://www.themoviedb.org/">
              <img
                src={require("../../Assets/tmdb.svg")}
                style={{ width: "8em", marginTop: "4.5em" }}
                className="float-right"
                alt=""
              />
            </a> */}

              <h4 className="footerText"> 
                <em>
                <div>
                  <Link to="/privacy" className="pl-4 pr-5 nav-link">
                    {/* if currentUser has a user, it will return true. If its null(initial state) it will return false(null is falsy value) */}
                    {/* {currentUser ? (
                      <div className="userSign">
                        <div onClick={() => Privacy()} className="signOut">
                          Privacy
                                </div>
                        <div>
                          <Link to="/privacy">
                            <i className="fas fa-user-astronaut"></i>
                          </Link>
                        </div>
                      </div>
                    ) : (
                        <div className="userSign">Privacy</div>
                      )} */}
                  </Link>
                  </div>
                </em>
              </h4>

          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default React.memo(Footer);
