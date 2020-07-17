import React from "react";
import Likes from "../Components/DashboardUserP/Likes";
import { firebase } from "../Components/Shared/Firebase";
import { BrowserRouter } from "react-router-dom";
import SideNavUser from "../Components/DashboardUserP/SideNavUser";



class DashboardUserP extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      likes: []
    }

    this.db = firebase.firestore();
  }

  componentDidMount() {
    this.db.collection("members").doc(this.props.statedata.uid).get()
    .then((doc)=>{
      this.setState({
        likes: doc.data().likes
      })
    })
  }

  render() {
    console.log(this.props.statedata)
    return (
      <BrowserRouter basename="/user">
        <SideNavUser
          userstate={this.props.statedata}>
        </SideNavUser>
        <Likes 
          likestate={this.state.likes}>
        </Likes>

      </BrowserRouter>
    )
  }
}

export default DashboardUserP;