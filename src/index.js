import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Route, Redirect, Switch } from "react-router-dom";
import { firebase } from "./Components/Shared/Firebase";

import db from "./Components/Shared/Firebase";
import Nav from "./Components/Nav";
import ProfilesP from "./Pages/ProfilesP";
import DashboardOrgP from "./Pages/DashboardOrgP";
import DashboardUserP from "./Pages/DashboardUserP";
import HomeP from "./Pages/HomeP";
import SigninP from "./Pages/SigninP";
import Loading from "./Components/Shared/Loading";
// import Cursor from "./Components/Shared/Cursor";

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
      redirect: null,
      loading: true,
      signinemail: "test-user@test.com",
      signinpass: "testtest"
    }

    this.functions = {
      handleRedirect: this.handleRedirect.bind(this),
      handleIdentityChange: this.handleIdentityChange.bind(this),
      handleSignUp: this.handleSignUp.bind(this),
      handleSignIn: this.handleSignIn.bind(this),
      handleAuth: this.handleAuth.bind(this),
      handleSignOut: this.handleSignOut.bind(this),
    }
    this.newUser = false;
    this.timer;
  }
  
  componentDidMount() {
    this.timeoutID = setTimeout(()=>{
      this.setState({
        loading: false
      })
      
    }, 4000)

    this.handleAuth();
  }
  componentWillUnmount() {
    clearTimeout(this.timeoutID);
  }

  // Redirects
  handleRedirect(action) {
    if (action === "orgsignin") {
      this.setState({
        identity: 0,
        redirect: "/signin",
        slide: "slideLeft",
        signinemail: "test-org@test.com",
        signinpass: "testtest"
      })
    }
    else if (action === "usersignin") {
      this.setState({
        identity: 1,
        redirect: "/signin",
        slide: "slideRight",
        signinemail: "test-user@test.com",
        signinpass: "testtest"
      })
    }
    else if (action === "home") {
      if (this.state.identity === 0) {
        this.setState({
          identity: 2,
          redirect: null
        })
      }
      else if (this.state.identity === 1) {
        this.setState({
          identity: 1,
          redirect: null
        })
      }     
    }
    else if (action === "orgviewdashboard") {
      this.setState({
        identity: 0,
        redirect: "/org/dashboard"
      })
    }
    else if (action === "userviewprofiles") {
      this.setState({
        identity: 1,
        redirect: "/user/profiles"
      })
    }
  }
  
  // Identity process
  handleIdentityChange(i) {
    if ( i === 0 ) { // org
      this.setState({
        slide: "slideLeft",
        signinemail: "test-org@test.com",
        signinpass: "testtest"
      })
    }
    else if ( i === 1 ) { // user
      this.setState({
        slide: "slideRight",
        signinemail: "test-user@test.com",
        signinpass: "testtest"
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
    this.setState({
      loading: true
    })

    firebase.auth().createUserWithEmailAndPassword(data.email, data.password)
    .then((cred)=>{
      this.setState({
        name: data.name,
        loading: false
      })
    })
    .catch((error)=>{
      alert(error.message);
      this.setState({
        loading: false
      })
    });
  }
  handleSignIn(event, data) {
    event.preventDefault();
    this.newUser = false;
    this.setState({
      loading: true
    })

    firebase.auth().signInWithEmailAndPassword(data.email, data.password)
    .then(() => {
      setTimeout(()=>{
        this.setState({
          loading: false
        })
        
      }, 3000)
      
    })
    .then(()=>{
      clearTimeout(this.timer);

    })
    .catch((error)=>{
      alert(error.message);
      this.setState({
        loading: false
      })
    });
  }
  handleSignOut() {
    firebase.auth().signOut();
    this.setState({
      signinemail: "test-user@test.com",
      signinpass: "testtest"
    })
  }
  handleAuth() {
    firebase.auth().onAuthStateChanged((user)=>{
      if (user) {

        if ( this.newUser === true ) { // signing up
          db.collection("members").doc(user.uid).set({
            name: this.state.name,
            email: user.email,
            uid: user.uid,
            identity: this.state.identity,
            likes: []
          })
          .then(()=>{
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
          db.collection("members").doc(user.uid).get()
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
      else { // not signed in
        this.setState({
          signedin: false,
          identity: 1,
          slide: "",
          email: "",
          name: "",
          uid: "",
          redirect: "/",
        })
      }
    });
  }

  render() {
    if ( this.state.loading ) {
      return <Loading />
    }
    let redirect = null;
    if (this.state.redirect) {
      redirect = <Redirect to={this.state.redirect}></Redirect>
    }
    return (
      <div>
        {/* <Cursor></Cursor> */}
        <Nav 
          statedata={this.state} 
          functions={this.functions}>
        </Nav>      
        
        <Switch>
          <Route 
            exact path="/">
              <HomeP
                functions={this.functions}
                statedata={this.state}>
              </HomeP>
          </Route>
          <Route 
            path="/org/dashboard">
              <DashboardOrgP 
                statedata={this.state}>
              </DashboardOrgP>
          </Route>
          <Route 
            path="/user/profiles">
              <ProfilesP 
                statedata={this.state}>
              </ProfilesP>
          </Route>
          <Route 
            path="/user/dashboard">
              <DashboardUserP
                statedata={this.state}>
              </DashboardUserP>
          </Route>
          <Route 
            path="/signin">
              <SigninP
                statedata={this.state} 
                functions={this.functions}>
              </SigninP>
          </Route>
        </Switch>
        {redirect}
      </div>
    )
  }
}

ReactDOM.render(
  <BrowserRouter><App /></BrowserRouter>, 
  document.querySelector("#root")
);