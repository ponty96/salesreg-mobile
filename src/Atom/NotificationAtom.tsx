import React from 'react'
import {
  Animated,
  Easing,
  PanResponder,
  Dimensions,
  StatusBar,
  StyleSheet,
  View,
  Platform,
  Text
} from 'react-native'
import { NotificationContext } from '../context/NotificationContext'
import Icon from './Icon'

interface IState {
  translateY: any
  translateX: any
  visible: boolean
  currentVisibleProperties: {
    title?: string
    subtitle?: string
    style?: string
  }
}

interface IProperties {
  style?: 'success' | 'warning' | 'error' | 'basic-info'
  title: string
  trigger: number
  subtitle?: string
  timeout?: number
}

interface IProps extends IProperties {
  setNotificationBanner?: (IProperties) => void
}

const AppStatusBar = ({ backgroundColor, ...props }) =>
  Platform.OS == 'ios' && (
    <View
      style={[
        styles.statusBar,
        { backgroundColor: backgroundColor || '#00b0cf' }
      ]}
    >
      <StatusBar hidden barStyle={props.barStyle || 'light-content'} />
    </View>
  )

class NotificationAtom extends React.PureComponent<IProps, IState> {
  constructor(props) {
    super(props)
    this.state = {
      translateY: new Animated.Value(-75),
      translateX: new Animated.Value(0),
      visible: false,
      currentVisibleProperties: {
        style: props.style,
        title: props.title,
        subtitle: props.subtitle
      }
    }
    this.handleSwipe()
  }

  private gestureDelay: number
  private panResponder: any
  private errorColor: string = '#E25146'
  private successColor: string = '#41CC78'
  private warningColor: string = '#FCA83A'
  private basicInfoColor: string = '429AD8'
  private timeout: number = 5000
  private timer: any

  componentDidUpdate(prevProps) {
    let { trigger } = this.props

    if (trigger && prevProps.trigger != trigger) {
      clearTimeout(this.timer)
      this.state.visible
        ? setTimeout(() => this.show(true), 500)
        : setTimeout(() => this.show(), 500)
    }
  }

  componentWillUnmount() {
    clearTimeout(this.timer)
  }

  show = (hidingAnimation?: boolean) => {
    if (hidingAnimation) {
      Animated.timing(this.state.translateY, {
        toValue: -75,
        duration: 200,
        useNativeDriver: true,
        easing: Easing.inOut(Easing.linear)
      }).start(animation => {
        if (animation.finished) {
          this.animateFromTop()
        }
      })
    } else {
      this.animateFromTop()
    }
  }

  animateFromTop = () => {
    let { timeout, style, title, subtitle } = this.props

    this.setState(
      {
        currentVisibleProperties: {
          style: style || 'success',
          title: title || '',
          subtitle: subtitle || ''
        }
      },
      () => {
        Animated.sequence([
          Animated.timing(this.state.translateY, {
            toValue: 0,
            duration: 200,
            useNativeDriver: true,
            easing: Easing.inOut(Easing.linear)
          }),
          Animated.timing(this.state.translateY, {
            toValue: -5,
            duration: 250,
            useNativeDriver: true,
            easing: Easing.inOut(Easing.ease)
          })
        ]).start(animation => {
          if (animation.finished) {
            this.timer = setTimeout(this.dismissTop, timeout || this.timeout)
            this.setState({
              visible: true
            })
          }
        })
      }
    )
  }

  dismissTop = () => {
    Animated.sequence([
      Animated.timing(this.state.translateY, {
        toValue: -75,
        duration: 200,
        useNativeDriver: true,
        easing: Easing.inOut(Easing.linear)
      })
    ]).start(animation => {
      if (animation.finished) {
        this.setState({
          visible: false
        })
      }
    })
  }

  dismissRight = () => {
    Animated.sequence([
      Animated.timing(this.state.translateX, {
        toValue: Dimensions.get('window').width,
        duration: 50,
        useNativeDriver: true,
        easing: Easing.out(Easing.linear)
      }),
      Animated.timing(this.state.translateY, {
        toValue: -75,
        duration: 100,
        useNativeDriver: true,
        easing: Easing.inOut(Easing.ease)
      }),
      Animated.timing(this.state.translateX, {
        toValue: 0,
        duration: 50,
        useNativeDriver: true,
        easing: Easing.out(Easing.linear)
      })
    ]).start(animation => {
      if (animation.finished) {
        clearTimeout(this.timer)
        this.setState({
          visible: false
        })
      }
    })
  }

