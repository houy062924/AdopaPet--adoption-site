import React from "react";
import "../../styles/org.css";

import ProfileCard from "../ProfileCard";
import FullProfile from "../FullProfile";
import AddProfileForm from "../AddProfileForm";


class ActiveProfiles extends React.Component {
  constructor(props) {
    super(props);

    this.toggleAddProfileForm = this.toggleAddProfileForm.bind(this);
  }

  toggleAddProfileForm() {
    this.props.functions.toggleAddProfileForm();
  }

  render() {
    return (
      <div className="profilesPageCont">
        <AddProfileForm 
          appstate={this.props.appstate} 
          functions={this.props.functions}
          dashstate={this.props.dashstate}>
        </AddProfileForm>
        
        <div className="profilesCont">
          { this.props.dashstate.activeprofiles.length === 0
            ? <div>
                <h2>Welcome, {this.props.appstate.name}!</h2>
                <p className="welcomeText">Ready to get started? <br></br> Click the above button to add a profile.</p>
                <img src="/src/images/point.svg"></img>
              </div>
            : this.props.dashstate.activeprofiles.map((profile, index)=>(
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


export default ActiveProfiles;