import React from "react";
import "../../styles/likesV2.css";
import AllLikes from "./AllLikes";
import PendingLikes from "./PendingLikes";
import AcceptedLikes from "./AcceptedLikes";


class Likes extends React.Component {
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
    let profiles = this.props.likestate.filter((like)=>{
      return like.adoptionstatus === this.state.tabStatus
    })

    switch (tabstatus) {
      case 0:
        return <AllLikes
                 profiles={this.props.likestate}
                 statedata={this.props.statedata}
                 dashstate={this.props.dashstate}
                 functions={this.props.functions}>
               </AllLikes>

      case 1:
        return <PendingLikes
                profiles={profiles}
                statedata={this.props.statedata}
                dashstate={this.props.dashstate}
                functions={this.props.functions}>
               </PendingLikes>

      case 2:
        return <AcceptedLikes
                profiles={profiles}
                statedata={this.props.statedata}                
                dashstate={this.props.dashstate}
                functions={this.props.functions}>
               </AcceptedLikes>
    }
  }
  renderNotification() {
    let accepted = this.props.likestate.filter((like)=>{
      return like.adoptionstatus === 2
    })
    return accepted.length;
  }


  //

  openFullProfile(p, e, i) {
    e.stopPropagation();
    this.props.functions.openFullProfile(p, e, i);
  }
  closeFullProfile() {
    this.props.functions.closeFullProfile();
  }
  removeLike(p, e) {
    e.stopPropagation();
    this.props.functions.removeLike(p);
  }
  handleAdopt() {
    this.props.functions.handleAdopt();
  }
  

  render() {
    let adopted = null;

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

export default Likes;