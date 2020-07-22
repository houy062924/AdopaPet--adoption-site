import React from "react";
import "../../styles/landing.css";
import "../../styles/dog.css";


class Landing extends React.Component {
  render() {
    return (
      <div className="landingCont">
        <img src="/src/images/HomeP/background.svg" className="backgroundImg"></img>
        <div className="foregroundCont">
          <img 
            src="/src/images/HomeP/lamppost.svg"
            className="lamppost">
          </img>
          <img 
            src="/src/images/HomeP/trees.svg"
            className="trees">
          </img>
        </div>
        
        {/* <Dog></Dog> */}
        
      </div>
    )
  }
}

class Dog extends React.Component {
  render() {
    return (
      <div className="dog">
        <div className="torso">
            <div className="fur">
                <div className="spot"></div>
            </div>
            <div className="neck">
                <div className="fur"></div>
                <div className="head">
                    <div className="fur">
                        <div className="snout"></div>
                    </div>
                    <div className="ears">
                        <div className="ear">
                            <div className="fur"></div>
                        </div>
                        <div className="ear">
                            <div className="fur"></div>
                        </div>
                    </div>
                    <div className="eye"></div>
                </div>
                <div className="collar"></div>
            </div>
            <div className="legs">
                <div className="leg">
                    <div className="fur"></div>
                    <div className="leg-inner">
                        <div className="fur"></div>
                    </div>
                </div>
                <div className="leg">
                    <div className="fur"></div>
                    <div className="leg-inner">
                        <div className="fur"></div>
                    </div>
                </div>
                <div className="leg">
                    <div className="fur"></div>
                    <div className="leg-inner">
                        <div className="fur"></div>
                    </div>
                </div>
                <div className="leg">
                    <div className="fur"></div>
                    <div className="leg-inner">
                        <div className="fur"></div>
                    </div>
                </div>
            </div>
            <div className="tail">
                <div className="tail">
                    <div className="tail">
                        <div className="tail -end">
                            <div className="tail ">
                                <div className="tail">
                                    <div className="tail">
                                        <div className="tail"></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    )
  }
}

class Trees extends React.Component {
  render() {
    return (
      <div className="treesCont">
        <div className="treeCont leftTree">
          <div className="treeTop"></div>
          <div className="treeTrunk">
            <div className="treeTrunkSide"></div>
          </div>
        </div>

        <div className="treeCont rightTree">
          <div className="treeTop"></div>
          <div className="treeTrunk">
            <div className="treeTrunkSide"></div>
          </div>
        </div>
      </div>
    )
  }
}

export default Landing;