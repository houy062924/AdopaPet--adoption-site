import React from "react";
import { Link } from "react-router-dom";
import "../../styles/sidenavUser.css";
import UserIcon from "../../styles/images/user.svg";


class SideNavUser extends React.Component {
  render() {
    return (
      <ul className="sidenavUserCont">
        <div className="userCont">
          <div className="imgCont">
            <img src={UserIcon} className="userImg"></img>
          </div>
          <div className="userTextCont">
            
            <p className="userName">Welcome, {this.props.userstate.name}</p>
            <p className="userEmail">{this.props.userstate.email}</p>
          </div>
          
        </div>
        <Link to="/user/overview">
          <li className="linkCont">Overview</li>
        </Link>
        <Link to="/user/profiles">
          <li className="linkCont">Animal Profiles</li>
        </Link>
        <Link to="/user/calender">
          <li className="linkCont">Calender</li>
        </Link>
      </ul>
    )
  }
}

export default SideNavUser;