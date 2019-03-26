import React from 'react'
import { StyleSheet } from 'react-native'

import { RegularText } from '../TextAtom'

interface IProps {
  errorText: any
}
const FormErrorTextAtom = (props: IProps) => (
  <RegularText style={styles.errorText}>{props.errorText}</RegularText>
)

export default FormErrorTextAtom

const styles = StyleSheet.create({
  errorText: {
    marginLeft: 0,
    color: 'red',
    fontSize: 12,
    marginBottom: 25,
    marginTop: 2
  }
})
