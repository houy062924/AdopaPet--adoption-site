import React from "react";
import { BrowserRouter, Route, Link } from "react-router-dom";
import SigninOrg from "../Components/SigninP/SigninOrg";
import SigninUser from "../Components/SigninP/SigninUser";
import "../styles/signin.css";



class SigninP extends React.Component {
  constructor(props) {
    super(props);

    this.changeIdentity = this.changeIdentity.bind(this);
  }

  changeIdentity(identity) {
    this.props.functions.handleIdentityChange(identity);
  }

  render() {
    return (
      <BrowserRouter basename="/signin">
        <div className={ this.props.statedata.identity === 1 ? "bottomCont userColor" : "bottomCont orgColor" }>
          <div className="leftCont">
            <h2 className="signinTitle">Looking to rehome animals?</h2>
            <div
              className="signinOrg"
              onClick={()=>this.changeIdentity(0)}>
              Sign in here
            </div>
            <img src="/src/images/org.svg"></img>
          </div>
          
          <div className="rightCont">
            <h2 className="signinTitle">Looking for a furry friend?</h2>
            <div
              onClick={()=>this.changeIdentity(1)} 
              className="signinUser">
              Sign in here
            </div>
            <img src="/src/images/adopt.svg"></img>
          </div>

          <div className={`upperCont ${this.props.statedata.slide}`}>
            { this.props.statedata.identity === 0 
              ? <SigninOrg statedata={this.props.statedata} functions={this.props.functions}></SigninOrg>
              : <SigninUser statedata={this.props.statedata} functions={this.props.functions}></SigninUser>
            }
          </div>
        </div>

        <Route path="/org" 
          render={()=>(
            <SigninOrg 
              statedata={this.props.statedata} 
              functions={this.props.functions}>
            </SigninOrg>
          )}>
        </Route>
        <Route path="/user" component={SigninUser}></Route> 
      </BrowserRouter>
    )
  }
}

export default SigninP;