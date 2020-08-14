import React from "react";
import "../../styles/process.css";

class Process extends React.Component {
  render() {
    return (
      <div>
        <StepQuestion></StepQuestion>
        <StepSearch 
          functions={this.props.functions}
          statedata={this.props.statedata}>
        </StepSearch>
        <StepMeet></StepMeet>
      </div>
    )
  }
}
class StepQuestion extends React.Component {
  render() {
    return (
      <div className="stepsCont">
        <div className="questionImg"></div>
        <div className="textCont">
          <span className="processNum">1</span>
          <h3>Thinking about getting a pet?</h3>
          <p>Check out our profiles of homeless animals!<br/>This could be the start of something new.</p>
        </div>
      </div>
    )
  }
}
class StepSearch extends React.Component {
  constructor(props) {
    super(props);

    this.handleRedirect = this.handleRedirect.bind(this);
  }
  handleRedirect(t) {
    this.props.functions.handleRedirect(t);
  }
  render() {
    return (
      <div className="stepsCont searchCont">
        <div className="searchImg"></div>

        <div className="textCont searchText">
          <span className="processNum">2</span>
          <h3>Find your furry match</h3>
          <p>Shelter animals in search of a forever home.<br/>Are you the one they’re waiting for?</p>
          <p>
            <br/>
            Have a look at our profiles!
            <br/>
            { this.props.statedata.signedin === false
              ? <span 
                  className="signinUser" 
                  onClick={()=>this.handleRedirect("usersignin")}>
                    Sign in
                </span>
              : <span 
                  className="signinUser" 
                  onClick={()=>this.handleRedirect("userviewprofiles")}>
                    View Profiles
                </span>
            }
            
          </p>
        </div>
      </div>
    )
  }
}
class StepMeet extends React.Component {
  render() {
    return (
      <div className="stepsCont">
        <div className="meetImg"></div>
        <div className="textCont">
          <span className="processNum">3</span>
          <h3>Found your perfect pet?</h3>
          <p>Get to know them face-to-face.<br/>They could soon become your new best friend!</p>
        </div>
      </div>
    )
  }
}

export default Process;