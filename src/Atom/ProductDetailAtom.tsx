import * as React from 'react'
import { View, Text } from 'react-native'
import { Thumbnail, ListItem, Left, Right } from 'native-base'
import styles from '../Style/exportStyles'

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
