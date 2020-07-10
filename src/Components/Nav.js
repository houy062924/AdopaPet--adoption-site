import React from "react";
import { Link } from "react-router-dom";
import "../styles/nav.css";

class Nav extends React.Component {
  constructor(props) {
    super(props)

    this.handleSignOut = this.handleSignOut.bind(this);
  }

  handleSignOut() {
    this.props.functions.handleSignOut();
  }

  render() {
    let data = this.props.statedata;
    return (
      <nav>
        <div className={ this.props.statedata.identity === 1 ? "navCont userColor" : "navCont orgColor" }>
          <div className="logoCont">
            <Link to="/">LOGO</Link>
          </div>
          { data.signedin === false &&
            <ul className="linkCont">
              <Link to="signin">
                <li>Sign In</li>
              </Link>
              
              {/* <li>
                <Link to="signin/user">User Sign In</Link>
              </li> */}
            </ul>
          }
          { data.signedin === true && data.identity === 0 &&
            <ul className="linkCont">
              
              <Link to="/dashboard">
                <li>ORG DASHBOARD</li>
              </Link>
              
              <li>
                <div>Hello {data.name}</div>
              </li>
              <li onClick={this.handleSignOut}>Sign out</li>

            </ul>
          }
          { data.signedin === true && data.identity === 1 &&
            <ul className="linkCont">
              
              <Link to="/carousel">
                <li>CAROUSEL</li>
              </Link>
              <Link to="/users">
                <li>USERS</li>
              </Link>
              
              <div>Hello {data.name}</div>
              <li onClick={this.handleSignOut}>Sign out</li>
            </ul>
          }
        </div>
      </nav>
    )
  }
}

export default Nav;