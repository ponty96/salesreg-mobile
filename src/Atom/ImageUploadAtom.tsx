import React from 'react'
import { Icon } from 'native-base'
import {
  View,
  StyleSheet,
  TouchableHighlight,
  ImageBackground
} from 'react-native'
import ImagePicker from 'react-native-image-crop-picker'

interface IProps {}

interface IState {
  image: any
}

export default class ImageUploadAtom extends React.PureComponent<
  IProps,
  IState
> {
  state = {
    image: null
  }

  selectImage = () => {
    ImagePicker.openPicker({
      width: 300,
      includeBase64: true,
      height: 400,
      cropping: true
    }).then((image: any) => {
      console.log(image)
      this.setState({
        image
      })
    })
  }

  renderImage = (): JSX.Element => {
    let {
      image: { data, mime }
    } = this.state

    return (
      <ImageBackground
        style={styles.imageContainer}
        source={{
          uri: `data:${mime};base64,${data}`
        }}
      />
    )
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
    return this.state.image
      ? this.renderImage()
      : this.renderSelectImageContainer()
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
