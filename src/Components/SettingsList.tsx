import * as React from 'react'
import { StyleSheet, View, Text, Dimensions } from 'react-native'
import { color } from '../Style/Color'
import { ListItem, Left, Right, Icon } from 'native-base'

interface Category {
  section: string
  routeName: string
  showRightCaret?: boolean | true
  onPress?: any | null
}
const settingsList = (prop: { categories: Category[]; navigate: any }) => {
  return (
    <View style={styles.container}>
      {prop.categories.map((category: Category, key: number) => {
        return (
          <ListItem
            style={styles.section}
            key={key}
            onPress={() =>
              category.onPress
                ? category.onPress()
                : prop.navigate(category.routeName)
            }
          >
            <Left>
              <Text
                style={[styles.sectionText, { fontFamily: 'SourceSansPro' }]}
              >
                {category.section}
              </Text>
            </Left>
            {category.showRightCaret && (
              <Right>
                <Icon
                  name="keyboard-arrow-right"
                  type="MaterialIcons"
                  style={styles.icon}
                />
              </Right>
            )}
          </ListItem>
        )
      })}
    </View>
  )
}

export default settingsList

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
