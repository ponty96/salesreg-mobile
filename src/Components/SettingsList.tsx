import * as React from 'react'
import { StyleSheet, View, Dimensions, FlatList } from 'react-native'
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
const SettingsList = (props: { categories: Category[]; navigate: any }) => {
  return (
    <View style={styles.container}>
      <FlatList
        data={props.categories}
        keyExtractor={item => item.section}
        renderItem={({ item: category }: any) => (
          <SalesOrderListAtom
            onPress={() =>
              category.onPress
                ? category.onPress()
                : props.navigate(category.routeName)
            }
            firstTopText={category.section}
            bottomLeftFirstText={category.description}
            icon={
              <View
                style={{
                  marginRight: 10
                }}
              >
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
        )}
      />
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
