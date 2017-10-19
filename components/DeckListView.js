/**
todo: before mount dispatch fetching decks , show loading if fetching decks, show decks
render goes through decks on state and using flatetlist:
displays the title of each Deck
displays the number of cards in each deck
onclick TouchableOpacity call navigation.navigate and sends deck key. StackNavigator
**/
import React from 'react';
import {connect} from 'react-redux';
import { StyleSheet, Text, View, ActivityIndicator, FlatList  } from 'react-native';
import {fetchDecks} from '../actions'

class DeckListView extends React.Component {

  componentDidMount = () => {
    this.props.dispatch(fetchDecks());
  }

  render = () => {
    const props = this.props;
    console.debug(props);
    return (
    <View style={styles.container}>
      {props.isFetchingDecks
        ? <ActivityIndicator animating={true} size='large' />
      :
      <FlatList data={props.decks} renderItem={({item})=>(
        <Text>{item.title}</Text>
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
    alignItems: 'center',
    justifyContent: 'center',
  },
});

function mapStateToProps ({isFetchingDecks,decks}) {
  return {isFetchingDecks,decks};
}

export default connect(mapStateToProps)(DeckListView);
