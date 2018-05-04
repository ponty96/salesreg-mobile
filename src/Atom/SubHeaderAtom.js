import React from 'react';
import { View } from 'react-native';
import PropTypes from 'prop-types';
import { Header, Left, Right, Icon, Text } from 'native-base';
import PickerAtom from "./PickerAtom";

import { subHeaderStyles } from './../Style/exportStyles';

 class SubHeaderAtom extends React.Component {
  static defaultProps = {
    total: "800"
  }

  render() {
    return (
        <Header style={subHeaderStyles.header}>
            <Left style={subHeaderStyles.row}>
              <Icon style={subHeaderStyles.iconColor} name='md-briefcase'/>
              <Text style={subHeaderStyles.pad}>{this.props.total}</Text>
            </Left>
            <Right style={subHeaderStyles.row}>
              <Text style={subHeaderStyles.font}>Sort By:</Text>
              <PickerAtom list={this.props.list}/>
            </Right>
        </Header>
    );
  }
}

SubHeaderAtom.propTypes = {
  total: PropTypes.string,
}

export default SubHeaderAtom;