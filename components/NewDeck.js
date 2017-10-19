/**An option to enter in the title for the new deck
An option to submit the new deck title**/

import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

export default class NewDeck extends React.Component {
  render = () => (
    <View style={styles.container}>
      <Text>New Deck</Text>
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
});
