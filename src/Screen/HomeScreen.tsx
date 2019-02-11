import * as React from 'react'
import Header from '../Components/Header/BaseHeader'
import Auth from '../services/auth'
import setAppAnalytics from '../Functions/setAppAnalytics'
import NavigationalInformation from '../Components/Home/NavigationInformation'
import GettingStarted from '../Components/Home/GettingStarted'

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
  }

  static navigationOptions = () => {
    return {
      header: null
    }
  }

  async componentWillMount() {
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
