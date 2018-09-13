import * as React from 'react'
import { View, Text, Image, StyleSheet } from 'react-native'
import { color } from '../Style/Color'
import { capitalizeFirstLetter } from '../Functions/capitalizeFirstLetter'

interface IProps {
  businessName: string
  image?: string
  style?: object
}

export default class NameDisplayAtom extends React.Component<IProps, any> {
  render() {
    return (
      <View style={[styles.nameDisplayWrapper, this.props.style]}>
        <View style={styles.nameDisplayLetterDisplay}>
          {this.props.image ? (
            <Image
              source={{ uri: this.props.image }}
              style={styles.nameDisplayImage}
            />
          ) : (
            <Text style={styles.innerText}>
              {this.props.businessName &&
                capitalizeFirstLetter(this.props.businessName)}
            </Text>
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
    alignItems: 'center',
    height: 106,
    borderBottomWidth: 1,
    borderBottomColor: color.list
  },
  nameDisplayName: {
    fontSize: 14,
    fontWeight: '400',
    marginLeft: 20,
    fontFamily: 'AvenirNext-Bold'
  },
  nameDisplayImage: {
    height: 70,
    width: 70,
    borderRadius: 45
  },
  nameDisplayLetterDisplay: {
    height: 70,
    width: 70,
    borderRadius: 45,
    marginLeft: 40,
    backgroundColor: color.grey,
    justifyContent: 'center',
    alignItems: 'center'
  },
  innerText: {
    fontFamily: 'AvenirNext-Bold',
    fontSize: 16
  }
})
