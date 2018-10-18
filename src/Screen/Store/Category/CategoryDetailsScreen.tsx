import React from 'react'
import Header from '../../../Components/Header/DetailsScreenHeader'
import { GreenCanvas } from '../../../Atom/GreenCanvas'
import { StyleSheet, View } from 'react-native'
import { color } from '../../../Style/Color'
import ExpandableListItemAtom from '../../../Atom/ListItem/ExpandableListItemAtom'

interface IProps {
  navigation: any
}
export default class CategoryDetailsScreen extends React.PureComponent<IProps> {
  static navigationOptions = ({ navigation }: any) => {
    const expense = navigation.getParam('category', {})
    return {
      header: (
        <Header
          title="Category Details"
          onPressLeftIcon={() => navigation.goBack()}
          onPressRightIcon={() =>
            navigation.navigate('UpsertCategory', { expense })
          }
        />
      )
    }
  }

  render() {
    const category = this.props.navigation.getParam('category', {})
    return (
      <View style={styles.container}>
        <GreenCanvas title={category.title} />
        <ExpandableListItemAtom section="Title" value={category.title} />
        <ExpandableListItemAtom
          section="Description"
          value={category.description ? [category.description] : null}
        />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    flex: 1
  },
  listLabel: {
    color: color.textColor,
    marginLeft: 2,
    fontFamily: 'AvenirNext-Regular'
  },
  listWrapper: {
    borderBottomColor: color.listBorderColor,
    borderBottomWidth: 1,
    paddingLeft: 24,
    paddingRight: 24
  },
  greenText: {
    color: color.selling,
    fontFamily: 'AvenirNext-Regular'
  }
})
