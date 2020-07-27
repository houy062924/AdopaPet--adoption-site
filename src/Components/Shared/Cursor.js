import React from "react";
import "../../Styles/shared.css";

class Cursor extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      left: 0,
      top: 0,
    }
  }
  componentDidMount() {
    document.addEventListener('mousemove', (e) => {
      this.setState({left: e.pageX, top: e.pageY});
    });
  }
  render() {
    return (
      <div 
        className="cursorCont" 
        style={{
          left: this.state.left, 
          top: this.state.top
        }}>
      </div>
    )
  }
}

export default Cursor;