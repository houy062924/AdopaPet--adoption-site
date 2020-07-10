import React from "react";
import { Link } from "react-router-dom";
import "../styles/nav.css";

class Nav extends React.Component {
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
              <li>
                <Link to="signin">Sign In</Link>
              </li>
              {/* <li>
                <Link to="signin/user">User Sign In</Link>
              </li> */}
            </ul>
          }
          { data.signedin === true && data.identity === 0 &&
            <ul className="linkCont">
              <li>
                <Link to="/dashboard">ORG DASHBOARD</Link>
              </li>
              <li>
                <div>Hello {data.name}</div>
              </li>
            </ul>
          }
          { data.signedin === true && data.identity === 1 &&
            <ul className="linkCont">
              <li>
                <Link to="/carousel">CAROUSEL</Link>
              </li>
              <li>
                <Link to="/users">USERS</Link>
              </li>
              <li>
                <div>Hello {data.name}</div>
              </li>
            </ul>
          }
        </div>
      </nav>
    )
  }
}

export default Nav;