import React from "react";
// import Likes from "../Components/DashboardUserP/Likes";
import Likes from "../Components/DashboardUserP/Likes";

import { firebase } from "../Components/Shared/Firebase";
import { BrowserRouter, Route } from "react-router-dom";
// import SideNavUser from "../Components/DashboardUserP/SideNavUser";


class DashboardUserP extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      likes: [],
      adopted: [],
      fullprofile: false,
      currentprofile: null,
      adoptedprofile: null,
      acceptedorg: null,
      adoptform: false,
    }
    this.functions = {
      openFullProfile: this.openFullProfile.bind(this),
      closeFullProfile: this.closeFullProfile.bind(this),
      toggleAdoptForm: this.toggleAdoptForm.bind(this),
      handleAdopt: this.handleAdopt.bind(this),
      cancelAdopt: this.cancelAdopt.bind(this),
      removeLike: this.removeLike.bind(this),
      handleAccept: this.handleAccept.bind(this),
    }

    this.db = firebase.firestore();
    this.likesdb;
    this.getDatabaseData = this.getDatabaseData.bind(this);
    this.filterDatabaseData = this.filterDatabaseData.bind(this);
    this.checkProfileStatus = this.checkProfileStatus.bind(this);
  }

  componentDidMount() {
    this.getDatabaseData();
  }
  componentWillUnmount() {
    this.likesdb();
  }
  getDatabaseData() {
    this.likesdb = this.db.collection("members")
    .doc(this.props.statedata.uid)
    .onSnapshot((snapshot) => {
      this.filterDatabaseData(snapshot.data().likes)
      // this.setState({
      //   likes: snapshot.data().likes
      // })
    }, 
    function(error) {
      console.log(error)
    })
  }
  filterDatabaseData(likes) {
    let sorted = likes.sort((a, b) => (a.adoptionstatus < b.adoptionstatus) ? 1 : -1);
    this.setState({
      likes: sorted
    })
  }
  checkProfileStatus() {
    // determine which profiles have been adopted 
    // --> determine which profiles in like cannot be found in animals collection
    let profiles = [];
    let adopted = [];

    this.db.collection("animals").get()
    .then((querySnapshot) => {
      querySnapshot.forEach((doc) => {
        profiles.push(doc.data());
      });
      
    })
    .then(()=>{
      // find "this.state.likes" not in "profiles" --> find profiles that were liked but has since been deleted
      adopted = this.state.likes.filter(like =>    
        !profiles.some(profile => 
          like.id === profile.id
        )
      ) 
      this.setState({
        adopted: adopted
      })
    });
  }
  removeLike(profile) {
    let newarr = this.state.likes.filter((like)=>{
      return like.id !== profile.id
    })

    this.db.collection("members").doc(this.props.statedata.uid).update({
      likes: newarr
    })
    .then(()=>{
      this.setState({
        likes: newarr
      })
    })
  }

  //

  openFullProfile(profile, event, index) {
    if (!event.target.classList.contains("adoptedCont")) {
      this.setState({
        fullprofile: true,
        currentprofile: profile,
        currentprofileindex: index,
        // adoptform: false,
      })
    }
    if (profile.adoptionstatus === 2) {
      this.handleAccept(profile.orguid);
    }
  }
  closeFullProfile() {
    this.setState({
      fullprofile: false,
      currentprofile: null,
      adoptform: false
    })
  }
  toggleAdoptForm() {
    this.setState(prevState => ({
      adoptform: !prevState.adoptform
    }))
  }
  handleAdopt(application) {
    // 1. save info to "adoptions" collection
    this.db.collection("adoptions").add({
      orguid: this.state.currentprofile.orguid,
      useruid: this.props.statedata.uid,
      username: this.props.statedata.name,
      useremail: this.props.statedata.email,
      animaluid: this.state.currentprofile.id,
      animalname: this.state.currentprofile.name,
      animalimg: this.state.currentprofile.url,
      status: 0,
      application: application,
      timestamp: firebase.firestore.FieldValue.serverTimestamp(),
    })
    .then((doc)=>{
      this.db.collection("adoptions").doc(doc.id).update({
        docuid: doc.id
      })
    })
    .catch((error) => {
      console.log("Error getting documents: ", error);
    });

    // 2. save application status to user like-list in "members"
    let newarr = [...this.state.likes];
    newarr[this.state.currentprofileindex].adoptionstatus = 1;

    this.db.collection("members").doc(this.props.statedata.uid).update({
      "likes": newarr
    })
    .catch((error) => {
      console.log("Error getting documents: ", error);
    });

    // 3. close form and update data
    this.closeFullProfile();
    this.getDatabaseData();
  }
  cancelAdopt() {
    console.log("cancel")
  }
  handleAccept(orguid) {
    this.db.collection("members").doc(orguid)
    .get()
    .then((doc)=>{
      this.setState({
        acceptedorg: doc.data()
      })
    })
  }

  render() {
    return (
      <BrowserRouter basename="/user">
        <Likes
          statedata={this.props.statedata}
          likestate={this.state.likes}
          adoptedstate={this.state.adopted}
          dashstate={this.state}
          functions={this.functions}>
        </Likes>
        {/* <SideNavUser
          userstate={this.props.statedata}>
        </SideNavUser>

        <Route
          path="/dashboard/profiles"
          render={()=>(
            <Likes
              likestate={this.state.likes}
              adoptedstate={this.state.adopted}
              removeLike={this.removeLike}>
            </Likes>
          )}>
        </Route> */}

      </BrowserRouter>
    )
  }
}

export default DashboardUserP;