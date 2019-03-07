import * as React from 'react'
import Header from '../Components/Header/BaseHeader'
import Auth from '../services/auth'
import setAppAnalytics from '../Functions/setAppAnalytics'
import NavigationalInformation from '../Components/Home/NavigationInformation'
import GettingStarted from '../Components/Home/GettingStarted'
import { PushNotificationContext } from '../context/PushNotificationContext'

interface IProps {
  navigation: any
  onSetNavigation: (navigation) => void
}

interface IState {
  username: string
  display: any
}

class HomeScreen extends React.Component<IProps, IState> {
  constructor(props) {
    super(props)
    this.state = {
      username: '',
      display: null
    }
    setAppAnalytics('OPEN_APP')
    this.props.onSetNavigation(this.props.navigation)
  }

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

const _HomeScreen: any = props => (
  <PushNotificationContext.Consumer>
    {({ onSetNavigation }) => (
      <HomeScreen onSetNavigation={onSetNavigation} {...props} />
    )}
  </PushNotificationContext.Consumer>
)

_HomeScreen.navigationOptions = HomeScreen.navigationOptions

export default _HomeScreen
