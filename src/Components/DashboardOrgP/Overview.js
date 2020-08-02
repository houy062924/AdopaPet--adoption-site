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
        return <Pending
                // pendingprofiles={this.props.dashstate.pendingprofiles}
                appstate={this.props.appstate}
                dashstate={this.props.dashstate}
                functions={this.props.functions}>
               </Pending>

      case 1:
        return <Active
                // activeprofiles={this.props.dashstate.activeprofiles}
                appstate={this.props.appstate}
                dashstate={this.props.dashstate}
                functions={this.props.functions}>
               </Active>

      case 2:
        return <Adopted
                // adoptedprofiles={this.props.dashstate.adoptedprofiles}
                appstate={this.props.appstate}
                dashstate={this.props.dashstate}
                functions={this.props.functions}>
               </Adopted>
    }
  }

  render() {
    return (
      <div className="overviewCont"> 
        <div className="overviewTopCont">
          <div 
          className={this.state.tabStatus === 0 ? "overviewBox  activeTab" : "overviewBox"}
          onClick={()=>this.handleTabChange(0)}>
            <p className="overviewTitle">Pending Applications</p>
            <p className="overviewNumber">
              {this.props.dashstate.pendingprofiles.length}
            </p>
          </div>
          <div 
          className={this.state.tabStatus === 1 ? "overviewBox  activeTab" : "overviewBox"}
          onClick={()=>this.handleTabChange(1)}>
            <p className="overviewTitle">Active Profiles</p>
            <p className="overviewNumber">
              {this.props.dashstate.activeprofiles.length}
            </p>
          </div>
          <div 
          className={this.state.tabStatus === 2 ? "overviewBox  activeTab" : "overviewBox"}
          onClick={()=>this.handleTabChange(2)}>
            <p className="overviewTitle">Accepted Applications</p>
            <p className="overviewNumber">
              {this.props.dashstate.adoptedprofiles.length}
            </p>
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