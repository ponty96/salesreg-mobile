import { StyleSheet, View, Text } from 'react-native'
import React from 'react'
import { Left, Right, Button, Icon, Title } from 'native-base'
import { color } from '../Style/Color'
import MenuAtom from '../Atom/MenuAtom'

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

const customHeader = (prop: IProps) => {
  return (
    <View style={styles.wrapper}>
      <Left style={styles.headerItemWrapper}>
        {prop.showMenu ? (
          <Icon
            name="menu"
            style={styles.headerIcon}
            onPress={prop.onMenuPress}
          />
        ) : (
          <Icon
            name="arrow-back"
            onPress={prop.onBackPress}
            style={styles.headerIcon}
          />
        )}
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
        <Title style={styles.title}>{prop.title}</Title>
      </View>
      {prop.showRight ? (
        <Right style={styles.headerItemWrapper}>
          {prop.rightText ? (
            <Button
              transparent
              onPress={prop.onPressRightButton}
              style={styles.rightWrapper}
            >
              <Icon
                name={prop.firstRightIcon}
                type={prop.firstRightIconType}
                style={styles.whiteIcon}
              />
              <Text style={styles.edit}>{prop.rightText}</Text>
            </Button>
          ) : (
            <View style={styles.rightWrapper}>
              <Icon
                name={prop.firstRightIcon}
                type={prop.firstRightIconType}
                style={[styles.headerIcon, styles.searchIcon]}
                onPress={prop.onPressFirstRightIcon}
              />
              <View style={styles.rightMenu}>
                <MenuAtom navigation={prop.navigation} />
              </View>
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
