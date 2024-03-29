import React from "react";

class DashBottomCard extends React.Component {
  constructor(props) {
    super(props);

    this.openFullProfile = this.openFullProfile.bind(this);
  }

  openFullProfile(p, i) {
    this.props.functions.openFullProfile(p, i);
  }

  render() {
    return (
      <div 
        key={this.props.profile.id} 
        className="cardCont" 
        onClick={()=> {this.openFullProfile(this.props.profile, this.props.index)}}
      >
        <div className="profileImg">
          <img src={this.props.profile.url}></img>
        </div>
        
        <div className="textCont">
          <p className="profileName">
            { this.props.profile.name }
          </p>
          <p className="profileId">
            <span className="labelText">ID<br/></span>
            { this.props.profile.id }
          </p>
          <p className="profileDays">
            <span className="labelText">Date<br/></span>
            { this.props.profile.date }
          </p>
          <p className="profileId">
            <span className="labelText">Gender<br/></span>
            { this.props.profile.gender }
          </p>
          <p className="profileLocation">
            <span className="labelText">Location<br/></span>
            { this.props.profile.address }
          </p>
        </div>
        
      
      </div>
    )
  }
}

export default DashBottomCard;