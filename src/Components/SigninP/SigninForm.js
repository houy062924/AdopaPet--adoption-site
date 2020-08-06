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
      email: this.state.email,
      password: this.state.password
    }

    this.props.functions.handleSignIn(e, d)
  }
 

  render() {
    return (
      <form onSubmit={this.handleSignIn} className="formCont">
        <div className="inputCont">
          <img src="/src/images/email.svg" className="inputIcon"></img>
          <input 
            type="text" 
            id="email" 
            name="email" 
            placeholder="Email" 
            onFocus={(e) => e.target.placeholder = ""}
            onBlur={(e) => e.target.placeholder = "Email"}
            onChange={this.handleChange} ></input>
        </div>
        <div className="inputCont">
          <img src="/src/images/password.svg" className="inputIcon"></img>
          <input 
            type="password" 
            id="password" 
            name="password" 
            placeholder="Password" 
            onFocus={(e) => e.target.placeholder = ""} 
            onBlur={(e) => e.target.placeholder = "Password"} 
            onChange={this.handleChange}></input>
        </div>
        
        <button type="submit" onSubmit={this.handleSignIn} className="submitButtonOrg">Sign In</button>
      </form>
    )
  }
}

export default SigninForm;