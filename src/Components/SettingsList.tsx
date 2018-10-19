import * as React from 'react'
import { StyleSheet, View, Dimensions } from 'react-native'
import { color } from '../Style/Color'
import Icon from '../Atom/Icon'
import SalesOrderListAtom from '../Atom/ListItem/SalesOrderListAtom'

interface Category {
  section: string
  routeName: string
  showRightCaret?: boolean | true
  onPress?: any | null
  description?: string
  icon?: string
  iconType?: any
}
const SettingsList = (prop: { categories: Category[]; navigate: any }) => {
  return (
    <View style={styles.container}>
      {prop.categories.map((category: Category, key: number) => {
        return (
          <SalesOrderListAtom
            key={key}
            onPress={() =>
              category.onPress
                ? category.onPress()
                : prop.navigate(category.routeName)
            }
            firstTopText={category.section}
            bottomLeftFirstText={category.description}
            icon={
              <View style={{ marginTop: 16 }}>
                <Icon
                  type={category.iconType || 'Ionicons'}
                  name={category.icon}
                  style={{
                    fontSize: 28,
                    color: color.textColor
                  }}
                />
              </View>
            }
          />
        )
      })}
    </View>
  )
}

export default SettingsList

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF'
  },
  section: {
    marginLeft: 0,
    paddingLeft: 0,
    height: 75,
    width: Dimensions.get('screen').width - 22,
    alignSelf: 'center',
    borderBottomWidth: 1,
    backgroundColor: '#FFF',
    borderBottomColor: color.list
  },
  sectionText: {
    fontSize: 16,
    paddingLeft: 16
  },
  icon: {
    color: '#000',
    fontSize: 25
  }
})
