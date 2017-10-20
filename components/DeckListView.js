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
      <FlatList contentContainerStyle={{alignItems: 'center',justifyContent: 'space-around',flex:1}} ItemSeparatorComponent={()=><View style={{height: 1,width: "100%",backgroundColor: "#CED0CE"}} />} data={props.decks} keyExtractor={item=>item.title} renderItem={({item})=>(
        <View>
          <Text style={{textAlign:'center',fontWeight:'bold'}}>{item.title}</Text>
          <Text style={{textAlign:'center'}}>{item.cards.length} cards</Text>
        </View>
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
