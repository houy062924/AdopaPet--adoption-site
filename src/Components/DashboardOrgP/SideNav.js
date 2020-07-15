import React from "react";
import { Link } from "react-router-dom";
import "../../styles/sidenav.css";
import UserIcon from "../../styles/images/user.svg";


class SideNav extends React.Component {
  render() {
    return (
      <ul className="sidenavCont">
        <div className="userCont">
          <div className="imgCont">
            <img src={UserIcon} className="userImg"></img>
          </div>
          <div className="userTextCont">
            
            <p className="userName">Welcome, {this.props.statedata.name}</p>
            <p className="userEmail">{this.props.statedata.email}</p>
          </div>
          
        </div>
        <Link to="/dashboard/overview">
          <li className="linkCont">Overview</li>
        </Link>
        <Link to="/dashboard/profiles">
          <li className="linkCont">Animal Profiles</li>
        </Link>
        <Link to="/dashboard/calender">
          <li className="linkCont">Calender</li>
        </Link>
      </ul>
    )
  }
}

export default SideNav;