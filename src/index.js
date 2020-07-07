import React from "react";
import ReactDOM from "react-dom";
import "./styles/shared.css";
import "./styles/card.css";
import { BrowserRouter, Route, Link } from "react-router-dom";
import Nav from "./Components/Nav";
import Carousel from "./Components/Carousel";
import Auth from "./Components/SigninOrg";
import OrgDashboard from "./pages/orgDashboard";
import Users from "./pages/users";
import Home from "./pages/home";
import SigninOrg from "./Components/SigninOrg";
import SigninUser from "./Components/SigninUser";



class App extends React.Component {
  
  render() {
    return (
      <BrowserRouter>
        <Nav></Nav>


        <Route exact path="/" component={Home}></Route>
        <Route path="/dashboard" component={OrgDashboard}></Route>
        <Route path="/carousel" component={Carousel}></Route>
        <Route path="/users" component={Users}></Route>
        <Route path="/signin/org" component={SigninOrg}></Route>
        <Route path="/signin/user" component={SigninUser}></Route>


      </BrowserRouter>
    )
  }
}

ReactDOM.render(
  <App />, 
  document.querySelector("#root")
);