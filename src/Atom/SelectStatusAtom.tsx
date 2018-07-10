import React from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { Radio } from 'native-base'
import { color } from '../Style/Color'

interface IProps {
  title: string
}

const selectStatusAtom = (props: IProps): JSX.Element => {
  return (
    <View style={styles.wrapper}>
      <Radio selected={true} />
      <Text style={styles.text}>{props.title}</Text>
    </View>
  )
}

export default selectStatusAtom

const styles = StyleSheet.create({
  wrapper: {
    flexDirection: 'row',
    borderWidth: 1,
    borderColor: color.listBorderColor,
    marginBottom: 8,
    backgroundColor: color.grey,
    marginLeft: 16
  },
  text: {
    marginLeft: 16
  }
})
