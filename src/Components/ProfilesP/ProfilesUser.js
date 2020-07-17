import React from "react";
import {firebase} from "../Shared/Firebase";
import {storage} from "../Shared/Firebase";
import interact from "interactjs";


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
    })
  }
  componentWillUnmount() {
    interact(".currentCard").unset();
  }

  // handleLike(eTarget, propProfile, propLikes) {
  //   let liked =  false;
  //   this.state.likeList.forEach((likeItem)=>{
  //     if (likeItem.id === propProfile.id) {
  //       liked = true;
  //     }
  //   })

  //   if (liked === false) {
  //     let newlikes = [...this.state.likeList, propProfile];
  //     this.setState({
  //       likeList: newlikes
  //     })
  //     localStorage.setItem("likes", JSON.stringify(newlikes));

  //     eTarget.classList.add("addedButton");
  //     eTarget.textContent = "已加入";
  //   }
  //   else {
  //     let filteredArr = this.state.likeList.filter(item => item.id !== propProfile.id)
  //     this.setState({
  //       likeList: filteredArr
  //     });
  //     localStorage.setItem("likes", JSON.stringify(filteredArr));

  //     eTarget.classList.remove("addedButton");
  //     eTarget.textContent = "Like";
  //   }
  // }

  
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
          No more profiles
        </div>
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
    // let liked = false;
    // this.props.profilestate.likes.forEach((like)=>{
    //   if ( like.id === this.props.profile.id ) {
    //     liked = true;
    //   } 
    // })

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
        className={`
          ${classes} 
        `} 
        style={positionStyle}>
        <div className="imgCont">
          <img src={this.props.profile.url} className="profileImg"></img>
        </div>

        <div className="textCont">
          <h1 className="profileName">
            { this.props.profile.name }
          </h1>
          <p className="profileId">
            { this.props.profile.id }
          </p>
          <p className="profileDays">
            {this.props.profile.date}
          </p>
          <p className="profileLocation">
            { this.props.profile.address }
          </p>
          <p className="profileStory">
            { this.props.profile.story }
          </p>

          {/* { liked
            ? <button type="button" className="addedButton" onClick={this.handleLike}>已加入</button>
            : <button type="button" onClick={this.handleLike}>Like</button>
          } */}
        </div>
      </div>
    )
  }
}

// class CardClosed extends React.Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       showForm: false
//     }

//     this.expandForm = this.expandForm.bind(this);
//   }
//   expandForm() {
//     this.setState((state)=>({
//       showForm: !state.showForm
//     }))
//   }
//   render() {
//     console.log(this.props)
//     return (
//       <div className="cardFormCont" onClick={this.expandForm}>
//         { this.state.showForm ?
//           <CardForm></CardForm>          
//           : <p className="expandText">展開</p>
//         }
//       </div>
//     )
//   }
// }

// class CardForm extends React.Component {

//   render() {
//     console.log(this.state)

//     return (
//       <div className="cardDetailCont">
       
//         <h2>Content</h2>
//       </div>
//     )
//   }
// }


export default ProfilesUser;