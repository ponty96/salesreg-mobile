import { StyleSheet } from 'react-native'
import React from 'react'
import { Item, Input } from 'native-base'
import Icon from './Icon'
import { color } from '../Style/Color'

interface IProps {
  queryText?: string
  onSearch?: (queryText: string) => void
  placeholder?: string
  containerStyle?: object
}

interface IState {
  isFocused: boolean
}

export class SearchAtom extends React.PureComponent<IProps, IState> {
  static defaultProps = {
    containerStyle: {}
  }

  state = {
    isFocused: false
  }

  render() {
    return (
      <Item
        style={[
          styles.searchItem,
          this.props.containerStyle,
          this.state.isFocused ? { backgroundColor: color.searchBoxActive } : {}
        ]}
      >
        <Icon
          name="ios-search"
          style={{
            color: '#000',
            fontSize: 24,
            padding: 0,
            marginRight: 10,
            marginTop: 5
          }}
        />
        <Input
          onFocus={() => this.setState({ isFocused: true })}
          onBlur={() => this.setState({ isFocused: false })}
          placeholder={this.props.placeholder || ''}
          returnKeyType="search"
          onChangeText={value => this.props.onSearch(value)}
          onSubmitEditing={() => this.props.onSearch(this.props.queryText)}
          value={this.props.queryText}
          style={styles.inputText}
        />
      </Item>
    )
  }
}

const styles = StyleSheet.create({
  searchItem: {
    backgroundColor: color.searchBoxPassive,
    borderWidth: 0,
    borderBottomWidth: 0,
    borderRadius: 8,
    marginHorizontal: 12,
    marginRight: 0,
    paddingLeft: 12,
    marginTop: 0,
    top: 0,
    height: 36,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8
  },
  inputText: {
    textAlign: 'center',
    marginTop: -3,
    fontFamily: 'AvenirNext-Regular'
  }
})
