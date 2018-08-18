import React, { Component } from 'react'
import { View, StyleSheet, Text, Alert } from 'react-native'
import ListItemAtom from '../Atom/ListItemAtom'
import CustomHeader from '../Components/CustomHeader'
import { color } from '../Style/Color'
import { Icon, Button } from 'native-base'

export default class InvoiceDetailsScreen extends Component {
  static navigationOptions = ({ navigation }) => {
    return {
      header: (
        <CustomHeader
          title="Invoice"
          onBackPress={() => navigation.goBack()}
          showRight
          firstRightIcon="credit-card"
          firstRightIconType="MaterialCommunityIcons"
          rightText="Pay"
          onPressRightButton={() => Alert.alert('Pay button pressed.')}
        >
          <Button
            transparent={true}
            onPress={() => Alert.alert('Clicked on edit.')}
            style={styles.rightWrapper}
          >
            <Icon
              name="pencil"
              type="MaterialCommunityIcons"
              style={styles.whiteIcon}
            />
            <Text style={styles.edit}>Edit</Text>
          </Button>
        </CustomHeader>
      )
    }
  }

  render() {
    return (
      <View style={styles.container}>
        <ListItemAtom
          label="INVOICE ID"
          value="#00023"
          labelStyle={styles.listLabel}
          rightTextStyle={styles.transactionID}
        />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: color.secondary
  },
  listLabel: {
    color: color.principal
  },
  transactionID: {
    color: color.principal,
    fontFamily: 'SourceSansPro_Semibold'
  },
  rightWrapper: {
    flexDirection: 'row',
    marginRight: 0
  },
  whiteIcon: {
    color: color.secondary,
    width: 25,
    left: 20
  },
  edit: {
    fontFamily: 'SourceSansPro',
    color: color.secondary,
    alignSelf: 'center',
    fontSize: 14,
    marginLeft: 8
  }
})
