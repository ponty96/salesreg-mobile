import firebase from 'react-native-firebase'
import Config from 'react-native-config'
import Auth from '../services/auth'
import { Platform } from 'react-native'

const Analytics = firebase.analytics()

type analyticsTypes =
  | 'REGISTER_ACCOUNT'
  | 'OPEN_APP'
  | 'ADD_PRODUCT'
  | 'CREATE_SALES_ORDER'
  | 'MAKE_INVOICE_PAYMENT'
  | 'CREATE_CUSTOMER'

async function setAppAnalytics(type: analyticsTypes, params?: any) {
  try {
    if (Config.NODE_ENVIRONMENT == 'production') {
      Analytics.setAnalyticsCollectionEnabled(true)

      let currentScreen = 'main_screen',
        currentScreenClassOverride = 'MainActivity',
        logEvent = 'app_open',
        logParams = null,
        user = JSON.parse(await Auth.getCurrentUser())

      switch (type) {
        case 'REGISTER_ACCOUNT':
          currentScreen = 'business_onboard'
          currentScreenClassOverride = 'BusinessOnboardScreen'
          logEvent = 'register_account'
          logParams = {
            business_name: params.title,
            country: params.businessCountry
          }
          break
        case 'OPEN_APP':
          currentScreen = 'home_screen'
          currentScreenClassOverride = 'HomeScreen'
          logEvent = 'open_app'
          logParams = {
            score: 5.0
          }
          break
        case 'ADD_PRODUCT':
          currentScreen = 'create_product|add_variant'
          currentScreenClassOverride =
            'CreateProductScreen|AddProductVariantScreen'
          logEvent = 'create_product|add_variant'
          logParams = {
            product_name: params.productGroupTitle
          }
          break
        case 'CREATE_SALES_ORDER':
          currentScreen = 'upsert_sales'
          currentScreenClassOverride = 'UpsertSalesOrderScreen'
          logEvent = 'create_sales_order'
          logParams = {
            for:
              params.contactName ||
              (params.existingContact && params.existingContact.contactName) ||
              '',
            amount_paid: params.amountPaid
          }
          break
        case 'MAKE_INVOICE_PAYMENT':
          currentScreen = 'upsert_invoice'
          currentScreenClassOverride = 'UpsertInvoiceScreen'
          logEvent = 'make_invoice_payment'
          logParams = {
            amount_paid: params.amountPaid
          }
          break
        case 'CREATE_CUSTOMER':
          currentScreen = 'upsert_customer'
          currentScreenClassOverride = 'UpsertContactForm'
          logEvent = 'upsert_customer'
          logParams = {
            customer_name: params.contactName,
            email: params.email
          }
          break
      }

      Analytics.setUserId(user.id)
      Analytics.setUserProperties({
        created_at: new Date().toString(),
        platform: Platform.OS
      })
      Analytics.setCurrentScreen(currentScreen, currentScreenClassOverride)
      Analytics.logEvent(logEvent, logParams)
    } else {
      Analytics.setAnalyticsCollectionEnabled(false)
    }
  } catch (err) {
    console.log(err)
  }
}

export default setAppAnalytics
