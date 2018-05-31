import * as React from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { Thumbnail, ListItem, Left, Right } from 'native-base'
import { color } from '../Style/Color'

interface IProps {
  product?: string | 'Product Name'
  units?: any | 0
  packs?: any | 0
  quantity?: any | 0
  cost?: any | 0
  ucost?: any | 0
  sell?: any | 0
  stock?: any | 0
}

export default class ProductDetailAtom extends React.Component<IProps, any> {
  render() {
    return (
      <View>
        <View style={styles.aboveAccordionContainerP}>
          <View style={styles.aboveAccordionPictureViewP}>
            <Thumbnail
              source={{
                uri:
                  'https://snack-code-uploads.s3.us-west-1.amazonaws.com/~asset/9d799c33cbf767ffc1a72e53997218f7'
              }}
              style={styles.aboveAccordiondpP}
            />
            <Text style={styles.aboveAccordionPictureText}>
              {this.props.product}
            </Text>
          </View>
          <View style={styles.aboveAccordionMoneyView}>
            <View>
              <Text style={styles.aboveAccordionGreyFont}>
                Stock quantity(in units)
              </Text>
              <Text style={styles.aboveAccordionBoldFont}>
                {this.props.units}
              </Text>
            </View>
            <View>
              <Text style={styles.aboveAccordionGreyFont}>
                Stock quantity(in packs)
              </Text>
              <Text style={styles.aboveAccordionBoldFont}>
                {this.props.packs}
              </Text>
            </View>
          </View>
        </View>
        <View>
          <ListItem style={styles.aboveAccordionWhiteList}>
            <Left>
              <Text style={styles.aboveAccordionBlackTextL}>Pack quantity</Text>
            </Left>
            <Right>
              <Text style={styles.aboveAccordionBlackTextR}>
                {this.props.quantity}
              </Text>
            </Right>
          </ListItem>
          <ListItem style={styles.aboveAccordionWhiteList}>
            <Left>
              <Text style={styles.aboveAccordionBlackTextL}>
                Cost price per pack
              </Text>
            </Left>
            <Right>
              <Text style={styles.aboveAccordionBlackTextR}>
                {this.props.cost}
              </Text>
            </Right>
          </ListItem>
          <ListItem style={styles.aboveAccordionWhiteList}>
            <Left>
              <Text style={styles.aboveAccordionBlackTextL}>
                Unit cost price
              </Text>
            </Left>
            <Right>
              <Text style={styles.aboveAccordionBlackTextR}>
                {this.props.ucost}
              </Text>
            </Right>
          </ListItem>
          <ListItem style={styles.aboveAccordionWhiteList}>
            <Left>
              <Text style={styles.aboveAccordionBlackTextL}>Seling price</Text>
            </Left>
            <Right>
              <Text style={styles.aboveAccordionRedTextR}>
                {this.props.sell}
              </Text>
            </Right>
          </ListItem>
          <ListItem style={styles.aboveAccordionWhiteList}>
            <Left>
              <Text style={styles.aboveAccordionBlackTextL}>
                Minimum stock quantity
              </Text>
            </Left>
            <Right>
              <Text style={styles.aboveAccordionBlackTextR}>
                {this.props.stock}
              </Text>
            </Right>
          </ListItem>
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  aboveAccordionContainerP: {
    flexDirection: 'row',
    flex: 0,
    borderTopWidth: 0.5,
    borderBottomWidth: 0.5,
    borderTopColor: '#f0f0f0',
    borderBottomColor: '#c0c0c0'
  },
  aboveAccordionPictureViewP: {
    flexDirection: 'column',
    width: '50%',
    height: 200,
    alignItems: 'flex-start',
    padding: 16,
    justifyContent: 'center',
    backgroundColor: '#fff'
  },
  aboveAccordiondpP: {
    height: 60,
    width: 60
  },
  aboveAccordionBoldFont: {
    fontWeight: 'bold',
    fontSize: 18,
    textAlign: 'right'
  },
  aboveAccordionWhiteList: {
    height: 65,
    width: '100%',
    backgroundColor: '#FFF',
    paddingLeft: 0,
    marginLeft: 0
  },
  aboveAccordionBlackTextL: {
    fontSize: 16,
    color: '#c0c0c0',
    paddingLeft: 16
  },
  aboveAccordionBlackTextR: {
    fontSize: 16,
    color: '#000'
  },
  aboveAccordionRedTextR: {
    fontSize: 16,
    color: 'red'
  },
  aboveAccordionGreyText: {
    fontSize: 16,
    color: '#c0c0c0',
    paddingLeft: 16
  },
  aboveAccordionGreyFont: {
    fontSize: 16,
    color: '#c0c0c0'
  },
  aboveAccordionRedText: {
    fontSize: 16,
    color: 'red'
  },
  aboveAccordionPictureText: {
    paddingTop: 10,
    fontSize: 18,
    fontWeight: '400',
    color: color.menu
  },
  aboveAccordionMoneyView: {
    width: '50%',
    height: 200,
    alignItems: 'center',
    justifyContent: 'center'
    // backgroundColor: '#FFF',
  }
})
