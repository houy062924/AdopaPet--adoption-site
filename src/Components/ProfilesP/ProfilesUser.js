import React from "react";
import { firebase } from "../Shared/Firebase";
import interact from "interactjs";
import "../../Styles/card.css";

class ProfilesUser extends React.Component {
  constructor() {
    super();
    this.state = {
      profiles: [],
      likes: [],
      positionX: 0,
      positionY: 0,
      rotateDeg: 0,
      isAnimating: true,
      currentCard: 0,
      nextCard: 1,
    }

    this.handleProfileFiltering = this.handleProfileFiltering.bind(this);
    this.resetCardPosition = this.resetCardPosition.bind(this);
    this.handleCardChoice = this.handleCardChoice.bind(this);
    this.handleLike = this.handleLike.bind(this);
    this.db = firebase.firestore();
  }

  componentDidMount() {
    // get data from database
    this.handleProfileFiltering();

    // Draggable
    interact(".currentCard").draggable({
      onstart: () => {
        this.setState({
          isAnimating: false
        })
      },
      onmove: (event) => {
        const x = this.state.positionX + event.dx;
        const y = this.state.positionY + event.dy;

        let rotation = 15 * (x / 1000);

        if (rotation > 15) {
          rotation = 15
        }
        else if (rotation < -15) {
          rotation = -15;
        }
        this.setState({
          positionX: x,
          positionY: y,
          rotateDeg: rotation
        })
      },
      onend: () => {
        if (this.state.positionX > 100) {
          this.handleCardChoice("accept");
        }
        else if (this.state.positionX < -100) {
          this.handleCardChoice("reject");
        }
        else {
          this.resetCardPosition();
        }
      }
    });
  }
  handleProfileFiltering() { 
    // show profiles that user hasn't liked yet
    let profiles = [];
    let likes = [];
    let difference = [];

    this.db.collection("animals").get()
    .then((querySnapshot) => {
      querySnapshot.forEach((doc) => {
        profiles.push(doc.data());
      });

    })
    .then(()=>{
      return this.db.collection("members").doc(this.props.userdata.uid).get()

    })
    .then((doc)=>{
      likes = doc.data().likes;
      this.setState({
        likes: likes
      })

    })
    .then(()=>{
      difference = profiles.filter(p => !likes.some(l => p.id === l.id));
      this.setState({
        profiles: difference
      })
    })
  }
  handleCardChoice(interaction) {
    this.setState((prevState) => ({
      currentCard: prevState.currentCard + 1,
      nextCard: prevState.nextCard + 1
    }))

    switch (interaction) {
      case "accept":
        console.log("accepted")
        this.setState({
          positionX: 1000
        })
        this.resetCardPosition();
        this.handleLike();
        break;

      case "reject":
        console.log("rejected")
        this.setState({
          positionX: -1000
        })
        this.resetCardPosition();
        break;
    }
  }
  resetCardPosition() {
    this.setState({
      positionX: 0,
      positionY: 0,
      rotateDeg: 0,
      isAnimating: true
    })
  }
  handleLike() {
    let currentProfile = this.state.profiles[this.state.currentCard-1];
    let likeArr;
    console.log(currentProfile)

    this.db.collection("members").doc(this.props.userdata.uid).get()
    .then((doc)=>{
      likeArr = [...doc.data().likes, currentProfile];
    })
    .then(()=>{
      this.setState({
        likes: likeArr
      })
      this.db.collection("members").doc(this.props.userdata.uid).update({
        likes: likeArr
      })
      console.log("Set")
    })
  }
  componentWillUnmount() {
    interact(".currentCard").unset();
  }

 
  render() {
    return (
      <div className="cardStackCont">
        { this.state.profiles !== undefined &&
          this.state.profiles.map((profile, index) => (
            <Card 
              profile={profile} 
              index={index}
              profilestate={this.state}
              key={profile.id} 
              handleLike={this.handleLike} 
            />
          ))
        }
        <div className="cardCont bottomCardCont">
          <p>No more profiles</p>
          <img src="/src/images/high-five.svg"></img>
        </div>
        <CardActions
          rotateDeg={this.state.rotateDeg}
          positionX={this.state.positionX}
          positionY={this.state.positionY}
          handleCardChoice={this.handleCardChoice}>
        </CardActions>
      </div>
    )
  }
}

class Card extends React.Component {
  constructor(props) {
    super(props);
    
    this.handleLike = this.handleLike.bind(this);
  }

  handleLike(e) {
    this.props.handleLike(e.target, this.props.profile, this.props.profilestate.likes);
  }

  render() {
    let positionStyle;
    let classes = "cardCont";

    if ( this.props.index === this.props.profilestate.currentCard ) {
      classes += ` currentCard ${this.props.profilestate.isAnimating ? "cardSnap" : ""}`;
      positionStyle = {
        transform: `translate3D(${this.props.profilestate.positionX}px, ${this.props.profilestate.positionY}px, 0) rotate(${this.props.profilestate.rotateDeg}deg)`,
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
                <p className="profileId">
                  <span className="labelText">ID<br></br></span>
                  { this.props.profile.id }
                </p>
                <p className="profileLocation">
                  <span className="labelText">Location<br></br></span>
                  { this.props.profile.address }
                </p>
              </div>
              <div className="profileCol">
                <p className="profileDays">
                  <span className="labelText">Date<br></br></span>
                  {this.props.profile.date}
                </p>
                <p className="profileAge">
                  <span className="labelText">Age<br></br></span>
                  {this.props.profile.year} yrs {this.props.profile.month} months
                </p>
              </div>
            </div>
            <div>
              <span className="labelText storyLabel">Story<br></br></span>
              <p className="profileStory">
                
                { this.props.profile.story }
              </p>
            </div>
          </div>
        </div>
        
      </div>
    )
  }
}

class CardActions extends React.Component {
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

export default ProfilesUser;