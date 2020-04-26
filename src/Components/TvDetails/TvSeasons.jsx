import React, { useContext  } from "react";
import { Container, Col, Row,Card} from "react-bootstrap";
import { MovieContext } from "../../Context";
import LazyLoad from "react-lazyload";
import { Link } from "react-router-dom";

import "swiper/swiper.scss";
import "./MovieDetails.scss";
import "../../index.scss"


  const TvSeasons = () => {
      const {
        episodes,
        seasoninfo,
        seasonCredits,
        handlePersonClick,
        refreshPage,
      } = useContext(MovieContext)

    //   const{
    //     character,
    //     name,
    //     profile_path,
    //   } = seasonCredits;
 console.log("backdrop",seasoninfo.still_path)

  return(
    <div className="Details" >
        <img
        src={`https://image.tmdb.org/t/p/original${seasoninfo.poster_path}`}
        alt=""
        className="firstImg"
      />
            <Container>
                    <Row>
                    <p className="sessionOverview"> {seasoninfo.overview} </p>
                    </Row>
            </Container>


            <Container className=" p-0">
                    <Row>
                    <h1 className="recc"> Season {seasoninfo.season_number} Cast </h1> 
                    </Row>    
             </Container>

            <Container className="mt-5 p-0">
                    <Row className="mt-5">
                                
                                {seasonCredits.slice(0, 12).map(i => {
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
                                                        </Card.Body>
                                                    </Card>
                                        </Link>
                                    );
                                })}
                               
                    </Row>  
            </Container>

            <Container className=" p-0">
                <Row>
                  <h1 className="recc"> All Episodes of Season {seasoninfo.season_number} </h1> 
                </Row>   

                         <div className="similarSeasons">
                             <p>
                                <span   className="authorb">Air Date :   {seasoninfo.air_date} </span>   
                            </p>    
                        </div> 

                    <Container className="mt-5 p-0">
                            {episodes.map(credit => {
                            return (

                                <Row>
                                     <Col className="firstCol ml-2 ">
                                         <div>
                                         <img
                                            src={`https://image.tmdb.org/t/p/w185${credit.still_path}`}
                                            alt=""
                                            className=""
                                            />
                                         </div>

                                     </Col>

                                     <Col className="p-0 text-left ml-3 ">
                                        <p>
                                            <span  className="leftTitle">{credit.name} </span>                      
                                            
                                        </p>

                                         <p>
                                            <span className="leftTitle">Episode : </span> {credit.episode_number}
                                         </p>

                                        <p>
                                            <span  className="leftTitle">Overview : </span>                      
                                            {credit.overview ? `${credit.overview}` : `We don't have an overview translated in English`}
                                        </p>
                                            <hr />
                                     </Col>
                                </Row> 
                              
                            
                            );
                        })}  

                       
                    </Container>
              </Container>         

    </div>
  )
}

export default TvSeasons;