import React, { Component } from 'react';
import { Router } from 'react-router';

// import action handler
import { ActionHandler } from '../actions/Workout';

// import Shuffled Deck of Cards
import { getDeckOfCards } from '../DeckBuilder';

// import card component to build the cards in Deck
import Card from '../common/Card';

class Workout extends Component {
  static get contextTypes() {
    return {
      router: React.PropTypes.object.isRequired,
    };
  }

  constructor(props) {
    super(props);
    this.state = {
      CardsCompleted: [],
      WorkoutStatus: 'INITIAL',
      CardsQueue: [],
      totalCards: null,

    };

    // function used to refresh state of app
    this.refresh = this.props.refresh;

    // This binding is necessary to make `this` work in the callback
    this.nextCard = ActionHandler.nextCard.bind(this);

    // this.cardsCompleted = this.cardsCompleted.bind(this);
  }

  componentWillMount() {
    // get all default data STARTED
    //includes creating deck of shuffled deck of cards
    //resetting reps quantity to 0
    ActionHandler.configureWorkout();

  }

  //function helper to refresh state
  // function is passed to children for state manipulation
  refreshState(state) {
    this.setState(state);
  }

  // creates dynamic button with different names depending on state of workout
  controlButton() {
    let message;
    let state = this.state.WorkoutStatus;
    if (state === 'INITIAL') {
      message = 'start';
    }else if (this.state.CardsQueue.length - 1 === this.state.totalCards) {
      // add finish button right before workout ends
      message = 'finish';
    }else if (state === 'INPROGRESS') {
      message = 'next';
    }else if (state === 'STOPPED') {
      message = 'continue';
    }

    return (<button onClick={this.nextCard}>{message}</button>);
  }

  //get total number of cards completed out of cards in deck
  cardsCompleted() {
    let cardsCompleted = this.state.CardsQueue.length - 1;
    let totalCards = this.state.totalCards;

    return (<div> {cardsCompleted + '/' + totalCards }</div>);
  }

  render() {
    return (
        <div className="card-deck">
          <li id="front" style={{ zIndex: '99' }}>
            <div className="card-data top">
              <span className="suite">&spades;</span>
              <span className="number"></span>
            </div>
            <div className="exercise-data">
              <span className="number"></span>
              <span className="exercise">Click to Start</span>
            </div>
            <div className="card-data bottom">
              <span className="suite">?</span>
              <span className="number"></span>
            </div>
          </li>
          <li className="dec-card" id="first">
          </li>
          <li className="dec-card" id="second">
          </li>
          <li className="dec-card" id="third">
          </li>
          <a onClick={ this.nextCard }>
            { this.state.CardsQueue.map(function (card, index) {
                                  // increment  inline z-index as cards are added
                                  let zIndex = index + 100;
                                  return (
                                    <Card suit= { card.suit }
                                        rank= { card.rank }
                                    exercise= { card.exercise }
                                        reps= { card.reps }
                                       order= { zIndex }
                                         key= { index } />
                                     );
                                })
              }
          </a>
          <div className ="cards-progress">
            { this.cardsCompleted() }
          </div>
          <div>
            { this.controlButton() }
          </div>

        </div>
    );
  }

}

export default Workout;
