import { StyleSheet, View, Text } from 'react-native'
import React from 'react'
import { Header, Left, Body, Right, Button, Icon, Title } from 'native-base'
import { color } from '../Style/Color'

interface IProps {
  menu?: boolean
  title: string
  firstRightIcon?: string
  firstRightIconType?: any
  secondRightIcon?: string
  secondRightIconType?: any
  rightText?: string
  onBackPress?: () => void
  onMenuPress?: () => void
  onPressFirstRightIcon?: () => void
  onPressRightButton?: () => void
}

const customHeader = (prop: IProps) => {
  return (
    <Header style={styles.wrapper}>
      <Left style={styles.headerItemWrapper}>
        {prop.menu ? (
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
      <Body style={styles.headerItemWrapper}>
        <Title style={styles.title}>{prop.title}</Title>
      </Body>
      <Right style={styles.headerItemWrapper}>
        {prop.rightText ? (
          <Button
            transparent
            onPress={prop.onPressRightButton}
            style={styles.rightWrapper}
            activeOpacity={1}
          >
            <Icon name={prop.firstRightIcon} type={prop.firstRightIconType} />
            <Text style={styles.edit}>{prop.rightText}</Text>
          </Button>
        ) : (
          <View style={styles.rightWrapper}>
            <Icon name={prop.firstRightIcon} />
            <Icon name={prop.secondRightIcon} />
          </View>
        )}
      </Right>
    </Header>
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
    height: 88
  },
  title: {
    fontFamily: 'SourceSansPro_Semibold',
    fontSize: 16
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
  }
})
