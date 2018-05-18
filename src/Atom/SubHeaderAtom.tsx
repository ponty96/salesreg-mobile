import * as React from 'react';
import { Header, Left, Right, Icon, Text } from 'native-base';
import PickerAtom from './PickerAtom';
import styles from '../Style/exportStyles';

interface IProps {
  total: any
  list?: Array<any>
}

 class SubHeaderAtom extends React.Component<IProps, any> {
  static defaultProps: IProps = {
    total: '0'
  };

  render() {
    return (
        <Header style={styles.subHeaderHeader}>
            <Left style={styles.subHeaderRow}>
              <Icon style={styles.subHeaderIconColor} name='md-briefcase'/>
              <Text style={styles.subHeaderPad}>{this.props.total}</Text>
            </Left>
            <Right style={styles.subHeaderRow}>
              <Text style={styles.subHeaderFont}>Sort By:</Text>
              <PickerAtom
                list={this.props.list}
                style = { styles.pickerStyle }
              />
            </Right>
        </Header>
    );
  }
}

export default SubHeaderAtom;