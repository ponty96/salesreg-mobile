import { TabNavigator } from 'react-navigation'
import VendorTabActivitiesScreen from '../Screen/VendorTabActivitiesScreen'
import VendorTabDetailsScreen from '../Screen/VendorTabDetailsScreen'
import { color } from '../Style/Color'

const innerTabAtom = TabNavigator(
  {
    Activities: {
      screen: VendorTabActivitiesScreen
    },
    Details: {
      screen: VendorTabDetailsScreen
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
