import React from "react";
import { firebase } from "../Shared/Firebase";
import { storage } from "../Shared/Firebase";
import db from "../Shared/Firebase";


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
    this.toggleAddProfileForm = this.toggleAddProfileForm.bind(this);
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
          this.setDB();
        })
      }
    )
  }
  toggleAddProfileForm() {
    this.props.functions.toggleAddProfileForm();
  }
  setDB() {
    db.collection('animals').add({
      name: this.state.name,
      gender: this.state.gender,
      url: this.state.url,
      story: this.state.story,
      address: this.state.address,
      date: this.state.date,
      year: this.state.year,
      month: this.state.month,
      orgname: this.props.statedata.name,
      orguid: this.props.statedata.uid,
      adoptionstatus: 0,
      timestamp: firebase.firestore.FieldValue.serverTimestamp()
    })
    .then((docRef)=>{
      this.setState({
        id: docRef.id
      })
      db.collection('animals').doc(docRef.id).update({
        id: docRef.id
      })
    })
    .then(()=>{
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
      this.toggleAddProfileForm();
    })
  }


  render() {
    return (
      <div>
        <button 
          onClick={this.toggleAddProfileForm} 
          type="button" 
          className="addProfileButton">
            Add profile
        </button>
        
        { this.props.dashstate.addingprofile &&
          <div className="addProfileFormCont">
            <form onSubmit={this.handleFormSubmit} className="addProfileForm">
              <div className="formTopCont">
                <p className="formTopTitle">Add Profile</p>
                <p className="closeFormButton" onClick={this.toggleAddProfileForm}>X</p>
              </div>

              <div className="formBottomCont">
                <div className="inputCont">
                  <label htmlFor="name">Name*</label>
                  <input 
                    required
                    id="name" 
                    name="name" 
                    type="text"
                    maxLength="25"
                    value={this.state.name}
                    onChange={this.handleInputChange}/>
                </div>
                <div>
                  <div className="inputCont">
                    <label>Age*</label>
                    <input 
                      required
                      id="year" 
                      name="year" 
                      type="number" 
                      min="0" 
                      className="ageInput"
                      onChange={this.handleInputChange}
                    />
                    <label htmlFor="year" className="ageLabel">Years</label>

                    <input 
                      required
                      id="month" 
                      name="month" 
                      type="number" 
                      min="0"
                      max="12" 
                      className="ageInput"
                      onChange={this.handleInputChange}
                      />
                    <label htmlFor="month" className="ageLabel">Months</label>
                  </div>
                </div>

                <div className="radioCont">
                  <label className="genderLabel">Gender*</label>
                  <label htmlFor="female" className="genderLabel radioLabel">
                    <input type="radio" id="female" name="gender" value="Female" onChange={this.handleInputChange} />
                    <span>Female</span>
                  </label>
                  <label htmlFor="male" className="genderLabel radioLabel">
                    <input type="radio" id="male" name="gender" value="Male" onChange={this.handleInputChange} />
                    <span>Male</span>
                  </label>
                </div>

                <div className="inputCont">
                  <label htmlFor="address">Address*</label>
                  <input 
                    required
                    id="address" 
                    name="address" 
                    type="text"
                    value={this.state.address}
                    onChange={this.handleInputChange}/>
                </div>

                <div className="inputCont">
                  <label htmlFor="date">Date*</label>
                  <input 
                    required
                    id="date" 
                    name="date" 
                    type="date"
                    value={this.state.date}
                    onChange={this.handleInputChange}/>
                </div>

                <div className="fileCont">
                  <label className="fileLabel">Image*</label>
                  <input 
                    required
                    type="file" 
                    id="image" 
                    name="image" 
                    className="fileInput"
                    ref={this.fileInput}
                    onChange={this.handleImageChange} />
                    <label htmlFor="image">Choose an image</label>
                </div>

                <div className="inputCont">
                  <label htmlFor="story">Story*</label>
                  <textarea 
                    required
                    id="story"
                    name="story" 
                    value={this.state.story}
                    onChange={this.handleInputChange}>
                  </textarea>
                </div>

                <button type="submit" onSubmit={this.handleFormSubmit}>Submit</button>
              </div>
            </form>
          </div>
        }
      </div>
    )
  }
}

export default AddProfileForm;