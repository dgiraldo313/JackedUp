import React, { Component } from 'react';

// import Shuffled Deck of Cards
import { CreateCardDeck, ShuffleCardDeck } from '../DeckBuilder';

class Workout extends Component {
  constructor(props) {
    super(props);
    this.state = {
      CardsCompleted: null,
      status: null,

    };

    // this.CardDeck = [];
  }

  componentWillMount() {
    // created shuffled card Deck
    this.CardDeck = ShuffleCardDeck(CreateCardDeck());
  }

  render() {
    console.log(this.CardDeck);
    return (
        <div className="card-deck">
          <li id="front" style={{ zIndex: '100' }}>
            <div className="card-data top">
              <span className="suite">&spades;</span>
              <span className="number">10</span>
            </div>
            <div className="exercise-data">
              <span className="number">10</span>
              <span className="exercise">Push Ups</span>
            </div>
            <div className="card-data bottom">
              <span className="suite">&spades;</span>
              <span className="number">10</span>
            </div>
          </li>
          <li className="dec-card" id="first">
          </li>
          <li className="dec-card" id="second">
          </li>
          <li className="dec-card" id="third">
          </li>
          <li id="back" style={{ zIndex: '99' }} >
            <div className="card-data top">
              <span className="suite">&hearts;</span>
              <span className="number">2</span>
            </div>
            <div className="exercise-data">
              <span className="number">2</span>
              <span className="exercise">Sit Ups</span>
            </div>
            <div className="card-data bottom">
              <span className="suite">&hearts;</span>
              <span className="number">2</span>
            </div>
          </li>
        </div>
    );
  }

}

export default Workout;
