import React from "react";
import 'materialize-css/dist/js/materialize.min'
import 'materialize-css/dist/css/materialize.min.css'

// import { Link } from "react-router-dom";

class Carousel extends React.Component {
  componentDidMount() {
    const elems = window.document.querySelectorAll('.carousel');
    const options = {
      numVisible: 3
    }
    window.M.Carousel.init(elems, options)
  }
  
  render() {
    return (
      <div className="carousel">
        <a className="carousel-item" href="#one!"><Card/></a>
        <a className="carousel-item" href="#two!"><Card/></a>
        <a className="carousel-item" href="#three!"><Card/></a>
      </div>
    )
  }
}

class Card extends React.Component {
  render() {
    return (
      <div className="cardCont">
        <div className="imgCont">
          <div className="imgTesting"></div>
        </div>
        <div className="heartCont">
          <div className="heart"></div>
        </div>

        <CardClosed></CardClosed>
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
    return (
      <div className="cardDetailCont">Content</div>
    )
  }
}


export default Carousel;