import { StyleSheet, View, Text } from 'react-native'
import React from 'react'
import { Left, Right, Button, Icon, Title } from 'native-base'
import { color } from '../Style/Color'

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
}

const customHeader = (props: IProps) => {
  return (
    <View style={styles.wrapper}>
      <Left style={styles.headerItemWrapper}>
        <Icon
          name={props.showMenu ? 'menu' : 'arrow-back'}
          onPress={props.showMenu ? props.onMenuPress : props.onBackPress}
          style={styles.headerIcon}
        />
      </Left>
      <View
        style={[
          styles.headerItemWrapper,
          {
            alignSelf: 'flex-start',
            alignItems: 'flex-start',
            width: '70%'
          }
        ]}
      >
        <Title style={styles.title}>{props.title}</Title>
      </View>
      {props.showRight ? (
        <Right style={styles.headerItemWrapper}>
          {props.rightText ? (
            <Button
              transparent
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
            <View style={styles.rightWrapper}>
              <Icon
                name={props.firstRightIcon}
                type={props.firstRightIconType}
                style={[styles.headerIcon, styles.searchIcon]}
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

export default customHeader

const styles = StyleSheet.create({
  headerIcon: {
    fontSize: 28,
    color: color.secondary
  },
  wrapper: {
    backgroundColor: color.primary,
    paddingLeft: 16,
    paddingRight: 16,
    height: 88,
    flexDirection: 'row'
  },
  title: {
    fontFamily: 'SourceSansPro_Semibold',
    fontSize: 16,
    color: color.secondary,
    paddingLeft: 0,
    marginLeft: 0,
    paddingTop: 24
  },
  rightWrapper: {
    flexDirection: 'row',
    marginRight: 0
  },
  edit: {
    fontFamily: 'SourceSansPro',
    color: color.secondary,
    alignSelf: 'center',
    fontSize: 14,
    marginLeft: 8
  },
  headerItemWrapper: {
    marginTop: 24
  },
  rightMenu: {
    marginLeft: 16
  },
  searchIcon: {
    marginTop: 3,
    color: color.secondary
  },
  whiteIcon: {
    color: color.secondary,
    width: 25,
    left: 20
  }
})
