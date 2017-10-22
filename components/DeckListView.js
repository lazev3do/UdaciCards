/**
todo: before mount dispatch fetching decks , show loading if fetching decks, show decks
render goes through decks on state and using flatetlist:
displays the title of each Deck
displays the number of cards in each deck
onclick TouchableOpacity call navigation.navigate and sends deck key. StackNavigator
**/
import React from 'react';
import {connect} from 'react-redux';
import { StyleSheet, Text, View, ActivityIndicator, FlatList,StackNavigator,TouchableHighlight,TouchableOpacity,Animated   } from 'react-native';
import {fetchDecks} from '../actions'
import * as colors from '../utils/colors'
import DeckListEntry from './DeckListEntry'

class DeckListView extends React.Component {

  componentDidMount = () => {
    this.props.dispatch(fetchDecks());
  }

  render = () => {
    const props = this.props;
    return (
    <View style={styles.container}>
      {props.isFetchingDecks
        ? <ActivityIndicator animating={true} size='large' />
      :
      <FlatList contentContainerStyle={{borderBottomWidth: 0,alignItems: 'stretch',justifyContent: 'space-around'}} ItemSeparatorComponent={()=><View style={{marginLeft: "14%",height: 2,width: "100%",backgroundColor: colors.black}} />} data={props.decks} keyExtractor={item=>item.key} renderItem={({item})=>(
          <DeckListEntry {...props} item={item} />
        )}
      />
      }
    </View>
    )
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',

  },
});

function mapStateToProps ({isFetchingDecks,decks}) {
  return {isFetchingDecks,decks};
}

export default connect(mapStateToProps)(DeckListView);
