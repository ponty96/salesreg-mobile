import * as React from 'react';
import { View, Text } from 'react-native';
import { ListItem, Left, Right, Thumbnail } from 'native-base';
import styles from '../Style/exportStyles';

interface IProps {
  uri: string
  status: string
  orderId?: number
  name?: string
}

export default class TopOrderDetailAtom extends React.Component<IProps, any> {
  static defaultProps: IProps = {
    uri: 'https://snack-code-uploads.s3.us-west-1.amazonaws.com/~asset/9d799c33cbf767ffc1a72e53997218f7',
    status: 'Unknown'
  };
  render() {
    return (
      <View>
        <ListItem style={styles.stylesDetailWhiteList}>
          <Left>
            <Text style={styles.stylesDetailRedText}>ORDER ID</Text>
          </Left>
          <Right>
            <Text style={styles.stylesDetailRedText}>{this.props.orderId}</Text>
          </Right>
        </ListItem>
        <ListItem style={styles.stylesDetailContent}>
          <Left style={styles.stylesDetailMoneyView}>
            <Text style={styles.stylesDetailGreyText}>Bought by</Text>
          </Left>
          <Right style={styles.stylesDetailPictureView}>
            <Thumbnail
              source={{ uri: this.props.uri }} style={styles.aboveAccordiondp}
            />
            <Text style={styles.stylesDetailPictureText}>{this.props.name}</Text>
          </Right>
        </ListItem>
        <ListItem style={styles.stylesDetailWhiteList}>
          <Left>
            <Text style={styles.stylesDetailGreyText}>Status</Text>
          </Left>
          <Right>
            <Text style={styles.stylesDetailBlackText}>{this.props.status}</Text>
          </Right>
        </ListItem>
      </View>
    );
  }
}
