// builds random deck of card and assigng workout depending on the suit of card
let deck = [];

const CreateCardDeck = (ExerciseList) => {
  let Suits = ['DIAMONDS', 'SPADES', 'CLUBS', 'HEARTS'];
  let Ranks = ['A', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K'];

  // create deck
  Suits.map((suit) => {
    Ranks.map((rank, value) => {
      // temp store suit of current card
      let Suit = suit;

      // get exercise depending on suit
      let Exercise = ExerciseList[Suit].exercise;

      // store rank of card
      let Rank = rank;

      // get value of card, if suit is a letter than value is 10, otherwise is value of card
      let Value = rank == 'A' || rank == 'J' || rank == 'Q' || rank == 'K' ? 10 : value + 1;
      let Card = {
                  suit: Suit,
                  rank: Rank,
                  exercise: Exercise,
                  reps: Value,

                };

      // add card object to deck
      deck.push(Card);
    });
  });
};

const ShuffleCardDeck = () => {
  // get our own copy of the Cards array
  let cardArray =  deck.slice();

  // shuffle the cards
  let currentIndex = cardArray.length;
  let tempValue;
  let randomIndex;

  while (currentIndex) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;
    tempValue = cardArray[currentIndex];
    cardArray[currentIndex] = cardArray[randomIndex];
    cardArray[randomIndex] = tempValue;
  }

  return cardArray;
};

const BuildDeck = (ExerciseList) => {
  let CardDeck = CreateCardDeck(ExerciseList);
  return ShuffleCardDeck(CardDeck);
};

export { BuildDeck };
