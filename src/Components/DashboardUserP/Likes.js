import React from "react";
import "../../styles/likes.css"

class Likes extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      fullprofile: false,
      currentprofile: null
    }
    this.functions = {
      removeLike: this.removeLike.bind(this),
      openFullProfile: this.openFullProfile.bind(this),
      closeFullProfile: this.closeFullProfile.bind(this),
    }
  }
  openFullProfile(p, e) {
    e.stopPropagation();
    this.setState({
      fullprofile: true,
      currentprofile: p
    })
  }
  closeFullProfile() {
    this.setState({
      fullprofile: false,
      currentprofile: null
    })
  }
  removeLike(p, e) {
    e.stopPropagation();
    this.props.removeLike(p);
  }

  render() {
    let adopted = null;

    return (
      <div className="likePageCont"> 
        { this.props.likestate !== undefined &&
          this.props.likestate.map((like)=>(
            <div 
              className="likeCont" 
              key={like.id}
              onClick={()=>this.openFullProfile(like, event)}>
                
              <div className="imgCont">
                <img src={like.url} className="profileImg"></img>
              </div>

              <div className="textCont">
                <p className="profileName">
                  {like.name}
                </p>
                <p className="profileDays">
                  <span className="labelText">Date: </span>
                  {like.date}
                </p>
                <p className="profileId">
                  <span className="labelText">ID: </span>
                  { like.id }
                </p>
                <p className="profileLocation">
                  <span className="labelText">Location: </span>
                  { like.address }
                </p>
              </div>
              <div className="heartCont" onClick={(event)=>this.removeLike(like, event)}></div>
              { 
                adopted = this.props.adoptedstate.map((adopted)=>{
                  if (adopted.id === like.id) {
                    return <div 
                      className="adoptedCont"
                      key="like.id">
                        <div className="removeCont" onClick={()=>this.removeLike(like)}></div>
                        <p>I am home</p>
                        <img src="/src/images/dog-home.svg"></img>
                      </div>
                  }
                })
              }
            </div>
          ))
        }
        { this.state.fullprofile === true &&
          <FullProfile
            likestate={this.state}
            functions={this.functions}>
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
  }

  closeFullProfile() {
    this.props.functions.closeFullProfile();
  }

  render() {
    let currentprofile = this.props.likestate.currentprofile;

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
                  <span className="labelText">Date: </span>
                  {currentprofile.date}
                </p>
                <p className="formId">
                  <span className="labelText">ID: </span>
                  {currentprofile.id}
                </p>
                <p className="formGender">
                  <span className="labelText">Gender: </span>
                  {currentprofile.gender}
                </p>
                <p className="formAge">
                  <span className="labelText">Age: </span>
                  {currentprofile.year} yrs {currentprofile.month} months
                </p>
                <p className="formLocation">
                  <span className="labelText">Location: </span>
                  {currentprofile.address}
                </p>
              </div>
            </div>

            <div className="formStoryCont">
              <p className="formStory">
                <span className="labelText storyLabel">Story: </span>
                <br></br>
                {currentprofile.story}
              </p>
            </div>
          </div>

        </form>
      </div>
    )
  }
}

export default Likes;