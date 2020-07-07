import React from "react";
// import Auth from "../Components/Auth";
import { Route, Link } from "react-router-dom";
import Auth from "../Components/SigninOrg";



class Home extends React.Component {
  render() {
    return (
      <div>
        <button><Link to="signin/org">Org Sign In</Link></button>
        <button><Link to="signin/user">User Sign In</Link></button>

      </div>
    )
  }
}

export default Home;