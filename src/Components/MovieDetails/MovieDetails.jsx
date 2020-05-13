import React, { useContext  } from "react";
import { Container, Col, Row, Card,CardColumns} from "react-bootstrap";
import { MovieContext } from "../../Context";
import Swiper from "react-id-swiper";
//import ProgressiveImage from "react-progressive-image-loading";
import { Link } from "react-router-dom";
import LazyLoad from "react-lazyload";

// import { Typography } from '@material-ui/core'

// import CardContent from '@material-ui/core/CardContent'

import "swiper/swiper.scss";
import "./MovieDetails.scss";
import "../../index.scss"

const params = {
  effect : 'coverflow',  
  centeredSlides:true,
  slidesPerView: 'auto',
  coverflowEffect:{
      rotate:30,
      depth:100,
      slideShadows:true,
      modifier:2,
      stretch:0,
  },
  pagination: {
    el: ".swiper-pagination",
    
    clickable: true
  }
};



const MovieDetails = () => {
  const {
    details,
    currentUser,
    favorite,
    wishlist,
    addFavorite,
    addWishlist,
    //getPerson,
    genres,
    companies,
    countries,
    cast,
    //person,
    similar,
    recommendations,
    reviews,
    //images,
    handleClick,
    handlePersonClick,
    refreshPage,
    videos
  } = useContext(MovieContext);

  const {
    poster_path,
    overview,
    title,
    vote_average,
    vote_count,
    release_date,
    revenue,
    status,
    runtime,
    backdrop_path,
    budget,
    tagline
  } = details;

  return (
    <div className="Details" >
      <title>Heuddddddddddd</title>
      <img
        src={`https://image.tmdb.org/t/p/w780${backdrop_path}`}
        alt=""
        className="firstImg"
      />

      <Container className="mt-5 p-0">
        <Row>
          <Col className="firstCol ml-2 ">
            <div>
              <img
                src={`https://image.tmdb.org/t/p/w185${poster_path}`}
                alt=""
                className=""
              />
            </div>
            <div className="">
              <h6
                className="card-title hearts"
                onClick={() => addFavorite(details)}
                
              >
                {currentUser ? (
                  favorite.includes(details) ? (
                    <i
                      className="fa fa-heart"
                      aria-hidden="true"
                      style={{ color: "red" }}
                    ></i>
                  ) : (
                    <i className="fa fa-heart" aria-hidden="true"></i>
                  )
                ) : (
                  <Link to="/signin" style={{ color: "#FDFFFC" }}>
                    {" "}
                    <i className="fa fa-heart" aria-hidden="true"></i>{" "}
                  </Link>
                )}
              </h6>
            </div>

            <div className="">
              <h6
                className="card-title wishlist"
                onClick={() => addWishlist(details)}
                
              >
                {currentUser ? (
                  wishlist.includes(details) ? (
                    <i
                      className="fas fa-photo-video"
                      aria-hidden="true"
                      style={{ color: "red" }}
                    ></i>
                  ) : (
                    <i className="fas fa-photo-video" aria-hidden="true"></i>
                  )
                ) : (
                  <Link to="/signin" style={{ color: "#FDFFFC" }}>
                    {" "}
                    <i className="fas fa-photo-video" aria-hidden="true"></i>{" "}
                  </Link>
                )}
              </h6>
            </div>
          </Col>

          <Col>
            <Row>
              {/* <span>({release_date})</span> */}
              <h1>{title} </h1>
            </Row>
            <Row>
              <p className="mt-5 mb-5">{overview}</p>

              <Col className="mb-2">
                <h2>Average Rating  </h2> 
              </Col>

              <Col className="mb-2">
                <h2>Total Run Time  </h2>
              </Col>

            </Row>
            <Row>
              <Col>
                <h1>{vote_average}</h1> <h4><b>IMDB{" "}</b></h4>
              </Col>

              <Col>
                <h3>{runtime} </h3> <h4><b>MINUTES{" "}</b></h4>
              </Col>

            </Row>
          </Col>
        </Row>
        <hr />
        <Row className="mt-5">
          <Col className="p-0 text-left ml-3 ">
            <p>
              <span className="leftTitle">Genre : </span><br></br>
              {genres.map(genre => genre.name).join(", ")}
            </p>
            <p>
              {/* using array and string methods like this, inside a ternary operator and string interpolator */}
              <span className="leftTitle">Release Date : </span><br></br>
              {release_date
                ? `${release_date
                    .split("-")
                    .reverse()
                    .join("-")}`
                : "Release Date Unknown"}
            </p>
            <p>
              <span className="leftTitle">Budget : </span><br></br>
              {budget > 0 ? `${budget.toLocaleString()}$` : "Budget Unknown"}
            </p>
            <p>
              <span className="leftTitle">Revenue : </span><br></br>
              {revenue > 0 ? `${revenue.toLocaleString()}$` : "Not Estimated"}
              
            </p>
            <p>
              <span className="leftTitle">Status : </span><br></br>
              {status}
            </p>
          </Col>

          
          <Col className="text-left">
          <p>
              <span className="leftTitle">Tagline : </span><br></br>
              {tagline ? `${tagline}` : `No Tagline Found`}
            </p>
            <p>
              <span className="leftTitle">Production Companies : </span><br></br>
              {/* couldnt use array methods here so i made them as states and then used array methods */}
              {companies.map(company => company.name).join(", ")}
            </p>
            <p>
              <span className="leftTitle">Production Countries : </span><br></br>
              {countries.map(country => country.name).join(", ")}
            </p>
            
            <p>
              <span className="leftTitle">Vote Count : </span> <br></br>{vote_count}
              
            </p>
          </Col>
        </Row>
        <hr />
        <Row className="mt-5">
          <h1 className="ml-3 castTitle">CAST</h1>
          

          {cast.slice(0, 12).map(i => {
            return (
              <Link
                      to={`/person/${i.id}`}
                      key={i.id}
                      onClick={() => {
                        handlePersonClick(i.id);
                        refreshPage();
                      }}
                  >

                
              <Card style={{ width: "18em" }} className="ml-3 mb-5" key={i.id}>
                {i.profile_path ? (
                  <LazyLoad>
                    <Card.Img
                      variant="top"
                      src={`https://image.tmdb.org/t/p/w154${i.profile_path}`}
                      
                    />
                  </LazyLoad>
                ) : (
                  <LazyLoad>
                    <Card.Img
                      variant="top"
                      src={require("../../Assets/default.png")}
                    />
                  </LazyLoad>
                )}

                <Card.Body>
                  <Card.Title>{i.name}</Card.Title>
                  <Card.Text>as {i.character}</Card.Text>
                  {/* <Card.Text>as {i.id}</Card.Text> */}
                {/* <Card.Text>{person.place_of_birth}</Card.Text> */}
                  

                </Card.Body>
              </Card>
              </Link>
            );
          })}
        </Row>
        <hr />
      </Container>

      

            
              



      <Container className=" p-0">
        <Row>
          <h1 className="recc">  Reccommended Movies for    {title}  </h1>
        </Row>
      </Container>
      <div className="similar">
        <Swiper {...params}>
          {recommendations.slice(0, 8).map(movie => {
            return (
              <Link
                to={`/movie/${movie.id}`}
                style={{ width: "25em" }}
                className="card ml-3"
                key={movie.id}
                onClick={() => {
                  handleClick(movie.id);
                  refreshPage();
                  console.log(details)
                }}
              >
                
                <LazyLoad>
                  <Card.Img
                    variant="top"
                    src={`https://image.tmdb.org/t/p/w154${movie.poster_path}`}
                    title={title}
                  />

                  {/* <CardContent >
                    <Typography  >
                      <h2>{movie.title.slice(0,20)}...</h2>
                    </Typography>
                    <Typography className="hearts" >
                      <h1 className="hearts">{movie.vote_average}</h1>
                    </Typography>
                  </CardContent> */}

                </LazyLoad>
              </Link>
            );
          })}
        </Swiper>
      </div>

         
      <Container className=" p-0">
        <Row>
          <h1 className="recc">  Similar Movies to    {title}  </h1>
        </Row>
      </Container>
      <div className="similar">
        <Swiper {...params}>
          {similar.slice(0, 8).map(movie => {
            return (
              <Link
                to={`/movie/${movie.id}`}
                style={{ width: "25em" }}
                className="card ml-3"
                key={movie.id}
                onClick={() => {
                  handleClick(movie.id);
                  refreshPage();
                }}
              >
                <LazyLoad>
                  <Card.Img
                    variant="top"
                    src={`https://image.tmdb.org/t/p/w154${movie.poster_path}`}
                    title={movie.title}
                  />
                </LazyLoad>
              </Link>
            );
          })}
        </Swiper>
      </div>

      {/* <Container className=" p-0">
        <Row>
          <h1 className="recc">  {title} : Gallery    </h1>
        </Row>
      </Container>
      <div className="similar">
        
          {images.map(gallery => {
            return (
                <div>
                  <CardColumns>
                    {gallery.poster_path}
                  </CardColumns>
                </div>
            )
          })}
       
      </div> */}



      <div className="videos">
        
        {videos.slice(0, 1).map(video => {
          return (
            <Container className="p-0" key={video.id}>
              <Row className="">
                <h1 className=" recc">{title}  Trailer </h1>
              </Row><Swiper>
              <Row
                className="video "
                style={{
                  position: "relative",
                  paddingBottom: "56.25%" ,
                  paddingTop: 2,
                  height: 0
                }}
              >

                <iframe
                  title={video.title}
                  style={{
                    position: "absolute",
                    top: 0,
                    left: 0,
                    width: "95%",
                    height: "95%"
                  }}
                  src={`https://www.youtube.com/embed/${video.key}`}
                  frameBorder="5"
                />
                
              </Row>
              </Swiper>
            </Container>
          );
        })}
      </div>
      <Container >
          <h1  className="review">Top Reviews By Critics</h1><br></br>
      </Container>

      <Container>
            
            {reviews.slice(0,5).map(review => {
              return(

                <CardColumns className="subhead" >
                  
                  <Card className="author">
                    <Card.Body style={{width : "50em"}}>
                      <Card.Title className="authorb">{review.author}</Card.Title>
                      <Card.Text >{review.content.slice(0,1000)}......</Card.Text>
                      <Card.Text>
                        <small className="text-muted">Continue Reading <a href= {review.url}>{review.url}</a></small>
                      </Card.Text>
                    </Card.Body>
                  </Card>    <hr />               
                </CardColumns>

              )})}
              
            </Container>

      {/* <Container >
          <h1  className="review">Your Reviews #todo</h1><br></br>
      </Container>

      <Container>
        <textarea class = "form-control" rows = "5" placeholder="Write your Review here" >

        </textarea>
      </Container> */}

            

    </div>
  );
};

export default MovieDetails;
