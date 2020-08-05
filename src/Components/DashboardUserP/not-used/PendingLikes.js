import React from "react";
import LikedProfilesCard from "../LikedProfilesCard";
import FullProfile from "../FullProfile";

class PendingLikes extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="likeProfilesCont">
        { this.props.profiles !== undefined &&
          this.props.profiles.map((profile, index)=>(
            <LikedProfilesCard
              key={profile.id}
              profile={profile}
              index={index}
              dashstate={this.props.dashstate}
              functions={this.props.functions}>
            </LikedProfilesCard>
          ))
        }
        { this.props.dashstate.fullprofile === true &&
          <FullProfile
            statedata={this.props.statedata}
            profiles={this.props.profiles}
            dashstate={this.props.dashstate}
            functions={this.props.functions}>
          </FullProfile>
        }
      </div>
    )
  }
}

export default PendingLikes;