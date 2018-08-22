import React from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { color } from '../Style/Color'

interface IProps {
  title: string
}

const ProductSalesRecordHeader = (props: IProps): JSX.Element => {
  return (
    <View style={styles.wrapper}>
      <Text style={styles.title}>{props.title}</Text>
    </View>
  )
}

export default ProductSalesRecordHeader

const styles = StyleSheet.create({
  wrapper: {
    height: 52,
    alignItems: 'center',
    justifyContent: 'center',
    borderBottomWidth: 1,
    borderBottomColor: color.listBorderColor
  },
  title: {
    fontFamily: 'SourceSansPro',
    fontSize: 14,
    color: color.principal
  }
})
