import React, { PureComponent } from 'react'
import {
  View,
  StyleSheet,
  Text,
  Share,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Linking
} from 'react-native'
import { Icon } from 'native-base'

import { color } from '../../Style/Color'
import Header from '../../Components/Header/DetailsScreenHeader'
import GenericProfileDetails from '../../Components/Generic/ProfileDetails'
import { Chip } from '../../Atom/Chip'
import { DeleteProductGQL } from '../../graphql/mutations/store'
import { ListCompanyProductsGQL } from '../../graphql/queries/store'
import { UserContext } from '../../context/UserContext'
import CachedImageAtom from '../../Atom/CachedImageAtom'
import { NotificationBanner } from '../../Components/NotificationBanner'
import configureNotificationBanner from '../../Functions/configureNotificationBanner'
import Config from 'react-native-config'
import { NavigationActions } from 'react-navigation'
import QueryLoader from '../../Components/QueryLoader'
import { GetProductById } from '../../graphql/queries/store'

interface IProps {
  navigation?: any
  user?: any
  product?: any
  setNotificationBanner: (obj: any) => void
}

class ProductDetailsScreen extends PureComponent<IProps> {
  static navigationOptions = () => {
    return {
      header: null
    }
  }

  transformPath = mediaURL => {
    let url = /video$/.test(mediaURL)
    if (!url) {
      return mediaURL
    } else {
      let baseURL = Config.S3_BASE_URL,
        fileName = mediaURL.substring(mediaURL.lastIndexOf('/') + 1)

      let _url = `${baseURL}${fileName.replace(
        new RegExp(`${Config.S3_VIDEO_KEY_PREFIX.split('/')[2]}%2F`, 'gi'),
        `${Config.S3_THUMBNAIL_KEY_PREFIX.split('/')[2]}%2F`
      )}`

      return _url
    }
  }

  sections = (): any => {
    const product =
      this.props.navigation.getParam('product', null) || this.props.product
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
    const product =
      this.props.navigation.getParam('product', null) || this.props.product
    this.props.navigation.navigate('UpdateProductGroupOptions', { product })
  }

  onPressAddProductVariant = () => {
    const product =
      this.props.navigation.getParam('product', null) || this.props.product
    this.props.navigation.navigate('AddProductVariant', { product })
  }

  resetNavigationStack = () => {
    const resetAction = NavigationActions.reset({
      index: 1,
      actions: [
        NavigationActions.navigate({
          routeName: 'Home'
        }),
        NavigationActions.navigate({
          routeName: 'Products'
        })
      ]
    })
    this.props.navigation.dispatch(resetAction)
  }

  onShare = async () => {
    const product =
      this.props.navigation.getParam('product', null) || this.props.product
    try {
      const result: any = await Share.share(
        {
          title: `Check out ${product.name}`,
          message: `Check out ${product.name} on ${product.shareLink}`,
          url: `${product.shareLink}`
        },
        { dialogTitle: `Check out ${product.name}` }
      )

      if (result.action === Share.sharedAction) {
        if (result.activityType) {
        } else {
        }
      } else if (result.action === Share.dismissedAction) {
      }
    } catch (error) {
      //@An error occurred while sharing
    }
  }

  render() {
    const product =
      this.props.navigation.getParam('product', null) || this.props.product
    return (
      <React.Fragment>
        <Header
          title="Product Details"
          onPressLeftIcon={() => this.props.navigation.goBack()}
          onPressRightIcon={() =>
            this.props.navigation.navigate('UpdateProduct', { product })
          }
        />
        <View style={styles.topHeader}>
          <TouchableOpacity
            onPress={this.onShare}
            style={{ flexDirection: 'row', alignItems: 'center' }}
          >
            <Icon type="Ionicons" name="md-share" style={styles.headerIcon} />
            <Text style={styles.rightNavText}>Share</Text>
          </TouchableOpacity>
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
        </View>
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
            let banner = NotificationBanner(
              configureNotificationBanner('DeleteProduct', product)
            )
            banner.show({ bannerPosition: 'bottom' })

            this.resetNavigationStack()
          }}
          headerText={product.name}
          headerSubText={product.number}
          imageCategory="item"
        />
      </React.Fragment>
    )
  }
}

const _ProductDetailsScreen: any = props => {
  let {
    navigation: {
      state: {
        params: { ownedBy, productId }
      }
    }
  } = props

  return (
    <QueryLoader
      from={ownedBy}
      graphqlQuery={GetProductById}
      graphqlQueryResultKey="getProductById"
      variables={{ productId }}
    >
      {data => (
        <UserContext.Consumer>
          {({ user }) => (
            <ProductDetailsScreen product={data} {...props} user={user} />
          )}
        </UserContext.Consumer>
      )}
    </QueryLoader>
  )
}

_ProductDetailsScreen.navigationOptions = ProductDetailsScreen.navigationOptions

export default _ProductDetailsScreen

const styles = StyleSheet.create({
  topHeader: {
    flexDirection: 'row',
    zIndex: 999,
    backgroundColor: '#ffffffc7',
    width: '100%',
    paddingVertical: 8,
    justifyContent: 'space-between',
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
