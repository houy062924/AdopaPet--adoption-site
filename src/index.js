import React from "react";
import ReactDOM from "react-dom";
import "./styles/shared.css";
import "./styles/card.css";
import { BrowserRouter, Route, Link, Redirect,  } from "react-router-dom";
import { firebase } from "./Components/Shared/Firebase";

import Nav from "./Components/Nav";
import ProfilesP from "./Pages/ProfilesP";
import DashboardOrgP from "./Pages/DashboardOrgP";
import DashboardUserP from "./Pages/DashboardUserP";
import HomeP from "./Pages/HomeP";
import SigninP from "./Pages/SigninP";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      signedin: false,
      identity: 1, // 0: org; 1: user
      name: "",
      email: "",
      uid: "",
      slide: "",
      redirect: null
    }

    this.functions = {
      handleIdentityChange: this.handleIdentityChange.bind(this),
      handleSignUp: this.handleSignUp.bind(this),
      handleSignIn: this.handleSignIn.bind(this),
      handleAuth: this.handleAuth.bind(this),
      handleSignOut: this.handleSignOut.bind(this)
    }
    this.newUser = false;
    this.db = firebase.firestore();
  }
  
  componentDidMount() {
    this.handleAuth();
  }
  
  // Identity process
  handleIdentityChange(i) {
    if ( i === 0 ) { // org
      this.setState({
        slide: "slideLeft"
      })
    }
    else if ( i === 1 ) { // user
      this.setState({
        slide: "slideRight"
      })
    }
    setTimeout(() => { 
      this.setState({
        identity: i,
      });
    }, 500);
  }

  // Sign in / up process
  handleSignUp(event, data) {
    event.preventDefault();
    this.newUser = true;

    firebase.auth().createUserWithEmailAndPassword(data.email, data.password)
    .then((cred)=>{
      this.setState({
        name: data.name
      })
    })
    .catch((error)=>{
      alert(error.message);
    });
  }
  handleSignIn(event, data) {
    event.preventDefault();
    this.newUser = false;

    firebase.auth().signInWithEmailAndPassword(data.email, data.password)
    .then(()=>{
      alert("Success");
      
    })
    .catch((error)=>{
      alert(error.message);
    });
  }
  handleSignOut(e) {
    firebase.auth().signOut()
    .then(() => {
      alert("Signed out");
      
    })
    .catch(function(error) {
      alert(error.message);
    });
  }
  handleAuth() {
    firebase.auth().onAuthStateChanged((user)=>{
      if (user) {

        if ( this.newUser === true ) { // signing up
          this.db.collection("members").doc(user.uid).set({
            name: this.state.name,
            email: user.email,
            uid: user.uid,
            identity: this.state.identity,
            likes: []
          })
          .then(()=>{
            alert("Signed in");
            this.setState({
              signedin: true,
              // name: user.name,
              email: user.email,
              uid: user.uid,
            })
          })
          .then(()=>{
            if (this.state.identity===0) {
              this.setState({
                redirect: "/org/dashboard"
              })
            }
            else {
              this.setState({
                redirect: "/user/profiles"
              })
            }
          })
        }
        else { // signing in or already signed in
          this.db.collection("members").doc(user.uid).get()
          .then((doc)=>{
            this.setState({
              identity: doc.data().identity,
              signedin: true,
              name: doc.data().name,
              email: doc.data().email,
              uid: doc.data().uid
            })

            if (doc.data().identity===0) {
              this.setState({
                redirect: "/org/dashboard"
              })
            }
            else {
              this.setState({
                redirect: "/user/profiles"
              })
            }
          })
        }
      }
      else {
        console.log("not signed in");
        this.setState({
          signedin: false,
          identity: 1,
          slide: "",
          email: "",
          name: "",
          uid: "",
          redirect: "/"
        })
      }
    });
  }
  

  render() {
    let redirect = null;
    if (this.state.redirect) {
      redirect = <Redirect to={this.state.redirect}></Redirect>
    }
    return (
      <div>

        <Nav statedata={this.state} functions={this.functions}></Nav>
        
        <Route 
          exact path="/" 
          component={HomeP}>
        </Route>
        <Route 
          path="/org/dashboard" 
          render={()=>(
            <DashboardOrgP 
              statedata={this.state}>
            </DashboardOrgP>
          )}>
        </Route>
        <Route 
          path="/user/profiles" 
          render={()=>(
            <ProfilesP 
              statedata={this.state}>
            </ProfilesP>
          )}>
        </Route>
        <Route 
          path="/user/dashboard" 
          render={()=>(
            <DashboardUserP
              statedata={this.state}>
            </DashboardUserP>
          )}>
        </Route>
        <Route 
          path="/signin" 
          render={(props)=>(
            <SigninP 
              {...props} 
              statedata={this.state} 
              functions={this.functions}>
            </SigninP>
          )}>
        </Route>

        {redirect}
      </div>
    )
  }
}

ReactDOM.render(
  <BrowserRouter><App /></BrowserRouter>, 
  document.querySelector("#root")
);