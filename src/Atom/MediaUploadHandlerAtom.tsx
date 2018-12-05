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
import Circle from 'react-native-progress/Circle'
import { color } from '../Style/Color'
import RNThumbnail from 'react-native-thumbnail'
import {
  uploadMedia,
  deleteMedia,
  removeUrlFromUploadedMedia
} from '../store/actions/cron'
import { connect } from 'react-redux'

interface IProps {
  onMediaSet?: (response) => void
  reduxMediaUploadClass: string | number
  uploadSingleMedia: (
    file: object,
    options: object,
    retry?: boolean,
    mediaId?: number
  ) => void
  uploadMultipleMedia: (files: any, retry?: boolean, mediaId?: number) => void
  removeUrlFromUploadedMedia: (deleteKey: string, deleteUsing: string) => void
  deleteMedia: (deleteKey, deleteUsing) => void
  urlOfMediaUploaded: object
  mediasToExclude?: any
  media?: any
  storeMedias: any
  style?: any
  uploadType?: 'single' | 'multiple'
}

interface IState {
  mediasToExclude: any
}

class MediaUploadHandlerAtom extends React.PureComponent<IProps, IState> {
  constructor(props) {
    super(props)
    this.state = {
      mediasToExclude: this.props.mediasToExclude || []
    }
  }

  componentDidMount() {
    this.props.removeUrlFromUploadedMedia(
      this.state.mediasToExclude,
      'upload_url'
    )
    this.props.deleteMedia(this.state.mediasToExclude, 'upload_url')

    if (this.props.media && Object.keys(this.props.media).length > 0) {
      let {
        media: { mime }
      } = this.props
      let type = mime.split('/')[0].toLowerCase()
      if (type == 'image') {
        this.uploadImage()
      } else {
        this.uploadVideo()
      }
    }
  }

  componentDidUpdate(prevProps) {
    let { urlOfMediaUploaded } = this.props

    if (this.props.media != prevProps.media) {
      let {
        media: { mime }
      } = this.props
      let type = mime.split('/')[0].toLowerCase()
      if (type == 'image') {
        this.uploadImage()
      } else {
        this.uploadVideo()
      }
    }

    if (
      urlOfMediaUploaded != prevProps.urlOfMediaUploaded &&
      Object.keys(urlOfMediaUploaded).length > 0
    ) {
      this.props.onMediaSet(urlOfMediaUploaded)
    }
  }

  uploadVideo = async (retry?: boolean, mediaId?: number) => {
    let {
      media: { path, mime, filename }
    } = this.props

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
      type: mime,
      mime: mime
    }

    const thumbnailFile = {
      uri: thumbnailPath,
      name: encodedName,
      type: 'image/jpeg',
      mime: 'image/jpeg'
    }

    let totalpath = [
      { file: videoFile, options: optionsVideo },
      { file: thumbnailFile, options: optionsThumbnail }
    ]

    this.props.uploadMultipleMedia(totalpath, retry, mediaId)
  }

  uploadImage = (retry?: boolean, mediaId?: number) => {
    let {
      media: { path, mime, filename, data }
    } = this.props
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
      data,
      uri: path,
      name: `${name}${Date.now()}|${mime.split('/')[0].toLowerCase()}`,
      type: mime,
      mime: mime
    }

    this.props.uploadSingleMedia(file, options, retry, mediaId)
  }

  renderRetryContainer = (type, mediaId): JSX.Element => {
    return (
      <TouchableOpacity
        onPress={() =>
          type == 'image'
            ? this.uploadImage(true, mediaId)
            : this.uploadVideo(true, mediaId)
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

  renderUploadedContainer = (type): JSX.Element => {
    return (
      <Icon
        type="FontAwesome"
        name={type == 'image' ? 'file-image-o' : 'video-camera'}
        style={styles.whiteIcon}
      />
    )
  }

  renderLoadingContainer = (progress, cancelFn): JSX.Element => {
    return (
      <TouchableOpacity onPress={cancelFn}>
        <View>
          <Circle
            indeterminate={progress < 0.25 ? true : false}
            borderColor={progress < 0.25 ? color.green : 'rgba(0, 0, 0, 0)'}
            thickness={5}
            color={color.green}
            size={60}
            borderWidth={5}
            progress={progress}
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
    let { storeMedias } = this.props

    return (
      <React.Fragment>
        {storeMedias.map(media => {
          let {
            file: { mime, data, uri },
            mediaId,
            progress,
            cancelFn,
            state,
            response
          } = media
          let type = mime.split('/')[0].toLowerCase(),
            location =
              (response &&
                response.body &&
                response.body.postResponse &&
                response.body.postResponse.location) ||
              ''

          return this.state.mediasToExclude.indexOf(location) == -1 ? (
            <ImageBackground
              key={mediaId}
              style={[styles.container, this.props.style]}
              source={{
                uri: type == 'image' ? `data:${mime};base64,${data}` : uri
              }}
            >
              <TouchableWithoutFeedback
                onPress={() => Linking.openURL(location)}
              >
                <View style={styles.mediaOverlay}>
                  {state != 'loading' && (
                    <Icon
                      name="x"
                      type="Feather"
                      onPress={() => {
                        this.props.deleteMedia(mediaId, 'mediaId')
                        this.props.removeUrlFromUploadedMedia(
                          mediaId,
                          'mediaId'
                        )
                      }}
                      style={[styles.whiteIcon, styles.removeIcon]}
                    />
                  )}
                  {state == 'loading'
                    ? this.renderLoadingContainer(progress, cancelFn)
                    : state == 'error'
                    ? this.renderRetryContainer(type, mediaId)
                    : this.renderUploadedContainer(type)}
                </View>
              </TouchableWithoutFeedback>
            </ImageBackground>
          ) : null
        })}
      </React.Fragment>
    )
  }

  render() {
    return this.renderImage()
  }
}

function mapDispatchToProps(dispatch, ownProps) {
  return {
    uploadSingleMedia: (file, options, retry, mediaId) =>
      dispatch(
        uploadMedia({
          key: ownProps.reduxMediaUploadClass,
          file,
          options,
          uploadType: 'single',
          retry,
          mediaId
        })
      ),
    uploadMultipleMedia: (files, retry, mediaId) =>
      dispatch(
        uploadMedia({
          key: ownProps.reduxMediaUploadClass,
          files,
          uploadType: 'multiple',
          retry,
          mediaId
        })
      ),
    deleteMedia: (deleteKey, deleteUsing) =>
      dispatch(
        deleteMedia({
          key: ownProps.reduxMediaUploadClass,
          deleteKey,
          deleteUsing
        })
      ),
    removeUrlFromUploadedMedia: (deleteKey, deleteUsing) =>
      dispatch(
        removeUrlFromUploadedMedia({
          key: ownProps.reduxMediaUploadClass,
          deleteUsing,
          deleteKey
        })
      )
  }
}

function mapStateToProps(state, ownProps) {
  return {
    storeMedias: state.mediaUploads[ownProps.reduxMediaUploadClass] || [],
    urlOfMediaUploaded:
      state.urlOfMediaUploaded[ownProps.reduxMediaUploadClass] || {}
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MediaUploadHandlerAtom)

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
