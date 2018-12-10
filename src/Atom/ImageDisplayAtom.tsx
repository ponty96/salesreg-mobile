import * as React from 'react'
import { Text, View, StyleSheet } from 'react-native'
import { color } from '../Style/Color'
import CachedImageAtom from './CachedImageAtom'

interface IProps {
  image: string
  name: string
}

export default class ImageDisplayAtom extends React.Component<IProps, any> {
  render() {
    return (
      <View style={styles.smallImageDisplayContainer}>
        <View style={styles.smallImageDisplayImageWrapper}>
          <CachedImageAtom
            uri={this.props.image}
            style={styles.smallImageDisplayImage}
          />
        </View>
        <Text style={styles.smallImageDisplayName}>{this.props.name}</Text>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  smallImageDisplayContainer: {
    marginTop: 30,
    marginLeft: 30
  },
  smallImageDisplayImageWrapper: {
    height: 90,
    width: 90,
    borderRadius: 45,
    backgroundColor: color.grey
  },

  smallImageDisplayImage: {
    height: 90,
    width: 90,
    borderRadius: 45
  },

  smallImageDisplayName: {
    marginTop: 20,
    marginLeft: 20,
    fontSize: 14,
    fontWeight: '400'
  }
})
