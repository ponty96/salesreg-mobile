import * as React from 'react'
import { Image, View, Text, TouchableOpacity } from 'react-native'
import { ImagePicker } from 'expo'
import { StyleSheet } from 'react-native'
import { color } from '../Style/Color'

interface IProps {
  source: string
  placeholder?: string
  imgStyle?: object
  getValue?: any
  shop?: boolean
}

class ImageAtom extends React.Component<IProps, any> {
  state = {
    image: ''
  }

  handleSelection = async () => {
    if (this.props.getValue) {
      let result = await ImagePicker.launchImageLibraryAsync({
        allowsEditing: false
      })

      if (result && !result.cancelled) {
        this.setState({ image: result })
        this.props.getValue(this.state.image)
      }
    }
  }

  render() {
    if (this.props.source || this.state.image) {
      return (
        <TouchableOpacity
          onPress={this.handleSelection}
          style={styles.selfAlign}
        >
          <Image
            source={{ uri: this.state.image || this.props.source }}
            style={styles.image}
          />
          <Text style={styles.imageText}>Upload logo</Text>
        </TouchableOpacity>
      )
    } else {
      return (
        <TouchableOpacity
          onPress={this.handleSelection}
          style={styles.selfAlign}
        >
          <View style={[styles.imgContainer, { backgroundColor: '#f6f6f6' }]}>
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
    height: 160,
    width: 160,
    borderRadius: 80,
    marginVertical: 10
  },
  imageText: {
    alignSelf: 'center'
  },
  imgPlaceholderText: {
    fontWeight: 'bold',
    fontSize: 20
  },
  menuColor: {
    color: color.menu
  }
})
