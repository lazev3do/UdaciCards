/*getDecks: return all of the decks along with their titles, questions, and answers.
getDeck: take in a single id argument and return the deck associated with that id.
saveDeckTitle: take in a single title argument and add it to the decks.
addCardToDeck: take in two arguments, title and card, and will add the card to the list of questions for the deck with the associated title. */

import {AsyncStorage} from 'react-native';

const DECKS_STORAGE_KEY = 'UdaciCards:decks';
const QUIZ_STORAGE_KEY = 'UdaciCards:quiz';

export const getDeck =(deckKey) => (
  getDecks()
  .then((decks)=>decks.filter((elem)=>elem.key===deckKey))
)

export const getDecks = () => (
  AsyncStorage.getItem(DECKS_STORAGE_KEY)
  .then(JSON.parse)
)

export const saveDeckTitle = (deckTitle) => (
  getDecks().then((decks)=>{
    const newDeck =   {
        title:deckTitle,
        cards:[],
        key:`deck${decks.length+1}`
      };
    AsyncStorage.setItem(DECKS_STORAGE_KEY,JSON.stringify(
      [
        ...decks,
        newDeck
      ]
    ));
    return newDeck;
  })
)

export const addCardToDeck = (deck,card) => (
  getDecks().then((decks)=>{
    const updatedDeck = {...deck,cards:[...deck.cards,card]};
    AsyncStorage.setItem(DECKS_STORAGE_KEY,JSON.stringify(
      decks.map((elem)=>(
        elem.key===updatedDeck.key? updatedDeck:elem
      ))
    ));
    return updatedDeck;
  })
)

export const saveCardAnswered = (deck,cardIndex,correctOrIncorrect) => (
  getDecks().then((decks)=>{
    const updatedDecks = decks.map((elem)=>(
        elem.key===deck.key?{...elem,cards:elem.cards.map((card,index)=>index==cardIndex?{...card,correctOrIncorrect}:card)}:elem
    ));
    return AsyncStorage.setItem(DECKS_STORAGE_KEY,JSON.stringify(updatedDecks)).then(console.debug("saved updated deck"));
  })
)

export const saveResetCardAnswered = (deck) => (
  getDecks().then((decks)=>{
    const updatedDecks = decks.map((elem)=>(
        {...elem,cards:elem.cards.map((card)=>{
          const updatedCard = card;
          updatedCard.correctOrIncorrect=undefined;
          delete updatedCard.correctOrIncorrect;
          return updatedCard;
        })
      }
    ))
    return AsyncStorage.setItem(DECKS_STORAGE_KEY,JSON.stringify(updatedDecks));
  })
)

export const setInitialDecks = () => (
  AsyncStorage.setItem(DECKS_STORAGE_KEY,JSON.stringify(
    Array.apply("", Array(10)).map((elem,index)=>({
        title: `Auto deck_${index}`,
        key:`deck${index}`,
        cards: [
          {
            question: 'What is React?',
            answer: 'A library for managing user interfaces'
          },
          {
            question: 'Where do you make Ajax requests in React?',
            answer: 'The componentDidMount lifecycle event'
          }
        ]
    }))
  ))
)
