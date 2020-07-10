import React from "react";
import ReactDOM from "react-dom";
import "./styles/shared.css";
import "./styles/card.css";
import { BrowserRouter, Route, Link } from "react-router-dom";
import { firebase } from "./Components/Firebase";

import Nav from "./Components/Nav";
import Carousel from "./Components/Carousel";
import OrgDashboard from "./pages/orgDashboard";
import Users from "./pages/users";
import Home from "./pages/home";
import SigninP from "./pages/signinP";


// import SigninOrg from "./Components/SigninOrg";
// import SigninUser from "./Components/SigninUser";



class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      signedin: false,
      identity: 1, // 0: org; 1: user
      name: "",
      email: "",
      uid: "",
      slide: ""
    }

    this.functions = {
      handleIdentityChange: this.handleIdentityChange.bind(this),

      handleSignUp: this.handleSignUp.bind(this),
      handleSignIn: this.handleSignIn.bind(this),
      handleAuth: this.handleAuth.bind(this),
      handleSignOut: this.handleSignOut.bind(this)
    }

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
    else if ( i === 1 ) {
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
    .then(()=>{
      alert("Success");

      firebase.auth().currentUser.updateProfile({
        displayName: data.name
      })
      .then(()=>{
        this.setState({
          name: data.name,
          email: data.email,
          signedin: true
        })
      })
    })
    .catch((error)=>{
      // Handle Errors here.
      alert(error.message);
    });
  }
  handleSignIn(event, data) {
    event.preventDefault();

    firebase.auth().signInWithEmailAndPassword(data.email, data.password)
    .then(()=>{
      alert("Success");
      this.setState({
        signedin: true,
      })
    })
    .catch((error)=>{
      alert(error.message);
    });
  }
  handleAuth() {
    firebase.auth().onAuthStateChanged((user)=>{
      if (user) {
        console.log(user.uid + " + " + user.displayName)

        this.setState({
          signedin: true,
          uid: user.uid,
          email: user.email,
          name: user.displayName
        })

        const db = firebase.firestore();
        db.collection("organisations").doc(user.uid).set({
          name: user.displayName,
          email: user.email,
          uid: user.uid
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
        signedin: false
      })
    }).catch(function(error) {
      // An error happened.
      alert(error.message)
    });
  }

  render() {
    return (
      <BrowserRouter>
        <Nav statedata={this.state}></Nav>


        <Route exact path="/" component={Home}></Route>
        <Route path="/dashboard" component={OrgDashboard}></Route>
        <Route path="/carousel" component={Carousel}></Route>
        <Route path="/users" component={Users}></Route>
        <Route path="/signin" render={()=>(
          <SigninP statedata={this.state} functions={this.functions}></SigninP>
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