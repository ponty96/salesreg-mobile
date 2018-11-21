import React from 'react'
import { Icon } from 'native-base'
import {
  View,
  StyleSheet,
  TouchableOpacity,
  ImageBackground,
  Text
} from 'react-native'
import ImagePicker from 'react-native-image-crop-picker'
import RNFetchBlob from 'rn-fetch-blob'
import Circle from 'react-native-progress/Circle'
import { color } from '../Style/Color'

interface IProps {
  onRemoveImage?: () => void
  controlled?: boolean | false
  image?: any
  style?: any
}

/**
 * uploadState can exist in 4 different state
 *
 * 0 - This is for the initial state of the upload container
 * 1 - This state indicates that the image is uploading
 * 2 - This indicates that upload has failed and it should show a retry button
 * 3 - This indicates that the image has been uploaded successfully
 */
interface IState {
  image: any
  uploadProgress: number
  uploadState: number
}

export default class ImageUploadAtom extends React.PureComponent<
  IProps,
  IState
> {
  constructor(props) {
    super(props)
    let { controlled, image } = props

    this.state = {
      image: controlled ? image : null,
      uploadProgress: 0,
      uploadState: controlled ? 1 : 0
    }
  }

  task = null

  componentDidMount() {
    this.props.controlled && this.uploadImage()
  }

  selectImage = () => {
    ImagePicker.openPicker({
      width: 300,
      includeBase64: true,
      height: 400,
      cropping: true
    }).then((image: any) => {
      this.setState(
        {
          image,
          uploadState: 1
        },
        () => this.uploadImage()
      )
    })
  }

  uploadImage = () => {
    let {
      image: { data }
    } = this.state

    this.task = RNFetchBlob.fetch(
      'POST',
      'http://localhost:5000/api/image/upload',
      {
        'Content-Type': 'application/json'
      },
      JSON.stringify({
        image_binary: data
      })
    )
      .uploadProgress((written, total) => {
        this.setState({
          uploadProgress: total / written,
          uploadState: 1
        })
      })
      .then(() => {
        this.setState({
          uploadState: 3
        })
      })
      .catch(() => {
        this.setState({
          uploadState: 2
        })
      })
  }

  cancelUpload = () => {
    this.task.cancel()
  }

  renderRetryContainer = (): JSX.Element => {
    return (
      <TouchableOpacity onPress={this.uploadImage}>
        <View style={styles.retryContainer}>
          <Icon
            name="file-upload"
            type="MaterialIcons"
            style={styles.whiteIcon}
          />
          <Text style={styles.retryText}>Retry</Text>
        </View>
      </TouchableOpacity>
    )
  }

  renderLoadingContainer = (): JSX.Element => {
    return (
      <TouchableOpacity onPress={this.cancelUpload}>
        <View>
          <Circle
            indeterminate={this.state.uploadProgress < 0.25 ? true : false}
            borderColor={color.secondary}
            size={50}
            borderWidth={5}
            progress={this.state.uploadProgress}
          />
          <Icon
            name="x"
            type="Feather"
            style={[styles.whiteIcon, styles.stopDownloadIcon]}
          />
        </View>
      </TouchableOpacity>
    )
  }

  renderImage = (): JSX.Element => {
    let {
      image: { data, mime },
      uploadState
    } = this.state

    return (
      <ImageBackground
        style={[styles.container, this.props.style]}
        source={{
          uri: `data:${mime};base64,${data}`
        }}
      >
        <View style={[styles.container, styles.imageOverlay, this.props.style]}>
          {uploadState != 1 && (
            <Icon
              name="x"
              type="Feather"
              onPress={this.props.onRemoveImage}
              style={[styles.whiteIcon, styles.removeIcon]}
            />
          )}
          {uploadState == 1
            ? this.renderLoadingContainer()
            : uploadState == 2
            ? this.renderRetryContainer()
            : null}
        </View>
      </ImageBackground>
    )
  }

  renderSelectImageContainer = (): JSX.Element => {
    return (
      <TouchableOpacity onPress={this.selectImage}>
        <View
          style={[
            styles.container,
            styles.selectImageContainer,
            this.props.style
          ]}
        >
          <Icon name="plus" type="Feather" style={styles.icon} />
        </View>
      </TouchableOpacity>
    )
  }

  render() {
    let { image, uploadState } = this.state

    if (uploadState == 0 && !image) {
      return this.renderSelectImageContainer()
    } else {
      return this.renderImage()
    }
  }
}

const styles = StyleSheet.create({
  container: {
    width: 120,
    height: 120
  },
  selectImageContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#eee'
  },
  icon: {
    fontSize: 40,
    color: '#BFBFBF'
  },
  whiteIcon: {
    fontSize: 25,
    color: '#fff'
  },
  removeIcon: {
    position: 'absolute',
    right: 5,
    top: 5
  },
  stopDownloadIcon: {
    position: 'absolute',
    marginTop: 12,
    marginLeft: 12
  },
  retryText: {
    color: '#fff',
    marginLeft: 10,
    fontSize: 18
  },
  imageOverlay: {
    backgroundColor: 'rgba(0,0,0,.1)',
    justifyContent: 'center',
    alignItems: 'center'
  },
  retryContainer: {
    flexDirection: 'row'
  }
})
