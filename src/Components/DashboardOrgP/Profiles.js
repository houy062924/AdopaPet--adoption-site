import React from "react";
import "../../styles/org.css";
import { firebase } from "../Shared/Firebase";
import { storage } from "../Shared/Firebase";

import EditIcon from "../../styles/images/pen.svg";

class Profiles extends React.Component {
  constructor(props) {
    super(props);

    this.openProfileForm = this.openProfileForm.bind(this);
    this.closeProfileForm = this.closeProfileForm.bind(this);
    this.openEditForm = this.openEditForm.bind(this);
  }

  componentDidMount() {
    this.props.functions.getData();
  }
  openProfileForm(e) {
    this.props.functions.openProfileForm(e);
  }
  closeProfileForm() {
    this.props.functions.closeProfileForm(e);
  }
  openEditForm(i) {
    this.props.functions.openEditForm(i);
  }

  render() {
    return (
      <div className="profilesPageCont">
        <button 
          onClick={this.openProfileForm} 
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
          { 
            this.props.dashstate.profiles.map((profile, index)=>(
              <div 
                key={profile.id} 
                className="cardCont" 
                onClick={()=> {this.openEditForm(profile, index)}}
              >
                <div className="profileImg">
                  <img src={profile.url}></img>
                </div>
                <p className="profileName">
                  {profile.name}
                </p>
                <p className="profileId">
                  {profile.id}
                </p>
              
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
      age: 0,
      image: null,
      url: "",
      id: ""
    }
    this.fileInput = React.createRef();
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleImageChange = this.handleImageChange.bind(this);
    this.handleFormSubmit = this.handleFormSubmit.bind(this);
    this.setDB = this.setDB.bind(this);
    this.closeProfileForm = this.closeProfileForm.bind(this);
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
    // else if (event.target.files.length > 0) {
    //   event.target.nextElementSibling.textContent = `${event.target.files.length} files selected`;

    //   let imgarr = [];
    //   event.target.files.map((file)=>{
    //     imgarr.push(file.name)
    //   })
    //   this.setState({
    //     image: imgarr
    //   })
    // }
  }
  handleFormSubmit(event) {
    event.preventDefault();

    const {image} = this.state;
    console.log(this.state)

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
  closeProfileForm(r) {
    this.props.functions.closeProfileForm(r);
  }
  setDB() {
    const db = firebase.firestore();
    const userRef = db.collection('animals').add({
      name: this.state.name,
      gender: this.state.gender,
      age: this.state.age,
      url: this.state.url,
      id: this.state.id,
      orgname: this.props.appstate.name,
      orguid: this.props.appstate.uid
    })
    .then(()=>{
      console.log("Set")
      this.setState({
        name: "",
        gender: "",
        age: 0,
        image: "",
        url: "",
        id: ""
      })
      this.closeProfileForm(true);
    })
  }


  render() {
    return (
      <div className="addProfileFormCont">
        <form onSubmit={this.handleFormSubmit} className="addProfileForm">
          <div className="formTopCont">
            <p className="formTopTitle">Add Profile</p>
            <p className="closeFormButton" onClick={this.closeProfileForm}>X</p>
          </div>
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
            <label htmlFor="name">ID</label>
            <input 
              id="id" 
              name="id" 
              type="text"
              value={this.state.id}
              onChange={this.handleInputChange}/>
          </div>

          <div className="inputCont">
            <label htmlFor="age">Age</label>
            <input 
              id="age" 
              name="age" 
              type="number" 
              min="0" 
              // value={this.state.age}
              onChange={this.handleInputChange}/>
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

          <button type="submit" onSubmit={this.handleFormSubmit}>Submit</button>
        </form>
      </div>
    )
  }
}

class EditProfileForm extends React.Component {
  constructor() {
    super();

    this.closeEditForm = this.closeEditForm.bind(this);
    this.handleEditImg = this.handleEditImg.bind(this);
    this.handleEditText = this.handleEditText.bind(this);
    this.handleEditRadio = this.handleEditRadio.bind(this);
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

  render() {
    let currentprofile = this.props.dashstate.currentprofile;

    return (
      <div className="editProfileFormCont">
        <form onSubmit={this.handleFormSubmit} className="editProfileForm">
          <div className="formTopCont">
            <p className="formTopTitle">Edit Profile</p>
            <p className="closeFormButton" onClick={this.closeEditForm}>X</p>
          </div>
          
          <div className="formDataCont">
            <div className="formImgCont" onClick={this.handleEditImg}>
              <img src={currentprofile.url}></img>
              <img src={EditIcon} className="editIcon"></img>
            </div>

            <div className="formTextCont">
              <h2 
                className="formName" 
                onClick={(e)=>this.handleEditText(e, "name")}>      
                  {currentprofile.name}
              </h2>
              <p 
                className="formId" 
                onClick={(e)=>this.handleEditText(e, "id")}>{currentprofile.id}
              </p>
              <p 
                className="formGender" 
                onClick={()=>this.handleEditRadio(gender)}>{currentprofile.gender}
              </p>
              <p 
                className="formAge" 
                onClick={(e)=>this.handleEditText(e, "age")}>{currentprofile.age}
              </p>
            </div>
          </div>

          <div className="formStoryCont">
            <p className="formStory">
              sdfgdhdsftedfdrfwzsckwus fbrcmwhcsrjkhawjsmfbcsjf sjerhfmdgrkruwaer ajszhdfgawgexjr gserfjdfmsweu4rywrhfj
            </p>
          </div>

          {/* <button type="submit" onSubmit={this.handleFormSubmit}>Submit</button> */}
        </form>
      </div>
    )
  }
}

export default Profiles;