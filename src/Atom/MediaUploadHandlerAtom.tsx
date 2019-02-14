import React from 'react'
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
  resetMediaStore,
  removeUrlFromUploadedMedia
} from '../store/actions/cron'
import { connect } from 'react-redux'
import Config from 'react-native-config'
import Icon from './Icon'

interface IProps {
  onMediaSet?: (response) => void
  reduxMediaUploadClass: string | number
  uploadImage: (
    file: object,
    options: object,
    retry?: boolean,
    mediaId?: number
  ) => void
  uploadDocument: (
    file: object,
    options: object,
    retry?: boolean,
    mediaId?: number
  ) => void
  uploadVideo: (files: any, retry?: boolean, mediaId?: number) => void
  removeUrlFromUploadedMedia: (deleteKey: string, deleteUsing: string) => void
  deleteMedia: (deleteKey, deleteUsing) => void
  resetStore: () => void
  urlOfMediaUploaded: object
  mediasToExclude?: any
  media?: any
  forceReset?: boolean
  storeMedias: any
  style?: any
  category?: 'document' | 'image' | 'video'
  hideRemoveButton?: boolean
  uploadType: 'single' | 'multiple'
  mediaType?: 'image' | 'video'
}

interface IState {
  mediasToExclude: any
  shouldComponentDisplay: boolean
}

class MediaUploadHandlerAtom extends React.PureComponent<IProps, IState> {
  constructor(props) {
    super(props)
    this.state = {
      mediasToExclude: this.props.mediasToExclude || [],
      shouldComponentDisplay: this.props.forceReset ? false : true
    }

    //Todo check if the the forceReset props is passed and then reset the store
    //also set display to false so that there would not be screen glitches
    if (this.props.forceReset) {
      this.props.resetStore()
    }
  }

