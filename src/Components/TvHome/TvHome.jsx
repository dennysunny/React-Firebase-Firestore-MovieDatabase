import React from "react";
import Hero from "../Hero/Hero";
import TvShows from "../TvShows/TvShows";
import "../Home/Home.scss";
import TvMidMenu from "../TvMidMenu/TvMidMenu.jsx"



const TvHome = () => {
    return (
        <div className="Home">
          <Hero />
          <TvMidMenu/>
            
          <TvShows/>
        </div>
      );
};

export default TvHome;