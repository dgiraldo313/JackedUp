import React, { Component } from 'react';

// import Shuffled Deck of Cards
import { getDeckOfCards } from '../DeckBuilder';

// import card component to build the cards in Deck
import Card from '../common/Card';

class Workout extends Component {
  constructor(props) {
    super(props);
    this.state = {
      CardsCompleted: [],
      status: null,
      CardsQueue: [],

    };

    // This binding is necessary to make `this` work in the callback
    this.nextCard = this.nextCard.bind(this);
  }

  componentWillMount() {
    //get list of excercises by card suit
    let ExerciseList = this.props.state.CardsData;

    // created shuffled card Deck
    this.CardDeck = getDeckOfCards(ExerciseList);
  }

  // next card handler
  nextCard() {
    console.log('this was triggered');

    // get card firt card in deck of cards
    let currCard = this.CardDeck[0];

    // move card to queue
    this.state.CardsQueue.push(currCard);
    this.setState(this.state);

    //remove card from current card deck
    this.CardDeck.splice(0, 1);

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
          <div>
            <button onClick={this.nextCard}>Next</button>
          </div>

        </div>
    );
  }

}

export default Workout;
