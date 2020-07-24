import React from "react";
import "../../Styles/shared.css";

class Loading extends React.Component {
  render() {
    return (
      <div className="loadingCont">
        <div className="animationCont">
          <div className="animation"></div>
        </div>
      </div>
    )
  }
}

export default Loading;