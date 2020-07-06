import React from "react";
import ReactDOM from "react-dom";
import "./styles/shared.css";
import "./styles/card.css";
import { BrowserRouter, Route, Link } from "react-router-dom";
import Nav from "./Components/Nav";
import Carousel from "./Components/Carousel";
import OrgDashboard from "./pages/orgDashboard";
import Users from "./pages/users";
import Home from "./pages/home";



class App extends React.Component {
  
  render() {
    return (
      <BrowserRouter>
        <Nav></Nav>


        <Route exact path="/" component={Home}></Route>
        <Route path="/dashboard" component={OrgDashboard}></Route>
        <Route path="/carousel" component={Carousel}></Route>
        <Route exact path="/users" component={Users}></Route>

      </BrowserRouter>
    )
  }
}

ReactDOM.render(
  <App />, 
  document.querySelector("#root")
);