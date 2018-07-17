import * as React from 'react'
import { ScrollView, /*Text,*/ StyleSheet } from 'react-native'
import CustomHeader from '../Components/CustomHeader'
// import ListItemContainer from '../Container/ListItemContainer'
import { color } from '../Style/Color'
// import RightListItem from '../Components/RightListItem'
import ListItemAtom from '../Atom/ListItemAtom'

interface IProps {
  navigation: any
}

export default class SalesOrderScreen extends React.Component<IProps> {
  static navigationOptions = ({ navigation }: any) => {
    return {
      header: (
        <CustomHeader
          title="Sales order details"
          showRight
          firstRightIcon="pencil"
          firstRightIconType="MaterialCommunityIcons"
          onPressRightButton={() => console.log('Edit pressed.')}
          rightText="Edit"
          onBackPress={() => navigation.goBack()}
        />
      )
    }
  }

  render() {
    return (
      <ScrollView style={styles.container}>
        <ListItemAtom
          label="Agent"
          value="Ademola Dike"
          labelStyle={{ color: color.black }}
          rightTextStyle={{ color: color.black }}
        />
        <ListItemAtom
          label="Agent"
          value="Ademola Dike"
          labelStyle={{ color: color.black }}
          rightTextStyle={{ color: color.black }}
        />
        <ListItemAtom
          label="Agent"
          value="Ademola Dike"
          labelStyle={{ color: color.black }}
          rightTextStyle={{ color: color.black }}
        />
      </ScrollView>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: color.secondary
  },
  text: {
    fontFamily: 'SourceSansPro',
    fontSize: 14,
    color: color.principal,
    flex: 1
  }
})
