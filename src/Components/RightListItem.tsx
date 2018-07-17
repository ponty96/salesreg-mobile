import React from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { Icon } from 'native-base'
import { color } from '../Style/Color'

interface IProp {
  singleRightText?: string
  oneRightComponent?: boolean
  rightIcon?: boolean
}

const RightListItem = (props: IProp): JSX.Element => {
  return (
    <View style={styles.container}>
      {props.oneRightComponent ? (
        props.rightIcon ? (
          <View style={styles.rightView}>
            <Text style={[styles.text, styles.rightText]}>
              {props.singleRightText}
            </Text>
            <Icon
              name="chevron-small-right"
              type="Entypo"
              style={{ color: color.button }}
            />
          </View>
        ) : (
          <Text style={[styles.text, styles.rightText, styles.singleRightText]}>
            {props.singleRightText}
          </Text>
        )
      ) : (
        <View
          style={{
            alignSelf: 'stretch',
            justifyContent: 'center'
          }}
        >
          <Text
            style={[
              styles.text,
              styles.rightText,
              { flex: 0, marginVertical: 8 }
            ]}
          >
            4
          </Text>
          <Text style={[styles.text, styles.rightText, styles.bottomText]}>
            {'\u20A6 '}1,500.00
          </Text>
        </View>
      )}
    </View>
  )
}

export default RightListItem

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  text: {
    fontFamily: 'SourceSansPro',
    fontSize: 14,
    color: color.principal,
    flex: 1
  },
  rightText: {
    textAlign: 'right',
    marginVertical: 32
  },
  rightView: {
    flexDirection: 'row',
    flex: 1,
    alignItems: 'center'
  },
  bottomText: {
    marginTop: 3,
    flex: 0,
    color: color.selling,
    marginBottom: 8
  },
  singleRightText: {
    flex: 0,
    marginVertical: 16
  }
})
