import React from 'react'
import { View, StyleSheet, Text } from 'react-native'
import InputAtom from './InputAtom'
import { Chip } from '../Chip'
import { color } from '../../Style/Color'

interface IProps {
  handleValuesChange: (tags: any) => void
  tags: string[]
  label?: string
  underneathText?: string
  underneathStyle?: object
  error?: string
}

interface IState {
  input: any
}

export default class TagInput extends React.PureComponent<IProps, IState> {
  state = {
    input: ''
  }

  clickChip = _text => {}

  removeTag = index => {
    const { tags } = this.props
    const updatedTags =
      tags.length == 1
        ? []
        : [...tags.slice(0, index), ...tags.slice(index + 1)]
    this.props.handleValuesChange(updatedTags)
  }

  renderUnderNeathText = () => {
    if (this.props.error || this.props.underneathText) {
      return (
        <Text
          style={[
            styles.underneathText,
            this.props.underneathStyle,
            {
              fontFamily: 'AvenirNext-Regular',
              color: this.props.error ? 'red' : color.principal
            }
          ]}
        >
          {this.props.error || this.props.underneathText}
        </Text>
      )
    } else {
      return null
    }
  }

  render() {
    return (
      <View>
        <View style={styles.tagList}>
          {this.props.tags.map((tag, index) => (
            <Chip
              text={tag}
              onPress={this.clickChip}
              key={`${tag}-${index}`}
              showCloseIcon={true}
              onPressCloseIcon={() => this.removeTag(index)}
            />
          ))}
        </View>
        <InputAtom
          label=""
          placeholder="Enter tags"
          defaultValue={this.state.input}
          getValue={input => this.setState({ input })}
          keyboardType="default"
          onSubmitEditing={this.addTag}
          contStyle={styles.textInputContStyle}
          containerStyle={{ marginLeft: -10 }}
        />
        {this.renderUnderNeathText()}
      </View>
    )
  }

  addTag = () => {
    if (this.state.input) {
      const tags = [...this.props.tags, this.state.input]
      this.setState(
        {
          input: ''
        },
        () => {
          this.props.handleValuesChange(tags)
        }
      )
    }
  }
}

const styles = StyleSheet.create({
  tagList: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    flex: 1
  },
  textInputContStyle: {
    marginTop: 0
  },
  underneathText: {
    marginLeft: 3,
    color: color.textColor,
    fontSize: 14,
    marginBottom: 0,
    marginTop: 2,
    fontFamily: 'AvenirNext-Regular',
    paddingVertical: 12
  }
})
