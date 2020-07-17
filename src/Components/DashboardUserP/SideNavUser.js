import React from "react";
import { Link } from "react-router-dom";
import "../../styles/sidenavUser.css";


class SideNavUser extends React.Component {
  render() {
    return (
      <ul className="sidenavUserCont">
        <div className="userCont">
          <div className="imgCont">
            <img src="/src/images/user.svg" className="userImg"></img>
          </div>
          <div className="userTextCont">
            
            <p className="userName">Welcome, {this.props.userstate.name}</p>
            <p className="userEmail">{this.props.userstate.email}</p>
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

export default SideNavUser;