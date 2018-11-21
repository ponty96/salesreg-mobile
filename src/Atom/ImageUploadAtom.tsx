import React from 'react'
import { Icon } from 'native-base'
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Platform,
  ImageBackground,
  Dimensions,
  Text
} from 'react-native'
import { RNS3 } from 'react-native-aws3'
import ImagePicker from 'react-native-image-crop-picker'
// import RNFetchBlob from 'rn-fetch-blob'
import Circle from 'react-native-progress/Circle'
import { color } from '../Style/Color'

interface IProps {
  onRemoveImage?: () => void
  onSuccess?: (response) => void
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
      image: { path, mime, filename }
    } = this.state

    const options = {
      bucket: 'refineryaudio',
      region: 'us-west-1',
      accessKey: 'AKIAJAVJKGLNOEYYHHSA',
      secretKey: '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',
      successActionStatus: 201
    }

    const file = {
      uri: path,
      name:
        Platform.OS == 'ios' ? filename : path.substring(path.lastIndexOf('/')),
      type: mime
    }

    this.task = RNS3.put(file, options)
      .progress(e => {
        this.setState({
          uploadProgress: e.percent,
          uploadState: 1
        })
      })
      .then(response => {
        this.setState(
          {
            uploadState: response.status != 201 ? 2 : 3
          },
          () => {
            if (response.status == 201)
              this.props.onSuccess && this.props.onSuccess(response)
          }
        )
      })
      .catch(() => {
        this.setState({
          uploadState: 2
        })
      })
  }

  cancelUpload = () => {
    this.task.abort()
    this.setState({
      uploadState: 2
    })
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
            borderColor={
              this.state.uploadProgress < 0.25
                ? color.button
                : 'rgba(0, 0, 0, 0)'
            }
            thickness={5}
            color={color.button}
            size={60}
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
        <View style={styles.imageOverlay}>
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
    width: Dimensions.get('window').width - 32,
    height: Dimensions.get('window').width - 32
  },
  selectImageContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#eee'
  },
  icon: {
    fontSize: 50,
    color: '#BFBFBF'
  },
  whiteIcon: {
    fontSize: 30,
    color: '#fff'
  },
  removeIcon: {
    position: 'absolute',
    right: 5,
    top: 5,
    fontWeight: 'bold'
  },
  stopDownloadIcon: {
    position: 'absolute',
    marginTop: 14,
    marginLeft: 14.5
  },
  retryText: {
    color: '#fff',
    fontWeight: 'bold',
    fontFamily: 'AvenirNext-Bold',
    marginLeft: 10,
    fontSize: 18
  },
  imageOverlay: {
    backgroundColor: 'rgba(0,0,0,.2)',
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center'
  },
  retryContainer: {
    flexDirection: 'row'
  }
})
