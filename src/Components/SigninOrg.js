import React from "react";
import "../styles/auth.css";
import { firebase } from "../Components/Firebase";
import { Link } from "react-router-dom";



class SigninOrg extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      signedin: false,
      name: "",
      email: "",
      password: "",
      uid: "",
      method: 0  // 0: sign up; 1: sign in; 2: signed in
    }

    this.handleChange = this.handleChange.bind(this);
    this.handleSignUp = this.handleSignUp.bind(this);
    this.handleSignIn = this.handleSignIn.bind(this);
    this.handleAuth = this.handleAuth.bind(this);
    this.handleSignOut = this.handleSignOut.bind(this);
    this.switchMethod = this.switchMethod.bind(this);
  }

  componentDidMount() {
    this.handleAuth();
  }
  handleChange(e) {
    console.log("changing")
    this.setState({
      [e.target.name]: e.target.value,
    })
  }
  handleSignUp(e) {
    e.preventDefault();
    console.log("submit");
    let email = this.state.email;
    let password = this.state.password
    firebase.auth().createUserWithEmailAndPassword(email, password)
    .then(()=>{
      console.log("success");
      this.setState({
        signedin: true
      })
    })
    .catch((error)=>{
      // Handle Errors here.
      alert(error.message);
    });
  }
  handleSignIn() {
    console.log("Test")
    this.setState({
      signedin: true
    })
  }
  handleAuth() {
    firebase.auth().onAuthStateChanged((user)=>{
      if (user) {
        this.setState({
          uid: user.uid
        })

        const db = firebase.firestore();
        db.collection("organisations").doc(user.uid).set({
          name: this.state.name,
          email: user.email,
          uid: user.uid
        })
      } 
      else {

      }
    });
  }
  handleSignOut(e) {
    firebase.auth().signOut()
    .then(() => {
      // Sign-out successful.
      console.log("signed out");
      this.setState({
        signedin: false
      })
    }).catch(function(error) {
      // An error happened.
      alert(error.message)
    });
  }
  switchMethod(method, event) {
    this.setState({
      method: method
    })
  }

  
  render() {
    return (
      <div>
        
        { this.state.signedin === false
          ? <SignupMethod handleChange={this.handleChange} handleSignUp={this.handleSignUp} handleSignIn={this.handleSignIn} handleAuth={this.handleAuth} switchMethod={this.switchMethod} statedata={this.state}></SignupMethod>
          : <button type="button" onClick={this.handleSignOut}>Sign Out</button>
        }

      </div>
    )
  }
}

class SignupMethod extends React.Component {
  constructor(props) {
    super(props);

  }
  switchMethod(method, event) {
    this.props.switchMethod(method, event);
  }

  render() {
    return (
      <div>
        <div>
          <div><Link to="org">Org</Link></div>
          <div><Link to="user">User</Link></div>
        </div>
        <div>
          <div onClick={(e)=>this.switchMethod(0, e)}>Sign Up</div>
          <div onClick={(e)=>this.switchMethod(1, e)}>Sign In</div>
        </div>
        { this.props.statedata.method === 0
          ? <SignupForm handleChange={this.props.handleChange} handleSignUp={this.props.handleSignUp} handleAuth={this.props.handleAuth}></SignupForm>
          : <SigninForm handleChange={this.props.handleChange} handleSignIn={this.props.handleSignIn} handleAuth={this.props.handleAuth}></SigninForm>
        }
      </div>
    )
  }
}

class SignupForm extends React.Component {
  constructor(props) {
    super(props);


    this.handleChange = this.handleChange.bind(this);
    this.handleSignUp = this.handleSignUp.bind(this);
    this.handleAuth = this.handleAuth.bind(this);
  }

  handleChange(e) {
    this.props.handleChange(e);
  }
  handleSignUp(e) {
    this.props.handleSignUp(e);
  }
  handleAuth(e) {
    this.props.handleAuth(e)
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

    this.handleChange = this.handleChange.bind(this);
    this.handleSignIn = this.handleSignIn.bind(this);
    this.handleAuth = this.handleAuth.bind(this);
  }

  handleChange(e) {
    this.props.handleChange(e);
  }
  handleSignIn(e) {
    this.props.handleSignIn(e);
  }
  handleAuth(e) {
    this.props.handleAuth(e)
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