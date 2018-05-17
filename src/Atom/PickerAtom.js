import React, { Component } from 'react'
import { View } from 'react-native'
import { Picker, Icon } from 'native-base'
import PropTypes from 'prop-types'

class PickerAtom extends Component {
  constructor(props) {
    super(props)
    this.state = {
      selected: ''
    }
  }
  handleChange(value) {
    this.setState({
      selected: value
    })
  }

  render() {
    var list = this.props.list
    return (
      <Picker
        iosHeader="Select one"
        mode="dropdown"
        iosIcon={<Icon name="ios-arrow-down-outline" />}
        style={this.props.style}
        selectedValue={this.state.selected}
        onValueChange={this.handleChange.bind(this)}
      >
        {list.map((element, key) => (
          <Picker.Item label={element} value={element} key={key} />
        ))}
      </Picker>
    )
  }
}

PickerAtom.propTypes = {
  list: PropTypes.array.isRequired,
  style: PropTypes.object
}

export default PickerAtom
