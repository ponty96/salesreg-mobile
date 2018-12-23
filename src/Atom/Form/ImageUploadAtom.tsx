import React from 'react'
import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  Image,
  Alert
} from 'react-native'
import { color } from '../../Style/Color'
import ImagePicker from 'react-native-image-crop-picker'
import { ActionSheet, Icon } from 'native-base'
import MediaUploadHandlerAtom from './../MediaUploadHandlerAtom'
import CachedImageAtom from '../CachedImageAtom'
import { connect } from 'react-redux'

interface IProps {
  image: string
  handleImageUpload: (image: string) => void
  underneathText?: string
  error?: any
  uploadCategory?: 'profile-photo' | 'others'
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
            break
          case 1:
            this.openGallery()
            break
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
    }).then((image: any) => {
      let { size } = image
      if (size / 1000000 > 3) {
        Alert.alert(
          'Image too large',
          'The image is too large, please select an image of size 3MB or less',
          [{ text: 'Ok', onPress: () => null }],
          { cancelable: false }
        )
      } else {
        this.setState({ prevImageUploaded: null, imageToUpload: image })
      }
    })
  }

  openCamera = () => {
    ImagePicker.openCamera({
      width: 840,
      height: 840,
      cropping: true,
      mediaType: 'photo',
      includeBase64: true
    }).then((image: any) => {
      let { size } = image
      if (size / 1000000 > 3) {
        Alert.alert(
          'Image too large',
          'The image is too large, please take a photo of size 3MB or less',
          [{ text: 'Ok', onPress: () => null }],
          { cancelable: false }
        )
      } else {
        this.setState({ prevImageUploaded: null, imageToUpload: image })
      }
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
      <TouchableOpacity onPress={this.handleImageUpload}>
        <View>
          <View style={styles.placeholderWrapper}>
            {this.props.uploadCategory == 'profile-photo' ? (
              <Icon
                type="Ionicons"
                name="ios-person"
                style={{ fontSize: 250, color: '#616161' }}
              />
            ) : (
              <Image
                source={require('../../../assets-v1/image-upload.png')}
                style={styles.imagePlaceholder}
              />
            )}
          </View>
          <Text
            style={{
              color: color.button,
              alignSelf: 'center',
              marginVertical: 20,
              fontSize: 18,
              fontFamily: 'AvenirNext-Medium'
            }}
          >
            Upload Photo
          </Text>
        </View>
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
      <React.Fragment>
        <View>
          {this.state.prevImageUploaded &&
          this.state.isInProcessing == undefined
            ? this.renderDefaultImage()
            : this.props.storeMedias.length > 0 || this.state.imageToUpload
            ? this.renderUploadImage()
            : this.renderSelectImagePlaceholder()}
        </View>
        {this.renderUnderNeathText()}
      </React.Fragment>
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
