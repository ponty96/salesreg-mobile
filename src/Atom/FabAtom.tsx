import * as React from 'react'
import { Fab, Icon } from 'native-base'
import { StyleSheet } from 'react-native'

import { color } from '../Style/Color'

interface IProp {
  routeName?: string
  name?: string
  type?: any
  navigation?: any
  params?: any
  image?: any
  onPress?: () => void
  goto?: { screen: string } | any
}

const FabAtom = (props: IProp) => (
  <Fab
    position="bottomRight"
    style={styles.fab}
    active={true}
    onPress={() =>
      props.onPress
        ? props.onPress()
        : props.navigation.navigate(props.routeName, props.goto)
    }
  >
    <Icon
      name={props.name}
      type={props.type ? props.type : 'Ionicons'}
      color={color.secondary}
    />
  </Fab>
)

export default FabAtom

const styles = StyleSheet.create({
  fab: {
    backgroundColor: color.button,
    zIndex: 1
  }
})
