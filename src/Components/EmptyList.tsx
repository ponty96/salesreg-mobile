import * as React from 'react'
import { StyleSheet, View, Text, Dimensions } from 'react-native'
import { color } from '../Style/Color'

interface Empty {
  Text: string
  verifyMainList?: string
}
const emptyList = (prop: { type: Empty }) => {
  if (prop.type.verifyMainList === 'main') {
    return (
      <View style={styles.view}>
        <Text style={styles.normalText}>
          Press the <Text style={styles.blueText}>blue</Text> round button to
          add {prop.type.Text}
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
        <Text>{prop.type.Text}</Text>
      </View>
    )
  }
}

export default emptyList

const styles = StyleSheet.create({
  view: {
    width: Dimensions.get('screen').width - 32,
    backgroundColor: color.grey,
    padding: 16,
    alignSelf: 'center',
    marginTop: 16,
    borderRadius: 2
  },
  normalText: {
    fontSize: 14,
    fontFamily: 'SourceSansPro'
  },
  blueText: {
    color: color.button,
    fontSize: 14,
    fontFamily: 'SourceSansPro'
  }
})
