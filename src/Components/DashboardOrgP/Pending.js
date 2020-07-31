import React from "react";
import ApplicationFormOrg from "./ApplicationFormOrg";

class Pending extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentapplication: null,
    }

    this.handleAcceptApp = this.handleAcceptApp.bind(this);
    this.handleRejectApp = this.handleRejectApp.bind(this);
    this.renderAdoptionStatus = this.renderAdoptionStatus.bind(this);
    this.toggleApplicationForm = this.toggleApplicationForm.bind(this);
  }

  handleAcceptApp(p) {
    this.props.functions.handleAcceptApp(p);
  }
  handleRejectApp (p) {
    this.props.functions.handleRejectApp(p);
  }
  renderAdoptionStatus(p, i) {
    let status = this.props.dashstate.pendingprofiles[i].status;
    switch (status) {
      case 0:
        // console.log("0")
        return  <div 
                  className="actionButton"
                  onClick={()=>this.handleAcceptApp(p)}>
                    Accept
                </div>
            

      case 1:
          // console.log("1")
        return <p className="rowText">Accepted</p>

      case 2:
          // console.log("2")
        return <p className="rowText">Rejected</p>
    }
  }
  toggleApplicationForm(i) {
    this.setState({
      currentapplication: this.props.dashstate.pendingprofiles[i]
    })
    this.props.functions.toggleApplicationForm();
  }

  render() {
    return (
      <div className="overviewBottomCont"> 
        <div className="pendingTableCont">
          <div className="pendingTableTitleCont">
            <p className="firstGrid">Animal Name</p>
            {/* <p>Animal ID</p> */}
            <p>User Name</p>
            <p>Application</p>
            <p>Applied Date</p>
            <p>Actions</p>
          </div>
          { this.props.dashstate.pendingprofiles !== undefined &&
            this.props.dashstate.pendingprofiles.map((pending, index)=>(
              <div key={pending.docuid} className="rowCont">
                <div className="rowNameCont firstGrid">
                  <img 
                    src={pending.animalimg} 
                    className="rowAnImg">
                  </img>
                  <p className="rowText">
                    {pending.animalname}
                  </p>
                </div>
                {/* <p className="rowText" style={{fontSize: "14px"}}>
                  {pending.animaluid}
                </p> */}
                <p className="rowText">
                  {pending.username}
                </p>
                <p className="rowText">
                  date
                </p>
                <img 
                  src="/src/images/form.svg"
                  className="rowText applicationForm" 
                  onClick={()=>this.toggleApplicationForm(index)}>
                </img>
                {
                  this.renderAdoptionStatus(pending, index)
                }               
              </div>
            ))
          }
          { this.props.dashstate.applicationform === true &&
            <ApplicationFormOrg
              form={this.state.currentapplication}
              functions={this.props.functions}>
            </ApplicationFormOrg>
          }
        </div>
      </div>
    )
  }
}

export default Pending;