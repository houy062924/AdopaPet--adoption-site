import React from "./node_modules/react";
import { BrowserRouter, Route, Link } from "./node_modules/react-router-dom";
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
            <h1>Org?</h1>
            <button type="button" onClick={()=>this.changeIdentity(0)}>Click here</button>
          </div>
          
          <div className="rightCont">
            <h1>User?</h1>
            <button type="button" onClick={()=>this.changeIdentity(1)}>Click</button>
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
            <SigninOrg statedata={this.props.statedata} functions={this.props.functions}></SigninOrg>
          )}>
        </Route>
        <Route path="/signin/user" component={SigninUser}></Route> 
      </BrowserRouter>
    )
  }
}

export default SigninP;