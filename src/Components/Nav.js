import React from "react";
import { Link } from "react-router-dom";
import 'materialize-css/dist/css/materialize.min.css';

class Nav extends React.Component {
  render() {
    return (
      <nav>
        <div className="nav-wrapper">
          <div className="brand-logo left"><Link to="/">LOGO</Link></div>
          <ul className="right">
            <li><Link to="/dashboard">ORG DASHBOARD</Link></li>
            <li><Link to="/carousel">CAROUSEL</Link></li>
            <li><Link to="/users">USERS</Link></li>
          </ul>
        </div>
      </nav>
    )
  }
}

export default Nav;