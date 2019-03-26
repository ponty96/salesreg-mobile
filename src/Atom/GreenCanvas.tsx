import React from 'react'
import { View, StyleSheet } from 'react-native'

import { MediumText, BoldText } from './TextAtom'
import { color } from '../Style/Color'

interface CanvasProps {
  title: string
  subText?: string
  hideNairaSymbolInGreenCanvas?: boolean
}

export const GreenCanvas = (props: CanvasProps) => (
  <View style={styles.detailsHeader}>
    <MediumText style={styles.title}>{props.title}</MediumText>
    {props.subText && (
      <BoldText style={styles.amount}>
        {props.hideNairaSymbolInGreenCanvas
          ? props.subText
          : `\u20A6 ${props.subText}`}
      </BoldText>
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
    paddingBottom: 8,
    color: '#fff',
    textAlign: 'center'
  },
  amount: {
    fontSize: 22,
    color: '#fff',
    textAlign: 'center'
  }
})
