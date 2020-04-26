import React from "react";

import NavTop from "./Components/Nav/NavTop";
import Home from "./Components/Home/Home";
import MovieDetails from "./Components/MovieDetails/MovieDetails.jsx";
import Footer from "./Components/Footer/Footer";
import Modal from "./Components/Modal/Modal.jsx";
import SignIn from "./Components/SignIn/SignIn.jsx";
import User from "./Components/User/User.jsx";
import Privacy from "./Components/Privacy/Privacy.jsx"

import MovieContextProvider from "./Context.jsx";

import { Switch, Route } from "react-router-dom";

import "./App.scss";

import PersonDetails from "./Components/MovieDetails/PersonDetails";
import TvDetails from "./Components/TvDetails/TvDetails"
import TvSeasons from "./Components/TvDetails/TvSeasons"




const App = () => {
  return (
    <div className="App">
      <MovieContextProvider>
        <NavTop />
        <Switch>
          <Route path="/signin" component={SignIn} />
          <Route exact path="/" component={Home} />
          <Route path="/user" component={User} />
          <Route path="/movie/:id" component={MovieDetails} />
          <Route path="/person/:pid" component={PersonDetails}/>     
          <Route path="/privacy" component={Privacy} />
          <Route path="/tv/:id" component={TvDetails}/>
          <Route exact path="/season/:sid" component={TvSeasons}/>
        </Switch>
        <Modal />
        <Footer />
      </MovieContextProvider>
    </div>
  );
};

export default App;
