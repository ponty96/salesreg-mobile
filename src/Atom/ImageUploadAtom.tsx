import React from 'react'
import { Icon } from 'native-base'
import { View, StyleSheet, TouchableHighlight } from 'react-native'
import ImagePicker from 'react-native-image-crop-picker'

interface IProps {}

interface IState {
  dataURI: string
}

export default class ImageUploadAtom extends React.PureComponent<
  IProps,
  IState
> {
  state = {
    dataURI: ''
  }

  selectImage = () => {
    ImagePicker.openPicker({
      width: 300,
      height: 400,
      cropping: true
    }).then(image => {
      console.log(image)
    })
  }

  renderImage = (): JSX.Element => {
    return null
  }

  renderSelectImageContainer = (): JSX.Element => {
    return (
      <TouchableHighlight onPress={this.selectImage}>
        <View style={[styles.imageContainer, styles.selectImageContainer]}>
          <Icon name="plus" type="Feather" style={styles.icon} />
        </View>
      </TouchableHighlight>
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
