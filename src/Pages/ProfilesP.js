import React from "react";
import ProfilesUser from "../Components/ProfilesP/ProfilesUser";



class ProfilesP extends React.Component {
  render() {
    return (
      <div>
        <ProfilesUser 
          userdata={this.props.statedata}>
        </ProfilesUser>

      </div>
    )
  }
}

export default ProfilesP;