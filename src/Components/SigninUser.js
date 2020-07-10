import React from "react";
import "../styles/auth.css";
import UserIcon from "../styles/images/user.svg";
import EmailIcon from "../styles/images/email.svg";
import PasswordIcon from "../styles/images/password.svg";

// import { firebase } from "../Components/Firebase";
// import { Link } from "react-router-dom";



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
      <div>
        { this.props.statedata.signedin === false
          ? <div>
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
          : <button type="button" onClick={this.handleSignOut} >Sign Out</button>
        }
      </div>
    )
  }
}

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
    console.log(this.state)
    this.props.functions.handleSignUp(e, d);
  }

  render() {
    return (
      <form onSubmit={this.handleSignUp} className="formCont">
        <div className="inputCont">
          <img src={UserIcon} className="inputIcon"></img>
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
          <img src={EmailIcon} className="inputIcon"></img>
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
          <img src={PasswordIcon} className="inputIcon"></img>
          <input 
            type="password" 
            id="password" 
            name="password" 
            placeholder="Password" 
            onFocus={(e) => e.target.placeholder = ""} 
            onBlur={(e) => e.target.placeholder = "Password"} 
            onChange={this.handleChange}></input>
        </div>
        
        <button type="submit" onSubmit={this.handleSignUp} className="submitButtonUser">Sign Up</button>
      </form>
    )
  }
}

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
          <img src={EmailIcon} className="inputIcon"></img>
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
          <img src={PasswordIcon} className="inputIcon"></img>
          <input 
            type="password" 
            id="password" 
            name="password" 
            placeholder="Password" 
            onFocus={(e) => e.target.placeholder = ""} 
            onBlur={(e) => e.target.placeholder = "Password"} 
            onChange={this.handleChange}></input>
        </div>
        
        <button type="submit" onSubmit={this.handleSignIn} className="submitButtonUser">Sign In</button>
      </form>
    )
  }
}

export default SigninUser;