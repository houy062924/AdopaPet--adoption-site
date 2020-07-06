import React from "react";
import "../styles/likes.css"

class Likes extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      likes: []
    }
  }

  componentDidMount() {
    if (localStorage.getItem("likes") !== null) {
      this.setState({
        likes: JSON.parse(localStorage.getItem("likes"))
      })
    }
  }

  render() {
    return (
      <div className="likePageCont"> 
        { this.state.likes !== undefined &&
          this.state.likes.map((like)=>(
            <div className="likeCont" key={like.id}>
              <div className="removeCont" onClick={this.handleRemove}></div>
              <div className="imgCont">
                <img src={like.url} className="profileImg"></img>
              </div>

              <div className="textCont">
                <p>{like.name}</p>
                <p>{like.id}</p>
                
              </div>
            </div>
          ))
        }
      </div>
    )
  }
}

export default Likes;