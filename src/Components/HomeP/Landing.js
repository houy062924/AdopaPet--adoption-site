import React from "react";
import "../../styles/landing.css";

class Landing extends React.Component {
  render() {
    return (
      <div className="landingCont">
        <div className="headerCont">
          <div className="contentCont-upper">
            <ul className="titleListCont">
              <li className="titleListItem">Finding a family</li>
              <li className="titleListItem">Looking</li>
            </ul>
          </div>
          <p className="titleText">
            for a
          </p>
          <div className="contentCont-lower">
            <ul className="titleListCont">
              <li className="titleListItem">homeless stray</li>
              <li className="titleListItem">paw-some dog</li>
              <li className="titleListItem">purr-fect cat</li>
              <li className="titleListItem">furry companion</li>
            </ul>
            <span className="underLine"></span>
            <span className="questionMark">?</span>
          </div>
        </div>
        <div>
          <img src="/src/images/HomeP/family.svg" className="headerImg"></img>
        </div>
      </div>
    )
  }
}


export default Landing;