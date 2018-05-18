import * as React from 'react';
import { ListItem, Text, Thumbnail, Left, Body, Right } from 'native-base';
import { FlatList, View } from 'react-native';
import styles from './../Style/ProductAndCustomerList';
import { ScrollView } from 'react-native-gesture-handler';
import { innerAccordion } from '../config/data';

interface IProps {
    items?: { images: string, name: string, quantity: string, amount: any}
    onPress?: () => void
}

class InnerList extends React.Component<IProps, any> {
  render() {
    const defaultImg = 'https://snack-code-uploads.s3.us-west-1.amazonaws.com/~asset/9d799c33cbf767ffc1a72e53997218f7';
    const avatar = this.props.items.images !== '' ? this.props.items.images : defaultImg;
    return (
        <ListItem style={styles.rowD} onPress={this.props.onPress}>
            <Left style={styles.view1}>
                <Thumbnail source={{ uri: avatar }} style={styles.dpD} />
            </Left>
            <Body style={styles.view2}>
                <Text style={styles.rowText1}>{this.props.items.name}</Text>
            </Body>
            <Right style={styles.view3}>
                <Text style={styles.lilFontDA}>{this.props.items.quantity}</Text>
                <Text style={styles.rowText3DA}># {this.props.items.amount}.00</Text>
            </Right>
        </ListItem>
    );
  }
}

const users = innerAccordion;

  export default class DebtAccordionAtom extends React.Component {
    onPress = () => {
        console.log('it ran');
    }

    renderItem = (item: any) => {
      return (
        <InnerList
          items={item}
          onPress={this.onPress}
        />
      );
    }

    render() {
      return (
        <View style={styles.debtAccord}>
            <ScrollView>
                <FlatList
                  data={users}
                  renderItem={this.renderItem}
                  keyExtractor={item => item.key.toString()}
                />
            </ScrollView>
        </View>
      );
    }
  }
