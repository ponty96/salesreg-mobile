import * as React from 'react'
import { ListItem, Text, Thumbnail, Left, Body, Right } from 'native-base'
import { FlatList, View, StyleSheet } from 'react-native'
import { ScrollView } from 'react-native-gesture-handler'
import { innerAccordion } from '../config/data'
import { color } from '../Style/Color'

interface IProps {
  item?: { images: string; name: string; quantity: string; amount: any }
  onPress?: () => void
  image?: string
}

class InnerList extends React.Component<IProps, any> {
  public static defaultProps: {
    image: 'https://snack-code-uploads.s3.us-west-1.amazonaws.com/~asset/9d799c33cbf767ffc1a72e53997218f7'
  }

  render() {
    const AVATAR =
      this.props.item.images !== '' ? this.props.item.images : this.props.image

    return (
      <ListItem style={styles.rowD} onPress={this.props.onPress}>
        <Left style={styles.view1}>
          <Thumbnail source={{ uri: AVATAR }} style={styles.dpD} />
        </Left>
        <Body style={styles.view2}>
          <Text style={styles.rowText1}>{this.props.item.name}</Text>
        </Body>
        <Right style={styles.view3}>
          <Text style={styles.lilFontDA}>{this.props.item.quantity}</Text>
          <Text style={styles.rowText3DA}>
            {'\u20A6'} {this.props.item.amount}.00
          </Text>
        </Right>
      </ListItem>
    )
  }
}

export default class DebtAccordionAtom extends React.Component {
  onPress = () => {
    console.log('it ran')
  }

  renderItem = (item: any) => {
    return <InnerList item={item} onPress={this.onPress} />
  }

  render() {
    return (
      <View style={styles.debtAccord}>
        <ScrollView>
          <FlatList
            data={innerAccordion}
            renderItem={this.renderItem}
            keyExtractor={item => item.key.toString()}
          />
        </ScrollView>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  rowD: {
    flex: 1,
    flexDirection: 'row',
    top: 0,
    padding: 10,
    paddingLeft: 0,
    marginLeft: 0,
    height: 65,
    // backgroundColor: '#fff',
    marginBottom: 0.5,
    borderBottomWidth: 0.5,
    borderBottomColor: color.listBorderColor
  },
  view1: {
    height: 68,
    width: '20%',
    alignItems: 'center'
  },
  dpD: {
    height: 45,
    width: 45,
    borderRadius: 45 / 2,
    margin: 8
  },
  view2: {
    flex: 0,
    paddingLeft: 0,
    marginLeft: 0,
    paddingRight: 0,
    marginRight: 0,
    width: '35%'
  },
  rowText1: {
    fontWeight: '400',
    fontSize: 13,
    // color: '#000',
    textAlign: 'left'
  },
  view3: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'flex-end',
    width: '35%',
    marginLeft: '20%'
  },
  lilFontDA: {
    fontSize: 14,
    paddingRight: 8,
    paddingBottom: 3,
    paddingTop: 5
  },
  rowText3DA: {
    color: 'rgba(218,11,11,59)',
    fontSize: 13,
    textAlign: 'right',
    paddingRight: 5,
    marginTop: 0,
    paddingTop: 3,
    paddingBottom: 10
  },
  debtAccord: {
    flex: 1,
    width: '100%',
    backgroundColor: '#FFF'
  }
})
