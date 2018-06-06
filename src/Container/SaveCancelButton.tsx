import * as React from 'react';
import { View, StyleSheet } from 'react-native';
import ButtonAtom from '../Atom/ButtonAtom';
import { color } from './../Style/Color';

interface IProps {
  navigation: any;
  createfunc?: () => void;
  positiveButtonName: string;
}

class SaveCancelButton extends React.Component<IProps, any> {
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
          onPress={() => this.props.navigation.goBack()}
          btnStyle={styles.saveCancelButton}
          textStyle={styles.saveCancelButtonText}
        />

        <ButtonAtom
          btnText={this.props.positiveButtonName}
          transparent={true}
          onPress={this.create}
          btnStyle={styles.saveCancelButton}
          textStyle={styles.saveCancelButtonText}
        />
      </View>
    );
  }
}

export default SaveCancelButton;

const styles = StyleSheet.create({
  saveCancelContainer: {
    flexDirection: 'row'
  },
  saveCancelButton: {
    borderWidth: 1,
    flex: 1,
    height: 65,
    borderRadius: 0,
    marginVertical: 0,
    marginTop: 8,
    alignContent: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: color.grey,
    backgroundColor: color.secondary
  },
  saveCancelButtonText: {
    color: color.menu,
    fontWeight: 'bold'
  }
});
