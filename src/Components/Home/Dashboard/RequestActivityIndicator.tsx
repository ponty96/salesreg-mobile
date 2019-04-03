import React from 'react'
import { ActivityIndicator, StyleSheet, View, Platform } from 'react-native'
import PropTypes from 'prop-types'
import { color } from '../../../Style/Color'

interface IProps {
  containerStyle?: any
  color?: string
  delay?: number
}

interface IState {
  shouldRenderComponent: boolean
}

export default class RequestActivityIndicator extends React.PureComponent<
  IProps,
  IState
> {
  private timeOut: any

  constructor(props) {
    super(props)
    this.state = {
      shouldRenderComponent: false
    }
  }

  static propTypes = {
    delay: PropTypes.number,
    color: PropTypes.string,
    containerStyle: PropTypes.object
  }

  static defaultProps = {
    delay: 1000
  }

  componentDidMount() {
    let { delay } = this.props

    this.timeOut = setTimeout(() => {
      this.setState({ shouldRenderComponent: true })
    }, delay)
  }

  componentWillUnmount() {
    clearTimeout(this.timeOut)
  }

  render() {
    let { shouldRenderComponent } = this.state,
      _style = this.props.containerStyle || {}

    return shouldRenderComponent ? (
      <View style={[styles.container, _style]}>
        <ActivityIndicator
          animating={true}
          size={Platform.OS == 'android' ? 20 : 0}
          color={this.props.color || color.button}
        />
      </View>
    ) : null
  }
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1
  }
})
