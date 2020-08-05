import React from "react";

class FormDeleteButtons extends React.Component {
  constructor(props) {
    super(props);

    this.confirmDeleteProfile = this.confirmDeleteProfile.bind(this);
    this.cancelDeleteProfile = this.cancelDeleteProfile.bind(this);
  }

  confirmDeleteProfile() {
    this.props.functions.confirmDeleteProfile();
  }
  cancelDeleteProfile() {
    this.props.functions.cancelDeleteProfile();
  }

  render() {
    return (
      <div className="warningCont">
        { this.props.dashstate.confirmDelete === false 
          ? <div 
              className="deleteButton"
              onClick={this.confirmDeleteProfile}>
                Delete Profile
            </div>

          : <div> 
              <p className="warningText">Are you sure you would like delete this profile?</p>
              <div className="buttonsCont">
                <div 
                  className="deleteButton"
                  onClick={this.confirmDeleteProfile}>
                    Delete Profile
                </div>
                <div 
                  className="cancelButton"
                  onClick={this.cancelDeleteProfile}>
                    Cancel
                </div>
              </div>
            </div>
        }
        
      </div>
    )
  }
}

export default FormDeleteButtons;