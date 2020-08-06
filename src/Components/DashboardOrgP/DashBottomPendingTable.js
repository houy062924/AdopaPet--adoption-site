import React from "react";

class DashBottomPendingTable extends React.Component {
  constructor(props) {
    super(props);

    this.handleAcceptApp = this.handleAcceptApp.bind(this);
    this.toggleApplicationForm = this.toggleApplicationForm.bind(this);
  }

  handleAcceptApp(p) {
    this.props.dashbottomfunctions.handleAcceptApp(p);
  }
  toggleApplicationForm(i) {
    this.props.dashbottomfunctions.toggleApplicationForm(i);
  }

  render() {
    return (
      <div className="rowCont">
        <div className="rowNameCont firstGrid">
          <img 
            src={this.props.profile.animalimg} 
            className="rowAnImg">
          </img>
          <p className="rowText">
            <span className="rowTitle-mobile">Name</span>
            {this.props.profile.animalname}
          </p>
        </div>
        <p className="rowText">
          <span className="rowTitle-mobile">Applicant</span>
          {this.props.profile.username}
        </p>
        <p className="rowText">
          <span className="rowTitle-mobile">Visit Date</span>
          {this.props.profile.application.visitdate}
        </p>
        <span>
          <span className="rowTitle-mobile">Application</span>
          <img 
            src="/src/images/form.svg"
            className="rowText applicationForm" 
            onClick={()=>this.toggleApplicationForm(this.props.index)}>
          </img>
        </span>
        
        <div 
          className="actionButton"
          onClick={()=>this.handleAcceptApp(this.props.profile)}>
            Accept
        </div>             
      </div>
    )
  }
}

export default DashBottomPendingTable;