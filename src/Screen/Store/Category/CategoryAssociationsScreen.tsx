import * as React from 'react'
import { Alert, FlatList, StyleSheet, View } from 'react-native'
import Header from '../../../Components/Header/DetailsScreenHeader'
import SalesOrderListAtom from '../../../Atom/ListItem/SalesOrderListAtom'
import { color } from '../../../Style/Color'
import { GreenCanvas } from '../../../Atom/GreenCanvas'

interface IProps {
  navigation: any
}

export default class CategoryAssociationsScreen extends React.Component<
  IProps
> {
  static navigationOptions = ({ navigation }: any) => {
    return {
      header: (
        <Header
          title=""
          onPressRightIcon={() => Alert.alert('Search button pressed.')}
          onPressLeftIcon={() => navigation.goBack()}
          hideRightMenu={true}
        />
      )
    }
  }

  parseData = (category: any) => {
    const { products, services } = category
    return this.parseProducts(products).concat(this.parseServices(services))
  }

  parseProducts = (products = []): any[] => {
    return products.map(product => ({
      firstTopText: product.name,
      bottomLeftFirstText: '',
      bottomLeftSecondText: '',
      topRightText: product.quantity,
      bottomRightText: `\u20A6 ${parseFloat(product.sellingPrice).toFixed(2)}`,
      /***
       * TODO Add featuredImage to services on the API
       */
      avatar:
        product.featuredImage ||
        'https://snack-code-uploads.s3.us-west-1.amazonaws.com/~asset/9d799c33cbf767ffc1a72e53997218f7',
      type: 'product'
    }))
  }

  parseServices = (services = []): any[] => {
    return services.map(service => ({
      firstTopText: service.name,
      bottomLeftFirstText: '',
      bottomLeftSecondText: '',
      topRightText: '',
      bottomRightText: `\u20A6 ${parseFloat(service.price).toFixed(2)}`,
      /***
       * TODO Add featuredImage to services on the API
       */
      avatar:
        service.image ||
        'https://snack-code-uploads.s3.us-west-1.amazonaws.com/~asset/9d799c33cbf767ffc1a72e53997218f7',
      type: 'service'
    }))
  }

  render() {
    /**
     * TODO
     * Change empty list text
     */
    const category = this.props.navigation.getParam('category', {})
    return (
      <View style={styles.container}>
        <GreenCanvas title={`${category.title} \nProducts and Services`} />
        <FlatList
          data={this.parseData(category)}
          renderItem={({ item }: any) => <SalesOrderListAtom {...item} />}
          keyExtractor={item => item.id}
        />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: color.secondary
  }
})
