import React from "react";

class AcceptedLikes extends React.Component {
  constructor(props) {
    super(props);

  }
  openFullProfile(p, e, i) {
    e.stopPropagation();
    this.props.functions.openFullProfile(p, e, i);
  }
  closeFullProfile() {
    this.props.functions.closeFullProfile();
  }
  handleAdopt() {
    this.props.functions.handleAdopt();
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

              <div
                className="acceptedButton">
                  Application accepted
              </div>
            </div>
          ))
        }
        { this.props.dashstate.fullprofile === true &&
          <FullProfile
            // statedata={this.props.statedata}
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
    this.state = {
      confirmcancel: false
    }

    this.closeFullProfile = this.closeFullProfile.bind(this);
    this.toggleConfirmCancel = this.toggleConfirmCancel.bind(this);
    this.handleAdopt = this.handleAdopt.bind(this);
    this.handleAccept = this.handleAccept.bind(this);
    this.cancelAdopt = this.cancelAdopt.bind(this);
    // this.renderFormStatusButton = this.renderFormStatusButton.bind(this);
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
  toggleConfirmCancel() {
    this.setState((prevState)=>({
      confirmcancel: !prevState.confirmcancel
    }))
  }
  cancelAdopt() {
    this.props.functions.cancelAdopt();
  }
  // renderFormStatusButton(p) {
  //   let adoptionstatus = p.adoptionstatus;

  //   switch (adoptionstatus) {
  //     case 0:
  //       return <div
  //               className="adoptButton"
  //               onClick={this.handleAdopt}>
  //                 Start adoption process
  //              </div>

  //     case 1:
  //       return <div
  //               className="pendingButton">
  //                 Pending
  //              </div>

  //     case 2:
  //       return <div
  //               className="adoptButton"
  //               onClick={this.handleAccept}>
  //                 Application accepted
  //              </div>
  //   }

    // currentprofile.adoptionstatus === 0
    //           ? <div 
    //               className="adoptButton" 
    //               onClick={this.handleAdopt}>
    //                 Start the adoption application
    //             </div>
    //           : <div className="pendingTextCont">
    //               <div 
    //                 className="pendingButton">
    //                   Pending application
    //               </div>
    //               <p onClick={this.toggleConfirmCancel}>Cancel application?</p>
    //               { this.state.confirmcancel &&
    //                 <div className="cancelTextCont">
    //                   <p>This action will delete your application.<br></br>Would you like to proceed?</p>
    //                   <div className="cancelButtonCont">
    //                     <div className="cancelButton yes" onClick={this.cancelAdopt}>Yes</div>
    //                     <div className="cancelButton no" onClick={this.toggleConfirmCancel}>No</div>
    //                   </div>
    //                 </div>
    //               }
    //             </div>
  // }

  render() {
    let currentprofile = this.props.dashstate.currentprofile;
    console.log(this.props.dashstate.acceptedorg)

    return (
      <div className="fullProfileCont">
        <form className="fullProfileForm">
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

            <div
              className="acceptedButton">
                Application accepted
            </div>

            { this.props.dashstate.acceptedorg !== null &&
              <div className="contactInfoCont">
                <p>Please contact the following organisation and provide the id given below</p>
                <p>Name: {this.props.dashstate.acceptedorg.name}</p>
                <p>Email: {this.props.dashstate.acceptedorg.email}</p>
                <p>Id: {this.props.statedata.uid}</p>
              </div>
            }
            
          </div>

        </form>
      </div>
    )
  }
}

export default AcceptedLikes;