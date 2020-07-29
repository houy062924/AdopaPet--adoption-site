import React from "react";
// import ProfilesOrg from "./ProfilesOrg";
import "../../styles/overvieworg.css";
import ActiveProfiles from "./ActiveProfiles";

class Active extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    console.log(this.props.activeprofiles)
    return (
      <div className="overviewBottomCont"> 
        <ActiveProfiles
          profiles={this.props.activeprofiles}
          appstate={this.props.appstate}
          dashstate={this.props.dashstate}
          functions={this.props.functions}>
        </ActiveProfiles>
      </div>
    )
  }
}

export default Active;