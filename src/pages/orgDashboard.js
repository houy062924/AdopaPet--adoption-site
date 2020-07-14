import React from "react";
import SideNav from "../Components/SideNav";
import { Route } from "react-router-dom";
import AnimalProfiles from "../Components/AnimalProfiles";
import Calender from "../Components/Calender";
import Overview from "../Components/Overview";


class OrgDashboard extends React.Component {
  render() {
    return (
      <div>
        <SideNav statedata={this.props.statedata}></SideNav>

        <Route path="/dashboard/overview" render={()=>(
          <Overview statedata={this.props.statedata}></Overview>
        )}></Route>
        <Route path="/dashboard/animalprofiles" render={()=>(
          <AnimalProfiles statedata={this.props.statedata}></AnimalProfiles>
        )}></Route>
        <Route path="/dashboard/calender" render={()=>(
          <Calender statedata={this.props.statedata}></Calender>
        )}></Route>

      </div>
    )
  }
}

export default OrgDashboard;
