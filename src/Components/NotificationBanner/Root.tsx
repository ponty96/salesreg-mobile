import React from 'react'
import Store from './Store'
import DefaultNotificationViewWrapper from './DefaultNotificationView'

export default class Root extends React.PureComponent {
  render() {
    return (
      <React.Fragment>
        <DefaultNotificationViewWrapper />
        {this.props.children}
      </React.Fragment>
    )
  }
}

export const _Store = new Store({})
