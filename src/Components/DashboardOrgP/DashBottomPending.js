import React from "react";
import ApplicationFormOrg from "./ApplicationFormOrg";
import DashBottomPendingTable from "./DashBottomPendingTable";

class DashBottomPending extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentapplication: null,
    }

    this.functions = {
      handleAcceptApp: this.handleAcceptApp.bind(this),
      toggleApplicationForm: this.toggleApplicationForm.bind(this),
    }
  }

  handleAcceptApp(p) {
    this.props.functions.handleAcceptApp(p);
  }
  toggleApplicationForm(i) {
    this.setState({
      currentapplication: this.props.dashstate.pendingprofiles[i]
    })
    this.props.functions.toggleApplicationForm();
  }

  render() {
    console.log("Test")
    return (
      <div className="overviewBottomCont"> 
        <div className="pendingTableCont">
          { this.props.dashstate.pendingprofiles.length > 0
            ? <div className="pendingTableTitleCont">
                <p className="firstGrid">Animal Name</p>
                <p>Applicant Name</p>
                <p>Visit Date</p>
                <p>Application</p>
                <p>Actions</p>
              </div>
            : <p className="pendingText">There are no pending profiles.</p>
          }
          { this.props.dashstate.pendingprofiles !== undefined &&
            this.props.dashstate.pendingprofiles.map((pending, index)=>(
              <DashBottomPendingTable
                key={pending.docuid}
                profile={pending}
                index={index}
                dashbottomfunctions={this.functions}>
              </DashBottomPendingTable>
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

export default DashBottomPending;