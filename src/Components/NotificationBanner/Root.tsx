import React from 'react'
import Store from './Store'

export default class Root extends React.PureComponent {
  render() {
    return <React.Fragment>{this.props.children}</React.Fragment>
  }
}

export const _Store = new Store({})
