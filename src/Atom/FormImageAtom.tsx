import * as React from 'react'
import {
  Image,
  View,
  Text,
  TouchableOpacity,
  Dimensions,
  StyleSheet
} from 'react-native'
import { ImagePicker } from 'expo'
import { color } from '../Style/Color'

interface IProps {
  source: string
  imgStyle?: object
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

  determineDataBasedOnProps = (form: string) => {
    let title
    switch (form) {
      case 'business':
        title = 'Business ID'
        break
      case 'user':
        title = 'User ID'
        break
      case 'product':
        title = 'Product ID'
        break
      case 'customer':
        title = 'Customer ID'
        break
      case 'vendor':
        title = 'Vendor ID'
        break
      default:
        title = 'Avatar'
        break
    }
    const obj = {
      title: title
    }
    return obj
  }

  render() {
    const { title } = this.determineDataBasedOnProps(this.props.form)
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
                { fontFamily: 'SourceSansPro_Semibold', color: color.button }
              ]}
            >
              Upload Image
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    )
  }
}

export default FormImageAtom

const styles = StyleSheet.create({
  mainView: {
    backgroundColor: 'transparent',
    width: '100%',
    marginBottom: 16
  },
  uploadView: {
    width: Dimensions.get('screen').width - 32,
    alignSelf: 'center',
    backgroundColor: color.secondary,
    borderRadius: 3
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
  }
})
