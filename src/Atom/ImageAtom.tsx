import * as React from 'react'
import { View, Text, TouchableOpacity } from 'react-native'
import { StyleSheet } from 'react-native'
import { color } from '../Style/Color'
import CachedImageAtom from './CachedImageAtom'

interface IProps {
  source: string
  placeholder?: string
  imgStyle?: object
  getValue?: any
  shop?: boolean
}

class ImageAtom extends React.Component<IProps, any> {
  state = {
    image: { uri: '' }
  }

  handleSelection = async () => {
    // image picker functionality here
  }

  render() {
    if (this.props.source || this.state.image) {
      return (
        <TouchableOpacity
          onPress={this.handleSelection}
          style={styles.selfAlign}
        >
          <View style={styles.imgContainer}>
            <CachedImageAtom
              uri={this.state.image.uri || this.props.source}
              style={styles.image}
            />
          </View>
          <Text style={[styles.imageText, { fontFamily: 'Source Sans Pro' }]}>
            Upload logo
          </Text>
        </TouchableOpacity>
      )
    } else {
      return (
        <TouchableOpacity
          onPress={this.handleSelection}
          style={styles.selfAlign}
        >
          <View style={styles.imgContainer}>
            <Text style={styles.imgPlaceholderText}>
              {this.props.placeholder &&
                this.props.placeholder.substr(0, 1).toUpperCase()}
            </Text>
          </View>
          <Text style={[styles.selfAlign, styles.menuColor]}>Upload logo</Text>
        </TouchableOpacity>
      )
    }
  }
}

export default ImageAtom

const styles = StyleSheet.create({
  selfAlign: {
    alignSelf: 'center'
  },
  image: {
    height: 120,
    width: 120
  },
  imgContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    height: 200,
    width: 200,
    borderRadius: 100,
    marginVertical: 10,
    backgroundColor: color.dropdown,
    opacity: 0.9
  },
  imageText: {
    alignSelf: 'center',
    fontSize: 14
  },
  imgPlaceholderText: {
    fontWeight: 'bold',
    fontSize: 20
  },
  menuColor: {
    color: color.menu
  }
})
