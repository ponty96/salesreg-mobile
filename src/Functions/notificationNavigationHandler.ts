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
  navigation.navigate(screen, routeParams)
}

const routeTo = (params: any): { screen: string; routeParams: any } => {
  let screen = '',
    routeParams = {},
    _elementId = 0

  switch (params.element.toLowerCase()) {
    case 'invoice':
      screen = 'InvoiceDetails'
      _elementId = params.elementId || params.element_id
      routeParams = {
        ownedBy: 'notifications',
        from: 'Invoices',
        invoiceId: _elementId
      }
      break
    case 'product':
      let _actionType = params.actionType || params.action_type
      _elementId = params.elementId || params.element_id
      screen = _actionType == 'restocked' ? '' : 'ProductDetails'
      routeParams =
        _actionType == 'restocked'
          ? {}
          : { ownedBy: 'notifications', productId: _elementId }
      break
    case 'order':
      screen = 'SalesDetails'
      _elementId = params.elementId || params.element_id
      routeParams = { ownedBy: 'notifications', orderId: _elementId }
      break
    case 'delivery':
      screen = 'DeliveryFees'
      _elementId = null
      routeParams = { ownedBy: 'notifications', orderId: _elementId }
      break
    default:
      screen = ''
  }
  return { screen, routeParams }
}

export default notificationNavigationHandler
