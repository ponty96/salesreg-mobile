import React from 'react'
import { View, StyleSheet, Text } from 'react-native'
import { color } from '../Style/Color'
import { Thumbnail } from 'native-base'

interface IProp {
  label: string
  bottomText?: string
  listItemStyle?: object
  labelStyle?: object
  picStyle?: object
}

const ListItemWithImage = (props: IProp): JSX.Element => {
  return (
    <View style={[styles.wrapper, props.listItemStyle]}>
      <Text style={[styles.text, props.labelStyle]}>{props.label}</Text>
      <View style={styles.rightView}>
        <Thumbnail
          source={{
            uri:
              'https://snack-code-uploads.s3.us-west-1.amazonaws.com/~asset/0ba197eed01b550b7f6d4df10153223e'
          }}
          style={props.picStyle}
        />
        <Text style={[styles.text, styles.thumbnailLabel]}>
          {props.bottomText}
        </Text>
      </View>
    </View>
  )
}

export default ListItemWithImage

const styles = StyleSheet.create({
  wrapper: {
    flexDirection: 'row',
    paddingHorizontal: 32,
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 0.5,
    borderBottomWidth: 1,
    borderBottomColor: color.listBorderColor,
    paddingTop: 8
  },
  text: {
    fontSize: 14,
    fontFamily: 'SourceSansPro',
    color: color.principal,
    marginVertical: 5
  },
  rightView: {
    justifyContent: 'space-between',
    marginVertical: 8
  },
  rightIconLabel: {
    color: color.button
  },
  rightText: {
    textAlign: 'right'
  },
  thumbnailLabel: {
    textAlign: 'center'
  }
})
