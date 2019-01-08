import React, { PureComponent } from 'react'
import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Linking
} from 'react-native'
import { color } from '../../Style/Color'
import Header from '../../Components/Header/DetailsScreenHeader'
import GenericProfileDetails from '../../Components/Generic/ProfileDetails'
import Icon from '../../Atom/Icon'
import { Chip } from '../../Atom/Chip'
import { DeleteProductGQL } from '../../graphql/mutations/store'
import { ListCompanyProductsGQL } from '../../graphql/queries/store'
import { UserContext } from '../../context/UserContext'
import CachedImageAtom from '../../Atom/CachedImageAtom'
import { NotificationContext } from '../../context/NotificationContext'
import configureNotificationBanner from '../../Functions/configureNotificationBanner'

interface IProps {
  navigation?: any
  user?: any
  setNotificationBanner: (obj: any) => void
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

  transformPath = mediaURL => {
    let url = /video$/.test(mediaURL)
    if (!url) {
      return mediaURL
    } else {
      let baseURL = 'https://refineryaudio.s3.amazonaws.com/',
        fileName = mediaURL.substring(mediaURL.lastIndexOf('/') + 1)
      return `${baseURL}thumbnail%2F${fileName}`
    }
  }

  sections = (): any => {
    const product = this.props.navigation.getParam('product', {})
    return [
      ...this.parseOptionValues(product),
      ...this.showVariantOptionStep(product),
      {
        section: 'Total Quantities Sold',
        value: `${product.totalQuantitySold || 0}`
      },
      { section: 'MSQ', value: product.minimumSku },
      {
        section: 'Unit selling price',
        value: `\u20A6 ${product.price}`,
        type: 'currency'
      },
      {
        section: 'Categories',
        value: product.categories && product.categories.map(cat => cat.title),
        hideBody:
          product.categories && product.categories.length > 0 ? false : true
      },
      // open tags screen, which shows list of products and services attached to the tag
      {
        section: 'Tags',
        body: (
          <View style={styles.tags}>
            {product.tags &&
              product.tags.map((tag, i) => <Chip key={i} text={tag.name} />)}
          </View>
        ),
        hideBody: product.tags && product.tags.length > 0 ? false : true
      }, // logic for showing tags here
      {
        section: 'Images',
        body: (
          <View style={styles.imageContainer}>
            {product.images &&
              product.images.map((media, i) => {
                let isVideo = /video$/.test(media)
                return (
                  <View key={i}>
                    <CachedImageAtom
                      style={StyleSheet.flatten([
                        styles.image,
                        styles.cachedImageStyle
                      ])}
                      uri={this.transformPath(media)}
                    >
                      <View style={styles.mediaOverlay}>
                        <Icon
                          type="FontAwesome"
                          name={!isVideo ? 'file-image-o' : 'video-camera'}
                          style={styles.fileTypeIcon}
                        />
                      </View>
                    </CachedImageAtom>
                    <TouchableWithoutFeedback
                      onPress={() => {
                        Linking.openURL(media)
                      }}
                    >
                      <View style={styles.clickableDisplayOverlay} />
                    </TouchableWithoutFeedback>
                  </View>
                )
              })}
          </View>
        ),
        hideBody: product.images && product.images.length > 0 ? false : true
      },
      {
        section: 'Description',
        body: <Text style={styles.descriptionText}>{product.description}</Text>,
        hideBody:
          product.description && product.description.length > 0 ? false : true
      }
    ]
  }

  parseOptionValues = ({ optionValues = [] }) => {
    return optionValues.map(optionValue => ({
      section: optionValue.option.name,
      value: optionValue.name
    }))
  }

  showVariantOptionStep = ({ productGroup: { options = [] } }) => {
    if (options.length > 0) {
      return [
        {
          section: `${options.length} Variant options`,
          value: 'Edit',
          type: 'button',
          onPress: this.onPressEditVariantOptions
        }
      ]
    } else return []
  }

  onPressEditVariantOptions = () => {
    const product = this.props.navigation.getParam('product', {})
    this.props.navigation.navigate('UpdateProductGroupOptions', { product })
  }
  onPressAddProductVariant = () => {
    const product = this.props.navigation.getParam('product', {})
    this.props.navigation.navigate('AddProductVariant', { product })
  }

  render() {
    const product = this.props.navigation.getParam('product', {})
    return [
      <View style={styles.topHeader} key="product-details-334">
        {/* <TouchableOpacity
          style={{ flexDirection: 'row', alignItems: 'center' }}
        >
          <Icon
            type="Ionicons"
            name="md-share"
            style={{ fontSize: 27, color: color.textColor, marginRight: 8 }}
          />
          <Text style={styles.rightNavText}>Share</Text>
        </TouchableOpacity> */}
        <TouchableOpacity
          style={{ flexDirection: 'row', alignItems: 'center' }}
          onPress={this.onPressAddProductVariant}
        >
          <Text style={styles.rightNavText}>Add variants</Text>
          <Icon
            name="chevron-small-right"
            type="Entypo"
            style={styles.headerIcon}
          />
        </TouchableOpacity>
        <View />
      </View>,
      <GenericProfileDetails
        sections={this.sections()}
        image={product.featuredImage} // change logic based on product having multiple images
        enableDelete={true}
        graphqlDeleteMutation={DeleteProductGQL}
        graphqlDeleteMutationResultKey="deleteProduct"
        graphqlDeleteVariables={{ productId: product.id }}
        graphqlRefetchQueries={[
          {
            query: ListCompanyProductsGQL,
            variables: {
              queryText: '',
              companyId: this.props.user.company.id,
              first: 10,
              after: null
            }
          }
        ]}
        onSuccessfulDeletion={() => {
          this.props.setNotificationBanner(
            configureNotificationBanner('DeleteProduct', product)
          )
          this.props.navigation.navigate('Products')
        }}
        headerText={product.name}
        headerSubText={product.number}
        key="product-details-335"
        imageCategory="item"
      />
    ]
  }
}

const _ProductDetailsScreen: any = props => (
  <UserContext.Consumer>
    {({ user }) => (
      <NotificationContext.Consumer>
        {({ setNotificationBanner }) => (
          <ProductDetailsScreen
            {...props}
            user={user}
            setNotificationBanner={setNotificationBanner}
          />
        )}
      </NotificationContext.Consumer>
    )}
  </UserContext.Consumer>
)

_ProductDetailsScreen.navigationOptions = ProductDetailsScreen.navigationOptions

export default _ProductDetailsScreen

const styles = StyleSheet.create({
  topHeader: {
    flexDirection: 'row',
    position: 'absolute',
    zIndex: 999,
    backgroundColor: '#ffffffc7',
    width: '100%',
    paddingVertical: 8,
    justifyContent: 'flex-end',
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: color.list
  },
  imageContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap'
  },
  image: {
    marginTop: 12,
    marginLeft: 12,
    width: 110,
    height: 110
  },
  cachedImageStyle: {
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 6,
    marginTop: 6
  },
  mediaOverlay: {
    backgroundColor: 'rgba(0,0,0,.2)',
    width: '100%',
    marginLeft: 4,
    marginTop: 4,
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center'
  },
  fileTypeIcon: {
    fontSize: 30,
    color: '#fff'
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
  clickableDisplayOverlay: {
    position: 'absolute',
    top: 35,
    left: 7,
    width: 110,
    height: 80
  },
  tags: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    flex: 1
  },
  descriptionText: {
    textAlign: 'justify',
    marginHorizontal: 14,
    paddingBottom: 10,
    fontFamily: 'AvenirNext-Regular',
    color: color.textColor
  }
})
