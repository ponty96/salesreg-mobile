import React from 'react'
import { View, Text } from 'react-native'
import { Thumbnail } from 'native-base'

import styles from '../Style/exportStyles'

export default class AboveAccordionAtom extends React.Component {
  render() {
    return (
      <View style={styles.aboveAccordionContainer}>
        <View style={styles.aboveAccordionPictureView}>
          <Thumbnail
            source={{
              uri:
                'https://snack-code-uploads.s3.us-west-1.amazonaws.com/~asset/9d799c33cbf767ffc1a72e53997218f7'
            }}
            style={styles.aboveAccordionDp}
          />
          <Text style={styles.aboveAccordionPictureText}>
            {this.props.name}
          </Text>
        </View>
        <View style={styles.aboveAccordionMoneyView}>
          <Text style={styles.aboveAccordionRedNumber}>
            # {this.props.totalAmount}.00
          </Text>
        </View>
      </View>
    )
  }
}
