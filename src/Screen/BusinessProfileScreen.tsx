import React, { Component } from 'react'
import Auth from '../services/auth'
import Header from '../Components/Header/DetailsScreenHeader'
import GenericProfileDetails from '../Components/Generic/ProfileDetails'

interface IProps {
  navigation: any
}

interface IState {
  list: any
  businessName: string
  logo: string
}

class BusinessProfileScreen extends Component<IProps, IState> {
  state = {
    list: [],
    businessName: '',
    logo: ''
  }

  static navigationOptions = ({ navigation }: any) => {
    return {
      header: (
        <Header
          title="Business profile"
          onPressLeftIcon={() => navigation.goBack()}
          onPressRightIcon={() => navigation.navigate('EditBusinessProfile')}
        />
      )
    }
  }

  componentDidMount() {
    this.updateState()
  }

  updateState = async () => {
    const user = JSON.parse(await Auth.getCurrentUser())
    const location = this.parseLocation(user.company)
    this.setState({
      list: [
        {
          section: 'Email',
          value: user.company.contactEmail
        },
        {
          section: 'Currency',
          value: user.company.currency
        },
        {
          section: 'Phone',
          value: user.company.phone ? user.company.phone.number : ''
        },
        {
          section: 'Address',
          value: location
            ? [
                location.street1,
                location.city,
                location.state,
                location.country
              ]
            : null
        },
        {
          section: 'Bank',
          value: user.company.bank
            ? [
                user.company.bank.accountName,
                user.company.bank.accountNumber,
                user.company.bank.bankName
              ]
            : null
        },
        {
          section: 'About',
          value: [user.company.about]
        }
      ],
      businessName: user.company.title,
      logo: user.company.logo
    })
  }

  parseLocation = ({ branches }) => {
    const { location } = branches.find(branch => branch.type == 'head_office')
    return location
  }

  render() {
    return (
      <GenericProfileDetails
        headerText={this.state.businessName}
        sections={this.state.list}
        image={this.state.logo}
      />
    )
  }
}

export default BusinessProfileScreen
