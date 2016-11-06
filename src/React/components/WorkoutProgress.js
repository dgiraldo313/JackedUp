import React, { Component } from 'react';

class WorkoutProgress extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div> {this.props.completed + '/' + this.props.totalCards }</div>
    );
  }

}

export default WorkoutProgress;
