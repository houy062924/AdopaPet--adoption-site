import React from "react";
import ProfilesBase from "../Components/ProfilesP/ProfilesBase";



class ProfilesP extends React.Component {
  render() {
    return (
      <ProfilesBase 
        userdata={this.props.statedata}>
      </ProfilesBase>
    )
  }
}

export default ProfilesP;