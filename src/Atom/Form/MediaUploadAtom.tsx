import React from 'react'
import {
  StyleSheet,
  View,
  Linking,
  TouchableWithoutFeedback,
  TouchableOpacity
} from 'react-native'
import { Icon, ActionSheet } from 'native-base'
import ImagePicker from 'react-native-image-crop-picker'
import MediaUploadHandlerAtom from './../MediaUploadHandlerAtom'
import CachedImageAtom from '../CachedImageAtom'

interface IProps {
  medias?: string[]
  reduxMediaUploadClass: string | number
  handleMediasUpload: (image: string[]) => void
}

interface IState {
  media?: object
  urlOfMediaUploaded?: object
  previousAddedMedia: string[]
}

export default class MediaUploadAtom extends React.PureComponent<
  IProps,
  IState
> {
  constructor(props) {
    super(props)
    this.state = {
      media: {},
      urlOfMediaUploaded: {},
      previousAddedMedia: props.medias || []
    }
  }

  selectMediaFromStorage = () => {
    ActionSheet.show(
      {
        options: ['Take Photo', 'Photo Library', 'Video Library', 'Cancel'],
        cancelButtonIndex: 3,
        title: 'Upload Media'
      },
      buttonIndex => {
        switch (buttonIndex) {
          case 0:
            this.openCamera()
            break
          case 1:
            this.openGallery()
            break
          case 2:
            this.openVideo()
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
    }).then(media => {
      this.setState({
        media
      })
    })
  }

  openCamera = () => {
    ImagePicker.openCamera({
      width: 840,
      height: 840,
      cropping: true,
      mediaType: 'photo',
      includeBase64: true
    }).then((media: any) => {
      this.setState({
        media
      })
    })
  }

  openVideo = () => {
    ImagePicker.openPicker({
      mediaType: 'video'
    }).then((media: any) => {
      this.setState({
        media
      })
    })
  }

  handleImageValueSet = urlOfMediaUploaded => {
    this.setState(
      {
        urlOfMediaUploaded
      },
      () => {
        this.props.handleMediasUpload(
          this.state.previousAddedMedia.concat(
            Object.keys(urlOfMediaUploaded)
              .map(i => urlOfMediaUploaded[i])
              .filter(val => val != null)
          )
        )
      }
    )
  }

  transformPath = mediaURL => {
    let url = /video$/.test(mediaURL)
    if (!url) {
      return mediaURL
    } else {
      let baseURL = 'https://refineryaudio.s3.amazonaws.com/',
        fileName = mediaURL.substring(mediaURL.lastIndexOf('/') + 1)
      return `${baseURL}thumbnail%2F${fileName}`
    }
  }

  removeMedia = (media: string) => {
    let { previousAddedMedia } = this.state

    this.setState(
      {
        previousAddedMedia: previousAddedMedia.filter(val => val != media)
      },
      () =>
        this.props.handleMediasUpload(
          this.state.previousAddedMedia.concat(
            Object.keys(this.state.urlOfMediaUploaded)
              .map(i => this.state.urlOfMediaUploaded[i])
              .filter(val => val != null)
          )
        )
    )
  }

  renderSelectImageContainer = (): JSX.Element => {
    return (
      <TouchableOpacity onPress={this.selectMediaFromStorage}>
        <View style={[styles.selectImageContainer, styles.image]}>
          <Icon name="plus" type="Feather" style={styles.icon} />
        </View>
      </TouchableOpacity>
    )
  }

  renderPreviousAddedMedia = () => {
    let { previousAddedMedia } = this.state

    return previousAddedMedia.map((media, i) => {
      let isVideo = /video$/.test(media)
      return (
        <View key={i}>
          <CachedImageAtom
            style={StyleSheet.flatten([styles.image, styles.cachedImageStyle])}
            uri={this.transformPath(media)}
          >
            <Icon
              name="x"
              type="Feather"
              onPress={() => this.removeMedia(media)}
              style={styles.removeIcon}
            />
            <Icon
              type="FontAwesome"
              name={!isVideo ? 'file-image-o' : 'video-camera'}
              style={styles.fileTypeIcon}
            />
          </CachedImageAtom>
          <TouchableWithoutFeedback
            onPress={() => {
              Linking.openURL(media)
            }}
          >
            <View style={styles.clickableDisplayOverlay} />
          </TouchableWithoutFeedback>
        </View>
      )
    })
  }

  render() {
    return (
      <View style={styles.container}>
        {this.renderPreviousAddedMedia()}
        <MediaUploadHandlerAtom
          onMediaSet={response => this.handleImageValueSet(response)}
          media={this.state.media}
          reduxMediaUploadClass={this.props.reduxMediaUploadClass}
          style={styles.image}
        />
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
    backgroundColor: '#eee'
  },
  image: {
    marginTop: 8,
    marginLeft: 8,
    width: 110,
    height: 110
  },
  fileTypeIcon: {
    fontSize: 30,
    color: '#fff'
  },
  icon: {
    fontSize: 50,
    color: '#BFBFBF'
  },
  removeIcon: {
    position: 'absolute',
    right: 0,
    top: 5,
    fontWeight: 'bold',
    fontSize: 30,
    color: '#fff'
  },
  backIcon: {
    color: 'white',
    fontSize: 26,
    margin: 10
  },
  clickableDisplayOverlay: {
    position: 'absolute',
    top: 35,
    left: 5,
    width: 110,
    height: 80
  },
  cachedImageStyle: {
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 4,
    marginTop: 4
  }
})
