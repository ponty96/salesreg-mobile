import * as React from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { Thumbnail } from 'native-base'
import { color } from '../Style/Color'

interface IAboveAccordProps {
  uri: string
  name: string
  totalAmount: any
}

class AboveAccordionAtom extends React.Component<IAboveAccordProps, any> {
  public static defaultProps = {
    uri:
      'https://snack-code-uploads.s3.us-west-1.amazonaws.com/~asset/9d799c33cbf767ffc1a72e53997218f7',
    name: 'Customer Name',
    totalAmount: 0
  }

  render() {
    return (
      <View style={styles.aboveAccordionContainer}>
        <View style={styles.aboveAccordionPictureView}>
          <Thumbnail
            source={{
              uri: this.props.uri
            }}
            style={styles.aboveAccordiondp}
          />
          <Text style={styles.aboveAccordionPictureText}>
            {this.props.name}
          </Text>
        </View>
        <View style={styles.aboveAccordionMoneyView}>
          <Text style={styles.aboveAccordionRedNumber}>
            {'\u20A6'} {this.props.totalAmount}.00
          </Text>
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  aboveAccordionContainer: {
    flexDirection: 'row',
    flex: 0,
    borderTopWidth: 0.5,
    borderTopColor: color.listBorderColor
  },

  aboveAccordionPictureView: {
    flexDirection: 'column',
    width: '50%',
    height: 200,
    alignItems: 'center',
    justifyContent: 'center'
    //  backgroundColor: '#fff',
  },

  aboveAccordiondp: {
    height: 90,
    width: 90
  },

  aboveAccordionPictureText: {
    paddingTop: 10,
    fontSize: 18,
    fontWeight: '400',
    color: color.menu
  },

  aboveAccordionMoneyView: {
    width: '50%',
    height: 200,
    alignItems: 'center',
    justifyContent: 'center'
    // backgroundColor: '#FFF',
  },

  aboveAccordionRedNumber: {
    color: color.primary,
    fontSize: 25,
    fontWeight: 'bold'
  }
})

export default AboveAccordionAtom
