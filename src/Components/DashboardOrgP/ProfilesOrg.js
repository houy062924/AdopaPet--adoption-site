import React from "react";
import "../../styles/org.css";
import { firebase } from "../Shared/Firebase";
import { storage } from "../Shared/Firebase";


class ProfilesOrg extends React.Component {
  constructor(props) {
    super(props);

    this.toggleProfileForm = this.toggleProfileForm.bind(this);
    // this.closeProfileForm = this.closeProfileForm.bind(this);
    this.openEditForm = this.openEditForm.bind(this);
  }

  componentDidMount() {
    this.props.functions.getData();
  }
  toggleProfileForm(e) {
    e.preventDefault();
    this.props.functions.toggleProfileForm();
  }
  // closeProfileForm() {
  //   this.props.functions.closeProfileForm(e);
  // }
  openEditForm(i) {
    this.props.functions.openEditForm(i);
  }

  render() {
    console.log(this.props.appstate)
    return (
      <div className="profilesPageCont">
        <button 
          onClick={this.toggleProfileForm} 
          type="button" 
          className="addProfileButton">
            Add profile
        </button>
        { this.props.dashstate.addingprofile 
          ? <AddProfileForm 
              appstate={this.props.appstate} 
              functions={this.props.functions}
              dashstate={this.props.dashstate}>
            </AddProfileForm>
          : null
        }
        <div className="profilesCont">
          { this.props.dashstate.profiles.length === 0
            ? <div>
                <h2>Welcome, {this.props.appstate.name}!</h2>
                <p className="welcomeText">Ready to get started? <br></br> Click the above button to add a profile.</p>
                <img src="/src/images/point.svg"></img>
              </div>
            : this.props.dashstate.profiles.map((profile, index)=>(
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

class AddProfileForm extends React.Component {
  constructor() {
    super();
    this.state = {
      name: "",
      gender: "",
      image: null,
      url: "",
      id: "",
      story: "",
      address: "",
      date: "",
      year: 0,
      month: 0,
    }
    this.fileInput = React.createRef();
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleImageChange = this.handleImageChange.bind(this);
    this.handleFormSubmit = this.handleFormSubmit.bind(this);
    this.setDB = this.setDB.bind(this);
    this.toggleProfileForm = this.toggleProfileForm.bind(this);
  }

  handleInputChange(event) {
    this.setState({
      [event.target.name]: event.target.value
    });
  }
  handleImageChange(event) {
    if (event.target.files.length === 1) {
      const image = event.target.files[0];
      this.setState(()=>({ image }));
      event.target.nextElementSibling.textContent = event.target.files[0].name;
    }
  }
  handleFormSubmit(event) {
    event.preventDefault();

    const {image} = this.state;
    
    const uploadTask = storage.ref(`images/${image.name}`).put(image);
    uploadTask.on('state_changed', 
      (snapShot) => {
        console.log(snapShot)
      },
      (error) => {
        console.log(error)
      },
      () => {
        storage.ref('images').child(image.name).getDownloadURL()
        .then((url) => {
          this.setState({
            url: url
          })
        })
        .then(()=>{
          console.log(this.state.url)
          this.setDB();
        })
      }
    )
  }
  toggleProfileForm(r) {
    // e.preventDefault();
    this.props.functions.toggleProfileForm(r);
  }
  setDB() {
    const db = firebase.firestore();
    const userRef = db.collection('animals').add({
      name: this.state.name,
      gender: this.state.gender,
      url: this.state.url,
      id: this.state.id,
      story: this.state.story,
      address: this.state.address,
      date: this.state.date,
      year: this.state.year,
      month: this.state.month,
      orgname: this.props.appstate.name,
      orguid: this.props.appstate.uid
    })
    .then(()=>{
      console.log("Set")
      this.setState({
        name: "",
        gender: "",
        year: null,
        month: null,
        image: "",
        url: "",
        id: "",
        story: "",
        address: "",
        date: "",
        year: 0,
        month: 0,
      })
      this.toggleProfileForm(true);
    })
  }


  render() {
    return (
      <div className="addProfileFormCont">
        <form onSubmit={this.handleFormSubmit} className="addProfileForm">
          {/* <div className="upperTri"></div> */}
          <div className="formTopCont">
            <p className="formTopTitle">Add Profile</p>
            <p className="closeFormButton" onClick={this.toggleProfileForm}>X</p>
          </div>

          <div className="formBottomCont">
            <div className="inputCont">
              <label htmlFor="name">Name</label>
              <input 
                id="name" 
                name="name" 
                type="text"
                value={this.state.name}
                onChange={this.handleInputChange}/>
            </div>

            <div className="inputCont">
              <label htmlFor="id">ID</label>
              <input 
                id="id" 
                name="id" 
                type="text"
                value={this.state.id}
                onChange={this.handleInputChange}/>
            </div>

            <div>
              <div className="inputCont">
                <label>Age</label>
                <input 
                  id="year" 
                  name="year" 
                  type="number" 
                  min="0" 
                  className="ageInput"
                  // value={this.state.age}
                  onChange={this.handleInputChange}
                />
                <label htmlFor="year" className="ageLabel">Years</label>

                <input 
                id="month" 
                name="month" 
                type="number" 
                min="0"
                max="12" 
                className="ageInput"
                // value={this.state.age}
                onChange={this.handleInputChange}
                />
                <label htmlFor="month" className="ageLabel">Months</label>
              </div>
            </div>

            <div className="radioCont">
              <label className="genderLabel">Gender</label>
              <label htmlFor="female" className="genderLabel radioLabel">
                <input type="radio" id="female" name="gender" value="female" onChange={this.handleInputChange} />
                <span>Female</span>
              </label>
              <label htmlFor="male" className="genderLabel radioLabel">
                <input type="radio" id="male" name="gender" value="male" onChange={this.handleInputChange} />
                <span>Male</span>
              </label>
            </div>

            <div className="inputCont">
              <label htmlFor="address">Address</label>
              <input 
                id="address" 
                name="address" 
                type="text"
                value={this.state.address}
                onChange={this.handleInputChange}/>
            </div>

            <div className="inputCont">
              <label htmlFor="date">Date</label>
              <input 
                id="date" 
                name="date" 
                type="date"
                value={this.state.date}
                onChange={this.handleInputChange}/>
            </div>

            <div className="fileCont">
              <label className="fileLabel">Image</label>
              <input 
                type="file" 
                id="image" 
                name="image" 
                className="fileInput"
                ref={this.fileInput}
                onChange={this.handleImageChange} />
                <label htmlFor="image">Choose an image</label>
            </div>

            <div className="inputCont">
              <label htmlFor="story">Story</label>
              <textarea 
                id="story"
                name="story" 
                // rows="10" 
                // cols="70"
                value={this.state.story}
                onChange={this.handleInputChange}>
              </textarea>
            </div>

            <button type="submit" onSubmit={this.handleFormSubmit}>Submit</button>
          </div>
        </form>
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
    this.confirmDeleteProfile = this.confirmDeleteProfile.bind(this);
    this.cancelDeleteProfile = this.cancelDeleteProfile.bind(this);
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
  confirmDeleteProfile() {
    this.props.functions.confirmDeleteProfile();
  }
  cancelDeleteProfile() {
    this.props.functions.cancelDeleteProfile();
  }

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
            { this.props.dashstate.confirmDelete 
              ? <div className="warningCont">
                  <p className="warningText">
                    Congratulations!<br></br> Would you like to delete this profile?
                  </p>
                  <div>
                    <button 
                      type="button" 
                      onClick={this.confirmDeleteProfile}
                      className="deleteButton">
                        Delete Profile
                    </button>
                    <button 
                      type="button" 
                      onClick={this.cancelDeleteProfile}
                      className="cancelButton">
                        Cancel
                    </button>
                  </div>
                </div>
              : <div className="warningCont">
                  <button 
                    type="button" 
                    onClick={this.confirmDeleteProfile}
                    className="deleteButton">
                      Adopted
                  </button>
                </div>
            
            }

          </div>
          {/* <button type="submit" onSubmit={this.handleFormSubmit}>Submit</button> */}
        </form>
      </div>
    )
  }
}

export default ProfilesOrg;