import React from "react";
import SideNav from "../Components/SideNav";
import { Route } from "react-router-dom";
import AnimalProfiles from "../Components/AnimalProfiles";


// import "./styles/shared.css";
// import "../styles/orgs.css";

class OrgDashboard extends React.Component {
  render() {
    return (
      <div>
        <SideNav statedata={this.props.statedata}></SideNav>

        <Route path="/dashboard/animalprofiles" render={()=>(
          <AnimalProfiles statedata={this.props.statedata}></AnimalProfiles>
        )}></Route>

      </div>
    )
  }
}

export default OrgDashboard;
