import {FETCHING_DECKS,RECEIVED_DECKS,RECEIVED_DECK,FETCHING_DECK,MARKING_CARD,MARKED_CARD} from '../actions'


export default reducer = (state={isFetchingDecks:true,decks:{},isFetchingDeck:true,presentDeck:{}},action) => {
  switch (action.type) {
    case FETCHING_DECKS:
    return {
      ...state,
      isFetchingDecks:true
    }
    case RECEIVED_DECKS:
    return {
      ...state,
      isFetchingDecks:false,
      decks:action.decks
    }
    case FETCHING_DECK:
    return {
      ...state,
      isFetchingDeck:true
    }
    case RECEIVED_DECK:
    return {
      ...state,
      isFetchingDeck:false,
      presentDeck:action.deck[0]
    }
    case MARKING_CARD:
    return {
      ...state,
      markingCard:true
    }
    case MARKED_CARD:
    return {
      ...state,
      markingCard:false
    }
    default:
      return state;
  }
}
