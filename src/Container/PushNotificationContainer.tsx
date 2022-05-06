import React from 'react'
import { PushNotificationContext } from '../context/PushNotificationContext'
import notificationNavigationHandler from '../Functions/notificationNavigationHandler'

interface IProps {
  data: any
  id: number
  navigation: any
}

class PushNotificationContainer extends React.PureComponent<IProps> {
  componentDidUpdate(prevProps) {
    if (this.props.id != prevProps.id && this.props.navigation) {
      notificationNavigationHandler(
        this.props.data,
        this.props.navigation,
        'app-notification'
      )
    } else if (
      this.props.navigation != prevProps.navigation &&
      !prevProps.navigation &&
      this.props.data
    ) {
      notificationNavigationHandler(
        this.props.data,
        this.props.navigation,
        'app-notification'
      )
    }
  }

  render() {
    return this.props.children
  }
}

const _PushNotificationContainer: any = props => (
  <PushNotificationContext.Consumer>
    {({ id, data, navigation }) => (
      <PushNotificationContainer
        {...props}
        data={data}
        id={id}
        navigation={navigation}
      />
    )}
  </PushNotificationContext.Consumer>
)

export default _PushNotificationContainer
