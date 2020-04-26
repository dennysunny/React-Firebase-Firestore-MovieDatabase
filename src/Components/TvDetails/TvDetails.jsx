import React, { useContext  } from "react";
import { Container, Col, Row,Card} from "react-bootstrap";
import { MovieContext } from "../../Context";
import Swiper from "react-id-swiper";
import LazyLoad from "react-lazyload";
import { Link } from "react-router-dom";

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


const TvDetails = () => {
  const {
    handleTvClick,
    handleSeasonClick,
    refreshPage,
    tvDetails,
    currentUser,
    favorite,
    addFavorite,
    genres,
    created_by,
    languages,
    companies,
    last_episode_to_air,
    seasons,
    tvRecommendations,
  } = useContext(MovieContext);

  const {
    poster_path,
    overview,
    name,
    vote_average,
    vote_count,
    first_air_date,
    last_air_date,
    in_production,
    backdrop_path,
    homepage,
    //id,
    status,
    type,
    next_episode_to_air,
    number_of_seasons,
  } = tvDetails;

  return (
    <div className="Details" >
      
      <img
        src={`https://image.tmdb.org/t/p/w1280${backdrop_path}`}
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
                onClick={() => addFavorite(tvDetails)}
              >
                {currentUser ? (
                  favorite.includes(tvDetails) ? (
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
          </Col>

          <Col>
            <Row>
              {/* <span>({release_date})</span> */}
              <h1>{name} </h1>
            </Row>
            
            <Row>
              <p className="mt-5 mb-5">{overview}</p>

              <Col className="mb-2">
                <h2>Average Rating  </h2> 
              </Col>

              <Col className="mb-2">
                <h2>Total   </h2>
              </Col>

              

            </Row>
            <Row>
              <Col>
                <h1>{vote_average}</h1> <h4><b>IMDB{" "}</b></h4>
              </Col>

              <Col>
                <h3>{number_of_seasons} </h3> <h4><b>SEASONS{" "}</b></h4>
              </Col>
            </Row>         
          </Col>
        </Row>
        <hr />
        
        <Row className="mt-5">
          <Col className="p-0 text-left ml-3 ">

            <p>
              <span className="leftTitle">Created by : </span><br></br>
              {created_by.map(createdby => createdby.name).join(", ")}
            </p>
           
            <p>
              <span className="leftTitle">Genre : </span><br></br>
              {genres.map(genre => genre.name).join(", ")}
            </p>
            <p>
              {/* using array and string methods like this, inside a ternary operator and string interpolator */}
              <span className="leftTitle">First Air Date : </span><br></br>
              {first_air_date
                ? `${first_air_date
                    .split("-")
                    .reverse()
                    .join("-")}`
                : "Release Date Unknown"}
            </p>
            <p>
            <span className="leftTitle">last_air_date : </span> <br></br>
            {last_air_date
                  ?`${last_air_date
                  .split("-")
                  .reverse()
                  .join("-")}`
              : "Release Date Unknown"}
            </p>

            <p>
                <span className="leftTitle">Status : </span>  <br></br>                                 
                    {status ? `${status}` : `No homepage Found` }   
            </p>

            <p>
                <span className="leftTitle">Homepage : </span>  <br></br>                                 
                    {homepage ? <a href={`${homepage}`}>{homepage}</a> : `No homepage Found` }   
            </p>
            
          </Col>
          <Col className="text-left">
         
            <p>
              <span className="leftTitle">Production Companies : </span><br></br>
              {/* couldnt use array methods here so i made them as states and then used array methods */}
              {companies.map(company => company.name).join(", ")}
            </p>
           
            <p>
              <span className="leftTitle">Languages : </span><br></br>
              {languages.map(languages => languages).join(", ")}
            </p>
            
            <p>
              <span className="leftTitle">Vote Count : </span> <br></br>{vote_count}    
            </p>

            <p>
              <span className="leftTitle">Type : </span> <br></br>{type}    
            </p>

            <p>
              <span className="leftTitle">In Production : </span> <br></br>
              {in_production? `${in_production}` : 'N/A' }  
            </p>

            <p>
              <span className="leftTitle">Next Episode On : </span> <br></br>
              {next_episode_to_air? `${next_episode_to_air}` : 'N/A' }  
            </p>
          </Col>
        </Row>
        
      </Container>

      <Container className=" p-0">
                <Row>
                <h1 className="recc">  Last Episode      </h1> 
                </Row>
                <Container className="mt-5 p-0">
                    <Row>
                      <Col className="firstCol ml-2 ">
                        <div>
                            <img
                              src={`https://image.tmdb.org/t/p/w185${last_episode_to_air.still_path}`}
                              alt=""
                              className=""
                            />
                        </div>
                      </Col>

                      <Col className="p-0 text-left ml-3 ">
                      <p>
                          <span  className="leftTitle">Name : </span>                      
                          {last_episode_to_air.name}
                        </p>
                      
                        <p>
                          <span  className="leftTitle">Episode Number : </span>                      
                          {last_episode_to_air.episode_number}
                        </p>

                        <p>
                          <span  className="leftTitle">Season Number : </span>                      
                          {last_episode_to_air.season_number}
                        </p>

                        <p>
                          <span  className="leftTitle">Air Date : </span>                      
                          {last_episode_to_air.air_date}
                        </p>

                        <p>
                          <span  className="leftTitle">Rating : </span>                      
                          {last_episode_to_air.vote_average} / 10
                        </p>
                      </Col>
                    </Row>
                 </Container>       
         
            </Container> 

            <Container className=" p-0">
                <Row>
                  <h1 className="recc"> {number_of_seasons} Seasons </h1> 
                </Row>    
              </Container>

              <div className="similarSeason">

              <Swiper {...params}>
              {seasons.slice(0, 12).map(credit => {
                    return (

                      <Link
                      to={`/season/${credit.season_number}`}
                      style={{ width: "25em"}}
                      className="card ml-3"
                      key={credit.season_number}
                      onClick={() => {
                        handleSeasonClick(credit.season_number);
                        refreshPage();
                        console.log("Called",credit.episode_count)
                      }}
                    >
                    
                        <LazyLoad>
                        <Card.Img 
                            variant="top"
                            src={`https://image.tmdb.org/t/p/w342${credit.poster_path}`}
                            //title={credit.title}
                            
                        />
                        </LazyLoad>
                        <Col className="season">
                        {/* <h1>Season: {credit.season_number}</h1> */}
                        {/* <h1 className="seasonName">{credit.name}</h1>
                        <h1> <b>Episodes:</b> {credit.episode_count}</h1>
                        <h1> <b>Air Date:</b> {credit.air_date}</h1>
                        <h1 ><b>Overview:</b></h1>
                        <h1 className="seasonOverview">{credit.overview.slice(0,150)}..</h1> */}
                        </Col>
                        </Link>
                    );
                })}
              </Swiper>
              </div>

              <Container className=" p-0">
                <Row>
                  <h1 className="recc"> Reccommended Shows To Watch </h1> 
                </Row>    
              </Container>

                <div className="similar">
                    <Swiper {...params}>
                      {tvRecommendations.slice(0, 8).map(tv => {
                        return (
                          <Link
                            to={`/tv/${tv.id}`}
                            style={{ width: "25em" }}
                            className="card ml-3"
                            key={tv.id}
                            onClick={() => {
                              handleTvClick(tv.id);
                              refreshPage();
                              console.log(tv.id)
                            }}
                          >
                            <LazyLoad>
                              <Card.Img
                                variant="top"
                                src={`https://image.tmdb.org/t/p/w154${tv.poster_path}`}
                               
                              />

                            </LazyLoad>
                          </Link>
                        );
                      })}
                    </Swiper>
              </div>
    </div>
  );
};

export default TvDetails;
