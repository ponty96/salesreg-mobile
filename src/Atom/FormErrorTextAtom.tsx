import React from 'react';
import { Text, StyleSheet } from 'react-native';

interface IProps {
  errorText: any;
}
const FormErrorTextAtom = (props: IProps) => (
  <Text style={styles.errorText}>{props.errorText}</Text>
);

export default FormErrorTextAtom;

const styles = StyleSheet.create({
  errorText: {
    marginLeft: 0,
    color: 'red',
    fontSize: 12,
    marginBottom: 25,
    marginTop: 2
  }
});
