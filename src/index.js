import React from "react";
import ReactDOM from "react-dom";
import "./style.css";
import { BrowserRouter, Route, Link } from "react-router-dom";
import Carousel from "./Components/Carousel";

class App extends React.Component{
  
  render() {
    return (
      <BrowserRouter>
        <Carousel/>
      </BrowserRouter>
    )
  }
}

ReactDOM.render(
  <App />, 
  document.querySelector("#root")
);