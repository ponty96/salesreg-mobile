import { StyleSheet } from 'react-native'
import React from 'react'
import { Item, Input } from 'native-base'
import Icon from './Icon'
import { color } from '../Style/Color'

interface IProps {
  queryText?: string
  onSearch?: (queryText: string) => void
  placeholder?: string
}

interface IState {
  value: string
}

export class SearchAtom extends React.PureComponent<IProps, IState> {
  state = {
    value: this.props.queryText || ''
  }

  render() {
    return (
      <Item style={styles.searchItem}>
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
          placeholder={this.props.placeholder || ''}
          returnKeyType="search"
          onChangeText={value => this.setState({ value })}
          onSubmitEditing={() => this.props.onSearch(this.state.value)}
          value={this.state.value}
        />
      </Item>
    )
  }
}

const styles = StyleSheet.create({
  searchItem: {
    backgroundColor: color.textBorderBottom,
    borderWidth: 1,
    borderColor: color.textBorderBottom,
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
  }
})
