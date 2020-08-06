import React from "react";
import { firebase } from "../Shared/Firebase";
import db from "../Shared/Firebase";
import interact from "interactjs";
import "../../Styles/card.css";

import ProfilesCard from "./ProfilesCard";
import ProfilesCardActions from "./ProfilesCardActions";

class ProfilesBase extends React.Component {
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
      expandstory: false,
    }

    this.handleProfileFiltering = this.handleProfileFiltering.bind(this);
    this.resetCardPosition = this.resetCardPosition.bind(this);
    this.handleCardChoice = this.handleCardChoice.bind(this);
    this.handleLike = this.handleLike.bind(this);
    this.toggleStory = this.toggleStory.bind(this);
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

    db.collection("animals")
    .where("adoptionstatus", "==", 0)
    .get()
    .then((querySnapshot) => {
      querySnapshot.forEach((doc) => {
        profiles.push(doc.data());
      });

    })
    .then(()=>{
      return db.collection("members").doc(this.props.userdata.uid).get()

    })
    .then((doc)=>{
      if (doc.data().likes) {
        likes = doc.data().likes;
        this.setState({
          likes: likes
        })
      }
    })
    .then(()=>{
      // if (this.state.likes.length>0) {
        difference = profiles.filter(p => !likes.some(l => p.id === l.id));
        this.setState({
          profiles: difference
        })
      // }
    })
  }
  handleCardChoice(interaction) {
    this.setState((prevState) => ({
      currentCard: prevState.currentCard + 1,
      nextCard: prevState.nextCard + 1,
      expandstory: false,
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

    db.collection("members").doc(this.props.userdata.uid).update({
      "likes": firebase.firestore.FieldValue.arrayUnion(currentProfile) 
    })
    .then(()=>{
      this.setState({
        likes: likeArr,
        expandstory: false
      })
      console.log("Set")
    })
  }
  toggleStory() {
    this.setState((prevState)=>({
      expandstory: !prevState.expandstory
    }))
  }
  componentWillUnmount() {
    interact(".currentCard").unset();
  }

 
  render() {
    return (
      <div className="cardStackCont">
        { this.state.profiles !== undefined &&
          this.state.profiles.map((profile, index) => (
            <ProfilesCard 
              profile={profile} 
              index={index}
              profilestate={this.state}
              key={profile.id} 
              handleLike={this.handleLike}
              toggleStory={this.toggleStory}
              toggleState={this.state.expandstory}>
            </ProfilesCard>
          ))
        }
        <div className="cardCont bottomCardCont">
          <p>You've met them all!</p>
          <img src="/src/images/high-five.svg"></img>
        </div>
        <ProfilesCardActions
          rotateDeg={this.state.rotateDeg}
          positionX={this.state.positionX}
          positionY={this.state.positionY}
          handleCardChoice={this.handleCardChoice}>
        </ProfilesCardActions>
      </div>
    )
  }
}

export default ProfilesBase;