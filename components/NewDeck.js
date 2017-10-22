/**An option to enter in the title for the new deck
An option to submit the new deck title**/

import React from 'react';
import {connect} from 'react-redux';
import { StyleSheet, Text, View,TextInput,Platform,Button,KeyboardAvoidingView,ActivityIndicator,Alert } from 'react-native';
import * as colors from '../utils/colors'
import {saveDeckTitle} from '../utils/api'
import {fetchDecks} from '../actions'

class NewDeck extends React.Component {
  state = {
    deckTitle: '',
    isAddingDeck:false
  }

  handleTextChange = (deckTitle) => {
    this.setState({
      deckTitle
    })
  };

  submitNewDeck = (name) => {
    if(name)
    {
      this.setState({
        isAddingDeck:true
      });
      saveDeckTitle(name).then((deck)=>{
        this.setState({
          isAddingDeck:false,
          deckTitle:''
        });
        this.props.dispatch(fetchDecks());
        this.props.navigation.navigate('DeckView',deck);
      })
    }
    else {
      Alert.alert('Required deck title');
    }
  }
  render = () => (
    <KeyboardAvoidingView style={styles.container} behavior='padding'>
      <Text style={{fontSize:20,fontWeight:'bold'}}>What is the title of your new Deck?</Text>
      <TextInput style={styles.input} value={this.state.deckTitle} onChangeText={this.handleTextChange} />
        {this.state.isAddingDeck
        ?<ActivityIndicator animating={true} size='large' />
      :<Button title='Create Deck' onPress={()=>{this.submitNewDeck(this.state.deckTitle)}}
            style={styles.submitBtn}>
          </Button>
      }
    </KeyboardAvoidingView>
  )
}

export default connect()(NewDeck);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  input: {
    padding:8,
    height:44,
    margin:20,
    width:'80%',
    borderWidth:1,
    borderColor:colors.black
  },
  submitBtn: {
    backgroundColor: colors.black,
    padding: 10,
    borderRadius: 7,
    height: 45,
    marginLeft: 40,
    marginRight: 40,
    width:200
  },
  submitBtnText: {
    color: colors.white,
    fontSize: 22,
    height:10,
    textAlign: 'center',
  }
});
