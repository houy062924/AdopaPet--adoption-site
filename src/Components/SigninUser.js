import React from "react";
import "../styles/auth.css";
import {firebase} from "./Firebase";

/*
DONE 1. display signup form when entered
DONE 2. hide signup form after successful signup
3. display user name after successful signup
DONE 4. sign out
5. login


*/

class SigninUser extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      signedin: false,
      name: "",
      email: "",
      password: "",
      uid: ""
    }

    // this.handleChange = this.handleChange.bind(this);
    // this.handleSubmit = this.handleSubmit.bind(this);
    // this.handleAuth = this.handleAuth.bind(this);
    // this.handleSignOut = this.handleSignOut.bind(this);
  }

  // componentDidMount() {
  //   this.handleAuth();
  // }
  // handleChange(e) {
  //   console.log("changing")
  //   this.setState({
  //     [e.target.name]: e.target.value,
  //   })
  // }
  // handleSubmit(e) {
  //   e.preventDefault();
  //   console.log("submit");
  //   let email = this.state.email;
  //   let password = this.state.password
  //   firebase.auth().createUserWithEmailAndPassword(email, password)
  //   .catch(function(error) {
  //     // Handle Errors here.
  //     console.log("error")
  //   });
  // }
  // handleAuth() {
  //   firebase.auth().onAuthStateChanged((user)=>{
  //     if (user) {

  //       console.log(user.uid)
  //       this.setState({
  //         signedin: true
  //       })
  //       // this.setState({
  //       //   uid: user.uid
  //       // })
  //       // let userdata = {
  //       //   displayName: user.displayName,
  //       //   email: user.email,
  //       //   uid: user.uid
  //       // }
  //       // console.log(userdata)
    
  //       // db.collection("users").doc(userdata.uid).set(userdata);
    

  //     } 
  //     else {

  //     }
  //   });
  // }
  // handleSignOut(e) {
  //   firebase.auth().signOut()
  //   .then(function() {
  //     // Sign-out successful.
  //     console.log("signed out");
  //     this.setState({
  //       signedin: false
  //     })
  //   }).catch(function(error) {
  //     // An error happened.
  //   });
  // }
  

  render() {
    return (
      <div>
        
        {/* { this.state.signedin === false
          ? <SignupForm handleChange={this.handleChange} handleSubmit={this.handleSubmit} handleAuth={this.handleAuth}></SignupForm>
          : <button type="button" onClick={this.handleSignOut}>Sign Out</button>
        } */}

      </div>
    )
  }
}

export default SigninUser;