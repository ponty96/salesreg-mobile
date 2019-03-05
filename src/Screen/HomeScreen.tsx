import * as React from 'react'
import Header from '../Components/Header/BaseHeader'
import Auth from '../services/auth'
import setAppAnalytics from '../Functions/setAppAnalytics'
import NavigationalInformation from '../Components/Home/NavigationInformation'
import GettingStarted from '../Components/Home/GettingStarted'
import firebase from 'react-native-firebase'
import notificationNavigationHandler from '../Functions/notificationNavigationHandler'

interface IProps {
  navigation: any
}

interface IState {
  username: string
  display: any
}

export default class HomeScreen extends React.Component<IProps, IState> {
  constructor(props) {
    super(props)
    this.state = {
      username: '',
      display: null
    }
    setAppAnalytics('OPEN_APP')
    this.handleInitialNotifications()
  }

  private foregroundMessageListener: any
  private clickedNotificationHandler: any

  static navigationOptions = () => {
    return {
      header: null
    }
  }

  async componentDidMount() {
    this.updateUserName()
    let gettingStartedProgress = await Auth.gettingStartedProgress()
    if (gettingStartedProgress == 'done') {
      this.setState({
        display: 'homescreen'
      })
    } else {
      this.setState({
        display: 'getting-started'
      })
    }
    this.handleForegroundNotifications()
    this.handleForegroundClickedNotifications()
  }

  componentWillUnmount() {
    this.foregroundMessageListener && this.foregroundMessageListener()
    this.clickedNotificationHandler && this.clickedNotificationHandler()
  }

  handleForegroundClickedNotifications = () => {
    this.clickedNotificationHandler = firebase
      .notifications()
      .onNotificationOpened(notificationOpened => {
        let {
          notification: { data }
        } = notificationOpened

        notificationNavigationHandler(
          data,
          this.props.navigation,
          'app-notification'
        )
      })
  }

  handleInitialNotifications = () => {
    firebase
      .notifications()
      .getInitialNotification()
      .then(notificationOpened => {
        let {
          notification: { data }
        } = notificationOpened

        notificationNavigationHandler(
          data,
          this.props.navigation,
          'app-notification'
        )
      })
  }

  handleForegroundNotifications = () => {
    this.foregroundMessageListener = firebase.messaging().onMessage(message => {
      let {
        _data: { id, action_type, element, element_data }
      } = message

      const notification = new firebase.notifications.Notification()
        .setNotificationId(id)
        .setTitle(
          `${element[0].toUpperCase()}${element.substr(
            1
          )} ${action_type.toLowerCase()}`
        )
        .setBody(element_data)
        .setSound('default')
        .setData(message._data)
        .android.setAutoCancel(true)
        .android.setSmallIcon('@drawable/ic_stat_yipcart_logo_icon_white')
        .android.setChannelId('all-notifications')

      firebase.notifications().displayNotification(notification)
    })
  }

  updateUserName = async () => {
    const user = JSON.parse(await Auth.getCurrentUser())
    this.setState({
      username: user.firstName
    })
  }

  render() {
    return (
      <React.Fragment>
        <Header
          title="Home"
          onPressRightIcon={() =>
            this.props.navigation.navigate('Notifications')
          }
          onPressLeftIcon={() => this.props.navigation.navigate('DrawerToggle')}
        />
        {this.state.display == 'homescreen' ? (
          <NavigationalInformation username={this.state.username} />
        ) : this.state.display == 'getting-started' ? (
          <GettingStarted
            onDone={() => this.setState({ display: 'homescreen' })}
          />
        ) : null}
      </React.Fragment>
    )
  }
}
