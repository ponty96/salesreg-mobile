import React from 'react'
import { StyleSheet, View, TouchableOpacity } from 'react-native'
import { Icon } from 'native-base'
import ImagePicker from 'react-native-image-crop-picker'
import ImageUploadAtom from './ImageUploadAtom'

interface IProps {
  onImageSet?: (key, response) => void
}

interface IState {
  images?: {}
}

export default class MultipleImageUploadAtom extends React.PureComponent<
  IProps,
  IState
> {
  state = {
    images: {}
  }

  selectImage = () => {
    ImagePicker.openPicker({
      width: 840,
      height: 840,
      includeBase64: true,
      cropping: true
    }).then((image: any) => {
      this.setState({
        images: { ...this.state.images, [Date.now()]: image }
      })
    })
  }

  removeImage = index => {
    let newImgState = {}
    Object.keys(this.state.images).forEach(key => {
      if (index != key) {
        newImgState[key] = this.state.images[key]
      }
    })

    this.setState({
      images: newImgState
    })
  }

  renderSelectImageContainer = (): JSX.Element => {
    return (
      <TouchableOpacity onPress={this.selectImage}>
        <View style={[styles.selectImageContainer, styles.image]}>
          <Icon name="plus" type="Feather" style={styles.icon} />
        </View>
      </TouchableOpacity>
    )
  }

  render() {
    return (
      <View style={styles.container}>
        {Object.keys(this.state.images).map(index => (
          <ImageUploadAtom
            key={index}
            onRemoveImage={() => this.removeImage(index)}
            onImageSet={response => this.props.onImageSet(index, response)}
            image={this.state.images[index]}
            style={styles.image}
            controlled={true}
          />
        ))}
        {this.renderSelectImageContainer()}
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    flexWrap: 'wrap'
  },
  selectImageContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#eee'
  },
  image: {
    marginTop: 5,
    marginLeft: 5,
    width: 110,
    height: 110
  },
  icon: {
    fontSize: 50,
    color: '#BFBFBF'
  }
})
