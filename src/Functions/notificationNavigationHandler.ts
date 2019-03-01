import { NavigationActions } from 'react-navigation'

type INotificationType = 'fail-safe-notification' | 'app-notification'
const notificationNavigationHandler = (
  params: any,
  navigation: any,
  type: INotificationType
) => {
  if (type == 'fail-safe-notification') {
    handleFailSafeNotifications(params, navigation)
  } else {
    handleAppNotifications(params, navigation)
  }
}

const handleFailSafeNotifications = (params: any, navigation: any) => {
  let { screen, routeParams } = routeTo(params)
  navigation.navigate(screen, routeParams)
}

const handleAppNotifications = (params: any, navigation: any) => {
  let { screen, routeParams } = routeTo(params)
  const resetAction = NavigationActions.reset({
    index: 1,
    actions: [
      NavigationActions.navigate({
        routeName: 'Home'
      }),
      NavigationActions.navigate({
        routeName: screen,
        params: routeParams
      })
    ]
  })

  navigation.dispatch(resetAction)
}

const routeTo = (params: any): { screen: string; routeParams: any } => {
  let screen = '',
    routeParams = {}

  switch (params.element.toLowerCase()) {
    case 'invoice':
      screen = 'invoice'
      routeParams = { invoice: params.notificationItems[0] }
      break
    default:
      screen = ''
  }
  return { screen, routeParams }
}

export default notificationNavigationHandler
