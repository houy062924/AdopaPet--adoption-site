import React from "react";
import { Link } from "react-router-dom";
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
          <div className="logoCont" onClick={()=>this.handleRedirect("home")}>
            <Link to="/">
              <img src="/src/images/logo-v8.svg"></img>
              Name
            </Link>
          </div>
          { data.signedin === false &&
            <ul className="linkCont">
              <Link to="signin" onClick={()=>this.handleRedirect("user")}>
                <li>Sign In</li>
              </Link>
            </ul>
          }
          { data.signedin === true && data.identity === 0 &&
            <ul className="linkCont">
              
              <Link to="/org/dashboard">
                <li>Dashboard</li>
              </Link>
              
              <li onClick={this.handleSignOut}>Sign out</li>
            </ul>
          }
          { data.signedin === true && data.identity === 2 &&
            <ul className="linkCont">
              
              <Link to="/org/dashboard" onClick={()=>this.handleRedirect("dashboard")}>
                <li>Dashboard</li>
              </Link>
              
              <li onClick={this.handleSignOut}>Sign out</li>
            </ul>
          }
          { data.signedin === true && data.identity === 1 &&
            <ul className="linkCont">
              
              <Link to="/user/profiles">
                <li>Profiles</li>
              </Link>
              <Link to="/user/dashboard">
                <li>My Likes</li>
              </Link>
              
              <li onClick={this.handleSignOut}>Sign out</li>
            </ul>
          }
        </div>
      </nav>
    )
  }
}

export default Nav;