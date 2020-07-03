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
        console.log(doc.id, " => ", doc.data());
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
  render() {
    return (
      <div className="cardCont">
        <div className="imgCont">
          { this.props.profile !== undefined &&
            <img src={this.props.profile.url} className="imgProfile"></img>
          }
        </div>
        <div className="heartCont">
          <div className="heart"></div>
        </div>

        <CardClosed profiles={this.props.profile}></CardClosed>
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