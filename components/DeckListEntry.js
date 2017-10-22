import React from 'react';
import { StyleSheet, Text, View, ActivityIndicator, FlatList,StackNavigator,TouchableHighlight,TouchableOpacity,Animated   } from 'react-native';
import * as colors from '../utils/colors'


export default class DeckListEntry extends React.Component {
  state = {
    bounceValue: new Animated.Value(1)
  }

  openDeck = (deck) => {
    const {bounceValue} = this.state;
    Animated.sequence([
      Animated.timing(bounceValue, { duration: 200, toValue: 1.5,useNativeDriver:true}),
      Animated.spring(bounceValue, { toValue: 1, friction: 4,useNativeDriver:true})
    ]).start(()=>{
      this.props.navigation.navigate(
        'DeckView',
        deck
      );
    });
  }

  render = () => {
    const {item} = this.props;
    const {bounceValue} = this.state;
    return (
    <View style={{margin:10,borderBottomWidth:1,borderColor:colors.black,paddingBottom:10}}>
      <TouchableOpacity style={{transform:[{scale:bounceValue}]}} onPress={()=>{this.openDeck(item)}}>
        <Text style={{textAlign:'center',fontWeight:'bold'}}>{item.title}</Text>
        <Text style={{textAlign:'center'}}>{item.cards.length} cards</Text>
        </TouchableOpacity>
    </View>
  )
  }
}
