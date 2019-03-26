import { StyleSheet, View } from 'react-native'
import React from 'react'
import { Item, Input, Icon } from 'native-base'

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
        <View style={{ marginLeft: 12, marginTop: 2 }}>
          <Icon
            name="ios-search"
            type="Ionicons"
            style={{
              color: '#000',
              fontSize: 24,
              padding: 0
            }}
          />
        </View>
        <View
          style={{
            width: '100%',
            position: 'absolute',
            marginTop: -10,
            paddingHorizontal: 34
          }}
        >
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
        </View>
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
    marginTop: 0,
    top: 0,
    height: 36,
    alignItems: 'center',
    marginBottom: 8
  },
  inputText: {
    fontFamily: 'AvenirNext-Regular',
    textAlign: 'center',
    width: '100%',
    paddingLeft: 0,
    paddingRight: 0
  }
})
