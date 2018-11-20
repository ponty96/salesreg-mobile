import React from 'react'
import { View, StyleSheet } from 'react-native'
import InputAtom from './InputAtom'
import { Chip } from '../Chip'

interface IProps {
  handleValuesChange: (tags: any) => void
  tags: string[]
  label?: string
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
        />
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
  }
})
