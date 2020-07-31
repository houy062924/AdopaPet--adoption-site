import React from "react";

class ApplicationFormOrg extends React.Component {
  constructor(props) {
    super(props);

    this.toggleApplicationForm = this.toggleApplicationForm.bind(this);
  }

  toggleApplicationForm() {
    this.props.functions.toggleApplicationForm();
  }

  render() {
    let application = this.props.form.application;

    return (
      <div className="applicationFormCont">
        <div className="fullProfileForm">
          <div className="formTopCont blue">
            <p className="formTopTitle">Application Form</p>
            <p className="closeFormButton" onClick={this.toggleApplicationForm}>X</p>
          </div>
          
          <div className="formBottomCont">
            <div className="formDataCont">

              <div className="formTextCont">
                <h2 className="formName blue">
                  {application.name}
                </h2>
                <p className="formId">
                  <span className="labelText blue">ID<br></br></span>
                  {this.props.form.useruid}
                </p>
                <p className="formGender">
                  <span className="labelText blue">Email<br></br></span>
                  {application.email}
                </p>
                <p className="formAge">
                  <span className="labelText blue">Phone Number<br></br></span>
                  {application.phone}
                </p>
                <p className="formDays">
                  <span className="labelText blue">Birthdate<br></br></span>
                  {application.birthdate}
                </p>
                <p className="formLocation">
                  <span className="labelText blue">Address<br></br></span>
                  {application.address}
                </p>
                <p className="formLocation">
                  <span className="labelText blue">House Type<br></br></span>
                  {application.housetype}
                </p>
                <p className="formLocation">
                  <span className="labelText blue">Current Pets<br></br></span>
                  {application.pets}
                </p>
                <p className="formLocation">
                  <span className="labelText labelText blue">Other<br></br></span>
                  {application.other}
                </p>
              </div>
            </div>
           
          </div>

        </div>
      </div>
    )
  }
}

export default ApplicationFormOrg;