import React from "react";
import { Link } from "react-router-dom";
import "../../styles/sidenavUser.css";


class SideNavUser extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      navOpened: false
    }

    this.toggleNav = this.toggleNav.bind(this);
  }

  toggleNav(link) {
    if (link === true) {
      this.setState({
        navOpened: false
      })
    }
    else {
      this.setState((prevState)=>({
      navOpened: !prevState.navOpened
      }))
    }
  }
  render() {
    return (
      <ul 
        className={ this.state.navOpened ? "sidenavUserCont openNav" : "sidenavUserCont closeNav"}
      >
        <div className="userCont">
          <img 
            src="/src/images/back.svg" 
            className={this.state.navOpened ? "linkIcon openedNavIcon" : "linkIcon closedNavIcon"}
            onClick={this.toggleNav}>
          </img>
          <div className="imgCont">
            <img src="/src/images/user.svg" className="userImg"></img>
          </div>
          <div className="userTextCont">
            <p className="userName">Welcome, {this.props.userstate.name}</p>
            <p className="userEmail">{this.props.userstate.email}</p>
          </div>
        </div>

        <Link to="/dashboard/overview">
          <li className="linkCont" onClick={()=>this.toggleNav(true)}>
            <div 
              className={this.state.navOpened ? "linkIcon dashboardIcon openedNavIcon" : "linkIcon dashboardIcon closedNavIcon"}>
            </div>
            Overview
          </li>
        </Link>
        <Link to="/dashboard/profiles">
          <li className="linkCont" onClick={()=>this.toggleNav(true)}>
            <div 
              className={this.state.navOpened ? "linkIcon favouriteIcon openedNavIcon" : "linkIcon favouriteIcon closedNavIcon"}>
            </div>
            Animal Profiles
          </li>
        </Link>
        {/* <Link to="/dashboard/calender">
          <li className="linkCont" onClick={()=>this.toggleNav(true)}>
            <div 
              className={this.state.navOpened ? "linkIcon calendarIcon openedNavIcon" : "linkIcon calendarIcon closedNavIcon"}>
            </div>
            Calender
          </li>
        </Link>
        <Link to="/dashboard/calender">
          <li className="linkCont settingLink" onClick={()=>this.toggleNav(true)}>
            <div 
              className={this.state.navOpened ? "linkIcon settingIcon openedNavIcon" : "linkIcon settingIcon closedNavIcon"}>
            </div>
            Settings
          </li>
        </Link> */}
      </ul>
    )
  }
}

export default SideNavUser;