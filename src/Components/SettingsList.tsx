import * as React from 'react'
import { StyleSheet, View, Text } from 'react-native'
import { color } from '../Style/Color'
import { ListItem, Left, Right, Icon } from 'native-base'

interface Category {
  section: string
  routeName: string
}
const settingsItem = (prop: { categories: Category[]; navigate: any }) => {
  return (
    <View style={styles.container}>
      {prop.categories.map((category: Category, key: number) => {
        return (
          <ListItem
            style={styles.section}
            key={key}
            onPress={() => prop.navigate(category.routeName)}
          >
            <Left>
              <Text
                style={[styles.sectionText, { fontFamily: 'SourceSansPro' }]}
              >
                {category.section}
              </Text>
            </Left>
            <Right>
              <Icon
                name="keyboard-arrow-right"
                type="MaterialIcons"
                style={styles.icon}
              />
            </Right>
          </ListItem>
        )
      })}
    </View>
  )
}

export default settingsItem

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF'
  },
  section: {
    marginLeft: 0,
    paddingLeft: 0,
    height: 75,
    width: '100%',
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
