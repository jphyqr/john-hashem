import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { OPEN_MODAL } from "../config/baseReducers/modalReducer";
const shuffle = (array) => {
  let currentIndex = array.length,
    randomIndex;

  // While there remain elements to shuffle...
  while (currentIndex != 0) {
    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    // And swap it with the current element.
    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex],
      array[currentIndex],
    ];
  }

  return array;
};

const test = () => {
  class WarPlayer {
    constructor(name) {
      this.name = name;
      this.hand = [];
      this.discarded = [];
    }

    collectShuffledCards() {
      console.log("SHUFFLING CARDS BEFORE", this.hand);
      this.hand = [...this.hand, ...shuffle(this.discarded)];
      this.discarded = [];
      console.log("SHUFFLING CARDS AFFTER", this.hand);
    }

    receiveCard(card) {
      this.hand = [...this.hand, card];
    }

    receiveDiscardedCards(cards) {
      this.discarded = [...this.discarded, ...cards];
    }

    drawTopCard() {
      //remove card from hand

      return this.hand.shift();
    }
  }

  class WarGame {
    constructor(deck, playerA, playerB) {
      this.deck = deck;
      this.playerA = playerA;
      this.playerB = playerB;
      this.dealer = playerA;
      this.oop = playerB;
      this.nextPlayerToReceive = playerB;
      this.playerACardDrawn = null;
      this.playerBCardDrawn = null;
    }

    nextDraw() {
      this.playerACardDrawn = this.playerA.drawTopCard();
      this.playerBCardDrawn = this.playerB.drawTopCard();

      if (this.playerBCardDrawn.value >= this.playerACardDrawn.value) {
        this.playerB.receiveDiscardedCards([
          this.playerACardDrawn,
          this.playerBCardDrawn,
        ]);
        console.log("Player B Won");
      } else {
        this.playerA.receiveDiscardedCards([
          this.playerACardDrawn,
          this.playerBCardDrawn,
        ]);
        console.log("Player A Won");
      }
    }
    shuffleCards() {
      this.deck.shuffleCards();
    }

    initialDeal() {
      //loop through sshuffled cards, and assign each one to a player

      while (this.deck.cards.length > 0) {
        this.nextPlayerToReceive.receiveCard(this.deck.cards.shift());
        this.nextPlayerToReceive =
          this.nextPlayerToReceive === this.dealer ? this.oop : this.dealer;
      }
    }
  }

  class Deck {
    constructor() {
      const suits = ["s", "c", "h", "d"];
      const faceValue = [
        "2",
        "3",
        "4",
        "5",
        "6",
        "7",
        "8",
        "9",
        "10",
        "J",
        "Q",
        "K",
        "A",
      ];
      let sortedDeck = [];
      //generate all 52 cards

      for (var i = 0; i < suits.length; i++) {
        for (var j = 0; j < faceValue.length; j++) {
          sortedDeck.push({ face: faceValue[j], suit: suits[i], value: j });
        }
      }

      console.log(sortedDeck);

      this.cards = sortedDeck;
    }

    shuffle(array) {
      let currentIndex = array.length,
        randomIndex;

      // While there remain elements to shuffle...
      while (currentIndex != 0) {
        // Pick a remaining element...
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex--;

        // And swap it with the current element.
        [array[currentIndex], array[randomIndex]] = [
          array[randomIndex],
          array[currentIndex],
        ];
      }

      return array;
    }

    shuffleCards() {
      this.cards = this.shuffle(this.cards);
    }
  }

  const deck = new Deck();
  const playerA = new WarPlayer("John");
  const playerB = new WarPlayer("Jim");
  const game = new WarGame(deck, playerA, playerB);

  game.shuffleCards();
  game.initialDeal();

  //draw cards until a player has no cards left in hand

  while (game.playerA.hand.length > 0 && game.playerB.hand.length > 0) {
    game.nextDraw();

    if (game.playerA.hand.length === 0) {
      //check player A state
      if (game.playerA.discarded.length === 0) {
        console.log("Player B Won the game");
        break;
      } else {
        //we have discard cards, lets shuffle and
        game.playerA.collectShuffledCards();
      }
    }

    if (game.playerB.hand.length === 0) {
      //check player B state
      if (game.playerB.discarded.length === 0) {
        console.log("Player A Won the game");
        break;
      } else {
        game.playerB.collectShuffledCards();
      }
    }
  }

  //want to reshuffle, when a player is out of cards in hand, but the game isnt over.

  console.log(game);
  return <div className='test-container'>Practice Test containedArea</div>;
};

export default test;
