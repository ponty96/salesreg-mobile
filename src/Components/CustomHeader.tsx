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
          <Button transparent>
            <Icon name="arrow-back" onPress={prop.onBackPress} />
          </Button>
        )}
      </Left>
      <Body style={styles.headerItemWrapper}>
        <Title style={styles.title}>{prop.title}</Title>
      </Body>
      <Right>
        <View style={styles.rightWrapper}>
          <Button transparent>
            <Icon name={prop.firstRightIcon} type={prop.firstRightIconType} />
          </Button>
          {!prop.rightText ? (
            <Button transparent>
              <Icon
                name={prop.secondRightIcon}
                type={prop.secondRightIconType}
                style={styles.headerIcon}
              />
            </Button>
          ) : (
            <Text style={styles.edit}>{prop.rightText}</Text>
          )}
        </View>
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
    flexDirection: 'row'
  },
  edit: {
    fontFamily: 'SourceSansPro',
    marginRight: 32,
    color: color.secondary,
    alignSelf: 'center',
    fontSize: 16
  },
  headerItemWrapper: {
    marginTop: 24
  }
})
