import * as React from 'react'
import { Image, View, Text, TouchableOpacity, Dimensions } from 'react-native'
import { ImagePicker } from 'expo'
import { StyleSheet } from 'react-native'
import { color } from '../Style/Color'
import InputAtom from './InputAtom'

interface IProps {
  source: string
  placeholder?: string
  imgStyle?: object
  name?: string
  getName: (name: string) => any
  getValue?: any
  form: string
}

class FormImageAtom extends React.Component<IProps, any> {
  state = {
    image: { uri: '' }
  }

  handleSelection = async () => {
    if (this.props.getValue) {
      let result = await ImagePicker.launchImageLibraryAsync({
        allowsEditing: false
      })

      if (result && !result.cancelled) {
        this.setState({ image: result })
        this.props.getValue(this.state.image.uri)
      }
    }
  }
  imageFunc = (form: string) => {
    let title
    let type
    switch (form) {
      case 'business':
        title = 'Business ID'
        type = 'Business Name'
        break
      case 'user':
        title = 'User ID'
        type = 'User Name'
        break
      case 'product':
        title = 'Product ID'
        type = 'Product Name'
        break
      case 'customer':
        title = 'Product ID'
        type = 'Product Name'
        break
      default:
        title = 'Unknown ID'
        type = 'Error'
    }
    return [title, type]
  }

  render() {
    if (this.props.source) {
      const term = this.imageFunc(this.props.form)
      let title = term[0]
      let type = term[1]
      return (
        <View style={styles.mainView}>
          <Text
            style={[
              styles.headerText,
              { fontFamily: 'SourceSansPro_Semibold', color: color.button }
            ]}
          >
            {title}
          </Text>
          <View style={styles.uploadView}>
            <TouchableOpacity
              onPress={this.handleSelection}
              style={styles.selfAlign}
            >
              <View style={styles.imgContainer}>
                <Image
                  source={{ uri: this.state.image.uri || this.props.source }}
                  style={styles.image}
                />
              </View>
              <Text
                style={[
                  styles.imageText,
                  { fontFamily: 'SourceSansPro', color: color.button }
                ]}
              >
                Upload Image
              </Text>
            </TouchableOpacity>
          </View>
          <View style={styles.inputView}>
            <InputAtom
              label={type}
              defaultValue={this.props.name}
              getValue={this.props.getName}
            />
          </View>
        </View>
      )
    } else {
      const term = this.imageFunc(this.props.form)
      let title = term[0]
      let type = term[1]
      return (
        <View style={styles.mainView}>
          <Text
            style={[
              styles.headerText,
              { fontFamily: 'SourceSansPro', color: color.button }
            ]}
          >
            {title}
          </Text>
          <View style={styles.uploadView}>
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
              <Text style={[styles.selfAlign, styles.menuColor]}>
                Upload logo
              </Text>
            </TouchableOpacity>
          </View>
          <View style={styles.inputView}>
            <InputAtom
              label={type}
              defaultValue={this.props.name}
              getValue={this.props.getName}
            />
          </View>
        </View>
      )
    }
  }
}

export default FormImageAtom

const styles = StyleSheet.create({
  mainView: {
    backgroundColor: 'transparent',
    width: '100%'
  },
  uploadView: {
    width: Dimensions.get('screen').width - 32,
    alignSelf: 'center',
    backgroundColor: color.secondary,
    borderRadius: 3
  },
  inputView: {
    width: Dimensions.get('screen').width - 32,
    alignSelf: 'center',
    backgroundColor: color.secondary,
    alignContent: 'center',
    padding: 3,
    borderRadius: 3,
    marginTop: 16,
    marginBottom: 16
  },
  selfAlign: {
    alignSelf: 'flex-start'
  },
  image: {
    height: 80,
    width: 80
  },
  imgContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    height: 90,
    width: 95,
    marginTop: 16,
    marginLeft: 16,
    backgroundColor: color.dropdown
  },
  imageText: {
    alignSelf: 'flex-start',
    marginLeft: 16,
    marginTop: 8,
    marginBottom: 16
  },
  headerText: {
    alignSelf: 'center',
    fontSize: 14,
    marginTop: 16,
    marginBottom: 16
  },
  imgPlaceholderText: {
    fontWeight: 'bold',
    fontSize: 20
  },
  menuColor: {
    color: color.menu
  }
})
