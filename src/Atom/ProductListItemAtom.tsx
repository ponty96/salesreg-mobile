import * as React from 'react';
import { ListItem, Left, Body, Right, Text, Thumbnail } from 'native-base';
import { StyleSheet } from 'react-native';
import { color } from '../Style/Color';

interface IProps {
  onPress?: () => void;
  image: string;
  name: string;
  number: any;
  status: string;
}

class ProductListItemAtom extends React.Component<IProps, any> {
  render() {
    const defaultImg =
      'https://snack-code-uploads.s3.us-west-1.amazonaws.com/~asset/9d799c33cbf767ffc1a72e53997218f7';
    const avatar = this.props.image ? this.props.image : defaultImg;
    const colored1 = this.props.status === 'debt' ? 'red' : color.button;
    const colored2 = this.props.status === 'debt' ? 'red' : 'black';
    return (
      <ListItem style={styles.rowP} onPress={this.props.onPress}>
        <Left style={styles.leftView}>
          <Thumbnail source={{ uri: avatar }} style={styles.dpP} />
        </Left>
        <Body style={styles.bodyView}>
          <Text style={[styles.rowText1, { color: colored2 }]}>
            {this.props.name}
          </Text>
        </Body>
        <Right style={styles.rightView}>
          <Text style={[styles.rowText3P, { color: colored1 }]}>
            {this.props.number}
          </Text>
        </Right>
      </ListItem>
    );
  }
}

export default ProductListItemAtom;

const styles = StyleSheet.create({
  rowP: {
    flexDirection: 'row',
    alignSelf: 'center',
    flex: 1,
    height: 75,
    paddingLeft: 0,
    marginLeft: 16,
    marginRight: 16,
    // backgroundColor: '#fff',
    marginBottom: 0.5,
    maxWidth: '100%',
    paddingVertical: 10,
    paddingHorizontal: 10
  },
  rowText3P: {
    color: color.button,
    fontSize: 16,
    textAlign: 'right',
    paddingRight: 5,
    fontFamily: 'SourceSansPro_Semibold',
    marginTop: 0,
    paddingTop: 0,
    paddingBottom: 15
  },
  rowText1: {
    fontWeight: '400',
    fontSize: 14,
    fontFamily: 'SourceSansPro',
    textAlign: 'left'
  },
  leftView: {
    height: 55,
    marginLeft: 0
  },
  bodyView: {
    flex: 2
  },
  dpP: {
    height: 55,
    width: 55,
    marginTop: 0,
    paddingTop: 0,
    borderRadius: 55 / 2,
    margin: 8,
    paddingLeft: 8
  },
  rightView: {
    alignSelf: 'flex-end',
    flex: 1
  }
});