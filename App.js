import React from 'react';
import { StyleSheet, Text, View,Platform,StatusBar  } from 'react-native';
import {createStore, applyMiddleware} from 'redux';
import {Provider} from 'react-redux'
import thunk from 'redux-thunk';
import reducer from './reducers'
import {setInitialDecks,getDecks,getDeck} from './utils/api'
import {TabNavigator,StackNavigator} from 'react-navigation'
import DeckListView from './components/DeckListView'
import DeckView from './components/DeckView'
import NewDeck from './components/NewDeck'
import NewQuestionView from './components/NewQuestionView'
import QuizView from './components/QuizView'
import * as colors from './utils/colors'
import { MaterialIcons, Ionicons } from '@expo/vector-icons'
import {Constants} from 'expo'
import {setLocalNotification,clearLocalNotification} from './utils/helpers'


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
    header: null
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

  const MainNavigator = StackNavigator({
    Home : {
      screen:Tabs,
      navigationOptions:{
        title:'Home'
      }
    },
    DeckView : {
      screen:DeckView,
      navigationOptions : {
        headerTintColor: colors.white,
          headerStyle: {
          backgroundColor: colors.black,
        }
      }
    },
    NewQuestionView : {
      screen:NewQuestionView,
      navigationOptions : {
        headerTintColor: colors.white,
          headerStyle: {
          backgroundColor: colors.black,
        }
      }
    },
    QuizView : {
      screen:QuizView,
      navigationOptions : {
        headerTintColor: colors.white,
          headerStyle: {
          backgroundColor: colors.black,
        }
      }
    }

  })

const store = createStore(reducer,applyMiddleware(thunk));
export default class App extends React.Component {
  constructor (props){
    super(props);
    setInitialDecks();
  }

  componentDidMount = () => {
  //  getDecks().then(decks => this.setState(decks));
    setLocalNotification();
  }
  render() {
    return (
      <Provider store={store}>
        <View style={{flex:1}}>
          <View style={{height:Constants.statusBarHeight}}>
            <StatusBar translucent />
          </View>
          <MainNavigator />
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
