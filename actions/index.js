import {getDecks} from '../utils/api'
export const FETCHING_DECKS = 'FETCHING_DECKS';
export const RECEIVED_DECKS = 'RECEIVED_DECKS';

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
