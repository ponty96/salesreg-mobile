import React from 'react';
import { View, Text } from 'react-native';
import { Thumbnail } from 'native-base';
import styles from './../Style/exportStyles';

interface IAboveAccordProps {
    uri: string;
    name: string;
    totalAmount: any;
}

class AboveAccordionAtom extends React.Component<IAboveAccordProps, any> {
    public static defaultProps = {
        uri: 'https://snack-code-uploads.s3.us-west-1.amazonaws.com/~asset/9d799c33cbf767ffc1a72e53997218f7',
        name: 'Customer Name',
        totalAmount: 0
    };
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
            # {this.props.totalAmount}.00
          </Text>
        </View>
      </View>
    );
  }
}

export default AboveAccordionAtom;
