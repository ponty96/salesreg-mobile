import React from 'react'
import {
  StyleSheet,
  View,
  TouchableOpacity,
  ImageBackground
} from 'react-native'
import { Icon } from 'native-base'
import ImagePicker from 'react-native-image-crop-picker'
import ImageUploadAtom from './../ImageUploadAtom'

interface IProps {
  images?: string[]
  handleImagesUpload: (image: string[]) => void
}

interface IState {
  images?: {}
  prevImagesLoadingState?: {}
  urlOfImagesUploaded?: {}
  previousAddedImages: string[]
}

export default class MultipleImageUploadAtom extends React.PureComponent<
  IProps,
  IState
> {
  constructor(props) {
    super(props)
    this.state = {
      images: {},
      urlOfImagesUploaded: {},
      previousAddedImages: props.images || [],
      prevImagesLoadingState: {}
    }
  }

  selectImage = () => {
    ImagePicker.openPicker({
      width: 840,
      height: 840,
      includeBase64: true,
      cropping: true
    }).then((image: any) => {
      this.setState({
        images: { ...this.state.images, [Date.now()]: image }
      })
    })
  }

  removeImage = index => {
    let newImgState = {},
      { urlOfImagesUploaded } = this.state

    Object.keys(this.state.images).forEach(key => {
      if (index != key) {
        newImgState[key] = this.state.images[key]
      }
    })

    this.setState(
      {
        images: newImgState,
        urlOfImagesUploaded: urlOfImagesUploaded[index]
          ? { ...urlOfImagesUploaded, [index]: null }
          : urlOfImagesUploaded
      },
      () => {
        this.props.handleImagesUpload(
          this.state.previousAddedImages.concat(
            Object.keys(this.state.urlOfImagesUploaded)
              .map(i => this.state.urlOfImagesUploaded[i])
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
        urlOfImagesUploaded: {
          ...this.state.urlOfImagesUploaded,
          [index]: postResponse.location
        }
      },
      () =>
        this.props.handleImagesUpload(
          this.state.previousAddedImages.concat(
            Object.keys(this.state.urlOfImagesUploaded)
              .map(i => this.state.urlOfImagesUploaded[i])
              .filter(val => val != null)
          )
        )
    )
  }

  renderSelectImageContainer = (): JSX.Element => {
    return (
      <TouchableOpacity onPress={this.selectImage}>
        <View style={[styles.selectImageContainer, styles.image]}>
          <Icon name="plus" type="Feather" style={styles.icon} />
        </View>
      </TouchableOpacity>
    )
  }

  renderPreviousAddedImages = () => {
    let { previousAddedImages, prevImagesLoadingState } = this.state

    return previousAddedImages.map((image, i) => (
      <ImageBackground
        onLoadStart={() =>
          this.setState({
            prevImagesLoadingState: { ...prevImagesLoadingState, [i]: true }
          })
        }
        onLoadEnd={() =>
          this.setState({
            prevImagesLoadingState: { ...prevImagesLoadingState, [i]: false }
          })
        }
        style={styles.image}
        source={{ uri: image }}
        key={i}
      >
        {prevImagesLoadingState[i] && (
          <View
            style={[
              styles.image,
              { backgroundColor: '#eee', marginLeft: 0, marginTop: 0 }
            ]}
          />
        )}
        {!prevImagesLoadingState[i] && (
          <Icon
            name="x"
            type="Feather"
            onPress={() =>
              this.setState(
                {
                  previousAddedImages: previousAddedImages.filter(
                    val => val != image
                  )
                },
                () =>
                  this.props.handleImagesUpload(
                    this.state.previousAddedImages.concat(
                      Object.keys(this.state.urlOfImagesUploaded).map(
                        i => this.state.urlOfImagesUploaded[i]
                      )
                    )
                  )
              )
            }
            style={styles.removeIcon}
          />
        )}
      </ImageBackground>
    ))
  }

  render() {
    return (
      <View style={styles.container}>
        {this.renderPreviousAddedImages()}
        {Object.keys(this.state.images).map(index => (
          <ImageUploadAtom
            key={index}
            onRemoveImage={() => this.removeImage(index)}
            onImageSet={response => this.handleImageValueSet(index, response)}
            image={this.state.images[index]}
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
  }
})
