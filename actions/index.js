import {getDecks,getDeck,saveCardAnswered,saveResetCardAnswered} from '../utils/api'
export const FETCHING_DECKS = 'FETCHING_DECKS';
export const RECEIVED_DECKS = 'RECEIVED_DECKS';
export const RECEIVED_DECK = 'RECEIVED_DECK';
export const FETCHING_DECK = 'FETCHING_DECK';
export const MARKING_CARD = 'MARKING_CARD';
export const MARKED_CARD = 'MARKED_CARD';

export const fetchDecks = () => dispatch => {
    dispatch(fetchingDecks());
    getDecks().then(decks => dispatch(receivedDecks(decks)));
}

export const fetchingDecks = ()=>({
  type:FETCHING_DECKS
})

export const receivedDecks = (decks)=>({
  type: RECEIVED_DECKS,
  decks
})

export const fetchDeck = (deckKey) => (dispatch) => {
  dispatch(fetchingDeck());
  getDeck(deckKey).then((deck)=>{
    console.debug("got deck");
    dispatch(receivedDeck(deck))
  })
}

export const fetchingDeck = ()=>({
  type:FETCHING_DECK
})

export const receivedDeck = (deck)=>({
  type: RECEIVED_DECK,
  deck
})

export const markCardAnswered = (deck,cardIndex,correctOrIncorrect) => (dispatch) => {
  dispatch(markingCard());
  saveCardAnswered(deck,cardIndex,correctOrIncorrect).then(()=>{
    dispatch(markedCard());
    dispatch(fetchDeck(deck.key));
  });
}

export const markingCard = () =>({
  type:MARKING_CARD
})

export const markedCard = () =>({
  type:MARKED_CARD
})

export const resetCardAnswered = (deck) => (dispatch) => {
  dispatch(markingCard());
  saveResetCardAnswered(deck).then(()=>{
    dispatch(markedCard());
    dispatch(fetchDeck(deck.key));
  });
}
