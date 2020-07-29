import React from "react";
import "../../styles/org.css";


class AdoptedProfiles extends React.Component {
  constructor(props) {
    super(props);

    this.openEditForm = this.openEditForm.bind(this);
  }

  toggleProfileForm(e) {
    e.preventDefault();
    this.props.functions.toggleProfileForm();
  }
  openEditForm(i) {
    this.props.functions.openEditForm(i);
  }

  render() {
    return (
      <div className="profilesPageCont">
        <div className="profilesCont">
          { this.props.dashstate.adoptedprofiles.length !== undefined &&
            this.props.dashstate.adoptedprofiles.map((profile, index)=>(
                <div 
                  key={profile.id} 
                  className="cardCont" 
                  onClick={()=> {this.openEditForm(profile, index)}}
                >
                  <div className="profileImg">
                    <img src={profile.url}></img>
                  </div>
                  
                  <div className="textCont">
                    <h1 className="profileName">
                      { profile.name }
                    </h1>
                    <p className="profileId">
                      <span className="labelText">ID<br></br></span>
                      { profile.id }
                    </p>
                    <p className="profileDays">
                      <span className="labelText">Date<br></br></span>
                      { profile.date }
                    </p>
                  </div>
                
                </div>
              ))
          }
        </div>

        { this.props.dashstate.editingprofile === true &&
          <EditProfileForm
            appstate={this.props.appstate}
            dashstate={this.props.dashstate}
            functions={this.props.functions}>
          </EditProfileForm>
        }
      </div>
    )
  }
}

class EditProfileForm extends React.Component {
  constructor(props) {
    super(props);

    this.closeEditForm = this.closeEditForm.bind(this);
    this.handleEditImg = this.handleEditImg.bind(this);
    this.handleEditText = this.handleEditText.bind(this);
    this.handleEditRadio = this.handleEditRadio.bind(this);
    // this.confirmDeleteProfile = this.confirmDeleteProfile.bind(this);
    // this.cancelDeleteProfile = this.cancelDeleteProfile.bind(this);
  }

  closeEditForm(r) {
    this.props.functions.closeEditForm(r);
  }
  handleEditImg() {
    console.log("looooii")
  }
  handleEditText(e, type) {
    console.log(e.target.textContent)
    console.log(type)
  }
  handleEditRadio(e) {
    console.log(e.target)
  }
  // confirmDeleteProfile() {
  //   this.props.functions.confirmDeleteProfile();
  // }
  // cancelDeleteProfile() {
  //   this.props.functions.cancelDeleteProfile();
  // }

  render() {
    let currentprofile = this.props.dashstate.currentprofile;

    return (
      <div className="editProfileFormCont">
        <form onSubmit={this.handleFormSubmit} className="editProfileForm">
          <div className="formTopCont">
            <p className="formTopTitle">Edit Profile</p>
            <p className="closeFormButton" onClick={this.closeEditForm}>X</p>
          </div>
          
          <div className="formBottomCont">
            <div className="formDataCont">
              <div className="formImgCont" onClick={this.handleEditImg}>
                <img src={currentprofile.url} className="formImg"></img>
                <img src="/src/images/pen.svg" className="editIcon"></img>
              </div>

              <div className="formTextCont">
                <h2 
                  className="formName" 
                  onClick={(e)=>this.handleEditText(e, "name")}>      
                    {currentprofile.name}
                </h2>
                <p 
                  className="formId" 
                  onClick={(e)=>this.handleEditText(e, "id")}>
                  <span className="labelText">ID<br></br></span>
                  {currentprofile.id}
                </p>
                <p 
                  className="formGender" 
                  onClick={()=>this.handleEditRadio(gender)}>
                  <span className="labelText">Gender<br></br></span>
                  {currentprofile.gender}
                </p>
                <p 
                  className="formAge" 
                  onClick={(e)=>this.handleEditText(e, "age")}>
                  <span className="labelText">Age<br></br></span>
                  {currentprofile.year} yrs {currentprofile.month} months
                </p>
                <p 
                  className="formLocation" 
                  onClick={(e)=>this.handleEditText(e, "address")}>
                  <span className="labelText">Location<br></br></span>
                  {currentprofile.address}
                </p>
              </div>
            </div>

            <div className="formStoryCont">
              <p className="formStory">
                <span className="labelText storyLabel">Story<br></br></span>
                <br></br>
                {currentprofile.story}
              </p>
            </div>
          </div>
        </form>
      </div>
    )
  }
}

export default AdoptedProfiles;