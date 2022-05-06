import React from 'react'
import { View } from 'react-native'
import { Root } from 'native-base'
import { ApolloProvider } from 'react-apollo'
import client from './client'
import { createStore, applyMiddleware } from 'redux'
import { Provider } from 'react-redux'
import thunk from 'redux-thunk'
import logger from 'redux-logger'
import codePush from 'react-native-code-push'
import ViewOverflow from 'react-native-view-overflow'
import Config from 'react-native-config'
import OneSignal from 'react-native-onesignal'

import Routes from './Navigation/Routes'
import Auth from './services/auth'
import { AuthenticateClientGQL } from './graphql/client-mutations/authenticate'
import { SingleUserGQL } from './graphql/queries/Authenticate'
import { UserContext } from './context/UserContext'
import { appReducers } from './store/reducers'
import setupSentry from './Functions/sentry'
import { Root as NotificationRoot } from './Components/NotificationBanner'
import { upsertMobileDevice } from './services/MobileDevice'
import pushNotificationWrapper from './Functions/PushNotificationWrapper'
import { PushNotificationContext } from './context/PushNotificationContext'
import PushNotificationContainer from './Container/PushNotificationContainer'
import StatusBarAtom from './Atom/StatusBarAtom'

const store = createStore(appReducers, applyMiddleware(thunk, logger))
const pushOptions = {
  checkFrequency: codePush.CheckFrequency.ON_APP_START,
  updateDialog: {
    appendReleaseDescription: true
  },
  installMode: codePush.InstallMode.ON_NEXT_RESTART
}

interface IProps {
  onSetPushNotificationData: (data) => void
}

class App extends React.Component<IProps> {
  constructor(props) {
    super(props)
    OneSignal.init('ec30c28b-6108-4f40-8ad1-019144f28afe', {
      kOSSettingsKeyAutoPrompt: true
    })

    OneSignal.addEventListener('opened', this.onOpened)
    OneSignal.addEventListener('ids', this.onIds)
    OneSignal.configure()
  }

  state = {
    loading: true,
    user: {},
    gettingStartedProgress: null,
    resetUserContext: user => this.setState({ user: user || {} }),
    resetGettingStartedProgress: gettingStartedProgress =>
      this.setState({ gettingStartedProgress: gettingStartedProgress || null })
  }

  async componentDidMount() {
    this.authenticate()
    this.setState({ loading: true })
    OneSignal.inFocusDisplaying(2)
  }

  componentWillUnmount() {
    OneSignal.removeEventListener('opened', this.onOpened)
    OneSignal.removeEventListener('ids', this.onIds)
  }

  onOpened = openResult => {
    this.props.onSetPushNotificationData(
      openResult.notification.payload.additionalData
    )
  }

  onIds = device => {
    console.log('The device ', device)
    pushNotificationWrapper.setFCMToken(device.pushToken)
  }

  authenticate = async () => {
    const token = await Auth.getToken()
    const refreshToken = await Auth.getRefreshToken()

    if (token && refreshToken) {
      const user = JSON.parse(await Auth.getCurrentUser())
      const gettingStartedProgress = await Auth.gettingStartedProgress()
      if (Config.NODE_ENVIRONMENT != 'development') {
        setupSentry(user)
      }
      client.mutate({
        mutation: AuthenticateClientGQL,
        variables: { user: user }
      })
      client.query({
        query: SingleUserGQL,
        variables: { id: user.id }
      })

      this.setState({
        loading: false,
        user,
        gettingStartedProgress: gettingStartedProgress || null
      })

      upsertMobileDevice(client, user)
    } else {
      this.setState({ loading: false })
    }
  }

  render() {
    let {
      user,
      resetUserContext,
      gettingStartedProgress,
      resetGettingStartedProgress
    } = this.state
    return (
      // check if user is on IphoneX and use View
      <ViewOverflow style={{ flex: 1 }}>
        <NotificationRoot>
          <PushNotificationContainer>
            <View style={{ paddingTop: 0, flex: 1 }}>
              <Provider store={store}>
                <UserContext.Provider
                  value={{
                    user,
                    resetUserContext,
                    gettingStartedProgress,
                    resetGettingStartedProgress
                  }}
                >
                  <ApolloProvider client={client}>
                    <Root>
                      <StatusBarAtom />
                      <Routes client={client} />
                    </Root>
                  </ApolloProvider>
                </UserContext.Provider>
              </Provider>
            </View>
          </PushNotificationContainer>
        </NotificationRoot>
      </ViewOverflow>
    )
  }
}

const _App = props => (
  <PushNotificationContext.Consumer>
    {({ onSetPushNotificationData }) => (
      <App {...props} onSetPushNotificationData={onSetPushNotificationData} />
    )}
  </PushNotificationContext.Consumer>
)

const YipCartApp = codePush(pushOptions)(_App)

export default YipCartApp
