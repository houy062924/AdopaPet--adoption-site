import React from "react";


class LikesBottomCard extends React.Component {
  constructor(props) {
    super(props);

  }

  openFullProfile(p, e, i) {
    e.stopPropagation();
    this.props.functions.openFullProfile(p, e, i);
  }
  removeLike(p, e) {
    e.stopPropagation();
    this.props.functions.removeLike(p);
  }
  renderAdoptionStatusButton() {
    let adoptionstatus = this.props.profile.adoptionstatus;

    switch (adoptionstatus) {
      case 0:
        return <div
                className="adoptButton"
                onClick={this.toggleAdoptForm}>
                  Start adoption process
               </div>

      case 1:
        return <div
                className="pendingButton">
                  Pending
               </div>

      case 2:
        return <div
                className="acceptedButton">
                  Application accepted
               </div>
    }
  }

  render() {
    return (
      <div 
        className="likeCont"
        onClick={()=>this.openFullProfile(this.props.profile, event, this.props.index)}>
          
        <div className="imgCont">
          <img src={ this.props.profile.url } className="profileImg"></img>
        </div>

        <div className="textCont">
          <p className="profileName">
            { this.props.profile.name }
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

        { this.props.profile.adoptionstatus === 0 &&
          <div className="removeCont" onClick={(event)=>this.removeLike(this.props.profile, event)}></div>
        }
        {
          this.renderAdoptionStatusButton()
        }
      </div>
    )
  }
}

export default LikesBottomCard;