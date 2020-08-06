import React from "react";
import ProfilesBase from "../Components/ProfilesP/ProfilesBase";



class ProfilesP extends React.Component {
  render() {
    return (
      <div>
        <ProfilesBase 
          userdata={this.props.statedata}>
        </ProfilesBase>

      </div>
    )
  }
}

export default ProfilesP;