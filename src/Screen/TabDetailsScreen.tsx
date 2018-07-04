import React, { Component } from 'react'
import DetailsList from '../Components/DetailsList'

interface IProps {
  navigation: any
}

interface IState {
  list: any
}

class TabDetailsScreen extends Component<IProps, IState> {
  state = {
    // item: this.props.navigation.state.params.data
    list: [
      {
        section: 'Phone',
        value: '09034567889'
      },
      {
        section: 'Email',
        value: 'ayo@gmail.com'
      },
      {
        section: 'Home Address',
        value: 'No 12 Sura Mogaji street, Ilupeju, Lagos'
      },
      {
        section: 'Currency',
        value: '\u20A6 Nigerian Naira'
      },
      {
        section: 'Label 5',
        value: 'Content 5'
      },
      {
        section: 'Label 6',
        value: 'Content 6'
      },
      {
        section: 'Label 7',
        value: 'Content 7'
      }
    ]
  }

  render() {
    return <DetailsList list={this.state.list} />
  }
}

export default TabDetailsScreen
