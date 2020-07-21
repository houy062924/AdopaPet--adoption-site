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
    this.removeLike = this.removeLike.bind(this);
  }

  componentDidMount() {
    this.db.collection("members").doc(this.props.statedata.uid).get()
    .then((doc)=>{
      this.setState({
        likes: doc.data().likes
      })
    })
  }
  removeLike(profile) {
    console.log(profile.id)
    console.log(this.state.likes)
    this.state.likes.forEach((like, index)=>{
      if (like.id===profile.id) {
        console.log(like)
        console.log(index)
      }
    })
    // this.db.collection("cities").doc("DC").update({
    //   capital: true
    // })
    // .then(function() {
    //     console.log("Document successfully updated!");
    // })
    // .catch(function(error) {
    //     // The document probably doesn't exist.
    //     console.error("Error updating document: ", error);
    // });
  }

  render() {
    return (
      <BrowserRouter basename="/user">
        <SideNavUser
          userstate={this.props.statedata}>
        </SideNavUser>
        {/* <Likes 
          likestate={this.state.likes}>
        </Likes> */}

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