import * as React from 'react'
import { View, Text, Image } from 'react-native'
import styles from './../Style/exportStyles'

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
            <Text>{this.props.businessName.charAt(0).toUpperCase()}</Text>
          )}
        </View>
        <Text style={styles.nameDisplayName}>{this.props.businessName}</Text>
      </View>
    )
  }
}
