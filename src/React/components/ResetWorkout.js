import React, { Component } from 'react';

class ResetWorkout extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <button onClick={ this.props.reset }>
        <i className="fa fa-refresh" aria-hidden="true"></i>
      </button>
    );
  }

}

export default ResetWorkout;
