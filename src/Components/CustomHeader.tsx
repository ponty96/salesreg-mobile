import { StyleSheet, View, Text } from 'react-native'
import React from 'react'
import { Left, Right, Button, Title } from 'native-base'
import { color } from '../Style/Color'
import Icon from '../Atom/Icon'

interface IProps {
  showMenu?: boolean
  title: string
  firstRightIcon?: string
  firstRightIconType?: any
  rightText?: string
  onBackPress?: () => void
  onMenuPress?: () => void
  onPressFirstRightIcon?: () => void
  onPressRightButton?: () => void
  navigation?: object
  showRight?: boolean
  rightStyle?: object
}

const CustomHeader = (props: IProps) => {
  return (
    <View style={styles.wrapper}>
      <Left style={{ flexDirection: 'row', alignItems: 'center' }}>
        <Icon
          name={props.showMenu ? 'menu' : 'arrow-back'}
          onPress={props.showMenu ? props.onMenuPress : props.onBackPress}
          style={styles.headerIcon}
          type="MaterialIcons"
        />
        <Title style={styles.title}>{props.title}</Title>
      </Left>
      {props.showRight ? (
        <Right>
          {props.rightText ? (
            <Button
              transparent={true}
              onPress={props.onPressRightButton}
              style={styles.rightWrapper}
            >
              <Icon
                name={props.firstRightIcon}
                type={props.firstRightIconType}
                style={styles.whiteIcon}
              />
              <Text style={styles.edit}>{props.rightText}</Text>
            </Button>
          ) : (
            <View style={[styles.rightWrapper, props.rightStyle]}>
              <Icon
                name={props.firstRightIcon}
                type={props.firstRightIconType}
                style={styles.searchIcon}
                onPress={props.onPressFirstRightIcon}
              />
            </View>
          )}
        </Right>
      ) : (
        <Right />
      )}
    </View>
  )
}

export default CustomHeader

const styles = StyleSheet.create({
  wrapper: {
    backgroundColor: color.primary,
    paddingLeft: 16,
    paddingRight: 16,
    height: 70,
    flexDirection: 'row',
    justifyContent: 'space-between',
    // alignItems: 'center',
    width: '100%'
  },
  headerIcon: {
    fontSize: 36,
    color: color.secondary
  },
  title: {
    fontFamily: 'SourceSansPro-Semibold',
    fontSize: 19,
    color: color.secondary,
    paddingLeft: 0,
    marginLeft: 10
  },
  rightWrapper: {
    flexDirection: 'row',
    marginRight: 0
  },
  edit: {
    fontFamily: 'Source Sans Pro',
    color: color.secondary,
    alignSelf: 'center',
    fontSize: 16,
    marginLeft: 8
  },
  searchIcon: {
    color: color.secondary,
    width: 25,
    left: 20,
    fontSize: 28
  },
  whiteIcon: {
    color: color.secondary,
    width: 25,
    left: 20,
    fontSize: 20
  }
})
