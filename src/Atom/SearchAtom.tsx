import { StyleSheet } from 'react-native'
import React from 'react'
import { Item, Input } from 'native-base'
import Icon from './Icon'
import { color } from '../Style/Color'

interface SearchProps {
  queryText?: string
  onSearch?: (queryText: string) => void
  placeholder?: string
}

export const SearchAtom = (props: SearchProps) => (
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
      placeholder={props.placeholder || ''}
      onChangeText={props.onSearch}
      value={props.queryText}
    />
  </Item>
)

const styles = StyleSheet.create({
  searchItem: {
    backgroundColor: color.textBorderBottom,
    borderWidth: 1,
    borderColor: color.textBorderBottom,
    borderRadius: 8,
    marginHorizontal: 12,
    paddingLeft: 12,
    marginTop: 0,
    top: 0,
    height: 36,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8
  }
})
