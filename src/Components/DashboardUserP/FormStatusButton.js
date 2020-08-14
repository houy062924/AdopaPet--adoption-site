import React from "react";

class FormStatusButton extends React.Component {
  constructor(props) {
    super(props);

    this.renderFormStatusButton = this.renderFormStatusButton.bind(this);
    this.toggleAdoptForm = this.toggleAdoptForm.bind(this);
  }
  
  toggleAdoptForm() {
    this.props.functions.toggleAdoptForm();
  }
  renderFormStatusButton(p) {
    let adoptionstatus = p.adoptionstatus;
    
    if (adoptionstatus !== 2 || this.props.dashstate.acceptedorg !== null) {
      switch (adoptionstatus) {
        case 0:
          return <div
                  className="adoptButton"
                  onClick={this.toggleAdoptForm}>
                    Start adoption process
                 </div>
  
        case 1:
          return <div
                  className="pendingButton">
                    Pending
                 </div>
  
        case 2:
          return <div className="contactInfoCont">
                  <p className="contactTitle">Please contact the following organisation and provide the ID given below</p>
                  <p className="contactText">
                    <span className="contactTextTitle">Name</span>
                    <br/>
                    {this.props.dashstate.acceptedorg.name}
                  </p>
                  <p className="contactText">
                    <span className="contactTextTitle">Email</span>
                    <br/>
                    {this.props.dashstate.acceptedorg.email}
                  </p>
                  <p className="contactText">
                    <span className="contactTextTitle">ID</span>
                    <br/>
                    {this.props.statedata.uid}
                    </p>
                 </div>
      }
    }
  }

  render() {
    return (
      <div>
        {
          this.renderFormStatusButton(this.props.profile)
        }
      </div>
    )
  }
}

export default FormStatusButton;