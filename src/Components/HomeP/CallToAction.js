import React from "react";
import "../../styles/calltoaction.css";

class CallToAction extends React.Component {
  constructor(props) {
    super(props);

    this.handleRedirect = this.handleRedirect.bind(this);
  }
  handleRedirect(t) {
    this.props.functions.handleRedirect(t);
  }
  render() {
    return (
      <div className="callToActionCont">
        <h4 className="callToActionTitle">Ready to start a new adventure?</h4>
        <div className="callToActionTextCont">
          <div className="columnCont">
            <p>Want to search our profiles and find your match?</p>
            <div 
              className="signinUser" 
              onClick={()=>this.handleRedirect("usersignin")}>
                Sign in as a user
            </div>
            <div className="signinUserImg"></div>
          </div>
          <div className="columnCont">
            <p>Want to add profiles and reach a wide audience for your animals?</p>
            <div 
              className="signinOrg" 
              onClick={()=>this.handleRedirect("orgsignin")}>
                Sign in as an organisation
            </div>
            <div className="signinOrgImg"></div>
          </div>
        </div>
      </div>
    )
  }
}


export default CallToAction;