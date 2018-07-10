import React from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { Radio } from 'native-base'
import { color } from '../Style/Color'

interface IProps {
  title: string
  indicatorColor: object
}

const selectStatusAtom = (props: IProps): JSX.Element => {
  return (
    <View style={styles.wrapper}>
      <Radio selected={true} style={styles.radio} />
      <Text style={styles.text}>{props.title}</Text>
      <View style={[styles.indicator, props.indicatorColor]} />
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
    marginHorizontal: 16,
    height: 64,
    alignItems: 'center'
  },
  text: {
    marginLeft: 16,
    color: color.principal,
    fontFamily: 'SourceSansPro',
    fontSize: 14
  },
  indicator: {
    width: 5,
    position: 'absolute',
    right: 0,
    height: 64
  },
  radio: {
    marginLeft: 16
  }
})
