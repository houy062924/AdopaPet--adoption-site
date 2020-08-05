import React from "react";
import "../../styles/overvieworg.css";

import DashBottomComp from "./DashBottomComp";
import DashBottomPending from "./DashBottomPending";


class DashTopNav extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      tabstatus: 0, // 0: pending; 1: active; 2: accepted
    }

    this.handleTabChange = this.handleTabChange.bind(this);
  }

  handleTabChange(status) {
    this.setState({
      tabstatus: status
    })
  }
  renderComponent() {
    let tabstatus = this.state.tabstatus;
    switch (tabstatus) {
      case 0:
        return <DashBottomPending
                appstate={this.props.appstate}
                dashstate={this.props.dashstate}
                functions={this.props.functions}>
               </DashBottomPending>

      case 1:
        return <DashBottomComp
                tabstatus={tabstatus}
                profiles={this.props.dashstate.activeprofiles}
                appstate={this.props.appstate}
                dashstate={this.props.dashstate}
                functions={this.props.functions}>
               </DashBottomComp>

      case 2:
        return <DashBottomComp
                tabstatus={tabstatus}
                profiles={this.props.dashstate.acceptedprofiles}
                appstate={this.props.appstate}
                dashstate={this.props.dashstate}
                functions={this.props.functions}>
               </DashBottomComp>
    }
  }

  render() {
    return (
      <div className="overviewCont"> 
        <div className="overviewTopCont">
          <div 
          className={this.state.tabstatus === 0 ? "overviewBox  activeTab" : "overviewBox"}
          onClick={()=>this.handleTabChange(0)}>
            <p className="overviewTitle">Pending Applications</p>
            <p className="overviewNumber">
              {this.props.dashstate.pendingprofiles.length}
            </p>
          </div>
          <div 
          className={this.state.tabstatus === 1 ? "overviewBox  activeTab" : "overviewBox"}
          onClick={()=>this.handleTabChange(1)}>
            <p className="overviewTitle">Active Profiles</p>
            <p className="overviewNumber">
              {this.props.dashstate.activeprofiles.length}
            </p>
          </div>
          <div 
          className={this.state.tabstatus === 2 ? "overviewBox  activeTab" : "overviewBox"}
          onClick={()=>this.handleTabChange(2)}>
            <p className="overviewTitle">Accepted Applications</p>
            <p className="overviewNumber">
              {this.props.dashstate.acceptedprofiles.length}
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

export default DashTopNav;