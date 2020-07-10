import React from "react";
import { BrowserRouter, Route, Link } from "react-router-dom";
import SigninOrg from "../Components/SigninOrg";
import SigninUser from "../Components/SigninUser";
import "../styles/signin.css";



class SigninP extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      identity: 1, // 0: org; 1: user
      slide: ""
    }

    this.changeIdentity = this.changeIdentity.bind(this);
  }

  changeIdentity(identity) {
    this.props.functions.handleIdentityChange(identity);
    // if ( identity === 0 ) { // org
    //   this.setState({
    //     slide: "slideLeft"
    //   })
    // }
    // else if ( identity === 1 ) {
    //   this.setState({
    //     slide: "slideRight"
    //   })
    // }
    // setTimeout(() => { 
    //   this.setState({
    //     identity: identity,
    //   });
    // }, 500);
    
  }

  render() {
    return (
      <BrowserRouter basename="/signin">
        <div className={ this.props.statedata.identity === 1 ? "bottomCont userColor" : "bottomCont orgColor" }>
          <div className="leftCont">
            <h1>Org?</h1>
            <button type="button" onClick={()=>this.changeIdentity(0)}>Click</button>
          </div>
          
          <div className="rightCont">
            <h1>User?</h1>
            <button type="button" onClick={()=>this.changeIdentity(1)}>Click</button>
          </div>

          <div className={`upperCont ${this.props.statedata.slide}`}>
            { this.props.statedata.identity === 0 
              ? <SigninOrg statedata={this.props.statedata} functions={this.props.functions}></SigninOrg>
              : <SigninUser statedata={this.props.statedata} functions={this.props.functions}></SigninUser>
            }
          </div>
        </div>


        {/* <button><Link to="/org">Org Sign In</Link></button>
        <button><Link to="/user">User Sign In</Link></button> */}


        <Route path="/org" 
          render={()=>(
            <SigninOrg statedata={this.props.statedata} functions={this.props.functions}></SigninOrg>
          )}>
        </Route>
        <Route path="/signin/user" component={SigninUser}></Route> 
      </BrowserRouter>
    )
  }
}

export default SigninP;