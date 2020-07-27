import React from "react";
import Likes from "../Components/DashboardUserP/Likes";
import { firebase } from "../Components/Shared/Firebase";
import { BrowserRouter, Route } from "react-router-dom";
// import SideNavUser from "../Components/DashboardUserP/SideNavUser";


class DashboardUserP extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      likes: [],
      adopted: []
    }

    this.db = firebase.firestore();
    this.checkProfileStatus = this.checkProfileStatus.bind(this);
    this.removeLike = this.removeLike.bind(this);
  }

  componentDidMount() {
    this.db.collection("members").doc(this.props.statedata.uid).get()
    .then((doc)=>{
      this.setState({
        likes: doc.data().likes
      })
    })
    .then(()=>{
      this.checkProfileStatus();
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
      console.log(adopted)
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

  render() {
    return (
      <BrowserRouter basename="/user">
        <Likes
          likestate={this.state.likes}
          adoptedstate={this.state.adopted}
          removeLike={this.removeLike}>
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