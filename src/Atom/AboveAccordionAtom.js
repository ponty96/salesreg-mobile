import React from "react";
import { View, Text } from "react-native";
import { Thumbnail } from "native-base";

import { aboveAccordionStyles } from "./../Style/exportStyles";

export default class AboveAccordionAtom extends React.Component {
  render() {
    return (
      <View style={aboveAccordionStyles.container}>
        <View style={aboveAccordionStyles.pictureView}>
          <Thumbnail
            source={{
              uri:
                "https://snack-code-uploads.s3.us-west-1.amazonaws.com/~asset/9d799c33cbf767ffc1a72e53997218f7"
            }}
            style={styles.dp}
          />
          <Text style={aboveAccordionStyles.pictureText}>
            {this.props.name}
          </Text>
        </View>
        <View style={aboveAccordionStyles.moneyView}>
          <Text style={aboveAccordionStyles.redNumber}>
            # {this.props.totalAmount}.00
          </Text>
        </View>
      </View>
    );
  }
}
