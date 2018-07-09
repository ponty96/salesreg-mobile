import { TabNavigator } from 'react-navigation'
import CustomerTabActivitiesScreen from '../Screen/CustomerTabActivitiesScreen'
import CustomerTabDetailsScreen from '../Screen/CustomerTabDetailsScreen'
import { color } from '../Style/Color'

const innerTabAtom = TabNavigator(
  {
    Activities: {
      screen: CustomerTabActivitiesScreen
    },
    Details: {
      screen: CustomerTabDetailsScreen
    }
  },
  {
    tabBarOptions: {
      activeTintColor: color.check,
      inactiveTintColor: color.secondary,
      showLabel: true,
      style: {
        backgroundColor: color.primary,
        height: 48,
        padding: 0,
        margin: 0
      },
      labelStyle: { fontSize: 16, fontFamily: 'SourceSansPro_Semibold' },
      indicatorStyle: {
        backgroundColor: color.check,
        marginTop: 20
      },
      upperCaseLabel: true
    },
    animationEnabled: false,
    swipeEnabled: true
  }
)

export default innerTabAtom
