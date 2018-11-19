import React from 'react'
import { Icon } from 'native-base'
import {
  View,
  StyleSheet,
  TouchableHighlight,
  ImageBackground,
  Text
} from 'react-native'
import ImagePicker from 'react-native-image-crop-picker'
import Circle from 'react-native-progress/Circle'
import { color } from '../Style/Color'

interface IProps {}

interface IState {
  image: any
}

export default class ImageUploadAtom extends React.PureComponent<
  IProps,
  IState
> {
  state = {
    image: null
  }

  selectImage = () => {
    ImagePicker.openPicker({
      width: 300,
      includeBase64: true,
      height: 400,
      cropping: true
    }).then((image: any) => {
      this.setState({
        image
      })
    })
  }

  renderRetryContainer = (): JSX.Element => {
    return (
      <View style={styles.retryContainer}>
        <Icon
          name="file-upload"
          type="MaterialIcons"
          style={styles.whiteIcon}
        />
        <Text style={styles.retryText}>Retry</Text>
      </View>
    )
  }

  renderLoadingContainer = (): JSX.Element => {
    return (
      <View>
        <Circle
          indeterminate
          borderColor={color.secondary}
          size={50}
          borderWidth={5}
        />
        <Icon
          name="x"
          type="Feather"
          style={[styles.whiteIcon, styles.stopDownloadIcon]}
        />
      </View>
    )
  }

  renderImage = (): JSX.Element => {
    let {
      image: { data, mime }
    } = this.state

    return (
      <ImageBackground
        style={styles.container}
        source={{
          uri: `data:${mime};base64,${data}`
        }}
      >
        <View style={[styles.container, styles.imageOverlay]}>
          <Icon
            name="x"
            type="Feather"
            style={[styles.whiteIcon, styles.removeIcon]}
          />
          {this.renderLoadingContainer()}
        </View>
      </ImageBackground>
    )
  }

  renderSelectImageContainer = (): JSX.Element => {
    return (
      <TouchableHighlight onPress={this.selectImage}>
        <View style={[styles.container, styles.selectImageContainer]}>
          <Icon name="plus" type="Feather" style={styles.icon} />
        </View>
      </TouchableHighlight>
    )
  }

  render() {
    return this.state.image
      ? this.renderImage()
      : this.renderSelectImageContainer()
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
    backgroundColor: 'rgba(0,0,0,.5)',
    justifyContent: 'center',
    alignItems: 'center'
  },
  retryContainer: {
    flexDirection: 'row'
  }
})