  componentDidMount() {
    this.props.removeUrlFromUploadedMedia(
      this.state.mediasToExclude,
      'upload_url'
    )
    this.props.deleteMedia(this.state.mediasToExclude, 'upload_url')

    if (
      this.props.media &&
      Object.keys(this.props.media).length > 0 &&
      this.props.uploadType == 'single'
    ) {
      if (this.props.category == 'document') {
        this.uploadDocument()
      } else {
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
  }

  componentDidUpdate(prevProps) {
    let { urlOfMediaUploaded } = this.props

    if (this.props.media != prevProps.media) {
      if (this.props.category == 'document') {
        this.uploadDocument()
      } else {
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

    if (
      urlOfMediaUploaded != prevProps.urlOfMediaUploaded &&
      Object.keys(urlOfMediaUploaded).length > 0
    ) {
      this.props.onMediaSet(urlOfMediaUploaded)
    }
  }

  uploadVideo = async (retry?: boolean, mediaId?: number, file?: any) => {
    let { media } = this.props,
      path = !retry ? media && media.path : file.uri,
      mime = !retry ? media && media.mime : file.mime,
      filename = !retry
        ? media && Platform.OS == 'android'
          ? media.path.substring(media.path.lastIndexOf('/') + 1)
          : media.filename
        : file.filename

    let { path: thumbnailPath } = await RNThumbnail.get(path)

    const optionsThumbnail = {
      keyPrefix: Config.S3_THUMBNAIL_KEY_PREFIX,
      bucket: Config.S3_BUCKET,
      region: Config.S3_REGION,
      accessKey: Config.S3_ACCESS_KEY,
      secretKey: Config.S3_SECRET_KEY,
      successActionStatus: Config.S3_SUCCESS_ACTION_STATUS
    }

    const optionsVideo = {
      keyPrefix: Config.S3_VIDEO_KEY_PREFIX,
      bucket: Config.S3_BUCKET,
      region: Config.S3_REGION,
      accessKey: Config.S3_ACCESS_KEY,
      secretKey: Config.S3_SECRET_KEY,
      successActionStatus: Config.S3_SUCCESS_ACTION_STATUS
    }

    const name =
        Platform.OS == 'ios'
          ? filename
          : path.substring(path.lastIndexOf('/') + 1),
      encodedName = `${name}${Date.now()}|${mime.split('/')[0].toLowerCase()}`

    const videoFile = {
      uri: path,
      name: encodedName,
      filename: filename,
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

    this.props.uploadVideo(totalpath, retry, mediaId)
  }

  uploadDocument = async (retry?: boolean, mediaId?: number, optFile?: any) => {
    let { media } = this.props,
      path = !retry ? media && media.uri : optFile.uri,
      mime = !retry ? media && media.type : optFile.type,
      filename = !retry ? media && media.fileName : optFile.filename,
      filesize = !retry ? media && media.fileSize : optFile.size

    const options = {
      keyPrefix: Config.S3_DOCUMENT_KEY_PREFIX,
      bucket: Config.S3_BUCKET,
      region: Config.S3_REGION,
      accessKey: Config.S3_ACCESS_KEY,
      secretKey: Config.S3_SECRET_KEY,
      successActionStatus: Config.S3_SUCCESS_ACTION_STATUS
    }

    const file = {
      uri: path,
      name: `${filename}|${filesize}`,
      type: mime,
      mime: mime,
      size: filesize,
      filename
    }

    this.props.uploadDocument(file, options, retry, mediaId)
  }

  uploadImage = (retry?: boolean, mediaId?: number, optFile?: any) => {
    let { media } = this.props,
      path = !retry ? media && media.path : optFile.uri,
      mime = !retry ? media && media.mime : optFile.mime,
      filename = !retry
        ? media && Platform.OS == 'android'
          ? media.path.substring(media.path.lastIndexOf('/') + 1)
          : media.filename
        : optFile.filename,
      data = !retry ? media && media.data : optFile.data

    const options = {
      keyPrefix: Config.S3_IMAGE_KEY_PREFIX,
      bucket: Config.S3_BUCKET,
      region: Config.S3_REGION,
      accessKey: Config.S3_ACCESS_KEY,
      secretKey: Config.S3_SECRET_KEY,
      successActionStatus: Config.S3_SUCCESS_ACTION_STATUS
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
      mime: mime,
      filename: filename
    }

    this.props.uploadImage(file, options, retry, mediaId)
  }

  renderRetryContainer = (type, mediaId, file): JSX.Element => {
    return (
      <TouchableOpacity
        onPress={() =>
          type == 'image'
            ? this.uploadImage(true, mediaId, file)
            : type == 'application'
            ? this.uploadDocument(true, mediaId, file)
            : this.uploadVideo(true, mediaId, file)
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
    return type != 'application' ? (
      <Icon
        type="FontAwesome"
        name={type == 'image' ? 'file-image-o' : 'video-camera'}
        style={styles.whiteIcon}
      />
    ) : null
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
          <View style={styles.stopDownloadIcon}>
            <Icon name="close" type="MaterialIcons" style={styles.whiteIcon} />
          </View>
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
            response,
            file
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
                onPress={() => (location ? Linking.openURL(location) : null)}
              >
                <View style={[styles.mediaOverlay]}>
                  {state != 'loading' && !this.props.hideRemoveButton && (
                    <View style={{ position: 'absolute', right: 5, top: 5 }}>
                      <Icon
                        name="close"
                        type="MaterialIcons"
                        onPress={() => {
                          this.props.deleteMedia(mediaId, 'mediaId')
                          this.props.removeUrlFromUploadedMedia(
                            mediaId,
                            'mediaId'
                          )
                        }}
                        style={[styles.whiteIcon, styles.removeIcon]}
                      />
                    </View>
                  )}
                  {state == 'loading'
                    ? this.renderLoadingContainer(progress, cancelFn)
                    : state == 'error'
                    ? this.renderRetryContainer(type, mediaId, file)
                    : this.renderUploadedContainer(type)}
                </View>
              </TouchableWithoutFeedback>
            </ImageBackground>
          ) : null
        })}
      </React.Fragment>
    )
  }

  renderDocument = (): JSX.Element => {
    let { storeMedias } = this.props

    return (
      <React.Fragment>
        {storeMedias.map(media => {
          let {
            file: { mime, filename },
            mediaId,
            progress,
            cancelFn,
            state,
            response,
            file
          } = media
          let type = mime.split('/')[0].toLowerCase(),
            location =
              (response &&
                response.body &&
                response.body.postResponse &&
                response.body.postResponse.location) ||
              ''

          return this.state.mediasToExclude.indexOf(location) == -1 ? (
            <React.Fragment>
              <View key={mediaId} style={this.props.style}>
                <Icon
                  type="MaterialCommunityIcons"
                  name="file-pdf"
                  style={{ fontSize: 150, color: color.red }}
                />
                <TouchableWithoutFeedback
                  onPress={() => (location ? Linking.openURL(location) : null)}
                >
                  <View
                    style={[
                      styles.documentOverlay,
                      {
                        backgroundColor: location
                          ? 'transparent'
                          : 'rgba(0,0,0,.2)'
                      }
                    ]}
                  >
                    {state != 'loading' && !this.props.hideRemoveButton && (
                      <View style={{ position: 'absolute', right: 5, top: 5 }}>
                        <Icon
                          name="close"
                          type="MaterialIcons"
                          onPress={() => {
                            this.props.deleteMedia(mediaId, 'mediaId')
                            this.props.removeUrlFromUploadedMedia(
                              mediaId,
                              'mediaId'
                            )
                          }}
                          style={[styles.whiteIcon, styles.removeIcon]}
                        />
                      </View>
                    )}
                    {state == 'loading'
                      ? this.renderLoadingContainer(progress, cancelFn)
                      : state == 'error'
                      ? this.renderRetryContainer(type, mediaId, file)
                      : this.renderUploadedContainer(type)}
                  </View>
                </TouchableWithoutFeedback>
              </View>
              <Text
                style={{
                  color: color.button,
                  alignSelf: 'center',
                  marginTop: 8,
                  fontSize: 14,
                  fontFamily: 'AvenirNext-Medium'
                }}
              >
                {filename.replace(/.pdf/gi, '')}
              </Text>
            </React.Fragment>
          ) : null
        })}
      </React.Fragment>
    )
  }

  render() {
    return this.state.shouldComponentDisplay
      ? this.props.category == 'document'
        ? this.renderDocument()
        : this.renderImage()
      : null
  }
}

function mapDispatchToProps(dispatch, ownProps) {
  return {
    uploadImage: (file, options, retry, mediaId) =>
      dispatch(
        uploadMedia({
          key: ownProps.reduxMediaUploadClass,
          file,
          options,
          uploadType: ownProps.uploadType,
          mediaType: 'image',
          retry,
          mediaId
        })
      ),
    uploadVideo: (files, retry, mediaId) =>
      dispatch(
        uploadMedia({
          key: ownProps.reduxMediaUploadClass,
          files,
          uploadType: ownProps.uploadType,
          mediaType: 'video',
          retry,
          mediaId
        })
      ),
    uploadDocument: (file, options, retry, mediaId) =>
      dispatch(
        uploadMedia({
          key: ownProps.reduxMediaUploadClass,
          file,
          options,
          uploadType: ownProps.uploadType,
          mediaType: 'application',
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
      ),
    resetStore: () =>
      dispatch(
        resetMediaStore({
          key: ownProps.reduxMediaUploadClass
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
  documentOverlay: {
    width: '100%',
    position: 'absolute',
    top: 0,
    left: 0,
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center'
  },
  whiteIcon: {
    fontSize: 30,
    color: '#fff'
  },
  removeIcon: {
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
