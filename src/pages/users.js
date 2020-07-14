import React from "./node_modules/react";
import Likes from "../Components/DashboardUserP/Likes"

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