import React from "react";
import Likes from "../Components/DashboardUserP/Likes";
import { firebase } from "../Components/Shared/Firebase";
import { BrowserRouter, Route } from "react-router-dom";
import SideNavUser from "../Components/DashboardUserP/SideNavUser";



class DashboardUserP extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      likes: []
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
    let profiles = []
    let adopted = [];

    this.db.collection("animals").get()
    .then((querySnapshot) => {
      
      querySnapshot.forEach((doc) => {
        profiles.push(doc.data());
      });
      
      // removed = querySnapshot.filter(doc => !this.state.likes.some(like => doc.data().id === like.id ))
      // console.log(removed)

      // difference = profiles.filter(p => !likes.some(l => p.id === l.id));
      // this.setState({
      //   profiles: difference
      // })
    })
    .then(()=>{
      // find "this.state.likes" not in "profile"
      console.log(this.state.likes);
      console.log(profiles);


      adopted = this.state.likes.filter(like =>    
        profiles.some(profile => 
          like.id === profile.id
        )
      ) 
      // this filters out the profiles in "animals" collection that are not liked by user, not the profiles not existing in collection



      
      // adopted = profiles.filter(p => this.state.likes.some(l => p.id === l.id));
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
        <SideNavUser
          userstate={this.props.statedata}>
        </SideNavUser>

        <Route
          path="/dashboard/profiles"
          render={()=>(
            <Likes
              likestate={this.state.likes}
              removeLike={this.removeLike}>
            </Likes>
          )}>
        </Route>

      </BrowserRouter>
    )
  }
}

export default DashboardUserP;