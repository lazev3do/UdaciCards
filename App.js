import React from 'react';
import { StyleSheet, Text, View,Platform  } from 'react-native';
import {createStore, applyMiddleware} from 'redux';
import {Provider} from 'react-redux'
import thunk from 'redux-thunk';
import reducer from './reducers'
import {setInitialDecks,getDecks,getDeck} from './utils/api'
import {TabNavigator} from 'react-navigation'
import DeckListView from './components/DeckListView'
import NewDeck from './components/NewDeck'
import * as colors from './utils/colors'
import { MaterialIcons, Ionicons } from '@expo/vector-icons'

const Tabs = TabNavigator({
    Decks:{
      screen: DeckListView,
      navigationOptions: {
        tabBarLabel: 'Decks',
        tabBarIcon: Platform.OS==='ios'?<Ionicons name='ios-list-outline' size={30} color={colors.black} />:<MaterialIcons name='list' size={30} color={colors.black} />
      }
    },
    NewDeck : {
      screen: NewDeck,
      navigationOptions: {
        tabBarLabel: 'New Deck',
        tabBarIcon: <Ionicons name={Platform.OS==='ios'?'ios-add-outline':'md-add'} size={30} color={colors.black} />
      }
    }
  },
  {
  navigationOptions: {
    header: 'test'
   },
  tabBarOptions: {
    activeTintColor: Platform.OS === 'ios' ? colors.purple : colors.white,
    style: {
      height: 56,
      backgroundColor: Platform.OS === 'ios' ? colors.white : colors.purple,
      shadowColor: 'rgba(0, 0, 0, 0.24)',
      shadowOffset: {
        width: 0,
        height: 3
      },
      shadowRadius: 6,
      shadowOpacity: 1
    }
  }
}
  );

const store = createStore(reducer,applyMiddleware(thunk));
export default class App extends React.Component {
  constructor (props){
    super(props);
    setInitialDecks();
  }

  componentDidMount = () => {
  //  getDecks().then(decks => this.setState(decks));
  }
  render() {
    return (
      <Provider store={store}>
        <View style={{flex:1}}>
          <Tabs />
        </View>
      </Provider>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
