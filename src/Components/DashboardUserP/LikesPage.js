import React from "react";
import "../../styles/likes.css";
import LikesBottomComp from "./LikesBottomComp";

class LikesPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      tabStatus: 0, // 0: not applied; 1: applied, not accepted; 2: accepted
    }

    this.handleTabChange = this.handleTabChange.bind(this);
    this.renderComponent = this.renderComponent.bind(this);
  }

  handleTabChange(status) {
    this.setState({
      tabStatus: status
    })
  }
  renderComponent() {
    let tabstatus = this.state.tabStatus;
    let profiles = this.props.dashstate.likes.filter((like)=>{
      return like.adoptionstatus === this.state.tabStatus
    })

    switch (tabstatus) {
      case 0:
        return <LikesBottomComp
                 profiles={this.props.dashstate.likes}
                 statedata={this.props.statedata}
                 dashstate={this.props.dashstate}
                 functions={this.props.functions}>
               </LikesBottomComp>

      case 1:
      case 2:
        return <LikesBottomComp
                profiles={profiles}
                statedata={this.props.statedata}
                dashstate={this.props.dashstate}
                functions={this.props.functions}>
               </LikesBottomComp>
    }
  }
  renderNotification() {
    let accepted = this.props.dashstate.likes.filter((like)=>{
      return like.adoptionstatus === 2
    })
    return accepted.length;
  }

  render() {
    return (
      <div className="likePageCont"> 
        <div className="overviewTopCont">
          <div 
            className={this.state.tabStatus === 0 ? "overviewBox  activeTab" : "overviewBox"}
            onClick={()=>this.handleTabChange(0)}>
            <p className="overviewTitle">All Likes</p>
          </div>

          <div 
            className={this.state.tabStatus === 1 ? "overviewBox  activeTab" : "overviewBox"}
            onClick={()=>this.handleTabChange(1)}>
            <p className="overviewTitle">Pending Applications</p>
          </div>

          <div 
            className={this.state.tabStatus === 2 ? "overviewBox  activeTab" : "overviewBox"}
            onClick={()=>this.handleTabChange(2)}>
            <p className="overviewTitle">Accepted Applications</p>
            <div className="notificationCont">{this.renderNotification()}</div>
          </div>
        </div>
        {
          this.renderComponent()
        }
      </div>
    )
  }
}

export default LikesPage;