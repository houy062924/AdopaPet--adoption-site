import React from "react";
import SigninForm from "./SigninForm";
import SignupForm from "./SignupForm";


class SigninBase extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      method: 1, // 0: sign up; 1: sign in
    }
    
    this.renderSignupForm = this.renderSignupForm.bind(this);
    this.renderSigninForm = this.renderSigninForm.bind(this);
    this.determineIdentityRenderButton = this.determineIdentityRenderButton.bind(this);
  }
  renderSignupForm() {
    this.setState({
      method: 0,
    })
  }
  renderSigninForm() {
    this.setState({
      method: 1,
    })
  }
  determineIdentityRenderButton(method) {
    // Determine identity
    if ( this.props.statedata.identity === 0 ) {

      // Determine method 
      if ( this.state.method === method ) {
        return "methodButtonOrg  activeOrg"
      }
      else {
        return "methodButtonOrg"
      }

    }
    else {
      if ( this.state.method === method  ) {
        return "methodButtonUser  activeUser"
      }
      else {
        return "methodButtonUser"
      }
    }
  }
  
  render() {
    return (
      <div className="signinFormCont">
        { this.props.statedata.signedin === false &&
          <div>
            { this.props.statedata.identity === 0
              ? <h1>Organisation</h1>
              : <h1>User</h1>
            }
            
            <div className="methodCont">
              <p 
                onClick={this.renderSigninForm} 
                className={ this.determineIdentityRenderButton(1) }>
                  Sign In
              </p>
              <p 
                onClick={this.renderSignupForm} 
                className={ this.determineIdentityRenderButton(0) }>
                  Sign Up
              </p>
            </div>
          
            { this.state.method === 0
              ? <SignupForm 
                  functions={this.props.functions}
                  identity={this.props.statedata.identity}>
                </SignupForm>
              : <SigninForm 
                  functions={this.props.functions}
                  identity={this.props.statedata.identity}
                  signinemail={this.props.statedata.signinemail}
                  signinpass={this.props.statedata.signinpass}>
                </SigninForm>
            }
          </div>
        }
      </div>
    )
  }
}

export default SigninBase;