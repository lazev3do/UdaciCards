/*getDecks: return all of the decks along with their titles, questions, and answers.
getDeck: take in a single id argument and return the deck associated with that id.
saveDeckTitle: take in a single title argument and add it to the decks.
addCardToDeck: take in two arguments, title and card, and will add the card to the list of questions for the deck with the associated title. */

import {AsyncStorage} from 'react-native';

const DECKS_STORAGE_KEY = 'UdaciCards:decks';

export const getDeck =(deckId) => (
  AsyncStorage.getItem(DECKS_STORAGE_KEY)
  .then(JSON.parse)
  .then(json=>json[deckId])
)

export const getDecks = () => (
  AsyncStorage.getItem(DECKS_STORAGE_KEY)
  .then(JSON.parse)
)

export const saveDeckTitle = (deckTitle) => (
  getDecks().then((decks)=>(
    AsyncStorage.setItem(DECKS_STORAGE_KEY,JSON.stringify(
      {
        ...decks,
        [deckTitle]:
        {
          title:deckTitle,
          cards:[]
        }
      }
    ))
  ))
)

export const addCardToDeck = (deckTitle,card) => (
  getDecks().then((decks)=>(
    AsyncStorage.setItem(DECKS_STORAGE_KEY,JSON.stringify(
      {
        ...decks,
        [deckTitle]:
        {
          ...decks[deckTitle],
          cards:[
            ...decks[deckTitle].cards,
            card
          ]
        }
      }
    ))
  ))
)

export const setInitialDecks = () => (
  AsyncStorage.setItem(DECKS_STORAGE_KEY,JSON.stringify(
    [
      {
        title: 'React',
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
      },
      {
        title: 'JavaScript',
        cards: [
          {
            question: 'What is a closure?',
            answer: 'The combination of a function and the lexical environment within which that function was declared.'
          }
        ]
      }
    ]
  ))
)
