import React from "react";
import LikesBottomCard from "./LikesBottomCard";
import FullProfile from "./FullProfile";

class LikesBottomComp extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="likeProfilesCont">
        { this.props.profiles !== undefined &&
          this.props.profiles.map((profile, index)=>(
            <LikesBottomCard
              key={profile.id}
              profile={profile}
              index={index}
              dashstate={this.props.dashstate}
              functions={this.props.functions}>
            </LikesBottomCard>
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

export default LikesBottomComp;