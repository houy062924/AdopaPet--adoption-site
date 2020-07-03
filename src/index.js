import React from "react";
import ReactDOM from "react-dom";
import "./styles/shared.css";
import "./styles/card.css";
import { BrowserRouter, Route, Link } from "react-router-dom";
import Nav from "./Components/Nav";
import Carousel from "./Components/Carousel";
import Orgs from "./pages/orgs";


class App extends React.Component {
  
  render() {
    return (
      <BrowserRouter>
        <Nav></Nav>

        <Route path="/dashboard" component={Orgs}></Route>
        <Route path="/swipe" component={Carousel}></Route>

      </BrowserRouter>
    )
  }
}

ReactDOM.render(
  <App />, 
  document.querySelector("#root")
);