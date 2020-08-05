import React from "react";
import "../../styles/org.css";

import ProfileCard from "../ProfileCard";
import FullProfile from "../FullProfile";


class AcceptedProfiles extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="profilesPageCont">
        <div className="profilesCont">
          { this.props.dashstate.acceptedprofiles.length !== undefined &&
            this.props.dashstate.acceptedprofiles.map((profile, index)=>(
              <ProfileCard
                key={profile.id}
                profile={profile}
                index={index}
                functions={this.props.functions}>
              </ProfileCard>
            ))
          }
        </div>

        { this.props.dashstate.editingprofile === true &&
          <FullProfile
            // appstate={this.props.appstate}
            dashstate={this.props.dashstate}
            functions={this.props.functions}>
          </FullProfile>
        }
      </div>
    )
  }
}

export default AcceptedProfiles;