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
    
    this.addProfile = this.addProfile.bind(this);
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

  addProfile(event) {
    event.preventDefault();
    this.setState({
      adding: true
    })
  }

  render() {
    console.log(this.state.profiles)
    return (
      <div className="addProfileCont">
        <button onClick={this.addProfile} type="button">Add profile</button>
        { this.state.adding 
          ? <AddProfileForm statedata={this.props.statedata}></AddProfileForm>
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
  }

  handleInputChange(event) {
    this.setState({
      [event.target.name]: event.target.value
    });
  }
  handleImageChange(event) {
    if (event.target.files[0]) {
      const image = event.target.files[0];
      this.setState(()=>({ image }))
    }
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
      <form className="col s12" onSubmit={this.handleFormSubmit}>
        <div className="row">
          <div className="input-field col s4">
            <input 
              id="name" 
              name="name" 
              type="text"
              value={this.state.name}
              onChange={this.handleInputChange}/>
            <label htmlFor="name">Name</label>
          </div>
          <div className="input-field col s4">
            <input 
              id="age" 
              name="age" 
              type="number" 
              min="0" 
              // value={this.state.age}
              onChange={this.handleInputChange}/>
            <label htmlFor="age" className="active">Age</label>
          </div>
          <div className="col s4">
            <p>
              <label htmlFor="female">
                <input type="radio" id="female" name="gender" value="female" onChange={this.handleInputChange} />
                <span>Female</span>
              </label>
            </p>
            <p>
              <label htmlFor="male">
                <input type="radio" id="male" name="gender" value="male" onChange={this.handleInputChange} />
                <span>Male</span>
              </label>
            </p>
          </div>
        </div>

        <div className="row">
          <div className="input-field col s6">
            <input 
              id="id" 
              name="id" 
              type="text"
              value={this.state.id}
              onChange={this.handleInputChange}/>
            <label htmlFor="name">ID</label>
          </div>
        </div>

        <div className="row">
          <div className="file-field input-field">
            <div className="btn">
              <span>Image</span>
              <input type="file" onChange={this.handleImageChange} name="image" ref={this.fileInput} />
            </div>
            <div className="file-path-wrapper">
              <input className="file-path validate" type="text" onChange={this.handleImageChange} />
            </div>
          </div>
        </div>
        <button type="submit">Submit</button>
      </form>
    )
  }
}

export default AnimalProfiles;