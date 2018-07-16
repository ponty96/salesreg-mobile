import * as React from 'react';
import { ListItem, Left, Body, Right, Text, Thumbnail } from 'native-base';
import { StyleSheet } from 'react-native';
import { color } from '../Style/Color';

interface IProps {
  items: {
    image: string;
    name: string;
    number: any;
    status?: string;
    customerName?: string;
    bottomRightText?: string;
  };
  onPress?: () => void;
  textStyle?: object;
}

class ProductListAtom extends React.Component<IProps, any> {
  render() {
    const defaultImg =
      'https://snack-code-uploads.s3.us-west-1.amazonaws.com/~asset/9d799c33cbf767ffc1a72e53997218f7';
    const avatar =
      this.props.items.image !== '' ? this.props.items.image : defaultImg;
    const colored1 = this.props.items.status === 'debt' ? 'red' : color.button;
    const colored2 =
      this.props.items.status === 'debt' ? 'red' : color.principal;

    return (
      <ListItem style={styles.rowP} onPress={this.props.onPress}>
        <Left style={styles.leftView}>
          <Thumbnail source={{ uri: avatar }} style={styles.dpP} />
        </Left>
        <Body style={styles.bodyView}>
          <Text style={[styles.rowText1, { color: colored2 }]}>
            {this.props.items.name}
          </Text>
          {this.props.items.customerName ? (
            <Text style={styles.bottomBodyText}>
              {this.props.items.customerName}
            </Text>
          ) : (
            undefined
          )}
        </Body>
        <Right style={styles.rightView}>
          <Text
            style={[
              styles.rowText3P,
              { color: colored1 },
              this.props.textStyle
            ]}
          >
            {this.props.items.number}
          </Text>
          {this.props.items.bottomRightText}
        </Right>
      </ListItem>
    );
  }
}

export default ProductListAtom;

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
    textAlign: 'left',
    color: color.principal
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
  },
  bottomBodyText: {
    marginTop: 8,
    fontFamily: 'SourceSansPro',
    fontSize: 12,
    color: color.principal
  }
});
