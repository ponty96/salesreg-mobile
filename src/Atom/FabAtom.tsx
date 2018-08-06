import * as React from 'react'
import { Icon, Fab } from 'native-base'
import { StyleSheet } from 'react-native'
import { color } from '../Style/Color'

const FabAtom = (props: any) => (
  <Fab
    position="bottomRight"
    style={styles.fab}
    active={true}
    onPress={() => props.navigation.navigate(props.routeName, props.params)}
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
