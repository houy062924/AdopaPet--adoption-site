import React from "react";

class SigninForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: ""
    }

    this.handleChange = this.handleChange.bind(this);
    this.handleSignIn = this.handleSignIn.bind(this);
  }

  handleChange(e) {
    this.setState({
      [e.target.name]: e.target.value,
    })
  }
  handleSignIn(e) {
    let d = {
      email: this.props.signinemail,
      password: this.props.signinpass
    }

    this.props.functions.handleSignIn(e, d)
  }
 

  render() {
    return (
      <form onSubmit={this.handleSignIn} className="formCont">
        <div className="inputCont">
          <img src="/src/images/email.svg" className="inputIcon"></img>
          { this.props.identity === 0  // org: 0; user: 1
            ? <input 
                type="text" 
                id="email" 
                name="email" 
                placeholder="Email" 
                value="test-org@test.com"
                onChange={this.handleChange}
                onFocus={(e) => e.target.placeholder = ""}
                onBlur={(e) => e.target.placeholder = "Email"}>
              </input>
            : <input 
                type="text" 
                id="email" 
                name="email" 
                placeholder="Email" 
                value="test-user@test.com"
                onChange={this.handleChange}
                onFocus={(e) => e.target.placeholder = ""}
                onBlur={(e) => e.target.placeholder = "Email"}>
              </input>
          }
          
        </div>
        <div className="inputCont">
          <img src="/src/images/password.svg" className="inputIcon"></img>
          <input 
            type="password" 
            id="password" 
            name="password" 
            placeholder="Password" 
            value="testtest"
            onFocus={(e) => e.target.placeholder = ""} 
            onBlur={(e) => e.target.placeholder = "Password"} 
            onChange={this.handleChange}></input>
        </div>
        
        <button 
          type="submit" 
          className={this.props.identity === 0 ? "submitButtonOrg" : "submitButtonUser"}
          onSubmit={this.handleSignIn}>
            Sign In
        </button>
      </form>
    )
  }
}

export default SigninForm;