import React from 'react';

let Deck = [];

const CreateCardDeck = () => {
  let Suits = ['DIAMONDS', 'SPADES', 'CLUBS', 'HEARTS'];

  // create deck
  for (var i = 2; i < 15; i++) {
    for (var j = 0; j < Suits.length; j++) {
      let Card = {
                  suite: Suits[j],
                  value: i,
                };
      
      // add card object to deck
      Deck.push(Card);
    }
  }
};

const ShuffleCardDeck = () => {
  // get our own copy of the Cards array
  let cardArray =  Deck.slice();

  // shuffle the cards
  let currentIndex = cardArray.length;
  let tempValue;
  let randomIndex;

  while (!currentIndex) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;
    tempValue = cardArray[currentIndex];
    cardArray[currentIndex] = cardArray[randomIndex];
    cardArray[randomIndex] = tempValue;
  }

  return cardArray;
};

export { CreateCardDeck, ShuffleCardDeck };
