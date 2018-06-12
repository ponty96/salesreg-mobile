import React, { Component } from 'react'
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView
} from 'react-native'
import { Icon } from 'native-base'

import NameDisplayAtom from '../Atom/NameDisplayAtom'
import { color } from '../Style/Color'

interface IProps {
  navigation: any
}

interface IState {
  item: any
}

class BusinessDetailsScreen extends Component<IProps, IState> {
  state = {
    item: {
      businessName: 'Kay5ive Attractions',
      image:
        'https://snack-code-uploads.s3.us-west-1.amazonaws.com/~asset/9d799c33cbf767ffc1a72e53997218f7',
      address: '6 Salem street Morogbo, Lagos',
      email: 'kay5@gmail.com',
      description:
        'Simply dummy text of the printing and typesetting industry. ' +
        "Loren Ipsum has been the industry's standard dummy text ever since the 1550s, when an unknown printer took a " +
        'gallery of type and scrambled it'
    }
  }

  static navigationOptions = ({ navigation }: any) => {
    const { params } = navigation.state
    return {
      title: 'Business profile',
      headerLeft: (
        <Icon
          name={'md-arrow-back'}
          style={styles.headerIcon}
          onPress={() => {
            navigation.goBack()
          }}
        />
      ),
      headerRight: (
        <TouchableOpacity
          onPress={() => {
            navigation.navigate('NewBusiness', {
              item: params.item
            })
          }}
        >
          <View style={styles.headerItem}>
            <Icon
              name={'pencil'}
              style={styles.headerIconLogout}
              type={'MaterialCommunityIcons'}
            />
            <Text style={styles.headerText}>Edit</Text>
          </View>
        </TouchableOpacity>
      )
    }
  }

  componentDidMount() {
    this.props.navigation.setParams({
      item: this.state.item
    })
  }

  renderDetail = (label: string, detail: string) => {
    return (
      <View>
        <Text style={styles.label}>{label}</Text>
        <Text style={styles.details}>{detail}</Text>
      </View>
    )
  }

  render() {
    return (
      <ScrollView style={styles.container}>
        <View style={styles.compartment}>
          <NameDisplayAtom
            businessName={this.state.item.businessName}
            image={this.state.item.image}
            style={styles.nameDisplay}
          />
          {this.renderDetail('Location', '6 Salem street Morogbo, Lagos')}
        </View>

        <View style={styles.compartment}>
          {this.renderDetail('Email', 'kay5@gmail.com')}
        </View>

        <View style={styles.compartment}>
          {this.renderDetail('Category', 'Product, Services')}
          {this.renderDetail('Currency', 'Naira(\u20A6)')}
        </View>

        <View style={styles.compartment}>
          {this.renderDetail(
            'Description',
            "Simply dummy text of the printing and typesetting industry. Lorem ipsum has been the industry's standard" +
              'dummy text ever since the 1500s, when an unknown printer took a gallery of typa and scrambled it'
          )}
        </View>
      </ScrollView>
    )
  }
}

export default BusinessDetailsScreen

const styles = StyleSheet.create({
  compartment: {
    borderBottomWidth: 1,
    borderBottomColor: color.listBorderColor
  },

  detailItemWrapper: {
    marginVertical: 10
  },
  details: {
    marginHorizontal: '10%',
    marginBottom: '3%'
  },
  nameDisplay: {
    marginTop: '5%',
    marginBottom: '8%',
    marginLeft: '15%'
  },
  label: {
    color: color.primary,
    marginLeft: '10%',
    marginTop: '3%',
    marginBottom: '2%'
  },
  headerText: {
    color: color.secondary,
    fontWeight: 'bold',
    paddingRight: 16,
    fontSize: 18
  },
  headerIcon: {
    color: color.secondary,
    padding: 16,
    fontSize: 28
  },
  headerIconLogout: {
    color: color.secondary,
    padding: 8,
    fontSize: 28
  },
  detailsWrapper: {
    marginVertical: 25
  },
  container: {
    flex: 1,
    backgroundColor: color.secondary
  },
  headerItem: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center'
  }
})
