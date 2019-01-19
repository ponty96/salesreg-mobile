import React, { Component } from 'react'
import Header from '../Components/Header/DetailsScreenHeader'
import GenericProfileDetails from '../Components/Generic/ProfileDetails'
import { Countries } from '../utilities/data/picker-lists'
import Auth from '../services/auth'

interface IProps {
  navigation: any
}

interface IState {
  list: any
  businessName: string
  logo: string
}

export default class BusinessProfileScreen extends Component<IProps, IState> {
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
    console.log('The user is ', user)
    const location = this.parseLocation(user.company)
    const country = Countries.find(country => country.value == location.country)
    this.setState({
      list: [
        {
          section: 'Business email',
          value: user.company.contactEmail
        },
        {
          section: 'Business email',
          value: user.company.slug
        },
        {
          section: 'Currency',
          value: user.company.currency
        },
        {
          section: 'Phone',
          value: user.company.phone
            ? `${country ? country.subLabel : ''} ${user.company.phone.number}`
            : ''
        },
        {
          section: 'Address',
          value: location
            ? [
                location.street1,
                location.city,
                location.state,
                country ? country.mainLabel : ''
              ]
            : null
        },
        {
          section: 'Facebook',
          value: user.company.facebook
        },
        {
          section: 'Instagram',
          value: user.company.instagram
        },
        {
          section: 'Twitter',
          value: user.company.twitter
        },
        {
          section: 'linkedIn',
          value: user.company.linkedin
        },
        {
          section: 'About',
          value: [user.company.about],
          hideBody: !user.company.about ? true : false
        }
      ],
      businessName: user.company.title,
      logo: user.company.logo || ''
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
