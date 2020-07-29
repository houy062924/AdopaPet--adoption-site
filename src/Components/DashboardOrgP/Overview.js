import React from "react";
import Pending from "./Pending";
import Active from "./Active";
import Adopted from "./Adopted";
import "../../styles/overvieworg.css";

class Overview extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      tabStatus: 0, // 0: pending; 1: active; 2: adopted
    }

    this.handleTabChange = this.handleTabChange.bind(this);
  }

  handleTabChange(status) {
    this.setState({
      tabStatus: status
    })
  }
  renderComponent() {
    let tabstatus = this.state.tabStatus;
    switch (tabstatus) {
      case 0:
        console.log("pedning")
        return <Pending></Pending>

      case 1:
        console.log("active")
        return <Active></Active>

      case 2:
        console.log("adopted")
        return <Adopted></Adopted>
    }
  }

  render() {
    return (
      <div className="overviewCont"> 
        <div className="overviewTopCont">
          <div className="overviewBox pendingAppCont" onClick={()=>this.handleTabChange(0)}>
            <p className="overviewTitle">Pending Applications</p>
            <p className="overviewNumber">10</p>
          </div>
          <div className="overviewBox" onClick={()=>this.handleTabChange(1)}>
            <p className="overviewTitle">Active Profiles</p>
            <p className="overviewNumber">8</p>
          </div>
          <div className="overviewBox" onClick={()=>this.handleTabChange(2)}>
            <p className="overviewTitle">Adopted Profiles</p>
            <p className="overviewNumber">5</p>
          </div>
        </div>
        {
          this.renderComponent()
        }
      </div>
    )
  }
}

export default Overview;