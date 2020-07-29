import React from "react";
import "../../styles/overvieworg.css";

class Pending extends React.Component {
  constructor(props) {
    super(props);

    this.handleAcceptApp = this.handleAcceptApp.bind(this);
    this.handleRejectApp = this.handleRejectApp.bind(this);
    this.renderAdoptionStatus = this.renderAdoptionStatus.bind(this);
  }

  handleAcceptApp(p) {
    this.props.functions.handleAcceptApp(p);
  }
  handleRejectApp (p) {
    this.props.functions.handleRejectApp(p);
  }
  renderAdoptionStatus(p, i) {
    let status = this.props.pendingprofiles[i].status;
    console.log(status)
    switch (status) {
      case 0:
        console.log("0")
        return  <div className="rowActionsCont">
                  <div 
                    className="actionButton"
                    onClick={()=>this.handleAcceptApp(p)}>Accept</div>
                  <div 
                    className="actionButton"
                    onClick={()=>this.handleRejectApp(p)}
                    >Reject</div>
                </div>

      case 1:
          console.log("1")
        return <p className="rowText">Accepted</p>

      case 2:
          console.log("2")
        return <p className="rowText">Rejected</p>
    }
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
            {/* <p>Status</p> */}
            <p>Actions</p>
          </div>
          { this.props.pendingprofiles !== undefined &&
            this.props.pendingprofiles.map((pending, index)=>(
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
                {/* <div> */}
                  {
                    this.renderAdoptionStatus(pending, index)
                  }
                {/* </div> */}
                
              </div>

            ))
          }
        </div>
      </div>
    )
  }
}

export default Pending;