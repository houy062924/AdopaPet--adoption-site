import React from "react";
import ReactDOM from "react-dom";
import "./style.css";
import { BrowserRouter, Route, Link } from "react-router-dom";
import Card from "./Components/Card";

class App extends React.Component{
  
  
  render() {
    return (
      <BrowserRouter>
        <Card/>
      </BrowserRouter>
    )
  }
}

ReactDOM.render(
  <App />, 
  document.querySelector("#root")
);