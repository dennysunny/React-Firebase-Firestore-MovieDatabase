import React, { useContext } from "react";
import { MovieContext } from "../../Context";
import { Container, Row, Col } from "react-bootstrap";
import LazyLoad from "react-lazyload";
import { Link } from "react-router-dom";


import "./User.scss";

const User = () => {
  const { currentUser, favorite, addFavorite,handleClick } = useContext(MovieContext);

  return (
    <Container className="User">
      {currentUser ? (
        <div>
          <Row className="firstRow">
            <h1 className="userTitle">Welcome, {currentUser.displayName}!</h1>
            <p className="userText">your favorite movies: </p>
            <hr className="mr-5" style={{ width: "calc(100% - 3rem)" }} />
          </Row>
          <Row>
            {favorite.length > 0 ? (
              favorite.map(movie => {
                return (
                  <Col
                    key={movie}
                    className="col-xs-6 col-lg-4 col-xl-3 mb-5 pl-0 pr-5 mt-3"
                  >
                   <Link 
                      to={`/movie/${movie.id}`}
                    onClick={() => {
                      handleClick(movie.id);
                      console.log(movie.id)
                      //refreshPage();
                    }}
                   > 
                   <LazyLoad>
                    <img
                      src={`https://image.tmdb.org/t/p/original/${movie.poster_path}`}
                      className="userImg"
                      alt={movie}
                     
                      
                     
                      // style={{ width:"20em"}}
                    />
                    </LazyLoad>
                    </Link>
                    <div className="">
                      <h6
                        className="card-title hearts"
                        onClick={() => addFavorite(movie)}
                      >
                        {favorite.includes(movie.poster_path) ? (
                          <i
                            className="fa fa-heart"
                            aria-hidden="true"
                            style={{ color: "red" }}
                          ></i>
                        ) : (
                          <i className="fa fa-heart" aria-hidden="true"></i>
                        )}
                      </h6>
                    </div>
                    {/* <h1>{movie}</h1> */}
                  </Col>
                );
              })
            ) : (
              <h1 className="userText ml-4">no movies added to favorites</h1>
            )}
          </Row>
        </div>
      ) : (
        <h1 className="userText mt-5">You need to sign in to view your fav movies</h1>
      )}
    </Container>
  );
};

export default User;
