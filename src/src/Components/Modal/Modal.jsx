import React, { useContext } from "react";
import { MovieContext } from "../../Context";
import { Container, Row, Col } from "react-bootstrap";

import { Link } from "react-router-dom";
import "./Modal.scss";

const Modal = () => {
  const {
    modalOpen,
    closeModal,
    moviesResult,
    handleClick,
    clearSearch
  } = useContext(MovieContext);

  //if modal open is false, dont return anything
  if (!modalOpen) {
    return null;
  } else {
    //if there is a modal, then return this
    return (
      <div className="Modal" onClick={()=>{closeModal(); }}>
        <Container>
          {/* <Swiper {...params}> */}
          {moviesResult.map(movie => {
            const { id, poster_path, title, vote_average } = movie;
            return (
              <Link
                to={`/movie/${id}`}
                key={id}
                // getting handleClick function from context api and passing id
                onClick={() => {
                  handleClick(id);
                    
                  clearSearch();
                }}
              >
                <Row>
                  <Col className="col-md-2">
                    <img
                      src={`https://image.tmdb.org/t/p/original/${poster_path}`}
                      alt=""
                      className="float-left card-img-top ml-3"
                    />
                  </Col>
                  <Col className="p-0 col-md-8">
                    <h1 className="text-left card-text modalTitle">{title}</h1>{" "}
                    <br />
                    {/* <h1 className="release text-left">{release_date
                              ? `${release_date
                                  .split("-")
                                  .reverse()
                                  .join("-")}`
                              : "Release Date Unknown"}</h1> */}
                  </Col>
                  <Col className="col-md-2 d-none d-lg-block">
                    <h1 className="average card-text">{vote_average}</h1>{" "}
                  </Col>
                </Row>
              </Link>
            );
          })}
          {/* </Swiper> */}
        </Container>
      </div>
    );
  }
};

export default Modal;
