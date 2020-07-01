import React from "react";
import { Link } from "react-router-dom";

class Nav extends React.Component {
  render() {
    return (
      <div className="navCont">
        <ul>
          <li><Link to="/dashboard">ORG DASHBOARD</Link></li>
          <li><Link to="/swipe">SWIPE</Link></li>
        </ul>
      </div>
    )
  }
}

export default Nav;