/**An option to enter in the title for the new deck
An option to submit the new deck title**/

import React from 'react';
import { StyleSheet, Text, View,TextInput,Platform,TouchableOpacity,Button } from 'react-native';
import * as colors from '../utils/colors'

export default class NewDeck extends React.Component {
  state = {
    deckTitle: ''
  }

  handleTextChange = (deckTitle) => {
    this.setState(()=>({
      deckTitle
    }))
  }

  render = () => (
    <View style={styles.container}>
      <Text style={{fontSize:20,fontWeight:'bold'}}>What is the title of your new Deck?</Text>
      <TextInput style={styles.input} value={this.state.deckTitle} onChangeText={this.handleTextChange} />
        <Button title='Submit'
          style={styles.submitBtn}>
        </Button>
    </View>
  )
}

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
    borderWidth:1,
    margin:20,
    width:'80%'
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
