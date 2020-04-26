import React from "react";
import ReactDOM from "react-dom";
import "./index.scss";
import App from "./App";
import ScrollToTop from "./Components/ScrollToTop.jsx";
import { BrowserRouter as Router } from "react-router-dom";
import * as serviceWorker from "./serviceWorker";

//scrollto top to scroll to top
//https://stackoverflow.com/questions/36904185/react-router-scroll-to-top-on-every-transition
//https://reacttraining.com/react-router/web/guides/scroll-restoration/scroll-to-top
ReactDOM.render(
  <Router>
    <ScrollToTop>
      <App />
    </ScrollToTop>
  </Router>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
