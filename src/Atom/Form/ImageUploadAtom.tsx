import React from 'react'
import { View, StyleSheet, Image, Text, TouchableOpacity } from 'react-native'
import { color } from '../../Style/Color'
import ImagePicker from 'react-native-image-crop-picker'
import { ActionSheet } from 'native-base'
import MediaUploadHandlerAtom from './../MediaUploadHandlerAtom'
import CachedImageAtom from '../CachedImageAtom'
import { connect } from 'react-redux'

interface IProps {
  image: string
  handleImageUpload: (image: string) => void
  underneathText?: string
  error?: any
  storeMedias?: any
  reduxMediaUploadClass: string | number
}
interface IState {
  imageToUpload: any
  prevImageUploaded: string
}

class ImageUploadAtom extends React.PureComponent<IProps, IState> {
  state = {
    imageToUpload: null,
    isInProcessing:
      this.props.storeMedias[0] && this.props.storeMedias[0].state,
    prevImageUploaded: this.props.image
  }

  componentDidUpdate(prevProps) {
    if (
      prevProps.storeMedias != this.props.storeMedias &&
      this.props.storeMedias.length == 0
    ) {
      this.setState({
        imageToUpload: null
      })
    }
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
      this.setState({ prevImageUploaded: null, imageToUpload: image })
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
      this.setState({ prevImageUploaded: null, imageToUpload: image })
    })
  }

  handleImageValueSet = image => {
    let url = image[Object.keys(image)[0]]
    this.props.handleImageUpload(url)
    if (!url) {
      this.setState({
        imageToUpload: url
      })
    }
  }

  renderSelectImagePlaceholder = (): JSX.Element => {
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

  renderDefaultImage = () => {
    return (
      <View>
        <CachedImageAtom
          uri={this.props.image}
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
      <View>
        <MediaUploadHandlerAtom
          onMediaSet={this.handleImageValueSet}
          reduxMediaUploadClass={this.props.reduxMediaUploadClass}
          media={this.state.imageToUpload}
          hideRemoveButton
          style={{ width: 300, height: 300 }}
          uploadType="single"
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

  render() {
    return (
      <View>
        {this.state.prevImageUploaded && this.state.isInProcessing == undefined
          ? this.renderDefaultImage()
          : this.props.storeMedias.length > 0 || this.state.imageToUpload
          ? this.renderUploadImage()
          : this.renderSelectImagePlaceholder()}
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

function mapStateToProps(state, ownProps) {
  return {
    storeMedias: state.mediaUploads[ownProps.reduxMediaUploadClass] || []
  }
}

export default connect(mapStateToProps)(ImageUploadAtom)

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
