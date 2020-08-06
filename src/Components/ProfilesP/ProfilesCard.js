import React from "react";


class ProfilesCard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      expandstory: false,
    }
    
    this.handleLike = this.handleLike.bind(this);
    this.toggleStory = this.toggleStory.bind(this);
  }

  handleLike(e) {
    this.props.handleLike(e.target, this.props.profile, this.props.profilestate.likes);
  }
  toggleStory() {
    this.props.toggleStory();
  }

  render() {
    let positionStyle;
    let classes = "cardCont";

    if ( this.props.index === this.props.profilestate.currentCard ) {
      classes += ` currentCard ${this.props.profilestate.isAnimating ? "cardSnap" : ""}`;
      
      if ( this.props.toggleState === true ) {
        positionStyle = {
          height: "max-content",
          minHeight: "calc(80vh - 30px)",
          transform: `translate3D(${this.props.profilestate.positionX}px, ${this.props.profilestate.positionY}px, 0) rotate(${this.props.profilestate.rotateDeg}deg)`,
        }
      }
      else {
        positionStyle = {
          transform: `translate3D(${this.props.profilestate.positionX}px, ${this.props.profilestate.positionY}px, 0) rotate(${this.props.profilestate.rotateDeg}deg)`,
        }
      }
    }
    if ( this.props.index === this.props.profilestate.nextCard ) {
      classes += " nextCard";
    }
    

    return (
      <div 
        className={`${classes}`} 
        style={positionStyle}>
        <div className="profileCont">
          <div className="imgCont">
            <img src={this.props.profile.url} className="profileImg"></img>
          </div>

          <div className="textCont">
            <h1 className="profileName">
              { this.props.profile.name }
            </h1>
            <div className="profileColCont">
              <div className="profileCol">
                <p className="profileDays">
                  <span className="labelText">Date<br></br></span>
                  {this.props.profile.date}
                </p>
                <p className="profileLocation">
                  <span className="labelText">Location<br></br></span>
                  { this.props.profile.address }
                </p>
              </div>
              <div className="profileCol">
                <p className="profileId">
                  <span className="labelText">Gender<br></br></span>
                  { this.props.profile.gender }
                </p>
                <p className="profileAge">
                  <span className="labelText">Age<br></br></span>
                  {this.props.profile.year} yrs {this.props.profile.month} months
                </p>
              </div>
            </div>
            <div className="storyDesktop">
              <span className="labelText storyLabel">Story<br></br></span>
              <p className="profileStory">
                
                { this.props.profile.story }
              </p>
            </div>
            <div className="storyMobile">
              { this.props.toggleState === true && this.props.index === this.props.profilestate.currentCard
                ? <div>
                    <div>
                      <span className="labelText storyLabel">Story<br></br></span>
                      <p className="profileStory">
                        
                        { this.props.profile.story }
                      </p>
                    </div>
                    <div className="readMoreButton" onClick={this.toggleStory}>Close</div>
                  </div>
                : <div className="readMoreButton" onClick={this.toggleStory}>Read More</div>
              }
            </div>
          </div>
        </div>
        
      </div>
    )
  }
}

export default ProfilesCard;