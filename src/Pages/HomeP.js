import React from "react";
import Landing from "../Components/HomeP/Landing";
import Process from "../Components/HomeP/Process";
import CallToAction from "../Components/HomeP/CallToAction";


class HomeP extends React.Component {
  render() {
    return (
      <div>
        <Landing></Landing>
        <Process functions={this.props.functions}></Process>
        <CallToAction functions={this.props.functions}></CallToAction>
      </div>
    )
  }
}

export default HomeP;