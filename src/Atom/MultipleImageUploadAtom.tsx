import React from 'react'
import { StyleSheet, View, TouchableOpacity } from 'react-native'
import { Icon } from 'native-base'
import ImagePicker from 'react-native-image-crop-picker'
import ImageUploadAtom from './ImageUploadAtom'

interface IProps {
  onSuccess?: (key, response) => void
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
      width: 300,
      includeBase64: true,
      height: 400,
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
            onSuccess={response => this.props.onSuccess(index, response)}
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
    backgroundColor: '#eee',
    width: 130,
    height: 130
  },
  image: {
    marginTop: 10,
    marginLeft: 10,
    width: 130,
    height: 130
  },
  icon: {
    fontSize: 50,
    color: '#BFBFBF'
  }
})
