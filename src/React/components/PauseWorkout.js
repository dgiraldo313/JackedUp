import React, { Component } from 'react';

class PauseWorkout extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <button onClick={ this.props.pause }>
        <i className="fa fa-pause" aria-hidden="true"></i>
      </button>
    );
  }

}

export default PauseWorkout;
