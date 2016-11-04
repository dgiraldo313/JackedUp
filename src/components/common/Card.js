import React, { Component } from 'react';

class Card extends Component {
  constructor(props){
    super(props);
    this.suit = this.props.suit;
    this.rank = this.props.rank;
    this.exercise = this.props.exercise;
    this.reps = this.props.reps;
    this.order = this.props.order;
  }
  SuitSymbol() {
    if( this.suit === 'SPADES'){
      return ( <span className="suite">&spades;</span>);
    }else if ( this.suit === 'HEARTS') {
      return ( <span className="suite">&hearts;</span>);
    }else if (this.suit === 'CLUBS') {
      return ( <span className="suite">&clubs;</span>);
    }else if (this.suit === 'DIAMONDS') {
      return ( <span className="suite">&diams;</span>);
    }

  }

  render() {
    let zIndex = this.order;
    return (
      <li className={ this.suit } style={ {zIndex: zIndex} }>
        <div className="card-data top">
          { this.SuitSymbol() }
          <span className="number"> { this.rank }</span>
        </div>
        <div className="exercise-data">
          <span className="number"> { this.reps }</span>
          <span className="exercise">{ this.exercise }</span>
        </div>
        <div className="card-data bottom">
          { this.SuitSymbol() }
          <span className="number">{ this.rank }</span>
        </div>
      </li>
    );
  }

}

export default Card;
