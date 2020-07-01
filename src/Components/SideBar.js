import React from "react";
import M from 'materialize-css/dist/js/materialize.min.js';
import 'materialize-css/dist/css/materialize.min.css';
import { Link } from "react-router-dom";


class SideNav extends React.Component {
  componentDidMount() {
    const elem = document.querySelector(".sidenav");
    const options = {};
    const instance = M.Sidenav.init(elem, options);
  }

  render() {
    return (
      <div>
        <ul>
          <li><Link to="/dashboard/animalprofiles">Animal Profiles</Link></li>
          <li><Link to="/dashboard/animalprofiles">Animal Profiles</Link></li>
        </ul>
        {/* <a href="#" data-target="slide-out" className="sidenav-trigger">menu</a>
        <ul id="slide-out" className="sidenav">
          <li>Personal Profile</li>
          <li><Link to="/dashboard/animalprofiles">Animal Profiles</Link></li>
          <li>Calender</li>
        </ul> */}
      </div>
    )
  }
}

export default SideNav;