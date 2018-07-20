import React from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { textStyles } from '../Style/TextStyles'

interface IProp {
  data: any
}

const ConfirmOrderBody = (props: IProp): any => {
  return Object.keys(props.data).map((item, key) => {
    const values: string[] = Object.values(props.data)

    return (
      <View style={styles.wrapper} key={key}>
        <View style={styles.textWrapper}>
          <Text
            style={[
              textStyles.normalText,
              textStyles.blueText,
              styles.leftText
            ]}
          >
            {item}:
          </Text>
        </View>
        <View style={styles.textWrapper}>
          <Text
            style={[
              textStyles.boldText,
              textStyles.greenText,
              styles.rightText
            ]}
          >
            {key !== 0 ? '\u20A6 ' : ''}
            {values[key]}
          </Text>
        </View>
      </View>
    )
  })
}

export default ConfirmOrderBody

const styles = StyleSheet.create({
  wrapper: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%'
  },
  leftText: {
    alignItems: 'baseline',
    textAlign: 'right'
  },
  textWrapper: {
    flex: 1
  },
  rightText: {
    textAlign: 'left',
    marginLeft: 16
  }
})
