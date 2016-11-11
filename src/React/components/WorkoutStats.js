import React, { Component } from 'react';

class WorkoutStats extends Component {
  constructor(props) {
    super(props);
    this.CardsData = this.props.data;
    console.log(this.CardsData);
  }

  render() {
    return (
      <div className="stats-container">
        <div className="stat hearts">
          <div className="suit ">&hearts;</div>
          <div className="exercise">{ this.CardsData.HEARTS.exercise }</div>
          <div className="reps">{ this.CardsData.HEARTS.reps }</div>
        </div>
        <div className="stat clubs">
          <div className="suit ">&clubs;</div>
          <div className="exercise">{ this.CardsData.CLUBS.exercise }</div>
          <div className="reps">{ this.CardsData.CLUBS.reps }</div>
        </div>
        <div className="stat diamonds">
          <div className="suit ">&diams;</div>
          <div className="exercise">{ this.CardsData.DIAMONDS.exercise }</div>
          <div className="reps">{ this.CardsData.DIAMONDS.reps }</div>
        </div>
        <div className="stat spades">
          <div className="suit ">&spades;</div>
          <div className="exercise">{ this.CardsData.SPADES.exercise }</div>
          <div className="reps last">{ this.CardsData.SPADES.reps }</div>
        </div>
      </div>
    );
  }

}

export default WorkoutStats;
