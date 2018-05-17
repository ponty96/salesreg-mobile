import React from "react";
import { View } from "react-native";
import PropTypes from "prop-types";

import ButtonAtom from "../Atom/ButtonAtom";
import styles from "./../Style/Form";
import styles1 from "../Style/exportStyles";

class SaveCancelButton extends React.Component {
  navigateBack = () => {
    this.props.navigation.goBack();
  };

  create = () => {
    if (this.props.createfunc) {
      this.props.createfunc();
    }
  };

  render() {
    return (
      <View style={styles.saveCancelContainer}>
        <ButtonAtom
          btnText="CANCEL"
          transparent={true}
          onPress={this.navigateBack}
          btnStyle={styles1.saveCancelButton}
          textStyle={styles1.saveCancelButtonText}
        />

        <ButtonAtom
          btnText={this.props.positiveButtonName}
          transparent={true}
          onPress={this.create}
          btnStyle={styles1.saveCancelButton}
          textStyle={styles1.saveCancelButtonText}
        />
      </View>
    );
  }
}

SaveCancelButton.propTypes = {
  navigation: PropTypes.object.isRequired,
  createfunc: PropTypes.func,
  positiveButtonName: PropTypes.string.isRequired
};

export default SaveCancelButton;
