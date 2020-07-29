import React from "react";
import "../../styles/overvieworg.css";

class Pending extends React.Component {
  constructor(props) {
    super(props);

    this.handleAcceptApp = this.handleAcceptApp.bind(this);
    this.handleRejectApp = this.handleRejectApp.bind(this);
  }

  handleAcceptApp(p) {
    this.props.functions.handleAcceptApp(p);
  }
  handleRejectApp (p) {
    this.props.functions.handleRejectApp(p);
  }

  render() {
    return (
      <div className="overviewBottomCont"> 
        <div className="pendingTableCont">
          <div className="pendingTableTitleCont">
            <p>Animal Name</p>
            <p>Animal ID</p>
            <p>User Name</p>
            <p>User Email</p>
            <p>Application</p>
            <p>Applied Date</p>
            <p>Status</p>
            <p>Actions</p>
          </div>
          { this.props.pendingprofiles !== undefined &&
            this.props.pendingprofiles.map((pending)=>(
              <div key={pending.docuid} className="rowCont">
                <div className="rowNameCont">
                  <img 
                    src={pending.animalimg} 
                    className="rowAnImg">
                  </img>
                  <p className="rowText">
                    {pending.animalname}
                  </p>
                </div>
                <p className="rowText" style={{fontSize: "14px"}}>
                  {pending.animaluid}
                </p>
                <p className="rowText">
                  {pending.username}
                </p>
                <p className="rowText">
                  {pending.useremail}
                </p>
                <p className="rowText">
                  date
                </p>
                <p>Application Form</p>
                <p>
                  Status
                </p>
                <div className="rowActionsCont">
                  <div 
                    className="actionButton"
                    onClick={()=>this.handleAcceptApp(pending)}>Accept</div>
                  <div 
                    className="actionButton"
                    onClick={()=>this.handleRejectApp(pending)}
                    >Reject</div>
                </div>
              </div>

            ))
          }
        </div>
      </div>
    )
  }
}

export default Pending;