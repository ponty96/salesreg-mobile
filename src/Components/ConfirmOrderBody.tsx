import React from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { textStyles } from '../Style/TextStyles'

interface IProp {
  data: {}[]
}

const ConfirmOrderBody = (props: IProp): any => {
  return props.data.map((item, key) => {
    const objectKey: string[] = Object.keys(item)

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
            {objectKey}:
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
            {item[objectKey[0]]}
          </Text>
        </View>
      </View>
    )
  })
}

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

export default ConfirmOrderBody
