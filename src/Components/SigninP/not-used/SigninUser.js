import React from "react";
import SigninForm from "../SigninForm";
import SignupForm from "../SignupForm";


class SigninUser extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      method: 0, // 0: sign up; 1: sign in
    }
    
    this.handleSignin = this.handleSignin.bind(this);
    this.handleSignup = this.handleSignup.bind(this);
    this.handleSignOut = this.handleSignOut.bind(this);
  }
  handleSignup() {
    this.setState({
      method: 0,
    })
  }
  handleSignin() {
    this.setState({
      method: 1,
    })
  }
  handleSignOut(e) {
    this.props.functions.handleSignOut(e);
  }
  
  render() {
    return (
      <div className="signinFormCont">
        { this.props.statedata.signedin === false &&
          <div>
            <h1>User</h1>
            <div className="methodCont">
              <p 
                onClick={this.handleSignup} 
                className={ this.state.method === 0 ? "methodButtonUser  activeUser" : "methodButtonUser"}>
                  Sign Up
              </p>
              <p 
                onClick={this.handleSignin} 
                className={ this.state.method === 1 ? "methodButtonUser  activeUser" : "methodButtonUser"}>
                  Sign In
              </p>
            </div>
            
            { this.state.method === 0
              ? <SignupForm functions={this.props.functions}></SignupForm>
              : <SigninForm functions={this.props.functions}></SigninForm>
            }
          </div>
        }
      </div>
    )
  }
}


export default SigninUser;