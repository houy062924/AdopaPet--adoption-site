import React from "react";
import "../../styles/likes.css"

class Likes extends React.Component {
  constructor(props) {
    super(props);

    this.removeLike = this.removeLike.bind(this);
  }

  removeLike(p) {
    this.props.removeLike(p);
  }

  render() {
    return (
      <div className="likePageCont"> 
        { this.props.likestate !== undefined &&
          this.props.likestate.map((like)=>(
            <div className="likeCont" key={like.id}>
              <div className="imgCont">
                <img src={like.url} className="profileImg"></img>
              </div>

              <div className="textCont">
                <p>{like.name}</p>
                <p>{like.id}</p>
              </div>
              <div className="removeCont" onClick={()=>this.removeLike(like)}></div>
              {/* <img src="/src/images/heart.svg" className="heartIcon"></img> */}
            </div>
          ))
        }
      </div>
    )
  }
}

export default Likes;