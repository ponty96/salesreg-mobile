import React from 'react';
import { StyleSheet, View } from 'react-native';
import PropTypes from 'prop-types';
import { Header, Left, Right, Icon, Text } from 'native-base';
//import ModalDropdown from "react-native-modal-dropdown";
import PickerAtom from "./PickerAtom";

 class SubHeaderAtom extends React.Component {
  static defaultProps = {
    total: "800",
  }
  render() {
    return (
        <Header style={styles.header}>
            <Left style={styles.row}><Icon color= "#F0F0F0" name='md-briefcase'/><Text style={styles.pad}>{this.props.total}</Text></Left>
            <Right style={styles.row}>
            <Text style={styles.font}>Sort By:</Text>
            <PickerAtom />
            </Right>
        </Header>
    );
  }
}

SubHeaderAtom.propTypes = {
  total: PropTypes.string,
}

export default SubHeaderAtom;

const styles = StyleSheet.create({
  header: {
    height: 40,
    backgroundColor: "#fff",
  },
  row: {
    flexDirection: "row",
    width: "40%"
  },
  pad: {
    paddingLeft: 10,
    paddingTop: 5,
  },
  font: {
    fontSize: 13,
    paddingBottom: 9
  }
});