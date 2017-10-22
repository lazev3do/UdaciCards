/*displays a card question
an option to view the answer (flips the card)
a "Correct" button
an "Incorrect" button
the number of cards left in the quiz
Displays the percentage correct once the quiz is complete*/

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
import {markCardAnswered,resetCardAnswered} from '../actions'

class QuizView extends React.Component {

  state = {
    seeAnswer:false,
    waitingForDeckFetched:false
  }

  static navigationOptions = ({ navigation }) => {
    return {
      title: 'Quiz'
    }
  }

  handleShowAnserQuestion = () =>{
    this.setState((prevState)=>({
      seeAnswer:!prevState.seeAnswer
    }))
  }

  handleAnswer = (correctOrIncorrect,cardIndex) => {
    this.props.dispatch(markCardAnswered(this.props.presentDeck,cardIndex,correctOrIncorrect));
    this.goToNext(cardIndex);
  }

  goToNext = (presentIndex) => {
    this.setState({seeAnswer:false});
    this.props.navigation.navigate(
      'QuizView',{cardIndex:presentIndex+1}
    );
  }

  restartQuiz = () => {
    this.props.dispatch(resetCardAnswered(this.props.presentDeck));
    this.setState({waitingForDeckFetched:true});
  }

  componentWillReceiveProps = (nextProps) => {
    if(this.props.isFetchingDeck===true && nextProps.isFetchingDeck===false && this.state.waitingForDeckFetched)
    {
      this.setState({waitingForDeckFetched:false});
      this.props.navigation.navigate(
        'QuizView',{cardIndex:0}
      );
    }
  }

  render () {
    const {cardIndex} = this.props.navigation.state.params;
    const {presentDeck,markingCard} = this.props;
    const {seeAnswer} = this.state;

    if(cardIndex>0 && cardIndex>=presentDeck.cards.length)
    {
      return(
        <View style={styles.container}>
          <Text style={{fontSize:30,fontWeight:'bold'}}>Score: {presentDeck.cards.reduce((accumulator,currentValue)=>(
            currentValue.correctOrIncorrect && currentValue.correctOrIncorrect==='Correct' ? accumulator+1:accumulator
          ),0)}/{presentDeck.cards.length}</Text>
          <View style={{flexDirection:'row',justifyContent:'space-between',alignItems:'center'}}>
            {markingCard
            ?<ActivityIndicator animating={true} size='large' />
            :<TouchableOpacity onPress={this.restartQuiz} style={[styles.btn,{backgroundColor:colors.gray}]}>
              <Text style={{color:colors.white}}>Restart Quiz</Text>
            </TouchableOpacity>
            }
            <TouchableOpacity onPress={()=>{this.props.navigation.navigate('DeckView',presentDeck)}} style={[styles.btn,{backgroundColor:colors.gray}]}>
              <Text style={{color:colors.white}}>Back to Deck</Text>
            </TouchableOpacity>
          </View>
        </View>
      )
    }
    else {
      return (
        <View style={{flex:1}}>
        {presentDeck.cards.length
        ?
        <View style={{flex:1}}>
          <View style={{flex:1,justifyContent:'flex-start',alignItems:'flex-start'}}>
            <Text>{`${cardIndex+1}/${presentDeck.cards.length}`}</Text>
          </View>
          <View style={{flex:2,justifyContent:'flex-start',alignItems:'center'}}>
            {seeAnswer
            ?<Text style={{fontSize:25,fontWeight:'bold'}}>{presentDeck.cards[cardIndex].answer}</Text>
            :<Text style={{fontSize:25,fontWeight:'bold'}}>{presentDeck.cards[cardIndex].question}</Text>
            }
            <TouchableOpacity onPress={this.handleShowAnserQuestion}>
              <Text style={{color:colors.red,fontSize:15}}>{seeAnswer?'Question':'Answer'}</Text>
            </TouchableOpacity>
            {
              presentDeck.cards[cardIndex].correctOrIncorrect
              ?
                <View>
                  <Text>This question has been already answered and is {presentDeck.cards[cardIndex].correctOrIncorrect}</Text>
                  <TouchableOpacity style={[styles.btn,{backgroundColor:colors.gray}]} onPress={()=>{this.goToNext(cardIndex)}}>
                    <Text style={{color:colors.white}}>Next</Text>
                  </TouchableOpacity>
                </View>
              :
              <View>
              {markingCard
              ? <ActivityIndicator animating={true} size='large' />
              :
              <View>
                <TouchableOpacity onPress={()=>this.handleAnswer('Correct',cardIndex)} style={[styles.btn,{backgroundColor:colors.green}]}>
                  <Text style={{color:colors.white}}>Correct</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={()=>this.handleAnswer('Incorrect',cardIndex)} style={[styles.btn,{backgroundColor:colors.red}]}>
                  <Text style={{color:colors.white}}>Incorrect</Text>
                </TouchableOpacity>
              </View>
              }
              </View>
            }

          </View>
        </View>
        :<View style={styles.container}>
            <Text>No available cards</Text>
          </View>
        }
      </View>
      )
    }

  }
}

mapStateToProps = ({presentDeck,markingCard,isFetchingDeck})=>{
  return   {presentDeck,markingCard,isFetchingDeck};
}

export default connect(mapStateToProps)(QuizView);

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
