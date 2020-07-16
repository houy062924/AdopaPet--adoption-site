import React from "react";
import { Route } from "react-router-dom";
import { firebase } from "../Components/Shared/Firebase";
import { storage } from "../Components/Shared/Firebase";

import SideNav from "../Components/DashboardOrgP/SideNav";
import ProfilesOrg from "../Components/DashboardOrgP/ProfilesOrg";
import Calender from "../Components/DashboardOrgP/Calender";
import Overview from "../Components/DashboardOrgP/Overview";


class DashboardOrgP extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      addingprofile: false,
      editingprofile: false,
      profiles: [],
      currentprofile: null
    }
    this.functions = {
      getData: this.getData.bind(this),
      openProfileForm: this.openProfileForm.bind(this),
      closeProfileForm: this.closeProfileForm.bind(this),
      openEditForm: this.openEditForm.bind(this),
      closeEditForm: this.closeEditForm.bind(this),
    }
  }

  componentDidMount() {
    this.getData();
  }

  getData() {
    let profilesarr = [];
    const db = firebase.firestore();
    db.collection("animals").where("orguid", "==", this.props.statedata.uid)
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

  openProfileForm(event) {
    event.preventDefault();
    this.setState({
      addingprofile: true
    })
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
    console.log(p)
    this.setState({
      editingprofile: true,
      currentprofile: p
    })
  }
  closeEditForm() {
    this.setState({
      editingprofile: false
    })
  }

  render() {
    return (
      <div>
        <SideNav statedata={this.props.statedata}></SideNav>

        <Route path="/dashboard/overview" render={()=>(
          <Overview appstate={this.props.statedata} functions={this.functions}></Overview>
        )}></Route>
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
        <Route path="/dashboard/calender" render={()=>(
          <Calender appstate={this.props.statedata}functions={this.functions}></Calender>
        )}></Route>

      </div>
    )
  }
}

export default DashboardOrgP;
