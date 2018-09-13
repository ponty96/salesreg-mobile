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
import InputAtom from './InputAtom'
import ButtonAtom from './ButtonAtom'

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

  addFromContacts = () => {
    console.log('Added From Contacts')
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
  forTypeOfInputToDisplay = (value: string) => {
    if (this.props.form !== 'customer' && this.props.form !== 'vendor') {
      return (
        <View style={styles.inputView}>
          <InputAtom
            label={value}
            defaultValue={this.props.name}
            getValue={this.props.getName}
          />
        </View>
      )
    } else {
      return (
        <View style={styles.inputView}>
          <InputAtom
            label={'*' + value}
            defaultValue={this.props.name}
            getValue={this.props.getName}
          />
          <InputAtom
            label={'Company Name'}
            defaultValue={this.props.name}
            getValue={this.props.getName}
          />
          <ButtonAtom
            btnText="+Add from contacts"
            transparent={true}
            onPress={this.addFromContacts}
            textStyle={styles.sendAnother}
            btnStyle={{
              paddingHorizontal: 5,
              alignSelf: 'flex-start',
              marginVertical: 3
            }}
          />
        </View>
      )
    }
  }
  determineDataBasedOnProps = (form: string) => {
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
        title = 'Customer ID'
        type = 'Contact Name'
        break
      case 'vendor':
        title = 'Vendor ID'
        type = 'Contact Name'
        break
      default:
        title = 'Avatar'
        type = 'Avatar name'
        break
    }
    const obj = {
      title: title,
      type: type
    }
    return obj
  }

  render() {
    const { title, type } = this.determineDataBasedOnProps(this.props.form)
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
        {this.forTypeOfInputToDisplay(type)}
      </View>
    )
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
    paddingLeft: 10,
    paddingRight: 10,
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
  },
  sendAnother: {
    color: color.button,
    fontSize: 16,
    fontFamily: 'SourceSansPro_Semibold'
  }
})
