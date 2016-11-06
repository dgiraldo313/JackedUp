import React, { Component } from 'react';
import { Router } from 'react-router';

// import app components
import Card from '../components/Card';
import WorkoutProgress from '../components/WorkoutProgress';
import WorkoutControls from '../components/WorkoutControls';

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
      CardDeck: null,
      currIndex: 0,
      CardsQueue: [],
      totalCards: null,

    };

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

  componentWillUnmount() {
    //clean up state
    console.log('bye');
  }

  //function helper to refresh state
  // function is passed to children for state manipulation
  refreshState(state) {
    this.setState(state);
  }

  configureWorkout() {
    // make sure rep count is 0
    this.resetReps();

    //get list of excercises by card suit
    let ExerciseList = this.props.state.CardsData;

    // build shuffled card Deck
    this.state.CardDeck = BuildDeck(ExerciseList);

    // add initial card to queue
    let initialCard = { suit: 'start',
                        rank: null,
                        exercise: 'Click to Start!',
                        reps: null,
                      };
    this.state.CardsQueue.push(initialCard);

    //set total number of cards in deck
    //****this keeps in mind future functionality of adding additional cards****
    this.state.totalCards = this.state.CardDeck.length;

    // initialize state of the app
    this.setState(this.state);

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

  //reset reps
  resetReps(card) {
    // reset all rep count back to 0
    this.props.state.CardsData.HEARTS.reps = 0;
    this.props.state.CardsData.DIAMONDS.reps = 0;
    this.props.state.CardsData.CLUBS.reps = 0;
    this.props.state.CardsData.SPADES.reps = 0;

    // refresh app state
    this.refresh(this.props.state);

  }

  // next card handler
  nextCard() {
    //index of current cards
    let currIndex = this.state.currIndex;

    // check to make sure user is not done with workout
    if (this.state.CardsQueue.length - 1 < this.state.totalCards) {
      // get card firts card in deck of cards
      let currCard = this.state.CardDeck[currIndex];

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

      //remove card from current card deck
      // this.CardDeck.splice(0, 1);
      //instead increment index
      this.state.currIndex = currIndex + 1;

      //update state of workout
      this.setState(this.state);
    } else {
      this.endWorkout();
    }
  }

  // pause workout
  pauseWorkout() {
    this.state.WorkoutStatus = 'STOPPED';

    //update state
    this.setState(this.state);
  }

  //restart workout
  resetWorkout() {
    // change status to INITIAL
    this.state.WorkoutStatus = 'INITIAL';

    // remove cards from CardsQueue
    this.state.CardsQueue.length = 0;

    //update state
    this.setState(this.state);

    // configute new workout
    this.configureWorkout();
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
            <WorkoutProgress completed={ this.state.CardsQueue.length - 1 }
                           totalCards={ this.state.totalCards } />
          </div>
          <WorkoutControls state= {this.state.WorkoutStatus}
                          finish= {this.state.CardsQueue.length - 1 === this.state.totalCards}
                        nextCard= {function () { this.nextCard(); }.bind(this) }
                           pause= {function () { this.pauseWorkout(); }.bind(this)}
                           reset= {function () { this.resetWorkout(); }.bind(this)}
                          />
        </div>
    );
  }

}

export default Workout;
