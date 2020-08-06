import React from "react";

class ProfilesCardActions extends React.Component {
  constructor(props) {
    super(props);

    this.handleCardChoice = this.handleCardChoice.bind(this);
  }

  handleCardChoice(interaction) {
    this.props.handleCardChoice(interaction);
  }

  render() {
    return (
      <div className="actionCont">
        <div className="pawCont leftPaw" onClick={()=> this.handleCardChoice("reject")}>
          <div>
            <div className="c1"></div>
            <div className="c2"></div>
            <div className="c3"></div>
            <div className="c4"></div>

            <div className="p1"></div>
            <div className="p2"></div>
            <div className="p3"></div>
            <div className="p4"></div>
          </div>
          
          <div className="crossCont">
            <img src="/src/images/close.svg" className="cross"></img>
          </div>
        </div>

        <div className="pawCont rightPaw" onClick={()=>this.handleCardChoice("accept")}>
          <div>
            <div className="c1"></div>
            <div className="c2"></div>
            <div className="c3"></div>
            <div className="c4"></div>

            <div className="p1"></div>
            <div className="p2"></div>
            <div className="p3"></div>
            <div className="p4"></div>
          </div>

          <div className="heartCont">
            <img src="/src/images/heart.svg" className="heart rightHeart"></img>
          </div>
        </div>
      </div>
    )
  }
}

export default ProfilesCardActions;