import React, { useContext  } from "react";
import { Container, Col, Row, Card} from "react-bootstrap";
import { MovieContext } from "../../Context";
import Swiper from "react-id-swiper";

import { Link } from "react-router-dom";
import LazyLoad from "react-lazyload";


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
  //spaceBetween: 30,
  // centeredSlides: true,
  // autoplay: {
  //   delay: 500,
  //   disableOnInteraction: false
  // },
  pagination: {
    el: ".swiper-pagination",
    
    clickable: true
  }
};

const PersonDetails = () => {
    const {

        person,
        known_for,
        movie_credits,
        //images,
        external_ids,
        handleClick,
        refreshPage
    } = useContext(MovieContext);

    const {
        profile_path,
        known_for_department,
        birthday,
        deathday,
        id,
        name,
        biography,
        gender,
        popularity,
        place_of_birth,
        imdb_id,
        homepage,
    } = person;

       
    // const{
    //     poster_path,
    //     title,
    //     //id,
    //     character,
    //     vote_average,
    //     cast

    // }= movie_credits;

    // console.log("movie credits",movie_credits.cast.title)

    return(
        <div className="Details">
            <Container className="mt-5 p-0">
               <Row>
               <Col className="firstCol ml-2 ">
                        <div>
                            <img
                                src={`https://image.tmdb.org/t/p/w342${profile_path}`}
                                alt=""
                                className=""
                            />
                        </div>
                </Col>
                            <Col>
                                <Row>
                                    {/* <span>({release_date})</span> */}
                                    <h1>{name} </h1>
                                </Row>

                    <hr />
                    <br></br>
                                <Row>
                                <p>
                                    <span className="leftTitle">Also Known as : </span>
                                    {known_for.map(aka => aka).join("  ,  ")}
                                    
                                </p>
                                </Row>

                                <br></br>

                                <Row>
                                    <p>
                                        <span className="leftTitle">Known For : </span>
                                        {known_for_department }   
                                    </p>
                                </Row>

                                <br></br>

                                <Row>
                                <p>
                                    <span className="leftTitle">Homepage : </span>                                   
                                    {homepage ? <a href={`${homepage}`}>{homepage}</a> : `No homepage Found` }   
                                </p>
                                </Row>
                                
                                {/* <Row>
                                    <Col>
                                        <h1>{popularity}</h1> 
                                    </Col>
                                </Row> */}
                            </Col>                
                </Row>
           

               
                    
                <Row className="credits">
                            <Col>
                            <i class="fab fa-facebook-square"> </i>
                            <a href={external_ids.facebook_id} className="s_name" target="_blank" rel="noopener noreferrer"> {external_ids.facebook_id} </a>
                            {/* <a href='http://www.facebook.com/`${external_ids.facebook_id}`' className="s_name"> {external_ids.facebook_id} </a> */}
                            </Col>

                            <Col>
                            <i class="fab fa-instagram"></i>
                            <a href={external_ids.instagram_id} className="s_name" target="_blank" rel="noopener noreferrer"> {external_ids.instagram_id} </a>
                            {/* <a href="https://www.instagram.com/${external_ids.instagram_id}`" className="s_name" target="_blank" rel="noopener noreferrer"> {external_ids.instagram_id} </a> */}
                            </Col>

                            <Col>
                            <i class="fab fa-twitter-square"></i>
                            <a href={external_ids.twitter_id} className="s_name" target="_blank" rel="noopener noreferrer"> {external_ids.twitter_id} </a>
                            </Col>

                            </Row>
                            <hr />

                <Row className="mt-5">
                    
                    <Col className="p-0 text-left ml-3 ">
                       
                        <p>
                        <span className="leftTitle">Popularity : </span>
                            {popularity }   
                        </p>

                        <p>
                        <span className="leftTitle">Birthday : </span>
                            {birthday }   
                        </p>

                        <p>
                        <span className="leftTitle">Deathday : </span>
                            {deathday ? `${deathday}`: 'Alive'}    
                        </p>

                        <p>
                        <span className="leftTitle">Gender : </span>
                            {gender >1 ? `Male` : `Female` }   
                        </p>
                </Col>
                <Col className="text-left">
                        <p>
                        <span className="leftTitle">Place Of Birth : </span>
                            {place_of_birth }   
                        </p>

                        <p>
                        <span className="leftTitle">IMBD ID : </span>
                            {imdb_id }   
                        </p>

                       

                        <p>
                        <span className="leftTitle">TMDB ID : </span>
                            {id }   
                        </p>

                      

                        
                    </Col>
                </Row>
            </Container> 

           <hr />
            <Container >
                 <Row>
                <h1 className="recc">   About    {person.name}  </h1> 
                </Row>
               
                <Row >
                    <p className="bio">
                        {biography ? `${biography}` : `We don't have a biography for`} {person.name}
                    </p>                       
                </Row>  
            </Container>

                              
            

            <Container className=" p-0">
                <Row>
                <h1 className="recc">   Movies Of    {person.name}  </h1> 
                </Row>
            </Container>   

            <div className="similar">    

                <Swiper {...params}>
                {movie_credits.slice(0, 12).map(credit => {
                    return (

                        <Link
                            to={`/movie/${credit.id}`}
                            style={{ width: "25em" }}
                            className="card ml-3"
                            key={credit.id}
                            onClick={() => {
                            handleClick(credit.id);
                            refreshPage();
                            }}
                        >
                    {credit.poster_path? (
                        <LazyLoad>
                        <Card.Img
                            variant="top"
                            src={`https://image.tmdb.org/t/p/w154${credit.poster_path}`}
                            title={credit.title}
                        />

                        </LazyLoad>
                    ):(
                        <LazyLoad>
                          <Card.Img
                            variant="top"
                            src={require("../../Assets/default.png")}
                          />
                        </LazyLoad>
                      )}
                     </Link>
                    );
                })}
                </Swiper>   
            </div>


            {/* <Container className=" p-0">
                <Row>
                <h1 className="recc">   Images Of    {person.name}  </h1> 
                </Row>
            </Container>   

            <div className="similar">    

                <Swiper {...params}>
                {images.map(credit => {
                    return (
                  
                        <LazyLoad>
                        <Card.Img
                            variant="top"
                            src={`https://image.tmdb.org/t/p/w154${credit.file_path}`}
                            
                        />

                        </LazyLoad>
                     
                    );
                })}
                </Swiper>   
            </div>
         */}

        </div>
    )
}

export default PersonDetails;