import * as React from 'react'
import { View, Text, StyleSheet } from 'react-native'
import CustomHeader from '../Components/CustomHeader'
import ListItemContainer from '../Container/ListItemContainer'
import { color } from '../Style/Color'

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
      <View style={styles.container}>
        <ListItemContainer>
          <Text style={styles.text}>Agent</Text>
          <Text style={[styles.text, { textAlign: 'right' }]}>
            Ademola Dike
          </Text>
        </ListItemContainer>
      </View>
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
