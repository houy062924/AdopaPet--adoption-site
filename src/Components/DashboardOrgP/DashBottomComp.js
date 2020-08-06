import React from "react";
import "../../Styles/org.css";

import DashBottomCard from "./DashBottomCard";
import FullProfile from "./FullProfile";
import AddProfileForm from "./AddProfileForm";


class DashBottomComp extends React.Component {
  constructor(props) {
    super(props);

    this.openFullProfile = this.openFullProfile.bind(this);
  }

  openFullProfile(p, i) {
    this.props.functions.openFullProfile(p, i);
  }

  render() {
    return (
      <div className="profilesPageCont">
        { this.props.tabstatus === 1 &&
          <AddProfileForm 
            appstate={this.props.appstate} 
            functions={this.props.functions}
            dashstate={this.props.dashstate}>
          </AddProfileForm>
        }

        <div className="profilesCont">
          { this.props.tabstatus === 1 && this.props.profiles.length === 0 
            ? <div>
                <h2>Welcome, {this.props.appstate.name}!</h2>
                <p className="welcomeText">Ready to get started? <br></br> Click the above button to add a profile.</p>
                <img src="/src/images/point.svg"></img>
              </div>
            : this.props.profiles.map((profile, index)=>(
              <DashBottomCard
                key={profile.id}
                profile={profile}
                index={index}
                functions={this.props.functions}>
              </DashBottomCard>
            ))
          }
        </div>

        { this.props.dashstate.editingprofile === true &&
          <FullProfile
            dashstate={this.props.dashstate}
            functions={this.props.functions}>
          </FullProfile>
        }
      </div>
    )
  }
}

export default DashBottomComp;