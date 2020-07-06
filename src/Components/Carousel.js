import React from "react";
import M from 'materialize-css/dist/js/materialize.min.js';
import 'materialize-css/dist/css/materialize.min.css';
import {firebase} from "../Components/Firebase";
import {storage} from "../Components/Firebase";

class Carousel extends React.Component {
  constructor() {
    super();
    this.state = {
      profiles: [],
      likeList: []
    }

    this.handleLike = this.handleLike.bind(this);
  }

  componentDidMount() {
    // const elem = document.querySelector(".carousel");
    // const options = {
    //   numVisible: 3
    // };
    // const instance = M.Carousel.init(elem, options);

    // get data from database
    const profiles = []
    const db = firebase.firestore();
    const data = db.collection("animals").get()
    .then((querySnapshot) => {
      querySnapshot.forEach(function(doc) {
        profiles.push(doc.data());
      });

      this.setState({
        profiles: profiles
      })
    });

    // get data from local storage
    if ( localStorage.getItem("likes") !== null ) {
      this.setState({
        likeList: JSON.parse(localStorage.getItem("likes"))
      })
    }
  }

  handleLike(eTarget, propProfile, propLikes) {
    // if (localStorage.getItem("likes") === null ) {
      let newlikes = [...this.state.likeList, propProfile]
      this.setState({
        likeList: newlikes
      })
      localStorage.setItem("likes", JSON.stringify(newlikes))
      eTarget.disabled = true;
    // }

    
  }
  
  render() {
    return (
      <div id="carouselCont">
        { this.state.profiles !== undefined &&
          this.state.profiles.map((profile) => (
            <Card profile={profile} likes={this.state.likeList} key={profile.id} handleLike={this.handleLike} />
          ))
        }

        {/* <a className="carousel-item" ><Card profiles={this.state.profiles} /></a>
        <a className="carousel-item" href="#two!"><Card profiles={this.state.profiles} /></a>
        <a className="carousel-item" href="#three!"><Card profiles={this.state.profiles} /></a> */}
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
    this.props.handleLike(e.target, this.props.profile, this.props.likes);

    // if ( localStorage.getItem("likes") === null ) {
    //   likesArr.push(this.props.profile);
    //   localStorage.setItem("likes", JSON.stringify(likesArr));
    //   e.target.disabled = true;
    //   e.target.textContent = "已加入";
    // }
    // else {
    //   likesArr = JSON.parse(localStorage.getItem("likes"));
    //   likesArr.push(this.props.profile);
    //   localStorage.setItem("likes", JSON.stringify(likesArr));
    //   e.target.disabled = true;
    //   e.target.textContent = "已加入";
    // }
  }

  render() {
    let liked = false;
    this.props.likes.forEach((like)=>{
      if ( like.id === this.props.profile.id ) {
        liked = true;
      } 
    })

    return (
      <div className="cardCont">
        <div className="imgCont">
          { this.props.profile !== undefined &&
            <img src={this.props.profile.url} className="profileImg"></img>
          }
        </div>
        <div className="textCont">
          <h1 className="profileName">
            { this.props.profile !== undefined &&
              this.props.profile.name
            }
          </h1>
          <p className="profileId">
            { this.props.profile !== undefined &&
              this.props.profile.id
            }
          </p>
          <p className="profileDays">DAYS</p>
          <p className="profileLocation">LOCATION</p>
          <p className="profileStory">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>

          { liked 
            ? <button type="button" disabled>已加入</button>
            : <button type="button" onClick={this.handleLike}>Like</button>
          }
        </div>



        {/* <div className="heartCont">
          <div className="heart"></div>
        </div>

        <CardClosed profiles={this.props.profile}></CardClosed> */}
      </div>
    )
  }
}

class CardClosed extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showForm: false
    }

    this.expandForm = this.expandForm.bind(this);
  }
  expandForm() {
    this.setState((state)=>({
      showForm: !state.showForm
    }))
  }
  render() {
    console.log(this.props)
    return (
      <div className="cardFormCont" onClick={this.expandForm}>
        { this.state.showForm ?
          <CardForm></CardForm>          
          : <p className="expandText">展開</p>
        }
      </div>
    )
  }
}

class CardForm extends React.Component {

  render() {
    console.log(this.state)

    return (
      <div className="cardDetailCont">
       
        <h2>Content</h2>
      </div>
    )
  }
}


export default Carousel;