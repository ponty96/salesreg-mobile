import { Button, Icon, Left, Right, Title } from 'native-base'
import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
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
  children?: any
}

const CustomHeader = (props: IProps) => {
  return (
    <View style={styles.wrapper}>
      <Left style={styles.headerItemWrapper}>
        <Icon
          name={props.showMenu ? 'menu' : 'arrow-back'}
          onPress={props.showMenu ? props.onMenuPress : props.onBackPress}
          style={styles.headerIcon}
        />
      </Left>
      <View style={[styles.headerItemWrapper, styles.headerItem]}>
        <Title style={styles.title}>{props.title}</Title>
      </View>
      {props.showRight ? (
        <Right style={styles.headerItemWrapper}>
          {props.rightText ? (
            <View style={styles.rightWrapper}>
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
              {props.children}
            </View>
          ) : (
            <View style={styles.rightWrapper}>
              <Icon
                name={props.firstRightIcon}
                type={props.firstRightIconType}
                style={[styles.headerIcon, styles.searchIcon]}
                onPress={props.onPressFirstRightIcon}
              />
              {props.children}
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
    paddingLeft: 0,
    marginLeft: 0,
    paddingTop: 24,
    color: '#fff'
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
  },
  headerItem: {
    alignSelf: 'flex-start',
    alignItems: 'flex-start',
    width: '70%'
  }
})
