import React from "react";
import "../styles/auth.css";
import { firebase } from "../Components/Firebase";
import { Link } from "react-router-dom";



class SigninOrg extends React.Component {
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
    console.log(this.props)
    this.props.functions.handleSignOut(e);
  }
  
  render() {
    return (
      <div>
        { this.props.statedata.signedin === false
          ? <div>
              <div onClick={this.handleSignup}>Sign Up</div>
              <div onClick={this.handleSignin}>Sign In</div>
              { this.state.method === 0
                ? <SignupForm functions={this.props.functions}></SignupForm>
                : <SigninForm functions={this.props.functions}></SigninForm>
              }
            </div>
          : <button type="button" onClick={this.handleSignOut}>Sign Out</button>
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
      <div>
        <form onSubmit={this.handleSignUp}>
          <label htmlFor="name">Name</label>
          <input type="text" id="name" name="name" onChange={this.handleChange}></input>
          <label htmlFor="email">Email</label>
          <input type="text" id="email" name="email" onChange={this.handleChange}></input>
          <label htmlFor="password">Password</label>
          <input type="password" id="password" name="password" onChange={this.handleChange}></input>

          <button type="submit" onSubmit={this.handleSignUp}>Submit</button>
        </form>
      </div>
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
      <div>
        <form onSubmit={this.handleSignIn}>
          <label htmlFor="email">Email</label>
          <input type="text" id="email" name="email" onChange={this.handleChange}></input>
          <label htmlFor="password">Password</label>
          <input type="password" id="password" name="password" onChange={this.handleChange}></input>

          <button type="submit" onSubmit={this.handleSignIn}>Submit</button>
        </form>
      </div>
    )
  }
}

export default SigninOrg;