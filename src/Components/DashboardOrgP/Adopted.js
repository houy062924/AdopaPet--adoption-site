import React from "react";
// import ProfilesOrg from "./ProfilesOrg";
import "../../styles/overvieworg.css";
import AdoptedProfiles from "./AdoptedProfiles";

class Adopted extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="overviewBottomCont"> 
        <AdoptedProfiles
          // profiles={this.props.adoptedprofiles}
          appstate={this.props.appstate}
          dashstate={this.props.dashstate}
          functions={this.props.functions}>
        </AdoptedProfiles>
      </div>
    )
  }
}

export default Adopted;