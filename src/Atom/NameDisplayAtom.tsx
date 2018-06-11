import * as React from 'react'
import { View, Text, Image, StyleSheet } from 'react-native'
import { color } from '../Style/Color'
import { capitalizeFirstLetter } from '../Functions/capitalizeFirstLetter'

interface IProps {
  businessName: string
  image: string
}

export default class NameDisplayAtom extends React.Component<IProps, any> {
  render() {
    return (
      <View style={styles.nameDisplayWrapper}>
        <View style={styles.nameDisplayLetterDisplay}>
          {this.props.image ? (
            <Image
              source={{ uri: this.props.image }}
              style={styles.nameDisplayImage}
            />
          ) : (
            <Text>{capitalizeFirstLetter(this.props.businessName)}</Text>
          )}
        </View>
        <Text style={styles.nameDisplayName}>{this.props.businessName}</Text>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  nameDisplayWrapper: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  nameDisplayName: {
    fontSize: 14,
    fontWeight: '400',
    marginLeft: 20
  },
  nameDisplayImage: {
    height: 90,
    width: 90,
    borderRadius: 45
  },
  nameDisplayLetterDisplay: {
    height: 90,
    width: 90,
    borderRadius: 45,
    backgroundColor: color.grey,
    justifyContent: 'center',
    alignItems: 'center'
  }
})
