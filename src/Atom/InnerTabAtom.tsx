import { TabNavigator } from 'react-navigation'
import TabActivitiesScreen from '../Screen/TabActivitiesScreen'
import TabDetailsScreen from '../Screen/TabDetailsScreen'
import { color } from '../Style/Color'

const innerTabAtom = TabNavigator(
  {
    Activities: {
      screen: TabActivitiesScreen
    },
    Details: {
      screen: TabDetailsScreen
    }
  },
  {
    tabBarOptions: {
      activeTintColor: color.check,
      inactiveTintColor: color.secondary,
      showLabel: true,
      style: {
        backgroundColor: color.primary,
        height: 60,
        paddingVertical: 8
      },
      indicatorStyle: {
        backgroundColor: color.check
      },
      upperCaseLabel: true
    },
    animationEnabled: false,
    swipeEnabled: true
  }
)

export default innerTabAtom
