import React from "react";

class SignupForm extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      name: "",
      email: "",
      password: "",
    }

    this.handleChange = this.handleChange.bind(this);
    this.handleSignUp = this.handleSignUp.bind(this);
  }


  handleChange(e) {
    this.setState({
      [e.target.name]: e.target.value,
    })
  }
  handleSignUp(e) {
    let d = {
      email: this.state.email,
      password: this.state.password,
      name: this.state.name
    }
    this.props.functions.handleSignUp(e, d);
  }

  render() {
    return (
      <form onSubmit={this.handleSignUp} className="formCont">
        <div className="inputCont">
          <img src="/src/images/user.svg" className="inputIcon"></img>
          <input 
            type="text" 
            id="name" 
            name="name" 
            placeholder="Name" 
            onFocus={(e) => e.target.placeholder = ""} 
            onBlur={(e) => e.target.placeholder = "Name"} 
            onChange={this.handleChange}></input>
        </div>
        <div className="inputCont">
          <img src="/src/images/email.svg" className="inputIcon"></img>
          <input 
            type="text" 
            id="email" 
            name="email" 
            placeholder="Email" 
            onFocus={(e) => e.target.placeholder = ""} 
            onBlur={(e) => e.target.placeholder = "Email"} 
            onChange={this.handleChange}></input>
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
        
        <button className="signinFormCont" type="submit" onSubmit={this.handleSignUp} className="submitButtonOrg">Sign Up</button>
      </form>
    )
  }
}

export default SignupForm;