  dismissLeft = () => {
    Animated.sequence([
      Animated.timing(this.state.translateX, {
        toValue: -Dimensions.get('window').width,
        duration: 50,
        useNativeDriver: true,
        easing: Easing.out(Easing.linear)
      }),
      Animated.timing(this.state.translateY, {
        toValue: -75,
        duration: 100,
        useNativeDriver: true,
        easing: Easing.inOut(Easing.ease)
      }),
      Animated.timing(this.state.translateX, {
        toValue: 0,
        duration: 50,
        useNativeDriver: true,
        easing: Easing.out(Easing.linear)
      })
    ]).start(animation => {
      if (animation.finished) {
        clearTimeout(this.timer)
        this.setState({
          visible: false
        })
      }
    })
  }

  steadyZero = () => {
    Animated.timing(this.state.translateX, {
      toValue: 0,
      duration: 100,
      useNativeDriver: true,
      easing: Easing.out(Easing.ease)
    }).start()
  }

  getColor = () => {
    let {
      currentVisibleProperties: { style }
    } = this.state
    switch (style) {
      case 'success':
        return this.successColor
      case 'error':
        return this.errorColor
      case 'warning':
        return this.warningColor
      default:
        return this.basicInfoColor
    }
  }

  handleSwipe = () => {
    this.gestureDelay = -20
    this.panResponder = PanResponder.create({
      onStartShouldSetPanResponder: () => false,
      onMoveShouldSetPanResponder: () => true,
      onPanResponderTerminationRequest: () => false,
      onPanResponderMove: (evt, gestureState) => {
        evt
        if (
          gestureState.dx > this.gestureDelay * -1 ||
          gestureState.dx < this.gestureDelay
        ) {
          let newX = gestureState.dx + this.gestureDelay
          this.state.translateX.setValue(newX)
        }
      },
      onPanResponderRelease: (evt, gestureState) => {
        evt
        if (
          gestureState.dx < 150 &&
          gestureState.dx < -150 &&
          gestureState.dx < 0
        ) {
          this.dismissLeft()
        } else if (gestureState.dx < 150) {
          this.steadyZero()
        } else {
          this.dismissRight()
        }
      }
    })
  }

  render() {
    let {
      currentVisibleProperties: { title, subtitle, style }
    } = this.state
    return (
      <React.Fragment>
        <AppStatusBar backgroundColor={this.getColor()} />
        <Animated.View
          style={[
            styles.container,
            {
              transform: [
                { translateY: this.state.translateY },
                { translateX: this.state.translateX }
              ],
              backgroundColor: this.getColor()
            }
          ]}
          {...this.panResponder.panHandlers}
        >
          <View style={{ flexDirection: 'row' }}>
            {style == 'success' && (
              <Icon
                style={[styles.successIcon, styles.icon]}
                name="ios-checkmark-circle"
                type="Ionicons"
              />
            )}
            <View
              style={{
                marginLeft: style == 'error' ? 0 : 10,
                alignSelf: 'center'
              }}
            >
              <Text style={styles.title}>{title}</Text>
              <Text style={styles.subtitle}>{subtitle}</Text>
            </View>
          </View>
          {style == 'error' && (
            <Icon
              style={[styles.successIcon, styles.icon]}
              name="ios-alert"
              type="Ionicons"
            />
          )}
        </Animated.View>
      </React.Fragment>
    )
  }
}

const _NotificationAtom = props => (
  <NotificationContext.Consumer>
    {config => <NotificationAtom {...props} {...config} />}
  </NotificationContext.Consumer>
)

export default _NotificationAtom

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'green',
    position: 'absolute',
    top: 0,
    zIndex: 1900000,
    left: 0,
    paddingHorizontal: 10,
    height: 75,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%'
  },
  icon: {
    fontSize: 50
  },
  successIcon: {
    color: '#fff'
  },
  title: {
    color: '#fff',
    fontFamily: 'AvenirNext-Bold',
    fontSize: 16
  },
  subtitle: {
    color: '#fff',
    fontFamily: 'AvenirNext-DemiBold',
    fontSize: 14
  },
  statusBar: {
    height: 20,
    marginTop: -20,
    zIndex: 2000
  }
})
