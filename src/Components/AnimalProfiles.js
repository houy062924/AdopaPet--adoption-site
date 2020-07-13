import React from "react";
import "../styles/org.css";
import {firebase} from "../Components/Firebase";
import {storage} from "../Components/Firebase";


class AnimalProfiles extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      adding: false,
      profiles: []
    }
    
    this.functions = {
      closeProfileForm: this.closeProfileForm.bind(this),
    }
    this.openProfileForm = this.openProfileForm.bind(this);
  }

  componentDidMount() {
    let profilesarr = [];
    const db = firebase.firestore();
    db.collection("animals").where("orguid", "==", this.props.statedata.uid)
    .get()
    .then((querySnapshot) => {
      querySnapshot.forEach((doc) => {
        // console.log(doc.id, " => ", doc.data());
        profilesarr = [...profilesarr, doc.data()]
        console.log(profilesarr);
        this.setState({
          profiles: profilesarr
        })
      });
    })
    .catch(function(error) {
      console.log("Error getting documents: ", error);
    });
  }

  openProfileForm(event) {
    event.preventDefault();
    this.setState({
      adding: true
    })
  }
  closeProfileForm() {
    this.setState({
      adding: false
    })
  }

  render() {
    console.log(this.state.profiles)
    return (
      <div className="addProfileCont">
        <button onClick={this.openProfileForm} type="button" className="addProfileButton">Add profile</button>
        { this.state.adding 
          ? <AddProfileForm statedata={this.props.statedata} functions={this.functions}></AddProfileForm>
          : null
        }
        <div className="profilesCont">
          { 
            this.state.profiles.map((profile)=>(
              <div key={profile.id} className="cardCont">
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
  closeProfileForm() {
    this.props.functions.closeProfileForm();
  }
  setDB() {
    const db = firebase.firestore();
    const userRef = db.collection('animals').add({
      name: this.state.name,
      gender: this.state.gender,
      age: this.state.age,
      url: this.state.url,
      id: this.state.id,
      orgname: this.props.statedata.name,
      orguid: this.props.statedata.uid
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
    })
  }


  render() {
    return (
      <div className="addProfileFormCont">
        <form onSubmit={this.handleFormSubmit} className="addProfileForm">
          <div onClick={this.closeProfileForm} className="formTopCont">
            <p className="closeFormButton">X</p>
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

export default AnimalProfiles;