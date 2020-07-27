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
    console.log(this.props.statedata.identity=== 1)
    return (
      <nav>
        <div className={ this.props.statedata.identity === 1 ? "navCont userColor" : "navCont orgColor" }>
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