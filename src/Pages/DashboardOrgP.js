import React from "react";
import { Route, BrowserRouter } from "react-router-dom";
import { firebase } from "../Components/Shared/Firebase";

// import SideNav from "../Components/DashboardOrgP/SideNav";
import ProfilesOrg from "../Components/DashboardOrgP/ProfilesOrg";
import Overview from "../Components/DashboardOrgP/Overview";

// import Calender from "../Components/DashboardOrgP/Calender";


class DashboardOrgP extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      addingprofile: false,
      editingprofile: false,
      currentprofile: null,
      confirmDelete: false,
      profiles: [],
      pendingprofiles: [],
      activeprofiles: [],
      adoptedprofiles: [],
    }
    this.functions = {
      getPendingApplications: this.getPendingApplications.bind(this),
      handleAcceptApp: this.handleAcceptApp.bind(this),
      handleRejectApp: this.handleRejectApp.bind(this),

      getActiveProfiles: this.getActiveProfiles.bind(this),
      getAdoptedProfiles: this.getAdoptedProfiles.bind(this),

      toggleProfileForm: this.toggleProfileForm.bind(this),
      closeProfileForm: this.closeProfileForm.bind(this),
      openEditForm: this.openEditForm.bind(this),
      closeEditForm: this.closeEditForm.bind(this),
      confirmDeleteProfile: this.confirmDeleteProfile.bind(this),
      handleDeleteProfile: this.handleDeleteProfile.bind(this),
      cancelDeleteProfile: this.cancelDeleteProfile.bind(this),
    }
    this.db = firebase.firestore();
  }

  componentDidMount() {
    this.getPendingApplications();
    this.getActiveProfiles();
    this.getAdoptedProfiles();
  }

  // Handle pending applications
  getPendingApplications() {
    this.db.collection("adoptions")
    .where("orguid", "==", this.props.appstate.uid)
    .where("status", "==", 0)
    // .orderBy("timestamp", "desc")
    .onSnapshot((querySnapshot)=>{
      // console.log(querySnapshot.getMetadata())
      let pendingarr = [];
      querySnapshot.forEach((doc) => {
        pendingarr.push(doc.data());
        this.setState({
          pendingprofiles: pendingarr
        })
      })
    })
  }
  handleAcceptApp(profile) {
    // 1. change "animal" status to 1 (adopted)
    this.db.collection("animals").doc(profile.animaluid).update({
      adoptionstatus: 1,
    })

    // 2. change current profile's "adoptions" status to 1 (accept)
    this.db.collection("adoptions").doc(profile.docuid).update({
      status: 1
    })

    // 3. change other profiles of this animal in "adoptions" to 2 (reject)
    this.db.collection("adoptions")
    .where("animaluid", "==", profile.animaluid)
    .get()
    .then((querySnapshot)=>{
      querySnapshot.forEach((doc)=>{
        // if not current profile
        if (doc.data().docuid !== profile.docuid) {
          this.db.collection("adoptions").doc(doc.id).update({
            status: 2
          })
        }
      })
    })

    // 4. change user's "members" like-list status
    this.db.collection("members").doc(profile.useruid)
    .get()
    .then((doc)=>{
      let likesarr = doc.data().likes;
      likesarr.forEach((like, index)=>{
        // find the index of likes that match the current profile
        if (like.id === profile.animaluid) {
          likesarr[index].adoptionstatus = 2;

          this.db.collection("members").doc(profile.useruid)
          .update({
            "likes": likesarr
          })
        }
      })
    })
  }
  handleRejectApp(profile) {
    console.log("reject")
    console.log(profile)
  }

  // Handle active profiles
  getActiveProfiles() {
    this.db.collection("animals")
    .where("orguid", "==", this.props.appstate.uid)
    .where("adoptionstatus", "==", 0)
    .onSnapshot((querySnapshot)=>{
      let activearr = [];
      querySnapshot.forEach((doc) => {
        activearr.push(doc.data());
        this.setState({
          activeprofiles: activearr
        })
      })
    })
  }

  // Handle adopted profiles
  getAdoptedProfiles() {
    this.db.collection("animals")
    .where("orguid", "==", this.props.appstate.uid)
    .where("adoptionstatus", "==", 1)
    .onSnapshot((querySnapshot)=>{
      let adoptedarr = [];
      querySnapshot.forEach((doc) => {
        adoptedarr.push(doc.data());
        this.setState({
          adoptedprofiles: adoptedarr
        })
      })
    })
  }


  //

  toggleProfileForm(reset) {
    // event.preventDefault();
    this.setState((prevState)=>({
      addingprofile: !prevState.addingprofile
    }))
    // if (reset===true) {
    //   this.getData();
    // }
  }
  closeProfileForm(reset) {
    this.setState({
      addingprofile: false
    })
    // if (reset===true) {
    //   this.getData();
    // }
  }
  openEditForm(p, i) {
    this.setState({
      editingprofile: true,
      currentprofile: p
    })
  }
  closeEditForm() {
    this.setState({
      editingprofile: false,
      currentprofile: null,
      confirmDelete: false
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
    this.db.collection("animals").doc(this.state.currentprofile.id)
    .delete()
    .then(() => {
      console.log("Document successfully deleted!");
      this.closeEditForm();
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
        {/* <ProfilesOrg
          appstate={this.props.appstate} 
          functions={this.functions} 
          dashstate={this.state}>
        </ProfilesOrg> */}
        {/* <SideNav appstate={this.props.appstate}></SideNav> */}

        <Route 
          path="/dashboard/overview" 
          render={()=>(
            <Overview 
              appstate={this.props.appstate}
              dashstate={this.state} 
              functions={this.functions}>
            </Overview>
          )}>
        </Route>
        <Route 
          path="/dashboard/profiles" 
          render={()=>(
            <ProfilesOrg 
              appstate={this.props.appstate} 
              functions={this.functions} 
              dashstate={this.state}>
            </ProfilesOrg>
          )}>
        </Route>
        {/* <Route 
          path="/dashboard/calender" 
          render={()=>(
            <Calender 
              appstate={this.props.appstate} 
              functions={this.functions}>
            </Calender>
          )}>
        </Route> */}

      </BrowserRouter>
    )
  }
}

export default DashboardOrgP;
