import React from "react";
import { Link } from "react-router-dom";
import 'materialize-css/dist/css/materialize.min.css';

class Nav extends React.Component {
  render() {
    return (
      <nav>
        <div className="nav-wrapper">
          <div className="brand-logo"><Link to="/">LOGO</Link></div>
          <ul className="right">
            <li><Link to="/dashboard">ORG DASHBOARD</Link></li>
            <li><Link to="/swipe">SWIPE</Link></li>
          </ul>
        </div>
      </nav>
    )
  }
}

export default Nav;