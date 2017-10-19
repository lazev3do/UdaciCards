import {FETCHING_DECKS,RECEIVED_DECKS} from '../actions'


export default reducer = (state={isFetchingDecks:true,decks:{}},action) => {
  console.debug("reducer run");
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
    default:
      return state;
  }
}
