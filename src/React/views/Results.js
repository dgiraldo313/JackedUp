import React, { Component } from 'react';

import WorkoutStats from '../components/WorkoutStats';

class Results extends Component {

  resultMessage() {
    // console.log(this.props.state);
    let message = this.props.state.WorkoutCompleted === true ?
                  <div className="result-message success">
                    Way to power through it!
                  </div>
                  :
                  <div className="result-message failure">
                    What happened there? You didn't finish!
                  </div>;
    return message;
  }

  render() {
    return (
      <div id="results">
        { this.resultMessage() }
        <div className="time">
          <div className="final-time"> { this.props.state.FinalTime }</div>
        </div>
        <WorkoutStats data= { this.props.state.CardsData } />
        
      </div>
    );
  }

}

export default Results;
