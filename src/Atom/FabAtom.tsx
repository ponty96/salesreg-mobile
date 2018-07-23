import * as React from 'react'
import { Icon, Fab } from 'native-base'
import { StyleSheet } from 'react-native'
import { color } from '../Style/Color'

interface IProp {
  routeName: string
  name?: string
  type?: any
  navigation: any
  params?: any
  image?: any
  goto?: { screen: string }
}

const fabAtom = (props: IProp) => (
  <Fab
    position="bottomRight"
    style={styles.fab}
    active={true}
    onPress={() => props.navigation.navigate(props.routeName, props.goto)}
  >
    <Icon
      name={props.name}
      type={props.type ? props.type : 'Ionicons'}
      color={color.secondary}
    />
  </Fab>
)

export default fabAtom

const styles = StyleSheet.create({
  fab: {
    backgroundColor: color.button
  }
})
