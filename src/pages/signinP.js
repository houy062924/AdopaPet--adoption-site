import React from "react";
import { BrowserRouter, Route, Link } from "react-router-dom";
import SigninOrg from "../Components/SigninOrg";
import SigninUser from "../Components/SigninUser";



class SigninP extends React.Component {
  render() {
    return (
      <BrowserRouter basename="/signin">
        <button><Link to="/org">Org Sign In</Link></button>
        <button><Link to="/user">User Sign In</Link></button>


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