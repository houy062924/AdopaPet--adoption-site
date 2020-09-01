import React from "react";
import { NavLink } from "react-router-dom";
import "../Styles/nav.css";


class Nav extends React.Component {
  constructor(props) {
    super(props)

    this.handleRedirect = this.handleRedirect.bind(this);
    this.handleSignOut = this.handleSignOut.bind(this);
  }

  handleRedirect(t) {
    this.props.functions.handleRedirect(t);
  }
  handleSignOut() {
    this.props.functions.handleSignOut();
  }

  render() {
    let data = this.props.statedata;
    let styles;
    if (this.props.statedata.identity === 0) {
      styles = "navCont orgColor";
    }
    else if (this.props.statedata.identity === 1) {
      styles = "navCont userColor";
    }
    else if (this.props.statedata.identity === 2) {
      styles = "navCont userColor";
    }

    return (
      <nav>
        <div className={ styles }>
          <div 
            className="logoCont" 
            onClick={()=>this.handleRedirect("home")}>
            <NavLink to="/" className="logoACont">
              <img src="/src/images/logo-v8.svg"></img>
              <span className="logo">AdopaPet</span>
            </NavLink>
          </div>

          {/* Not signed in */}
          { data.signedin === false &&
            <ul className="linkCont">
              <NavLink to="signin" 
                activeClassName="activeNav"
                onClick={()=>this.handleRedirect("usersignin")}>
                <li className="signinIcon">Sign In</li>
              </NavLink>
            </ul>
          }

          {/* Org signed in */}
          { data.signedin === true && data.identity === 0 &&
            <ul className="linkCont">
              <NavLink to="/org/dashboard" activeClassName="activeNav">
                <li className="dashIcon">Dashboard</li>
              </NavLink>
              <li onClick={this.handleSignOut}>Sign out</li>
            </ul>
          }

          {/* Org signed in (homepage) */}
          { data.signedin === true && data.identity === 2 &&
            <ul className="linkCont">
              <NavLink to="/org/dashboard" 
                activeClassName="activeNav"
                onClick={()=>this.handleRedirect("orgviewdashboard")}>
                  <li className="dashIcon">Dashboard</li>
              </NavLink>
              <li onClick={this.handleSignOut}>Sign out</li>
            </ul>
          }

          {/* User signed in */}
          { data.signedin === true && data.identity === 1 &&
            <ul className="linkCont">
              <NavLink to="/user/profiles" activeClassName="activeNav">
                <li className="profilesIcon">Profiles</li>
              </NavLink>
              <NavLink to="/user/dashboard" activeClassName="activeNav">
                <li className="likesIcon">My Likes</li>
              </NavLink>
              <li onClick={this.handleSignOut} className="signinIcon">Sign Out</li>
            </ul>
          }
        </div>
      </nav>
    )
  }
}

export default Nav;