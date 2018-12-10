import React from 'react'
import { StyleSheet, Platform, ActivityIndicator } from 'react-native'
import { CachedImage } from 'react-native-cached-image'
import { color } from '../Style/Color'

interface IProps {
  uri: string
  style?: object
}

export default class CachedImageAtom extends React.PureComponent<IProps> {
  render() {
    return !this.props.children ? (
      <CachedImage
        source={{ uri: this.props.uri }}
        style={[styles.container, this.props.style]}
        ttl={60 * 60 * 24 * 7}
        loadingIndicator={() => (
          <ActivityIndicator
            color={color.black}
            size={Platform.OS === 'android' ? 20 : 'small'}
          />
        )}
      />
    ) : (
      <CachedImage
        source={{ uri: this.props.uri }}
        style={[styles.container, this.props.style]}
        ttl={60 * 60 * 24 * 7}
        loadingIndicator={() => (
          <ActivityIndicator
            color={color.black}
            size={Platform.OS === 'android' ? 20 : 'small'}
          />
        )}
      >
        {this.props.children}
      </CachedImage>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    width: 100,
    height: 100
  }
})
