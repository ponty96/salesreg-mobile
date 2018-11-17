import React from 'react'
import { Icon } from 'native-base'
import { View, StyleSheet } from 'react-native'

interface IProps {}

interface IState {}

export default class ImageUploadAtom extends React.PureComponent<
  IProps,
  IState
> {
  renderSelectImageContainer = (): JSX.Element => {
    return (
      <View style={[styles.imageContainer, styles.selectImageContainer]}>
        <Icon name="plus" type="Feather" style={styles.icon} />
      </View>
    )
  }

  render() {
    return this.renderSelectImageContainer()
  }
}

const styles = StyleSheet.create({
  imageContainer: {
    width: 100,
    height: 100
  },
  selectImageContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#eee'
  },
  icon: {
    fontSize: 40,
    color: '#BFBFBF'
  }
})
