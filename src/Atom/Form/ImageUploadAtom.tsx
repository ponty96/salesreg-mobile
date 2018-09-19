import React from 'react'
import { View, StyleSheet, Image, Text, TouchableHighlight } from 'react-native'
import Icon from '../Icon'
import { color } from '../../Style/Color'
import ImagePicker from 'react-native-image-crop-picker'
import { ActionSheet } from 'native-base'

interface IProps {
  images: string[]
  handleImagesUpload: (images: string[]) => void
  underneathText?: string
  error?: any
}
export default class ImageUploadAtom extends React.PureComponent<IProps> {
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
      width: 300,
      height: 300,
      cropping: true,
      multiple: true,
      mediaType: 'photo',
      includeBase64: true
    }).then(images => {
      console.log(images)
    })
  }

  openCamera = () => {
    ImagePicker.openCamera({
      width: 300,
      height: 300,
      cropping: true,
      multiple: true,
      mediaType: 'photo',
      includeBase64: true
    }).then(images => {
      console.log('images', images)
    })
  }
  render() {
    return (
      <View>
        <TouchableHighlight
          style={styles.placeholderWrapper}
          onPress={this.handleImageUpload}
        >
          {this.renderMainImagePlaceholder()}
        </TouchableHighlight>
        <TouchableHighlight onPress={this.handleImageUpload}>
          <Text
            style={{
              color: color.button,
              alignSelf: 'center',
              marginVertical: 20,
              fontSize: 18,
              fontFamily: 'AvenirNext-Medium'
            }}
          >
            <Icon
              name="upload"
              type="Entypo"
              style={{
                color: color.button,
                fontSize: 22,
                paddingHorizontal: 16
              }}
            />
            <Text>UPLOAD</Text>
          </Text>
        </TouchableHighlight>
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

  renderMainImagePlaceholder = (): JSX.Element => {
    let source = {}
    if (this.props.images.length > 0) {
    } else {
      source = require('../../../assets-v1/image-upload.png')
    }

    return <Image source={source} style={styles.imagePlaceholder} />
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
