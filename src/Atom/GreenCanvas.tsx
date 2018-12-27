import React from 'react'
import { View, StyleSheet, Text } from 'react-native'
import { color } from '../Style/Color'

interface CanvasProps {
  title: string
  subText?: string
  hideNairaSymbolInGreenCanvas?: boolean
}

export const GreenCanvas = (props: CanvasProps) => (
  <View style={styles.detailsHeader}>
    <Text style={styles.title}>{props.title}</Text>
    {props.subText && (
      <Text style={styles.amount}>
        {props.hideNairaSymbolInGreenCanvas
          ? props.subText
          : `\u20A6 ${props.subText}`}
      </Text>
    )}
  </View>
)

const styles = StyleSheet.create({
  detailsHeader: {
    backgroundColor: color.amountSummaryBg,
    paddingVertical: 32,
    justifyContent: 'center',
    alignItems: 'center'
  },
  title: {
    fontSize: 18,
    fontFamily: 'AvenirNext-Medium',
    paddingBottom: 8,
    color: '#fff',
    textAlign: 'center'
  },
  amount: {
    fontSize: 22,
    fontFamily: 'AvenirNext-Bold',
    color: '#fff',
    textAlign: 'center'
  }
})
