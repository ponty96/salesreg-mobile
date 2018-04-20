import React from 'react';
import { StyleSheet, View } from 'react-native';
import PropTypes from 'prop-types';
import { Header, Left, Right, Icon, Text } from 'native-base';

 class SubHeaderAtom extends React.Component {
  static defaultProps = {
    total: "800"
  }
  render() {
    return (
        <Header style={styles.header}>
            <Left style={styles.row}><Icon name='md-briefcase'/><Text>{this.props.total}</Text></Left>
            <Right><Text>Sort By: TOBI'S DROPDOWN </Text></Right>
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
    flexDirection: "row"
  },
  pad: {
    paddingLeft: 10,
    paddingTop: 10
  }
});