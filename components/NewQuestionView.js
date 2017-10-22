/**
An option to enter in the question
An option to enter in the answer
An option to submit the new question**/
import React from 'react';
import { StyleSheet, Text, View,TextInput,Platform,Button,KeyboardAvoidingView,ActivityIndicator,Alert } from 'react-native';
import * as colors from '../utils/colors'
import {addCardToDeck} from '../utils/api'
import { NavigationActions } from 'react-navigation'
import {connect} from 'react-redux';
import {fetchDeck,fetchDecks} from '../actions'



class NewQuestionView extends React.Component {

  state = {
    question:'',
    answer:'',
    isAddingCard:false
  }

  static navigationOptions = () => {
    return {
      title: 'Add Card'
    }
  }

  submitCard = () => {
    const {question,answer} = this.state;
    const deck = this.props.presentDeck;
    if(question && answer)
    {
      this.setState({
        isAddingCard:true
      });
      addCardToDeck(deck,{question,answer}).then((updatedDeck)=>{
        this.props.dispatch(fetchDeck(deck.key));
        this.props.dispatch(fetchDecks());
        this.setState({
          isAddingCard:false,
          question:'',
          answer:''
        });
        this.props.navigation.goBack();
      })
    }
    else {
      Alert.alert('Both question and answer must be filled');
    }
  }

  render () {
    return (
      <KeyboardAvoidingView style={styles.container} behavior='padding'>
        <Text style={{fontSize:30,fontWeight:'bold'}}>New Card</Text>
        <TextInput placeholder='Question' style={styles.input} value={this.state.question} onChangeText={(question)=>{this.setState({question})}} />
        <TextInput placeholder='Answer' style={styles.input} value={this.state.answer} onChangeText={(answer)=>{this.setState({answer})}} />
          {this.state.isAddingCard
          ?<ActivityIndicator animating={true} size='large' />
        :<Button title='Submit' onPress={this.submitCard}
              style={styles.btn}>
            </Button>
        }
      </KeyboardAvoidingView>
    )
  }
}

const mapStateToProps = ({presentDeck})=>(
  {presentDeck}
)

export default connect(mapStateToProps)(NewQuestionView);
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
  },
  input: {
    padding:8,
    height:44,
    margin:20,
    width:'80%',
    borderWidth:1,
    borderColor:colors.black
  },
});
