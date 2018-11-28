import React from 'react'
import { StyleSheet, View, TouchableOpacity, Dimensions } from 'react-native'
import { Icon, ActionSheet } from 'native-base'
import ImagePicker from 'react-native-image-crop-picker'
import ImageUploadHandler from './../ImageUploadHandler'
import Lightbox from 'react-native-lightbox'
import CachedImageAtom from '../CachedImageAtom'

interface IProps {
  medias?: string[]
  handleMediasUpload: (image: string[]) => void
}

interface IState {
  medias?: {}
  showCancelIconState?: {}
  urlOfMediaUploaded?: {}
  previousAddedMedia: string[]
}

export default class MediaUploadHandlerAtom extends React.PureComponent<
  IProps,
  IState
> {
  constructor(props) {
    super(props)
    this.state = {
      medias: {},
      urlOfMediaUploaded: {},
      previousAddedMedia: props.medias || [],
      showCancelIconState: {}
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
    }).then(image => {
      this.setState({
        medias: { ...this.state.medias, [Date.now()]: image }
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
    }).then((image: any) => {
      this.setState({
        medias: { ...this.state.medias, [Date.now()]: image }
      })
    })
  }

  openVideo = () => {
    ImagePicker.openPicker({
      mediaType: 'video'
    }).then((image: any) => {
      this.setState({
        medias: { ...this.state.medias, [Date.now()]: image }
      })
    })
  }

  removeImage = index => {
    let newImgState = {},
      { urlOfMediaUploaded } = this.state

    Object.keys(this.state.medias).forEach(key => {
      if (index != key) {
        newImgState[key] = this.state.medias[key]
      }
    })

    this.setState(
      {
        medias: newImgState,
        urlOfMediaUploaded: urlOfMediaUploaded[index]
          ? { ...urlOfMediaUploaded, [index]: null }
          : urlOfMediaUploaded
      },
      () => {
        this.props.handleMediasUpload(
          this.state.previousAddedMedia.concat(
            Object.keys(this.state.urlOfMediaUploaded)
              .map(i => this.state.urlOfMediaUploaded[i])
              .filter(val => val != null)
          )
        )
      }
    )
  }

  handleImageValueSet = (index, image) => {
    const {
      body: { postResponse }
    } = image

    this.setState(
      {
        urlOfMediaUploaded: {
          ...this.state.urlOfMediaUploaded,
          [index]: postResponse.location
        }
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

  renderPreviousImageMedia = (image, key): JSX.Element => {
    let { showCancelIconState, previousAddedMedia } = this.state
    return (
      <Lightbox
        key={key}
        onOpen={() =>
          this.setState({
            showCancelIconState: { ...showCancelIconState, [key]: false }
          })
        }
        renderHeader={close => (
          <Icon
            name="md-arrow-back"
            type="Ionicons"
            onPress={() => close()}
            style={styles.backIcon}
          />
        )}
        onClose={() =>
          this.setState({
            showCancelIconState: { ...showCancelIconState, [key]: true }
          })
        }
        activeProps={{
          style: { width: Dimensions.get('window').width, height: 300 }
        }}
      >
        <CachedImageAtom isBackgroundImage style={styles.image} uri={image}>
          {(showCancelIconState[key] ||
            showCancelIconState[key] == undefined) && (
            <Icon
              name="x"
              type="Feather"
              onPress={() =>
                this.setState(
                  {
                    previousAddedMedia: previousAddedMedia.filter(
                      val => val != image
                    )
                  },
                  () =>
                    this.props.handleMediasUpload(
                      this.state.previousAddedMedia.concat(
                        Object.keys(this.state.urlOfMediaUploaded).map(
                          i => this.state.urlOfMediaUploaded[i]
                        )
                      )
                    )
                )
              }
              style={styles.removeIcon}
            />
          )}
        </CachedImageAtom>
      </Lightbox>
    )
  }

  renderPreviousAddedMedia = () => {
    let { previousAddedMedia } = this.state

    return previousAddedMedia.map((media, i) =>
      media.indexOf('image') != -1
        ? this.renderPreviousImageMedia(media, i)
        : null
    )
  }

  render() {
    return (
      <View style={styles.container}>
        {this.renderPreviousAddedMedia()}
        {Object.keys(this.state.medias).map(index => (
          <ImageUploadHandler
            key={index}
            onRemoveImage={() => this.removeImage(index)}
            onImageSet={response => this.handleImageValueSet(index, response)}
            image={this.state.medias[index]}
            type={this.state.medias[index].mime.split('/')[0].toLowerCase()}
            style={styles.image}
            controlled={true}
          />
        ))}
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
    marginTop: 5,
    marginLeft: 5,
    width: 110,
    height: 110
  },
  icon: {
    fontSize: 50,
    color: '#BFBFBF'
  },
  removeIcon: {
    position: 'absolute',
    right: 5,
    top: 5,
    fontWeight: 'bold',
    fontSize: 30,
    color: '#fff'
  },
  backIcon: {
    color: 'white',
    fontSize: 26,
    margin: 10
  }
})
