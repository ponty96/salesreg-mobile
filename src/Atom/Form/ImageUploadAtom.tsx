import React from 'react'
import { View, StyleSheet, Image, Text, TouchableOpacity } from 'react-native'
import { color } from '../../Style/Color'
import ImagePicker from 'react-native-image-crop-picker'
import { ActionSheet, Thumbnail } from 'native-base'
import ImageUploadHandler from './../ImageUploadHandler'

interface IProps {
  image: string
  handleImageUpload: (image: string) => void
  underneathText?: string
  error?: any
}
interface IState {
  imageToUpload: any
}
export default class ImageUploadAtom extends React.PureComponent<
  IProps,
  IState
> {
  state = {
    imageToUpload: null
  }
  handleImageUpload = () => {
    ActionSheet.show(
      {
        options: ['Take Photo', 'Photo Library', 'Cancel'],
        cancelButtonIndex: 2,
        title: 'Upload Image'
      },
      buttonIndex => {
        switch (buttonIndex) {
          case 0:
            this.openCamera()
          case 1:
            this.openGallery()
          default:
            break
        }
      }
    )
  }

  openGallery = () => {
    ImagePicker.openPicker({
      width: 840,
      height: 840,
      cropping: true,
      mediaType: 'photo',
      includeBase64: true
    }).then(image => {
      this.setState({ imageToUpload: image })
    })
  }

  openCamera = () => {
    ImagePicker.openCamera({
      width: 840,
      height: 840,
      cropping: true,
      mediaType: 'photo',
      includeBase64: true
    }).then(image => {
      this.setState({ imageToUpload: image })
    })
  }

  removeImage = () => {
    this.setState({ imageToUpload: null }, () => {
      this.props.handleImageUpload(null)
    })
  }

  handleImageValueSet = image => {
    const {
      body: { postResponse }
    } = image
    this.props.handleImageUpload(postResponse.location)
  }

  renderSelectImagePlaceholder = (): JSX.Element => {
    if (this.props.image) {
      return this.renderDefaultImage()
    } else {
      return (
        <TouchableOpacity
          style={styles.placeholderWrapper}
          onPress={this.handleImageUpload}
        >
          <Image
            source={require('../../../assets-v1/image-upload.png')}
            style={styles.imagePlaceholder}
          />
        </TouchableOpacity>
      )
    }
  }

  renderDefaultImage = () => {
    return (
      <View>
        <Thumbnail
          source={{
            uri: this.props.image
          }}
          style={{ width: 300, height: 300, borderRadius: 0 }}
        />
        <TouchableOpacity onPress={this.handleImageUpload}>
          <Text
            style={{
              color: color.button,
              alignSelf: 'center',
              marginVertical: 20,
              fontSize: 18,
              fontFamily: 'AvenirNext-Medium'
            }}
          >
            Change Photo
          </Text>
        </TouchableOpacity>
      </View>
    )
  }

  renderUploadImage = () => {
    return (
      <ImageUploadHandler
        onRemoveImage={this.removeImage}
        onImageSet={this.handleImageValueSet}
        controlled={true}
        image={this.state.imageToUpload}
        style={{ width: 300, height: 300 }}
      />
    )
  }
  render() {
    return (
      <View>
        {!this.state.imageToUpload ? (
          this.renderSelectImagePlaceholder()
        ) : (
          <View />
        )}
        {this.state.imageToUpload ? this.renderUploadImage() : <View />}
        {this.renderUnderNeathText()}
      </View>
    )
  }

  renderUnderNeathText = () => {
    if (this.props.error || this.props.underneathText) {
      return (
        <Text
          style={[
            styles.underneathText,
            {
              fontFamily: 'AvenirNext-Regular',
              color: this.props.error ? 'red' : color.principal
            }
          ]}
        >
          {this.props.error || this.props.underneathText}
        </Text>
      )
    } else {
      return null
    }
  }
}

const styles = StyleSheet.create({
  placeholderWrapper: {
    backgroundColor: color.listBorderColor,
    width: 300,
    height: 300,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 24
  },
  imagePlaceholder: {
    width: 250,
    height: 250
  },
  underneathText: {
    marginLeft: 0,
    color: color.textColor,
    fontSize: 14,
    marginBottom: 0,
    marginTop: 0,
    paddingLeft: 8,
    fontFamily: 'AvenirNext-Regular',
    paddingVertical: 0
  }
})
