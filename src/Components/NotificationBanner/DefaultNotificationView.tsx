import React from 'react'
import {
  Animated,
  Easing,
  PanResponder,
  Dimensions,
  StyleSheet,
  View,
  Text
} from 'react-native'
import Icon from 'react-native-vector-icons/Ionicons'
import { _Store } from './Root'
import StatusBar from './StatusBar'
import { INotificationBannerProps, IBannerPosition } from './typeDefinition'

interface ICurrentVisibleProperties extends INotificationBannerProps {
  bannerPosition?: IBannerPosition
}

interface IState {
  translateY: any
  translateX: any
  visible: boolean
  currentVisibleProperties: ICurrentVisibleProperties
}

interface IProps extends INotificationBannerProps {
  trigger: number
  shouldShow: boolean
  duration: number
  autoDismiss: boolean
  bannerPosition: IBannerPosition
}

class DefaultNotificationView extends React.PureComponent<IProps, IState> {
  constructor(props) {
    super(props)
    this.state = {
      translateY: new Animated.Value(-75),
      translateX: new Animated.Value(0),
      visible: false,
      currentVisibleProperties: {}
    }
    this.handleSwipe()
  }

  private gestureDelay: number
  private panResponder: any
  private dangerColor: string = '#E25146'
  private successColor: string = '#41CC78'
  private warningColor: string = '#FCA83A'
  private basicInfoColor: string = '429AD8'
  private timeout: number = 8000
  private timer: any

  componentDidUpdate(prevProps) {
    let { trigger, shouldShow } = this.props

    if (trigger && prevProps.trigger != trigger && shouldShow) {
      clearTimeout(this.timer)
      this.state.visible
        ? setTimeout(() => this.show(true), 500)
        : setTimeout(() => this.show(), 500)
    } else if (trigger && prevProps.trigger != trigger && shouldShow == false) {
      this.dismissTop()
      clearTimeout(this.timer)
    }
  }

  componentWillUnmount() {
    clearTimeout(this.timer)
  }

  show = (hidingAnimation?: boolean) => {
    let { bannerPosition } = this.props,
      {
        currentVisibleProperties: { bannerPosition: stateBannerPosition }
      } = this.state

    if (hidingAnimation) {
      Animated.timing(this.state.translateY, {
        toValue: stateBannerPosition == 'top' ? -75 : 75,
        duration: 200,
        useNativeDriver: true,
        easing: Easing.inOut(Easing.linear)
      }).start(animation => {
        if (animation.finished) {
          bannerPosition == 'top'
            ? this.animateFromTop()
            : this.animateFromBottom()
        }
      })
    } else {
      bannerPosition == 'top' ? this.animateFromTop() : this.animateFromBottom()
    }
  }

  animateFromBottom = () => {
    let { duration, style, title, subtitle, bannerPosition } = this.props

    this.state.translateY.setValue(75)
    this.setState(
      {
        currentVisibleProperties: {
          style: style || 'success',
          title: title || '',
          subtitle: subtitle || '',
          bannerPosition
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
            toValue: 5,
            duration: 250,
            useNativeDriver: true,
            easing: Easing.inOut(Easing.ease)
          })
        ]).start(animation => {
          if (animation.finished) {
            this.timer = setTimeout(
              this.dismissBottom,
              duration || this.timeout
            )
            this.setState({
              visible: true
            })
          }
        })
      }
    )
  }

  animateFromTop = () => {
    let { duration, style, title, subtitle, bannerPosition } = this.props

    this.state.translateY.setValue(-75)
    this.setState(
      {
        currentVisibleProperties: {
          style: style || 'success',
          title: title || '',
          subtitle: subtitle || '',
          bannerPosition
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
            this.timer = setTimeout(this.dismissTop, duration || this.timeout)
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

  dismissBottom = () => {
    Animated.sequence([
      Animated.timing(this.state.translateY, {
        toValue: 75,
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
    let {
      currentVisibleProperties: { bannerPosition }
    } = this.state

    Animated.sequence([
      Animated.timing(this.state.translateX, {
        toValue: Dimensions.get('window').width,
        duration: 50,
        useNativeDriver: true,
        easing: Easing.out(Easing.linear)
      }),
      Animated.timing(this.state.translateY, {
        toValue: bannerPosition == 'top' ? -75 : 75,
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
    let {
      currentVisibleProperties: { bannerPosition }
    } = this.state

    Animated.sequence([
      Animated.timing(this.state.translateX, {
        toValue: -Dimensions.get('window').width,
        duration: 50,
        useNativeDriver: true,
        easing: Easing.out(Easing.linear)
      }),
      Animated.timing(this.state.translateY, {
        toValue: bannerPosition == 'top' ? -75 : 75,
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
      case 'danger':
        return this.dangerColor
      case 'warning':
        return this.warningColor
      case 'info':
        return this.basicInfoColor
      default:
        return '#fff'
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
      currentVisibleProperties: { title, subtitle, style, bannerPosition }
    } = this.state
    return (
      <React.Fragment>
        <StatusBar backgroundColor={this.getColor()} />
        <Animated.View
          style={[
            styles.container,
            bannerPosition == 'top' || !bannerPosition
              ? { top: 0 }
              : { bottom: 0 },
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
          <View style={{ flexDirection: 'row', marginRight: 40 }}>
            {style == 'success' && (
              <Icon
                style={[styles.successIcon, styles.icon]}
                name="ios-checkmark-circle"
              />
            )}
            <View
              style={{
                marginLeft: style == 'danger' ? 0 : 10,
                alignSelf: 'center'
              }}
            >
              <Text style={styles.title}>{title}</Text>
              <Text style={styles.subtitle}>{subtitle}</Text>
            </View>
          </View>
          {style == 'danger' && (
            <Icon style={[styles.successIcon, styles.icon]} name="ios-alert" />
          )}
        </Animated.View>
      </React.Fragment>
    )
  }
}

class DefaultNotificationViewWrapper extends React.PureComponent<{}, IProps> {
  private unsubscribeStore: () => void

  constructor(props) {
    super(props)
    this.state = {
      trigger: Date.now(),
      shouldShow: false,
      duration: 5000,
      autoDismiss: true,
      bannerPosition: 'top',
      title: '',
      subtitle: '',
      style: 'success',
      customView: null
    }

    this.listenToStore()
  }

  listenToStore = () => {
    this.unsubscribeStore = _Store.listen(() => {
      let state = _Store.getState()
      if ('notificationBanner' in state) {
        this.setState({
          ...state['notificationBanner']
        })
      }
    })
  }

  componentWillUnmount() {
    this.unsubscribeStore()
  }

  render() {
    return <DefaultNotificationView {...this.state} />
  }
}

export default DefaultNotificationViewWrapper

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'green',
    position: 'absolute',
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
  }
})
