import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

import NameDisplayAtom from '../Atom/NameDisplayAtom';
import DetailsAtom from '../Atom/DetailsAtom';

export default class ViewBusinessDetailScreen extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <View style = {styles.nameDisplay}>
          <NameDisplayAtom />
        </View>
        <View style = {styles.detailsAtom}>
          <DetailsAtom />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  nameDisplay: {
    borderBottomWidth: 1,
    borderBottomColor: 'lightgrey',
    paddingBottom: 40,
    paddingTop: 30,
    paddingHorizontal: 40
  },
});
