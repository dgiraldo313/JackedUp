import React, { Component } from 'react';
import { Router } from 'react-router';

// import app components
import Card from '../components/Card';

// import Deck component (Builds deck on workout configuration)
import { BuildDeck } from '../components/Deck';

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

    // global variable to store card deck

    // function used to refresh state of app
    this.refresh = this.props.refresh;

    // This binding is necessary to make `this` work in the callback
    this.nextCard = this.nextCard.bind(this);

  }

  componentWillMount() {
    // get all default data STARTED
    //includes creating deck of shuffled deck of cards
    //resetting reps quantity to 0
    this.configureWorkout();

  }

  //function helper to refresh state
  // function is passed to children for state manipulation
  refreshState(state) {
    this.setState(state);
  }

  configureWorkout() {
    //get list of excercises by card suit
    let ExerciseList = this.props.state.CardsData;

    // build shuffled card Deck
    // console.log(BuildDeck(ExerciseList));
    this.CardDeck = BuildDeck(ExerciseList);

    // console.log('New deck: ', this.CardDeck);

    // add initial card to queue
    let initialCard = { suit: 'start',
                        rank: null,
                        exercise: 'Click to Start!',
                        reps: null,
                      };
    this.state.CardsQueue.push(initialCard);

    // initialize stat of the app
    this.setState({
      totalCards: this.CardDeck.length,
    });

  }

  //increment reps
  incrementReps(card) {
    let suit = card.suit;
    let reps = card.reps;

    // add reps to each indivdual exercise
    let stateSuit;

    if (suit === 'HEARTS') {
      stateSuit = this.props.state.CardsData.HEARTS;
    } else if (suit === 'DIAMONDS') {
      stateSuit = this.props.state.CardsData.DIAMONDS;
    } else if (suit === 'CLUBS') {
      stateSuit = this.props.state.CardsData.CLUBS;
    } else if (suit === 'SPADES') {
      stateSuit = this.props.state.CardsData.SPADES;
    }

    // increment current rep count
    stateSuit.reps += reps;

    // refresh app state
    this.refresh(this.props.state);
  }

  // next card handler
  nextCard() {
    // check to make sure user is not done with workout
    if (this.state.CardsQueue.length - 1 < this.state.totalCards) {
      // get card firts card in deck of cards
      let currCard = this.CardDeck[0];

      // increment count of reps
      this.incrementReps(currCard);

      //if it's first click on card, change workout status to STARTED
      if (this.state.CardsQueue.length === 1) {
        this.state.WorkoutStatus = 'INPROGRESS';
      } else if (this.state.WorkoutStatus = 'STOPPED') {
        //if current status is STOPPED and user clicks next card update to STARTED
        this.state.WorkoutStatus = 'INPROGRESS';
      }

      // move card to queue and change state of current list
      this.state.CardsQueue.push(currCard);
      this.setState(this.state);

      //remove card from current card deck
      this.CardDeck.splice(0, 1);
    } else {
      this.endWorkout();
    }
  }

  endWorkout() {
    // change status of workout to FINISHED
    this.setState({ WorkoutStatus: 'FINISHED' });

    //check to see if user completed workout
    // and record state to APP using props funtion refresh()
    let wasWorkoutCompleted = this.state.CardsQueue.length - 1 === this.state.totalCards ?
                              true :
                              false;

    //**** here record total time
    this.refresh({ WorkoutCompleted: wasWorkoutCompleted });

    //finally redirect to results page
    this.context.router.push('/results');
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
