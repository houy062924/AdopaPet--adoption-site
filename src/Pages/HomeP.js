import React from "react";
import Landing from "../Components/HomeP/Landing";
import Process from "../Components/HomeP/Process";
import CallToAction from "../Components/HomeP/CallToAction";


class HomeP extends React.Component {
  render() {
    return (
      <div>
        <Landing></Landing>
        { this.props.statedata.signedin === false &&
          <div>
            <Process 
              functions={this.props.functions}
              statedata={this.props.statedata}>
            </Process>
            <CallToAction 
              functions={this.props.functions}
              statedata={this.props.statedata}>
            </CallToAction>
          </div>
        }
        
      </div>
    )
  }
}

export default HomeP;