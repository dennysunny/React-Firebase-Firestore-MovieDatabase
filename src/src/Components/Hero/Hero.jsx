import React, { useContext } from "react";

import { MovieContext} from "../../Context";
import Swiper from "react-id-swiper";
import { Link } from "react-router-dom";
import LazyLoad from "react-lazyload";

import "./Hero.scss";
import "swiper/swiper.scss";

const params = {
  spaceBetween: 30,
  centeredSlides: true,
  rebuildOnUpdate: true,
  autoplay: {
    delay: 2500,
    disableOnInteraction: false
  },
  pagination: {
    el: ".swiper-pagination",
    clickable: true
  }
};

const Hero = () => {
  const { trending, handleClick, refreshPage } = useContext(MovieContext);
  return (
    <div className=" Hero">
      <Swiper {...params}>
        {trending.map(movie => {
          return (
            <Link
              to={`/movie/${movie.id}`}
              key={movie.id}
              onClick={() => {
                handleClick(movie.id);
                refreshPage();
              }}
            >
              <LazyLoad>
                <img
                  src={`https://image.tmdb.org/t/p/w1280${movie.backdrop_path}`}
                  alt={movie.title}
                  // style={{ height: "80vh", width:"100%" }}
                />
              </LazyLoad>

              <h1 className="carousel-caption">{movie.title}</h1>
            </Link>
          );
        })}
      </Swiper>
    </div>
  );
};

export default React.memo(Hero);
