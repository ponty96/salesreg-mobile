import React from 'react'
import Icon from './Icon'

interface IProps {
  status: string
}

export default class ExportIconAtom extends React.PureComponent<IProps, any> {
  render() {
    if (this.props.status === 'paid') {
      return (
        <Icon
          name="md-checkmark"
          style={{
            fontSize: 20,
            color: '#FFF',
            position: 'absolute',
            left: 20,
            top: 27,
            zIndex: 1,
            overflow: 'visible'
          }}
        />
      )
    } else {
      return (
        <Icon
          name="md-checkmark"
          style={{
            fontSize: 20,
            color: 'transparent',
            position: 'absolute',
            left: 20,
            top: 27,
            zIndex: 1,
            overflow: 'visible'
          }}
        />
      )
    }
  }
}
