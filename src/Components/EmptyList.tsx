import * as React from 'react'
import { StyleSheet, View, Text } from 'react-native'
import { color } from '../Style/Color'

interface Empty {
  Text?: string
  verifyMainList?: string
  style?: any
  headerText?: string
  body?: any
}

const emptyList = (prop: { type: Empty }) => {
  if (prop.type.verifyMainList === 'main') {
    return (
      <View style={styles.view}>
        <Text style={styles.headerText}>{prop.type.headerText}</Text>
        <Text style={styles.normalText}>
          {prop.type.Text}{' '}
          <Text style={styles.blueText}>blue round button</Text>
        </Text>
      </View>
    )
  } else if (prop.type.verifyMainList === 'employee') {
    return (
      <View>
        <Text>
          No employees. Press the <Text>blue</Text> button to {prop.type.Text}
        </Text>
      </View>
    )
  } else {
    return (
      <View style={styles.view}>
        <Text style={styles.headerText}>{prop.type.headerText}</Text>
        {prop.type.Text && (
          <Text style={styles.normalText}>{prop.type.Text}</Text>
        )}
        {prop.type.body}
      </View>
    )
  }
}

export default emptyList

const styles = StyleSheet.create({
  view: {
    padding: 16,
    marginVertical: 16,
    borderRadius: 2
  },
  headerText: {
    fontSize: 22,
    fontFamily: 'AvenirNext-DemiBold',
    marginBottom: 16
  },
  normalText: {
    fontSize: 18,
    fontFamily: 'AvenirNext-Medium',
    color: color.principal
  },
  blueText: {
    color: color.button,
    fontSize: 18,
    fontFamily: 'AvenirNext-Medium'
  }
})
