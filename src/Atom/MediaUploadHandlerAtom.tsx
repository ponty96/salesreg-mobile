import React from 'react'
import { Icon } from 'native-base'
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Platform,
  ImageBackground,
  Dimensions,
  Linking,
  Text,
  TouchableWithoutFeedback
} from 'react-native'
import { RNS3 } from 'react-native-aws3'
import Circle from 'react-native-progress/Circle'
import { color } from '../Style/Color'
import RNThumbnail from 'react-native-thumbnail'

interface IProps {
  onRemoveMedia?: () => void
  onMediaSet?: (response) => void
  controlled?: boolean | false
  media?: any
  style?: any
  type?: 'image' | 'video'
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
  media: any
  filePath: string
  uploadProgress: number
  uploadState: number
}

export default class MediaUploadHandlerAtom extends React.PureComponent<
  IProps,
  IState
> {
  constructor(props) {
    super(props)
    let { controlled, media } = props

    this.state = {
      media: controlled ? media : null,
      uploadProgress: 0,
      filePath: '',
      uploadState: controlled ? 1 : 0
    }
  }

  task = []

  componentDidMount() {
    if (this.props.controlled) {
      if (this.props.type == 'image') {
        this.uploadImage()
      } else {
        this.uploadVideo()
      }
    }
  }

  uploadVideo = async () => {
    let {
      media: { path, mime, filename }
    } = this.state

    let { path: thumbnailPath } = await RNThumbnail.get(path)

    const optionsThumbnail = {
      keyPrefix: 'thumbnail/',
      bucket: 'refineryaudio',
      region: 'us-west-1',
      accessKey: 'AKIAJAVJKGLNOEYYHHSA',
      secretKey: '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',
      successActionStatus: 201
    }

    const optionsVideo = {
      bucket: 'refineryaudio',
      region: 'us-west-1',
      accessKey: 'AKIAJAVJKGLNOEYYHHSA',
      secretKey: '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',
      successActionStatus: 201
    }

    const name =
        Platform.OS == 'ios'
          ? filename
          : path.substring(path.lastIndexOf('/') + 1),
      encodedName = `${btoa(`${name}${Date.now()}`)}|${mime
        .split('/')[0]
        .toLowerCase()}`

    const videoFile = {
      uri: path,
      name: encodedName,
      type: mime
    }

    const thumbnailFile = {
      uri: thumbnailPath,
      name: encodedName,
      type: 'image/jpeg'
    }

    let totalpath = [
        { file: videoFile, options: optionsVideo },
        { file: thumbnailFile, options: optionsThumbnail }
      ],
      requests = totalpath.map(fileInfo => {
        let task = RNS3.put(fileInfo.file, fileInfo.options)
          .progress(e => {
            this.setState({
              uploadProgress:
                fileInfo.file.type.indexOf('image') != -1
                  ? this.state.uploadProgress
                  : e.percent,
              uploadState: 1
            })
          })
          .then(response => Promise.resolve(response))
          .catch(err => Promise.reject(err))
        this.task.push(task)
        return task
      })

    Promise.all([...requests])
      .then((response: any) => {
        this.setState(
          {
            uploadState: response[0].status != 201 ? 1 : 3,
            filePath: response[0].status != 201 ? '' : response[0]
          },
          () => {
            if (response[0].status == 201) {
              this.props.onMediaSet && this.props.onMediaSet(response[0])
            }
          }
        )
      })
      .catch(() => {
        this.setState({
          uploadState: 2
        })
      })
  }

  uploadImage = () => {
    let {
      media: { path, mime, filename }
    } = this.state
    const options = {
      bucket: 'refineryaudio',
      region: 'us-west-1',
      accessKey: 'AKIAJAVJKGLNOEYYHHSA',
      secretKey: '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',
      successActionStatus: 201
    }

    const name =
      Platform.OS == 'ios'
        ? filename
        : path.substring(path.lastIndexOf('/') + 1)
    const file = {
      uri: path,
      name: `${name}${Date.now()}|${mime.split('/')[0].toLowerCase()}`,
      type: mime
    }
    let task = RNS3.put(file, options)
      .progress(e => {
        this.setState({
          uploadProgress: e.percent,
          uploadState: 1
        })
      })
      .then(response => {
        this.setState(
          {
            uploadState: response.status != 201 ? 2 : 3,
            filePath: response.status != 201 ? '' : response
          },
          () => {
            if (response.status == 201)
              this.props.onMediaSet && this.props.onMediaSet(response)
          }
        )
      })
      .catch(() => {
        this.setState({
          uploadState: 2
        })
      })

    this.task.push(task)
  }

  cancelUpload = () => {
    this.task.forEach(task => task.abort())
    this.setState({
      uploadState: 2
    })
  }

  renderRetryContainer = (): JSX.Element => {
    return (
      <TouchableOpacity
        onPress={() =>
          this.setState(
            {
              uploadState: 1
            },
            () =>
              this.props.type == 'image'
                ? this.uploadImage()
                : this.uploadVideo()
          )
        }
      >
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

  renderUploadedContainer = (): JSX.Element => {
    return (
      <Icon
        type="FontAwesome"
        name={this.props.type == 'image' ? 'file-image-o' : 'video-camera'}
        style={styles.whiteIcon}
      />
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
                ? color.green
                : 'rgba(0, 0, 0, 0)'
            }
            thickness={5}
            color={color.green}
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
      media: { data, mime, path },
      uploadState
    } = this.state

    return (
      <ImageBackground
        style={[styles.container, this.props.style]}
        source={{
          uri: this.props.type == 'image' ? `data:${mime};base64,${data}` : path
        }}
      >
        <TouchableWithoutFeedback
          onPress={() => Linking.openURL(this.state.filePath)}
        >
          <View style={styles.mediaOverlay}>
            {uploadState != 1 && (
              <Icon
                name="x"
                type="Feather"
                onPress={this.props.onRemoveMedia}
                style={[styles.whiteIcon, styles.removeIcon]}
              />
            )}
            {uploadState == 1
              ? this.renderLoadingContainer()
              : uploadState == 2
              ? this.renderRetryContainer()
              : this.renderUploadedContainer()}
          </View>
        </TouchableWithoutFeedback>
      </ImageBackground>
    )
  }

  render() {
    return this.renderImage()
  }
}

const styles = StyleSheet.create({
  container: {
    width: Dimensions.get('window').width - 32,
    height: Dimensions.get('window').width - 32
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
  mediaOverlay: {
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
