import * as React from 'react'
import { StyleSheet, View } from 'react-native'

import { DemiBoldText, MediumText, RegularText } from '../Atom/TextAtom'
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
        <DemiBoldText style={styles.headerText}>
          {prop.type.headerText}
        </DemiBoldText>
        <MediumText style={styles.normalText}>
          {prop.type.Text}{' '}
          <MediumText style={styles.blueText}>blue round button</MediumText>
        </MediumText>
      </View>
    )
  } else if (prop.type.verifyMainList === 'employee') {
    return (
      <View>
        <RegularText>
          No employees. Press the <RegularText>blue</RegularText> button to{' '}
          {prop.type.Text}
        </RegularText>
      </View>
    )
  } else {
    return (
      <View style={styles.view}>
        <DemiBoldText style={styles.headerText}>
          {prop.type.headerText}
        </DemiBoldText>
        {prop.type.Text && (
          <MediumText style={styles.normalText}>{prop.type.Text}</MediumText>
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
