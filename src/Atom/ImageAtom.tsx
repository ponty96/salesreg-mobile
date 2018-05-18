import * as React from 'react'
import { Image, View, Text, TouchableOpacity } from 'react-native'
import { ImagePicker } from 'expo'
import styles from './../Style/Form'

interface IProps {
  source: string
  placeholder?: string
  imgStyle?: object
  getValue?: any
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
            style={[styles.imgContainer, this.props.imgStyle]}
          />
          <Text style={styles.selfAlign}>Upload logo</Text>
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
          <Text style={styles.selfAlign}>Upload logo</Text>
        </TouchableOpacity>
      )
    }
  }
}

export default ImageAtom