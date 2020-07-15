import React from "react";
import ReactDOM from "react-dom";
import "./styles/shared.css";
import "./styles/card.css";
import { BrowserRouter, Route, Link, Redirect, Switch } from "react-router-dom";
import { firebase } from "./Components/Shared/Firebase";

import Nav from "./Components/Nav";
// import Carousel from "./Components/CarouselP/Carousel";
// import CarouselP from "./Pages/CarouselP";
import DashboardOrgP from "./Pages/DashboardOrgP";
import Users from "./Pages/DashboardUserP";
import Home from "./Pages/HomeP";
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
    this.test = this.test.bind(this);
  }
  
  componentDidMount() {
    this.handleAuth();
  }

  test() {
    this.setState({
      redirect: "/dashboard"
    })
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

    firebase.auth().createUserWithEmailAndPassword(data.email, data.password)
    .then((cred)=>{
      alert("Success");
      const db = firebase.firestore();

      this.setState({
        name: data.name,
        email: data.email,
        uid: cred.user.uid,
        signedin: true
      })

      return db.collection("members").doc(cred.user.uid).set({
        name: data.name,
        email: data.email,
        uid: cred.user.uid,
        identity: this.state.identity
      })
    })
    .then(()=>{
    //   console.log(this.state)
      this.setState({
        redirect: "/"
      })
      // windows.location = "/"
    })
    .catch((error)=>{
      // Handle Errors here.
      alert(error.message);
    });
  }
  handleSignIn(event, data) {
    event.preventDefault();

    firebase.auth().signInWithEmailAndPassword(data.email, data.password)
    .then((cred)=>{
      alert("Success");
      this.setState({
        signedin: true,
        // email: data.email,
        // name: cred.user.displayName
      })
    })
    .catch((error)=>{
      alert(error.message);
    });
  }
  handleAuth() {
    firebase.auth().onAuthStateChanged((user)=>{
      if (user) {
        console.log(user)

        const db = firebase.firestore();

        db.collection("members").doc(user.uid).get()
        .then((doc)=>{
          this.setState({
            identity: doc.data().identity,
            signedin: true,
            name: doc.data().name,
            email: doc.data().email,
            uid: doc.data().uid
          })
        })
        
      } 
      else {
        console.log("not signed in")
      }
    });
  }
  handleSignOut(e) {
    firebase.auth().signOut()
    .then(() => {
      // Sign-out successful.
      alert("Signed out");
      this.setState({
        signedin: false,
        identity: 1,
        slide: "",
        email: "",
        name: "",
        uid: ""
      })
      // windows.location = "/";
    })
    .catch(function(error) {
      // An error happened.
      alert(error.message);
    });
  }

  render() {
    if (this.state.redirect) {
      return <Redirect to={this.state.redirect}></Redirect>
    }
    return (
      <BrowserRouter>

        <Nav statedata={this.state} functions={this.functions}></Nav>
        {/* <button onClick={this.test}>test</button> */}

        
        <Route exact path="/" component={Home}></Route>
        <Route path="/dashboard" render={()=>(
          <DashboardOrgP statedata={this.state}></DashboardOrgP>
        )}></Route>
        {/* <Route path="/carousel" component={Carousel}></Route> */}
        <Route path="/users" component={Users}></Route>
        <Route path="/signin" render={(props)=>(
          <SigninP {...props} statedata={this.state} functions={this.functions}></SigninP>
        )}>
        </Route>
      </BrowserRouter>
    )
  }
}

ReactDOM.render(
  <App />, 
  document.querySelector("#root")
);