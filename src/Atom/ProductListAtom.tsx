import React from 'react';
import { ListItem, Left, Body, Right, Text, Thumbnail } from 'native-base';
import styles from './../Style/ProductAndCustomerList';

interface IProps {
  items: {images: string, name: string, number: any}
  onPress?: () => void
}

class ProductListAtom extends React.Component<IProps, any> {
  render() {
    const defaultImg = 'https://snack-code-uploads.s3.us-west-1.amazonaws.com/~asset/9d799c33cbf767ffc1a72e53997218f7';
    const avatar = this.props.items.images !== '' ? this.props.items.images : defaultImg;

    return (
      <ListItem style={styles.rowP} onPress={this.props.onPress}>
        <Left
          style={styles.leftView}
        >
          <Thumbnail
            source={{ uri: avatar }}
            style={styles.dpP}
          />
        </Left>
        <Body style={styles.bodyView}>
          <Text style={styles.rowText1}>{this.props.items.name}</Text>
        </Body>
        <Right style={styles.rightView}>
          <Text style={styles.rowText3P}> {this.props.items.number}</Text>
        </Right>
      </ListItem>
    );
  }
}

export default ProductListAtom;
