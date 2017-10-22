/**
Deck View:
displays the title of the Deck
displays the number of cards in the deck
displays an option to start a quiz on this specific deck
An option to add a new question to the deck
two buttons Add card, Start quiz
navigate**/

/**An option to enter in the title for the new deck
An option to submit the new deck title**/

import React from 'react';
import { StyleSheet, Text,TouchableOpacity, View,TextInput,Platform,Button,KeyboardAvoidingView,ActivityIndicator } from 'react-native';
import * as colors from '../utils/colors'
import {connect} from 'react-redux'
import {fetchDeck} from '../actions'

class DeckView extends React.Component {

  static navigationOptions = ({ navigation }) => {
    const deck  = navigation.state.params;
    return {
      title: deck.title
    }
  }

  componentDidMount = () =>{
    this.props.dispatch(fetchDeck(this.props.navigation.state.params.key));
  }

  handleAddCard = () => {
    this.props.navigation.navigate(
      'NewQuestionView'
    );
  }

  handleStartQuiz = () => {
    this.props.navigation.navigate(
      'QuizView',{cardIndex:0}
    );
  }

  render () {
    const deck  = this.props.presentDeck;
    return (
      <View style={styles.container}>
        {
          this.props.isFetchingDeck ? <ActivityIndicator animating={true} size='large' />
        :
        <View style={styles.container}>
          <Text style={{fontSize:30,fontWeight:'bold',color:colors.black}}>{deck.title}</Text>
          <Text style={{color:colors.gray}}>{deck.cards.length} cards</Text>
          <TouchableOpacity style={[styles.addBtn,styles.btn]} onPress={this.handleAddCard}>
              <Text style={{color:colors.black}}>Add Card</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={this.handleStartQuiz} style={[styles.quizBtn,styles.btn]}>
              <Text style={{color:colors.white}}>Start Quiz</Text>
          </TouchableOpacity>
        </View>
        }
      </View>

    )
  }
}

mapStateToProps = ({isFetchingDeck,presentDeck})=>(
  {isFetchingDeck,presentDeck}
)

export default connect(mapStateToProps)(DeckView);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent:'center',
    alignItems:'center'
  },
  btn:{
    alignItems:'center',
    justifyContent:'center',
    padding: 10,
    borderRadius: 7,
    height: 45,
    margin: 40,
  },
  quizBtn: {
    backgroundColor: colors.gray,
  },
  addBtn:{
    backgroundColor: colors.white,
    borderWidth:2,
    borderRadius:2
  }
});
