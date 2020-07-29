import React from "react";
import "../../styles/likes.css";


class Likes extends React.Component {
  constructor(props) {
    super(props);
  }
  openFullProfile(p, e, i) {
    e.stopPropagation();
    this.props.functions.openFullProfile(p, e, i);
  }
  closeFullProfile() {
    this.props.functions.closeFullProfile();
  }
  removeLike(p, e) {
    e.stopPropagation();
    this.props.functions.removeLike(p);
  }
  handleAdopt() {
    this.props.functions.handleAdopt();
  }

  render() {
    let adopted = null;
    return (
      <div className="likePageCont"> 
        { this.props.likestate !== undefined &&
          this.props.likestate.map((like, index)=>(
            <div 
              className="likeCont" 
              key={like.id}
              onClick={()=>this.openFullProfile(like, event, index)}>
                
              <div className="imgCont">
                <img src={like.url} className="profileImg"></img>
              </div>

              <div className="textCont">
                <p className="profileName">
                  {like.name}
                </p>
                <p className="profileDays">
                  <span className="labelText">Date<br></br></span>
                  {like.date}
                </p>
                <p className="profileId">
                  <span className="labelText">ID<br></br></span>
                  { like.id }
                </p>
                <p className="profileLocation">
                  <span className="labelText">Location<br></br></span>
                  { like.address }
                </p>
              </div>
              <div className="removeCont" onClick={(event)=>this.removeLike(like, event)}></div>

              {/* <div className="heartCont" onClick={(event)=>this.removeLike(like, event)}></div> */}
              { like.adoptionstatus === 0 &&
                <div>
                  testetst
                </div>
              }
              { 
                adopted = this.props.adoptedstate.map((adopted)=>{
                  if (adopted.id === like.id) {
                    return <div 
                      className="adoptedCont"
                      key="like.id">
                        <div className="removeCont" onClick={(event)=>this.removeLike(like, event)}></div>
                        <p>Adopted</p>
                        {/* <img src="/src/images/dog-home.svg"></img> */}
                      </div>
                  }
                })
              }
            </div>
          ))
        }
        { this.props.dashstate.fullprofile === true &&
          <FullProfile
            statedata={this.props.statedata}
            dashstate={this.props.dashstate}
            functions={this.props.functions}>
          </FullProfile>
        }
      </div>
    )
  }
}

class FullProfile extends React.Component {
  constructor(props) {
    super(props);

    this.closeFullProfile = this.closeFullProfile.bind(this);
    this.handleAdopt = this.handleAdopt.bind(this);
  }

  handleAdopt() {
    this.props.functions.handleAdopt();
  }
  closeFullProfile() {
    this.props.functions.closeFullProfile();
  }

  render() {
    let currentprofile = this.props.dashstate.currentprofile;

    return (
      <div className="fullProfileCont">
        <form className="fullProfileForm">
          <div className="formTopCont">
            <p className="formTopTitle">Profile</p>
            <p className="closeFormButton" onClick={this.closeFullProfile}>X</p>
          </div>
          
          <div className="formBottomCont">
            <div className="formDataCont">
              <div className="formImgCont">
                <img src={currentprofile.url} className="formImg"></img>
              </div>

              <div className="formTextCont">
                <h2 className="formName">
                  {currentprofile.name}
                </h2>
                <p className="formDays">
                  <span className="labelText">Date<br></br></span>
                  {currentprofile.date}
                </p>
                <p className="formId">
                  <span className="labelText">ID<br></br></span>
                  {currentprofile.id}
                </p>
                <p className="formGender">
                  <span className="labelText">Gender<br></br></span>
                  {currentprofile.gender}
                </p>
                <p className="formAge">
                  <span className="labelText">Age<br></br></span>
                  {currentprofile.year} yrs {currentprofile.month} months
                </p>
                <p className="formLocation">
                  <span className="labelText">Location<br></br></span>
                  {currentprofile.address}
                </p>
              </div>
            </div>

            <div className="formStoryCont">
              <p className="formStory">
                <span className="labelText storyLabel">Story</span>
                <br></br>
                {currentprofile.story}
              </p>
            </div>

            <div className="adoptButton" onClick={this.handleAdopt}>Start the adoption process</div>
          </div>

        </form>
      </div>
    )
  }
}

export default Likes;