import React from "react";

import Hero from "../Hero/Hero";
import MidMenu from "../MidMenu/MidMenu";
import MoviesPopular from "../MoviesPopular/MoviesPopular.jsx";
import MoviesNow from "../MoviesNow/MoviesNow.jsx";
import MoviesComing from "../MoviesComing/MoviesComing.jsx";
import MoviesTop from "../MoviesTop/MoviesTop";
import TvShows from "../TvShows/TvShows";
import TvTop from "../TvTop/TvTop";

import "./Home.scss";

const Home = () => {
  return (
    <div className="Home">
      <Hero />
      <MidMenu/>
      <MoviesPopular />
      <MoviesNow />
      <MoviesComing />
      <MoviesTop />
      <TvShows />
      <TvTop/>

    </div>
  );
};

export default Home;
