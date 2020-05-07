import React from "react";
import Hero from "../Hero/Hero";
import TvShows from "../TvShows/TvShows";
import "../Home/Home.scss";
import TvMidMenu from "../TvMidMenu/TvMidMenu.jsx"
import TvTop from "../TvTop/TvTop";



const TvHome = () => {
    return (
        <div className="Home">
          <Hero />
          <TvMidMenu/>
            
          <TvShows/>
          <TvTop/>
        </div>
      );
};

export default TvHome;