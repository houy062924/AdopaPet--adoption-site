import React from "react";
import { Route, BrowserRouter } from "react-router-dom";
import { firebase } from "../Components/Shared/Firebase";

import SideNav from "../Components/DashboardOrgP/SideNav";
import ProfilesOrg from "../Components/DashboardOrgP/ProfilesOrg";
import Overview from "../Components/DashboardOrgP/Overview";

// import Calender from "../Components/DashboardOrgP/Calender";


class DashboardOrgP extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      addingprofile: false,
      editingprofile: false,
      profiles: [],
      currentprofile: null,
      confirmDelete: false,
    }
    this.functions = {
      getData: this.getData.bind(this),
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
    this.getData();
  }

  getData() {
    let profilesarr = [];
    this.db.collection("animals").where("orguid", "==", this.props.statedata.uid)
    .orderBy("timestamp", "desc")
    .get()
    .then((querySnapshot) => {
      querySnapshot.forEach((doc) => {
        // console.log(doc.id, " => ", doc.data());
        profilesarr = [...profilesarr, doc.data()]
        this.setState({
          profiles: profilesarr
        })
      });
    })
    .catch(function(error) {
      console.log("Error getting documents: ", error);
    });
  }

  toggleProfileForm(reset) {
    // event.preventDefault();
    this.setState((prevState)=>({
      addingprofile: !prevState.addingprofile
    }))
    if (reset===true) {
      this.getData();
    }
  }
  closeProfileForm(reset) {
    this.setState({
      addingprofile: false
    })
    if (reset===true) {
      this.getData();
    }
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
    // .then(()=>{
    //   this.db.collection("animals").doc(this.state.currentprofiledoc).delete()
    //   .then(() => {
    //     console.log("Document successfully deleted!");
    //     this.closeEditForm();
    //   })
    //   .catch((error) => {
    //     console.error("Error removing document: ", error);
    //   });
    // })   
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
          appstate={this.props.statedata} 
          functions={this.functions} 
          dashstate={this.state}>
        </ProfilesOrg> */}
        <SideNav statedata={this.props.statedata}></SideNav>

        <Route 
          path="/dashboard/overview" 
          render={()=>(
            <Overview 
              appstate={this.props.statedata} 
              functions={this.functions}>
            </Overview>
          )}>
        </Route>
        <Route 
          path="/dashboard/profiles" 
          render={()=>(
            <ProfilesOrg 
              appstate={this.props.statedata} 
              functions={this.functions} 
              dashstate={this.state}>
            </ProfilesOrg>
          )}>
        </Route>
        {/* <Route 
          path="/dashboard/calender" 
          render={()=>(
            <Calender 
              appstate={this.props.statedata} 
              functions={this.functions}>
            </Calender>
          )}>
        </Route> */}

      </BrowserRouter>
    )
  }
}

export default DashboardOrgP;
