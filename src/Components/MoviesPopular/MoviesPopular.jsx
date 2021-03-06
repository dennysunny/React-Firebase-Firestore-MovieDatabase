import React, { useContext }from "react";
import { Container, Row, Col } from "react-bootstrap";
import { MovieContext } from "../../Context";
import LazyLoad from "react-lazyload";
import { Link } from "react-router-dom";

const MoviesPopular = () => {
  const {
    popular,
    handleClick,
    refreshPage,
    visible,
    addFavorite,
    favorite,
    currentUser,
    loadMore
  } = useContext(MovieContext);

  return (
    <Container className="homePageMovies mt-3">
      <Row>
        <Col>
          <>
            <>
              {popular.slice(0, visible).map(i => {
                return (
                  <div className="card text-white fade-in" key={i.id}>
                    <Link
                      to={`/movie/${i.id}`}
                      key={i.id}
                      onClick={() => {
                        handleClick(i.id);
                        refreshPage();
                      }}
                    >
                      <LazyLoad>
                        <img
                          src={`https://image.tmdb.org/t/p/w154${i.poster_path}`}
                          className="card-img"
                          alt={i.title}
                        />
                        
                      </LazyLoad>
                    </Link>
                    
                    <div className="">
                      <h6 className="card-title voteAverage">
                        {i.vote_average}
                        
                        
                      </h6>
                    </div>

                    {/* <div className="">
                      <h6 className="popular_tag">
                        {i.title}
                        
                        
                      </h6>
                    </div> */}

                    <div className="">
                      <h6
                        className="card-title hearts"
                        onClick={() => addFavorite(i)}
                      >
                        {currentUser ? (
                          favorite.includes(i) ? (
                            <i
                              className="fa fa-heart"
                              aria-hidden="true"
                              style={{ color: "red" }}
                            ></i>
                          ) : (
                            <i className="fa fa-heart" aria-hidden="true"></i>
                          )
                        ) : (
                          <Link
                            to="/signin"
                            style={{ color: "#FDFFFC" }}
                            alt="hearts"
                          >
                            <i className="fa fa-heart" aria-hidden="true"></i>
                          </Link>
                        )}
                      </h6>
                    </div>
                  </div>
                );
              })}
            </>
            <>
              {/* if value visible is smaller than popular.length then add button */}
              {visible < popular.length && (
                <button onClick={loadMore} type="button" className="load-more">
                  Load more
                </button>
              )}
            </>
          </>
        </Col>
      </Row>
    </Container>
  );
};

export default React.memo(MoviesPopular);
