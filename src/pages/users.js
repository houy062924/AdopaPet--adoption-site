import React from "react";
import Likes from "../Components/Likes"

class Users extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      likes: []
    }
  }

  componentDidMount() {
    this.setState({
      likes: JSON.parse(localStorage.getItem("likes"))
    })
  }

  render() {
    return (
      <Likes></Likes>
    )
  }
}

export default Users;