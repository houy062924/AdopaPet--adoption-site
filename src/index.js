import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Route, Redirect } from "react-router-dom";
import { firebase } from "./Components/Shared/Firebase";

import Nav from "./Components/Nav";
import ProfilesP from "./Pages/ProfilesP";
import DashboardOrgP from "./Pages/DashboardOrgP";
import DashboardUserP from "./Pages/DashboardUserP";
import HomeP from "./Pages/HomeP";
import SigninP from "./Pages/SigninP";
import Loading from "./Components/Shared/Loading";
import Cursor from "./Components/Shared/Cursor";

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
      loading: true
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
    this.db = firebase.firestore();
    this.timer;
  }
  
  componentDidMount() {
    setTimeout(()=>{
      this.setState({
        loading: false
      })
      
    }, 4000)

    this.handleAuth();
  }
  componentWillUnmount() {
    clearTimeout();
  }

  // Redirects
  handleRedirect(type) {
    console.log(type)
    if (type === "org") {
      this.setState({
        identity: 0,
        redirect: "/signin",
        slide: "slideLeft"
      })
    }
    else if (type === "user") {
      this.setState({
        identity: 1,
        redirect: "/signin",
        slide: "slideRight"
      })
    }
    else if (type === "home") {
      console.log(this.state)
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
    else if (type === "dashboard") {
      this.setState({
        identity: 0,
        redirect: null
      })
    }
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
  handleSignOut(e) {
    this.setState({
      loading: true
    })

    firebase.auth().signOut()
    .then(() => {
      setTimeout(()=>{
        this.setState({
          loading: false
        })
      }, 2000)
      
    })
    .then(()=>{
      clearTimeout(this.timer);

    })
    .catch(function(error) {
      alert(error.message);
      this.setState({
        loading: false
      })
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
        {/* <Cursor></Cursor> */}
        <Nav 
          statedata={this.state} 
          functions={this.functions}>
        </Nav>
        { this.state.loading &&
          <Loading></Loading>
        }
        
        
        <Route 
          exact path="/" 
          render={()=>(
            <HomeP
              functions={this.functions}>
            </HomeP>
          )}>
        </Route>
        <Route 
          path="/org/dashboard" 
          render={()=>(
            <DashboardOrgP 
              appstate={this.state}>
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