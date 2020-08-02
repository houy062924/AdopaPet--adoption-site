import React from "react";
import AdoptionForm from "./AdoptionForm";

class AllLikes extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      adoptform: false
    }

    // this.renderAdoptionStatusButton = this.renderAdoptionStatusButton.bind(this);
    // this.handleAccept = this.handleAccept.bind(this);
    this.toggleAdoptForm = this.toggleAdoptForm.bind(this);
    this.handleAdopt = this.handleAdopt.bind(this);
  }
  openFullProfile(p, e, i) {
    e.stopPropagation();
    this.props.functions.openFullProfile(p, e, i);
  }
  closeFullProfile() {
    this.props.functions.closeFullProfile();
  }
  toggleAdoptForm() {
    this.props.functions.toggleAdoptForm();
  }
  handleAdopt() {
    this.props.functions.handleAdopt();
  }
  removeLike(p, e) {
    e.stopPropagation();
    this.props.functions.removeLike(p);
  }
  renderAdoptionStatusButton(i) {
    let adoptionstatus = this.props.dashstate.likes[i].adoptionstatus

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
        return <div
                className="acceptedButton">
                  Application accepted
               </div>
    }
  }


  render() {
    return (
      <div className="likeProfilesCont">
        { this.props.profiles !== undefined &&
          this.props.profiles.map((profile, index)=>(
            <div 
              className="likeCont" 
              key={profile.id}
              onClick={()=>this.openFullProfile(profile, event, index)}>
                
              <div className="imgCont">
                <img src={profile.url} className="profileImg"></img>
              </div>

              <div className="textCont">
                <p className="profileName">
                  {profile.name}
                </p>
                <p className="profileDays">
                  <span className="labelText">Date<br></br></span>
                  {profile.date}
                </p>
                <p className="profileId">
                  <span className="labelText">Gender<br></br></span>
                  { profile.gender }
                </p>
                <p className="profileLocation">
                  <span className="labelText">Location<br></br></span>
                  { profile.address }
                </p>
              </div>

              { profile.adoptionstatus === 0 &&
                <div className="removeCont" onClick={(event)=>this.removeLike(profile, event)}></div>
              }

              {
                this.renderAdoptionStatusButton(index)
              }
            </div>
          ))
        }
        { this.props.dashstate.fullprofile === true &&
          <FullProfile
            statedata={this.props.statedata}
            profiles={this.props.profiles}
            dashstate={this.props.dashstate}
            functions={this.props.functions}>
          </FullProfile>
        }
      </div>
    )
  }
}

class FullProfile extends React.Component {
  constructor(props) {
    super(props);

    this.closeFullProfile = this.closeFullProfile.bind(this);
    // this.toggleConfirmCancel = this.toggleConfirmCancel.bind(this);
    this.toggleAdoptForm = this.toggleAdoptForm.bind(this);
    this.handleAdopt = this.handleAdopt.bind(this);
    this.handleAccept = this.handleAccept.bind(this);
    this.cancelAdopt = this.cancelAdopt.bind(this);
    this.renderFormStatusButton = this.renderFormStatusButton.bind(this);
  }

  toggleAdoptForm() {
    this.props.functions.toggleAdoptForm();
  }
  handleAdopt() {
    this.props.functions.handleAdopt();
  }
  handleAccept() {
    this.props.functions.handleAccept();
  }
  closeFullProfile() {
    this.props.functions.closeFullProfile();
  }
  // toggleConfirmCancel() {
  //   this.setState((prevState)=>({
  //     confirmcancel: !prevState.confirmcancel
  //   }))
  // }
  cancelAdopt() {
    this.props.functions.cancelAdopt();
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
                    <br></br>
                    {this.props.dashstate.acceptedorg.name}
                  </p>
                  <p className="contactText">
                    <span className="contactTextTitle">Email</span>
                    <br></br>
                    {this.props.dashstate.acceptedorg.email}
                  </p>
                  <p className="contactText">
                    <span className="contactTextTitle">ID</span>
                    <br></br>
                    {this.props.statedata.uid}
                    </p>
                 </div>
      }
    }
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
                  <span className="labelText">Date<br></br></span>
                  {currentprofile.date}
                </p>
                <p className="formId">
                  <span className="labelText">ID<br></br></span>
                  {currentprofile.id}
                </p>
                <p className="formGender">
                  <span className="labelText">Gender<br></br></span>
                  {currentprofile.gender}
                </p>
                <p className="formAge">
                  <span className="labelText">Age<br></br></span>
                  {currentprofile.year} yrs {currentprofile.month} months
                </p>
                <p className="formLocation">
                  <span className="labelText">Location<br></br></span>
                  {currentprofile.address}
                </p>
              </div>
            </div>

            <div className="formStoryCont">
              <p className="formStory">
                <span className="labelText storyLabel">Story</span>
                <br></br>
                {currentprofile.story}
              </p>
            </div>

            { this.props.dashstate.adoptform === false
              ? this.renderFormStatusButton(currentprofile)
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



export default AllLikes;