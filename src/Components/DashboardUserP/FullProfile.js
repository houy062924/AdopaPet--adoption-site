import React from "react";
import FormStatusButton from "./FormStatusButton";
import AdoptionForm from "./AdoptionForm";


class FullProfile extends React.Component {
  constructor(props) {
    super(props);

    this.closeFullProfile = this.closeFullProfile.bind(this);
  }

  closeFullProfile() {
    this.props.functions.closeFullProfile();
  }

  render() {
    let currentprofile = this.props.dashstate.currentprofile;

    return (
      <div className="fullProfileCont">
        <div className="fullProfileForm">
          <div className="formTopCont">
            <p className="formTopTitle">Profile</p>
            <p className="closeFormButton" onClick={this.closeFullProfile}>X</p>
          </div>
          
          <div className="formBottomCont">
            <div className="formDataCont">
              <div className="formImgCont">
                <img src={currentprofile.url} className="formImg"></img>
              </div>

              <div className="formTextCont">
                <h2 className="formName">
                  {currentprofile.name}
                </h2>
                <p className="formDays">
                  <span className="labelText">Date<br/></span>
                  {currentprofile.date}
                </p>
                <p className="formId">
                  <span className="labelText">ID<br/></span>
                  {currentprofile.id}
                </p>
                <p className="formGender">
                  <span className="labelText">Gender<br/></span>
                  {currentprofile.gender}
                </p>
                <p className="formAge">
                  <span className="labelText">Age<br/></span>
                  {currentprofile.year} yrs {currentprofile.month} months
                </p>
                <p className="formLocation">
                  <span className="labelText">Location<br/></span>
                  {currentprofile.address}
                </p>
              </div>
            </div>

            <div className="formStoryCont">
              <p className="formStory">
                <span className="labelText storyLabel">Story</span>
                <br/>
                {currentprofile.story}
              </p>
            </div>

            { this.props.dashstate.adoptform === false
              ? <FormStatusButton
                  profile={currentprofile}
                  dashstate={this.props.dashstate}
                  statedata={this.props.statedata}
                  functions={this.props.functions}>
               </FormStatusButton>
              : <AdoptionForm
                  dashstate={this.props.dashstate}
                  functions={this.props.functions}>
                </AdoptionForm>
            }
            
          </div>

        </div>
      </div>
    )
  }
}

export default FullProfile;