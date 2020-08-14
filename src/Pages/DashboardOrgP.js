import React from "react";
import { Route, BrowserRouter } from "react-router-dom";
import db from "../Components/Shared/Firebase";

import DashPage from "../Components/DashboardOrgP/DashPage";


class DashboardOrgP extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      addingprofile: false,
      editingprofile: false,
      currentprofile: null,
      confirmDelete: false,
      applicationform: false,
      profiles: [],
      pendingprofiles: [],
      activeprofiles: [],
      acceptedprofiles: [],
    }
    this.functions = {
      handleAcceptApp: this.handleAcceptApp.bind(this),
      toggleAddProfileForm: this.toggleAddProfileForm.bind(this),
      openFullProfile: this.openFullProfile.bind(this),
      closeFullProfile: this.closeFullProfile.bind(this),

      toggleApplicationForm: this.toggleApplicationForm.bind(this),
      confirmDeleteProfile: this.confirmDeleteProfile.bind(this),
      handleDeleteProfile: this.handleDeleteProfile.bind(this),
      cancelDeleteProfile: this.cancelDeleteProfile.bind(this),
    }


    // Functions that don't need passing down
    this.getPendingApplications = this.getPendingApplications.bind(this);
    this.getActiveProfiles = this.getActiveProfiles.bind(this);
    this.getAcceptedProfiles = this.getAcceptedProfiles.bind(this);

    this.pendingdb;
    this.activedb;
    this.accepteddb;
  }

  componentDidMount() {
    this.getPendingApplications();
    this.getActiveProfiles();
    this.getAcceptedProfiles();
  }
  componentWillUnmount() {
    this.pendingdb();
    this.activedb();
    this.accepteddb();
  }

  // Functions running on component mount
  getPendingApplications() {
    this.pendingdb = db.collection("adoptions")
    .where("orguid", "==", this.props.statedata.uid)
    .where("status", "==", 0)
    .onSnapshot((querySnapshot)=>{
      let pendingarr = [];
      querySnapshot.forEach((doc) => {
        pendingarr.push(doc.data());
      })
      this.setState({
        pendingprofiles: pendingarr
      })
    })
  }
  getActiveProfiles() {
    this.activedb = db.collection("animals")
    .where("orguid", "==", this.props.statedata.uid)
    .where("adoptionstatus", "==", 0)
    .onSnapshot((querySnapshot)=>{
      let activearr = [];
      querySnapshot.forEach((doc) => {
        activearr.push(doc.data());
      })
      this.setState({
        activeprofiles: activearr
      })
    })
  }
  getAcceptedProfiles() {
    this.accepteddb = db.collection("animals")
    .where("orguid", "==", this.props.statedata.uid)
    .where("adoptionstatus", "==", 1)
    .onSnapshot((querySnapshot)=>{
      let acceptedarr = [];
      querySnapshot.forEach((doc) => {
        acceptedarr.push(doc.data());
      })
      this.setState({
        acceptedprofiles: acceptedarr
      })
    })
  }

  // Handle form popups (application, add profile form, full profile)
  toggleApplicationForm() {
    this.setState((prevState)=>({
      applicationform: !prevState.applicationform
    }))
  }
  toggleAddProfileForm() {
    this.setState((prevState)=>({
      addingprofile: !prevState.addingprofile
    }))
  }
  openFullProfile(p, i) {
    this.setState({
      editingprofile: true,
      currentprofile: p
    })
  }
  closeFullProfile() {
    this.setState({
      editingprofile: false,
      currentprofile: null,
      confirmDelete: false
    })
  }

  // Handle actions (accept application, delete profile)
  handleAcceptApp(profile) {
    // 1. change "animal" status to 1 (accepted)
    db.collection("animals").doc(profile.animaluid).update({
      adoptionstatus: 1,
    })

    // 2. change current profile's "adoptions" status to 1 (accept)
    db.collection("adoptions").doc(profile.docuid).update({
      status: 1
    })

    // 3. change other profiles of this animal in "adoptions" to 2 (reject)
    db.collection("adoptions")
    .where("animaluid", "==", profile.animaluid)
    .get()
    .then((querySnapshot)=>{
      querySnapshot.forEach((doc)=>{
        // if not current profile
        if (doc.data().docuid !== profile.docuid) {
          db.collection("adoptions").doc(doc.id).update({
            status: 2
          })
        }
      })
    })

    // 4. change user's "members" like-list status
    db.collection("members").doc(profile.useruid)
    .get()
    .then((doc)=>{
      let likesarr = doc.data().likes;
      likesarr.forEach((like, index)=>{
        // find the index of likes that match the current profile
        if (like.id === profile.animaluid) {
          likesarr[index].adoptionstatus = 2;

          db.collection("members").doc(profile.useruid)
          .update({
            "likes": likesarr
          })
        }
      })
    })
  }
  confirmDeleteProfile() {
    if (this.state.confirmDelete === false) {
      this.setState({
        confirmDelete: true
      })
    }
    else {
      this.handleDeleteProfile();
    }
  }
  handleDeleteProfile() {

    // 1. remove from this.props.dashstate.profiles
    let newarr = this.state.profiles.filter((profile)=>{
      return profile.id !== this.state.currentprofile.id
    })
    this.setState({
      profiles: newarr
    })

    // 2. remove from database
    db.collection("animals").doc(this.state.currentprofile.id)
    .delete()
    .then(() => {
      this.closeFullProfile();
    })
    .catch((error) => {
      console.error("Error removing document: ", error);
    });
  }
  cancelDeleteProfile() {
    this.setState({
      confirmDelete: false
    })
  }

  render() {
    return (
      <BrowserRouter basename="/org">
        <Route 
          path="/dashboard" 
          render={()=>(
            <DashPage 
              statedata={this.props.statedata}
              dashstate={this.state} 
              functions={this.functions}>
            </DashPage>
          )}>
        </Route>
      </BrowserRouter>
    )
  }
}

export default DashboardOrgP;
