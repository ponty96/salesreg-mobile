import * as React from 'react'
import Header from '../Components/Header/BaseHeader'
import Auth from '../services/auth'
import setAppAnalytics from '../Functions/setAppAnalytics'
// import NavigationalInformation from '../Components/Home/NavigationInformation'
import GettingStarted from '../Components/Home/GettingStarted'

interface IProps {
  navigation: any
}

interface IState {
  username: string
}

export default class HomeScreen extends React.Component<IProps, IState> {
  constructor(props) {
    super(props)
    this.state = {
      username: ''
    }
    setAppAnalytics('OPEN_APP')
  }

  static navigationOptions = ({ navigation }: any) => {
    return {
      header: (
        <Header
          title="Home"
          onPressLeftIcon={() => navigation.navigate('DrawerToggle')}
        />
      )
    }
  }

  componentWillMount() {
    this.updateUserName()
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
        {/* <NavigationalInformation username={this.state.username} /> */}
        <GettingStarted />
      </React.Fragment>
    )
  }
}
