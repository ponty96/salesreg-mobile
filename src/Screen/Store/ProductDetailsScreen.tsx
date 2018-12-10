import React, { PureComponent } from 'react'
import { View, StyleSheet, Text, TouchableOpacity } from 'react-native'
import { color } from '../../Style/Color'
import Header from '../../Components/Header/DetailsScreenHeader'
import GenericProfileDetails from '../../Components/Generic/ProfileDetails'
import Icon from '../../Atom/Icon'
import { Chip } from '../../Atom/Chip'

interface IProps {
  navigation?: any
}

class ProductDetailsScreen extends PureComponent<IProps> {
  static navigationOptions = ({ navigation }: any) => {
    const product = navigation.getParam('product', {})
    return {
      header: (
        <Header
          title="Product Details"
          onPressLeftIcon={() => navigation.goBack()}
          onPressRightIcon={() =>
            navigation.navigate('UpdateProduct', { product })
          }
        />
      )
    }
  }

  sections = (): any => {
    const product = this.props.navigation.getParam('product', {})
    return [
      ...this.parseOptionValues(product),
      ...this.showVariantOptionStep(product),
      { section: 'Total Quantity Sold', value: '2344' },
      { section: 'MSQ', value: product.minimumSku },
      {
        section: 'Unit selling price',
        value: `\u20A6 ${product.price}`,
        type: 'currency'
      },
      {
        section: 'Categories',
        value: product.categories.map(cat => cat.title)
      },
      // open tags screen, which shows list of products and services attached to the tag
      {
        section: 'Tags',
        body: (
          <View style={styles.tags}>
            {product.tags.map(tag => (
              <Chip text={tag.name} />
            ))}
          </View>
        )
      }, // logic for showing tags here
      { section: 'Images', value: null } // logic for rendering images here
    ]
  }

  parseOptionValues = ({ optionValues = [] }) => {
    return optionValues.map(optionValue => ({
      section: optionValue.option.name,
      value: optionValue.name
    }))
  }
  showVariantOptionStep = ({ optionValues = [] }) => {
    if (optionValues.length > 0) {
      return [
        {
          section: `${optionValues.length} Variant options`,
          value: 'Edit',
          type: 'button',
          onPress: this.onPressEditVariantOptions
        }
      ]
    } else return []
  }

  onPressEditVariantOptions = () => {}
  render() {
    // do change the list to the appropriate molecule
    const product = this.props.navigation.getParam('product', {})
    return [
      <View style={styles.topHeader} key="dddd-334">
        <TouchableOpacity
          style={{ flexDirection: 'row', alignItems: 'center' }}
        >
          <Icon
            type="Ionicons"
            name="md-share"
            style={{ fontSize: 27, color: color.textColor, marginRight: 8 }}
          />
          <Text style={styles.rightNavText}>Share</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={{ flexDirection: 'row', alignItems: 'center' }}
        >
          <Text style={styles.rightNavText}>Add variants</Text>
          <Icon
            name="chevron-small-right"
            type="Entypo"
            style={styles.headerIcon}
          />
        </TouchableOpacity>
      </View>,
      <GenericProfileDetails
        sections={this.sections()}
        image={product.featuredImage} // change logic based on product having multiple images
        headerText={product.name}
        headerSubText={product.number}
      />
    ]
  }
}

export default ProductDetailsScreen

const styles = StyleSheet.create({
  topHeader: {
    flexDirection: 'row',
    position: 'absolute',
    zIndex: 999,
    backgroundColor: '#ffffffc7',
    width: '100%',
    paddingVertical: 8,
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: color.list
  },
  rightNavText: {
    color: color.button,
    fontSize: 16,
    fontFamily: 'AvenirNext-Medium',
    marginLeft: 8
  },
  headerIcon: {
    color: color.button,
    padding: 16,
    fontSize: 28
  },
  tags: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    flex: 1
  }
})
