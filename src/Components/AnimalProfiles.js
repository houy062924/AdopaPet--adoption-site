import React from "react";
// import { Link } from "react-router-dom";
import M from 'materialize-css/dist/js/materialize.min.js';
import 'materialize-css/dist/css/materialize.min.css';
import firebase from "../Components/Firebase";

class AnimalProfiles extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      adding: false
    }
    
    this.addProfile = this.addProfile.bind(this);
  }

  addProfile(event) {
    event.preventDefault();
    this.setState({
      adding: true
    })
  }

  render() {
    return (
      <div>
        <button onClick={this.addProfile} type="button">Add profile</button>
        { this.state.adding ? <AddProfileForm></AddProfileForm>
          : null
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
      age: 0
    }

    this.updateInput = this.updateInput.bind(this);
    this.submitProfileForm = this.submitProfileForm.bind(this);
  }

  updateInput(event) {
    this.setState({
      [event.target.name]: event.target.value
    });
  }
  submitProfileForm(event) {
    event.preventDefault();

    const db = firebase.firestore();
    const userRef = db.collection('animals').add({
      name: this.state.name,
      gender: this.state.gender,
      age: this.state.age
    });  

    this.setState({
      name: "",
      gender: "",
      age: 0
    })
  }


  render() {
    return (
      <form className="col s12" onSubmit={this.submitProfileForm}>
        <div className="row">
          <div className="input-field col s4">
            <input 
              id="name" 
              name="name" 
              type="text"
              value={this.state.name}
              onChange={this.updateInput}/>
            <label htmlFor="name">Name</label>
          </div>
          <div className="input-field col s4">
            <input 
              id="age" 
              name="age" 
              type="number" 
              min="0" 
              value={this.state.age}
              onChange={this.updateInput}/>
            <label htmlFor="age" className="active">Age</label>
          </div>
          <div className="col s4">
            <p>
              <label htmlFor="female">
                <input type="radio" id="female" name="gender" value="female" onChange={this.updateInput} />
                <span>Female</span>
              </label>
            </p>
            <p>
              <label htmlFor="male">
                <input type="radio" id="male" name="gender" value="male" onChange={this.updateInput} />
                <span>Male</span>
              </label>
            </p>
          </div>
        </div>

        <div className="row">
          <div className="file-field input-field">
            <div className="btn">
              <span>Image</span>
              <input type="file" />
            </div>
            <div className="file-path-wrapper">
              <input className="file-path validate" type="text" />
            </div>
          </div>
        </div>
        <button type="submit">Submit</button>
      </form>
    )
  }
}

export default AnimalProfiles;