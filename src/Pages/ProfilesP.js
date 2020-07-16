import React from "react";
import Profiles from "../Components/ProfilesP/ProfilesUser";
import ProfilesUser from "../Components/ProfilesP/ProfilesUser";



class ProfilesP extends React.Component {
  render() {
    return (
      <div style={{marginTop: "70px"}}>
        <ProfilesUser userdata={this.props.statedata}></ProfilesUser>

      </div>
    )
  }
}

export default ProfilesP;