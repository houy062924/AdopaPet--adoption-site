import React from "react";
import M from 'materialize-css/dist/js/materialize.min.js';
import 'materialize-css/dist/css/materialize.min.css';
import {firebase} from "../Components/Firebase";
import {storage} from "../Components/Firebase";

class Carousel extends React.Component {
  constructor() {
    super();
    this.state = {
      profiles: []
    }
  }

  componentDidMount() {
    const elem = document.querySelector(".carousel");
    const options = {
      numVisible: 3
    };
    const instance = M.Carousel.init(elem, options);

    // get data
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
  }
  
  render() {
    return (
      <div id="carouselCont">
        { this.state.profiles !== undefined &&
          this.state.profiles.map((profile) => (
            <Card profile={profile} key={profile.id} />
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

  handleLike() {
    console.log("click")
  }

  render() {
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

          <button onClick={this.handleLike}>Like</button>
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